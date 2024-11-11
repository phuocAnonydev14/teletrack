'use client';

import { AppDetail, AppTrack, AppWatch } from '@/types/app.type';
import {
  ColumnDef,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table';
import { cn, formatNumber, isOfType } from '@/lib/utils/utils';
import { TableCell, TableRow } from '@/components/ui/table';
import React, { useEffect, useMemo, useState } from 'react';
import {
  closestCenter,
  DndContext,
  DragOverlay,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { arrayMove, SortableContext } from '@dnd-kit/sortable';
import { SortableItem } from '@/app/watchlist/components/SortableItem';
import { StaticTableRow } from '@/app/watchlist/components/table/StaticTableRow';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import { CommonTable } from '@/components/table';
import Link from 'next/link';
import { BadgeIcon } from '@/components/icons';
import { AppTrackTableRank } from '@/app/components/AppTrackTable/AppTrackTableRank';
import { getLogoUrl } from '@/lib/utils/image.util';
import { useMediaQuery } from 'usehooks-ts';
import { useAuthContext } from '@/components/providers/AuthProvider';

interface AppTrackTableProps {
  data: AppWatch[];
  total: number;
}
export const WatchlistTable = (props: AppTrackTableProps) => {
  const { total, data } = props;
  const [sorting, setSorting] = useState<SortingState>([]);
  const [appTracks, setAppTracks] = useState<AppWatch[]>(
    data.map((item) => ({ ...item, id: item.Name })),
  );
  const matches = useMediaQuery(`(max-width: 1024px)`);
  const { withAuth } = useAuthContext();
  const columns: ColumnDef<AppWatch>[] = [
    {
      accessorKey: 'rank',
      header: () => <div className="w-full text-center">{matches ? '' : 'Rank'}</div>,
      cell: ({ row, renderValue }) => {
        return (
          <AppTrackTableRank
            username={row.original.Bot.username}
            rankChange={row.original.Bot.rankChange}
            rank={row.original.Bot.rank}
            isGlobalRank={false}
            isBookmarked={true}
            bookMarkAction={async () => {
              setAppTracks((prev) => prev.filter((item) => item.Name !== row.original.Name));
            }}
          />
        );
      },
      invertSorting: true,
    },
    {
      id: 'username',
      accessorKey: 'username',
      header: 'Name',
      cell: ({ row, renderValue }) => {
        const appTrack = row.original;
        const nameRender = (
          isOfType<AppTrack>(appTrack, ['username']) ? appTrack.username : appTrack.Name
        ).replace('@', '');
        const rankRender = isOfType<AppTrack>(appTrack, ['rank'])
          ? appTrack.rank
          : appTrack?.Order || 0;
        return (
          <div className="flex min-w-fit items-center gap-2 overflow-hidden pr-2">
            {/*{matches && (*/}
            {/*  <>*/}
            {/*    <BookmarkTooltip*/}
            {/*      username={*/}
            {/*        isOfType<AppTrack>(appTrack, ['rank'])*/}
            {/*          ? appTrack.username*/}
            {/*          : appTrack.Bot?.username || ''*/}
            {/*      }*/}
            {/*      isBookmarked={false}*/}
            {/*    />*/}
            {/*    <span className="text-base font-semibold">{rankRender}</span>*/}
            {/*  </>*/}
            {/*)}*/}
            <Link
              href={`/apps/${(isOfType<AppTrack>(row.original, ['username']) ? nameRender : row.original?.Bot?.username || '').replace('@', '')}`}
              className="inline-flex w-fit items-center gap-2"
            >
              <img
                src={getLogoUrl(
                  (isOfType<AppTrack>(row.original, ['username'])
                    ? nameRender
                    : // eslint-disable-next-line no-unsafe-optional-chaining
                      'Bot' in row.original
                      ? row.original?.Bot?.username
                      : ''
                  ).replace('@', ''),
                )}
                className="h-7 w-7 rounded-md bg-gradient-to-r from-[#24C6DCCC] to-[#514A9DCC] p-[1px] md:h-10 md:w-10"
                alt={''}
                loading="lazy"
              />
              {/*{matches && (*/}
              {/*  <div className="absolute right-1 top-1 z-40 rounded-[3px] bg-rankTagBg px-[10px] text-[12px] font-medium text-secondary-foreground opacity-80 backdrop-blur-[26px]">*/}
              {/*    {rankRender}*/}
              {/*  </div>*/}
              {/*)}*/}
              <span className="inline max-w-[80px] overflow-hidden truncate overflow-ellipsis whitespace-nowrap text-base font-semibold leading-none sm:min-w-[20px] sm:max-w-[150px] lg:max-w-[20dvw]">
                {nameRender}
              </span>
              <div className="hidden min-w-[20px] lg:block">
                <BadgeIcon width={20} height={20} />
              </div>
            </Link>
          </div>
        );
      },
      sortingFn: (rowA, rowB, columnId) => {
        const appA = rowA.original;
        const appB = rowB.original;
        if (isOfType<AppTrack>(appA, ['username']) && isOfType<AppTrack>(appB, ['username'])) {
          return appA.username > appB.username ? 1 : -1;
        }
        return 'Name' in appA && 'Name' in appB && appA.Name > appB.Name ? 1 : -1;
      },
    },
    {
      id: 'users',
      accessorKey: 'users',
      header: ({ column }) => {
        return (
          <div className="w-full text-center">
            <p>MAU</p>
          </div>
        );
      },
      cell: ({ row, renderValue }) => {
        const mauRender = isOfType<AppTrack>(row.original, ['users'])
          ? row.original.users
          : 'Bot' in row.original
            ? row.original?.Bot?.users
            : '';
        return (
          <p className="w-full text-end text-base font-medium xl:text-center">
            {formatNumber(mauRender, true)}
          </p>
        );
      },
      sortingFn: (rowA, rowB, columnId) => {
        const appA = rowA.original;
        const appB = rowB.original;
        if (isOfType<AppTrack>(appA, ['users']) && isOfType<AppTrack>(appB, ['users'])) {
          return appA.users > appB.users ? 1 : -1;
        }
        return 'Bot' in appA && 'Bot' in appB && appA.Bot.users > appB.Bot.users ? 1 : -1;
      },
    },
    {
      id: 'change',
      accessorKey: 'change',
      header: ({ column }) => {
        return (
          <div className="w-full gap-1 text-center">
            <p>MAU 24h</p>
          </div>
        );
      },
      cell: ({ row, renderValue }) => {
        const changeRender = isOfType<AppTrack>(row.original, ['change'])
          ? row.original.change
          : 'Bot' in row.original
            ? row.original?.Bot.change
            : 0;
        return (
          <p
            className={cn(
              'w-full text-end text-base font-medium text-[#1DC467] xl:text-center',
              changeRender < 0 && 'text-[#F84A4A]',
            )}
          >
            {changeRender >= 0 ? '+' : '-'}
            {formatNumber(changeRender, true)}
          </p>
        );
      },
      sortingFn: (rowA, rowB, columnId) => {
        const appA = rowA.original;
        const appB = rowB.original;
        if (isOfType<AppTrack>(appA, ['change']) && isOfType<AppTrack>(appB, ['change'])) {
          return appA.change > appB.change ? 1 : -1;
        }
        return 'Bot' in appA && 'Bot' in appB && appA.Bot.change > appB.Bot.change ? 1 : -1;
      },
    },
    {
      id: 'totalSub',
      accessorKey: 'totalSub',
      header: () => <p className="w-full text-center">Channel Subscribers</p>,
      cell: ({ row, renderValue }) => {
        const totalSubRender = isOfType<AppTrack>(row.original, ['users'])
          ? row.original.users
          : 'Channel' in row.original
            ? row.original?.Channel?.users
            : 0;
        return (
          <p className="text-end text-base font-medium xl:text-center">
            {formatNumber(totalSubRender, true)}
          </p>
        );
      },
      sortingFn: (rowA, rowB, columnId) => {
        const appA = rowA.original;
        const appB = rowB.original;
        if (isOfType<AppTrack>(appA, ['users']) && isOfType<AppTrack>(appB, ['users'])) {
          return appA.users > appB.users ? 1 : -1;
        }
        return 'Channel' in appA && 'Channel' in appB && appA.Channel.users > appB.Channel.users
          ? 1
          : -1;
      },
    },
    {
      id: 'daySub',
      accessorKey: 'daySub',
      header: () => <p className="w-full text-center">Channel Today</p>,
      cell: ({ row, renderValue }) => {
        const changeRender = isOfType<AppTrack>(row.original, ['change'])
          ? row.original.change
          : 'Channel' in row.original
            ? row.original?.Channel?.change
            : 0;
        return (
          <p
            className={cn(
              'w-full text-end text-base font-medium text-[#1DC467] xl:text-center',
              changeRender < 0 && 'text-[#F84A4A]',
            )}
          >
            {changeRender >= 0 ? '+' : '-'}
            {formatNumber(changeRender, true)}
          </p>
        );
      },
      sortingFn: (rowA, rowB, columnId) => {
        const appA = rowA.original;
        const appB = rowB.original;
        if (isOfType<AppTrack>(appA, ['change']) && isOfType<AppTrack>(appB, ['change'])) {
          return appA.change > appB.change ? 1 : -1;
        }
        return 'Channel' in appA && 'Channel' in appB && appA.Channel.change > appB.Channel.change
          ? 1
          : -1;
      },
    },
    {
      id: 'fdv',
      accessorKey: 'fdv',
      header: () => <p className="w-full text-center">FDV</p>,
      cell: ({ row, renderValue }) => {
        const fdvRender = isOfType<AppTrack>(row.original, ['rank'])
          ? 'N/A'
          : 'FDV' in row.original
            ? row.original?.FDV
              ? '$' + formatNumber(row.original?.FDV, true)
              : 'N/A'
            : 'N/A';
        return <p className="w-full text-end text-base font-medium xl:text-center">{fdvRender}</p>;
      },
      sortingFn: (rowA: any, rowB: any, columnId) => {
        const appA = rowA.original;
        const appB = rowB.original;
        // if (isOfType<AppDetail>(appA, ['FDV']) && isOfType<AppDetail>(appB, ['FDV'])) {
        return appA.FDV > appB.FDV ? 1 : -1;
        // }
      },
    },
  ];

  const table = useReactTable({
    data: appTracks,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
    },
    enableSortingRemoval: false,
  });

  const [activeId, setActiveId] = useState<any>();
  const items = useMemo(() => appTracks?.map(({ id }) => id), [appTracks]);
  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: { delay: 100, tolerance: 1 },
    }),
    useSensor(TouchSensor, {
      activationConstraint: { delay: 100, tolerance: 1 },
    }),
  );

  function handleDragStart(event: any) {
    setActiveId(event.active.id);
  }

  function handleDragEnd(event: any) {
    const { active, over } = event;
    if (active.id !== over.id) {
      if (!items) return;
      setAppTracks((data) => {
        const oldIndex = items.indexOf(active.id);
        const newIndex = items.indexOf(over.id);
        return arrayMove(data, oldIndex, newIndex);
      });
    }

    setActiveId(null);
  }

  function handleDragCancel() {
    setActiveId(null);
  }

  const selectedRow = useMemo(() => {
    if (!activeId) {
      return null;
    }
    return table.getRowModel().rows.find(({ original }) => original.id === activeId);
  }, [activeId, table]);

  useEffect(() => {
    withAuth(() => {});
    if (matches) {
      table.getColumn('rank')?.pin('left');
      table.getColumn('username')?.pin('left');
    } else {
      table.getColumn('rank')?.pin('left');
      table.getColumn('username')?.pin(false);
    }
  }, []);

  return (
    <div>
      <DndContext
        sensors={sensors}
        onDragEnd={handleDragEnd}
        onDragStart={handleDragStart}
        onDragCancel={handleDragCancel}
        collisionDetection={closestCenter}
        modifiers={[restrictToVerticalAxis]}
      >
        <div className="flex items-center justify-center gap-3 rounded-t-lg border-2 border-tableBorder bg-tableBg px-8 py-3 text-primary-foreground">
          <p className="text-xl font-semibold">Get started with your Watchlist today!</p>
        </div>
        <CommonTable table={table}>
          <SortableContext items={appTracks as any}>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row, index) => {
                return <SortableItem key={row.id} row={row} index={index} />;
              })
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </SortableContext>
        </CommonTable>
        <DragOverlay>
          {activeId && (
            <table className="w-full">
              <tbody>
                <StaticTableRow row={selectedRow} />
              </tbody>
            </table>
          )}
        </DragOverlay>
      </DndContext>
    </div>
  );
};
