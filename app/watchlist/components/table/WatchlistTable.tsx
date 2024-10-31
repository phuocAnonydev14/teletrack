'use client';

import { AppDetail, AppTrack } from '@/types/app.type';
import {
  ColumnDef,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table';
import { cn, formatNumber, isAppTrackType, isOfType } from '@/lib/utils/utils';
import { TableCell, TableRow } from '@/components/ui/table';
import React, { useMemo, useState } from 'react';
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

interface AppTrackTableProps {
  data: AppDetail[];
  total: number;
}
export const WatchlistTable = (props: AppTrackTableProps) => {
  const { total, data } = props;
  const [sorting, setSorting] = useState<SortingState>([]);
  const [appTracks, setAppTracks] = useState<AppDetail[]>(
    data.map((item) => ({ ...item, id: isAppTrackType(item) ? item.username : item.Bot.username })),
  );

  const columns: ColumnDef<AppTrack | AppDetail>[] = [
    {
      accessorKey: 'rank',
      header: () => <div className="w-full text-center">{'No.'}</div>,
      cell: ({ row, renderValue }) => {
        return <AppTrackTableRank isGlobalRank={false} appTrack={row.original} />;
      },
      invertSorting: true,
    },
    {
      accessorKey: 'username',
      header: 'Name',
      cell: ({ row, renderValue }) => {
        const nameRender = (
          isOfType<AppTrack>(row.original, ['username']) ? row.original.username : row.original.Name
        ).replace('@', '');
        return (
          <Link
            href={`/apps/${(isOfType<AppTrack>(row.original, ['username']) ? nameRender : row.original?.Bot?.username).replace('@', '')}`}
          >
            <div className="flex min-w-[50dvw] items-center gap-2 md:min-w-[20dvw]">
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
                className="h-10 w-10 rounded-md bg-gradient-to-r from-[#24C6DCCC] to-[#514A9DCC] p-[1px]"
                alt={''}
                loading="lazy"
              />
              <p className="text-xl font-bold leading-none md:text-2xl">{nameRender}</p>
              <BadgeIcon width={20} height={20} />
            </div>
          </Link>
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
      accessorKey: 'users',
      header: ({ column }) => {
        return (
          <div className="flex items-center gap-1">
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
          <div>
            <p className="text-xl font-bold">{formatNumber(mauRender, true)}</p>
          </div>
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
      accessorKey: 'change',
      header: ({ column }) => {
        return (
          <div className="flex items-center gap-1">
            <p>24H Users Change</p>
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
            className={cn('text-xl font-bold text-[#1DC467]', changeRender < 0 && 'text-[#F84A4A]')}
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
      accessorKey: 'totalSub',
      header: 'Total Subscribers',
      cell: ({ row, renderValue }) => {
        const totalSubRender = isOfType<AppTrack>(row.original, ['users'])
          ? row.original.users
          : 'Channel' in row.original
            ? row.original?.Channel?.users
            : 0;
        return <p className="text-xl font-bold">{formatNumber(totalSubRender, true)}</p>;
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
      accessorKey: 'daySub',
      header: 'Today Subs Change',
      cell: ({ row, renderValue }) => {
        const changeRender = isOfType<AppTrack>(row.original, ['change'])
          ? row.original.change
          : 'Channel' in row.original
            ? row.original?.Channel?.change
            : 0;
        return (
          <p
            className={cn('text-xl font-bold text-[#1DC467]', changeRender < 0 && 'text-[#F84A4A]')}
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
      accessorKey: 'fdv',
      header: 'FDV',
      cell: ({ row, renderValue }) => {
        const fdvRender = isOfType<AppTrack>(row.original, ['rank'])
          ? 'N/A'
          : 'FDV' in row.original
            ? row.original?.FDV
            : 0;
        return <p className="text-xl font-bold">{fdvRender}</p>;
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
    const row = table.getRowModel().rows.find(({ original }) => original.id === activeId);
    return row;
  }, [activeId, table]);

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
        <div className="flex items-center justify-center gap-3 border-4 border-tableBorder bg-tableBg px-8 py-3 text-primary-foreground">
          <p className="text-xl font-bold">Get started with your Watchlist today!</p>
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
