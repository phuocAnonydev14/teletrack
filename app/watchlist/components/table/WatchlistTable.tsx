'use client';

import { AppTrack, AppWatch } from '@/types/app.type';
import {
  ColumnDef,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table';
import { cn, formatNumber } from '@/lib/utils/utils';
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
  data: AppWatch[];
  total: number;
}
export const WatchlistTable = (props: AppTrackTableProps) => {
  const { total, data } = props;
  const [sorting, setSorting] = useState<SortingState>([]);
  const [appTracks, setAppTracks] = useState<AppWatch[]>(
    data.map((item) => ({ ...item, id: item.product_id })),
  );

  const columns: ColumnDef<AppWatch>[] = [
    {
      accessorKey: 'rank',
      header: () => <div className="w-full text-center">{'No.'}</div>,
      cell: ({ row, renderValue }) => {
        return (
          <AppTrackTableRank
            username={row.original.username}
            rankChange={row.original.rank_change}
            rank={row.original.rank}
            isGlobalRank={false}
          />
        );
      },
      invertSorting: true,
    },
    {
      accessorKey: 'name',
      header: 'Name',
      cell: ({ row, renderValue }) => {
        const nameRender = row.original.name.replace('@', '');
        return (
          <Link href={`/apps/${row.original.username.replace('@', '')}`}>
            <div className="flex min-w-[50dvw] items-center gap-2 md:min-w-[20dvw]">
              <img
                src={getLogoUrl(row.original.username.replace('@', ''))}
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
        const mauRender = row.original.users;
        return (
          <div>
            <p className="text-xl font-bold">{formatNumber(mauRender, true)}</p>
          </div>
        );
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
        const changeRender = row.original.change;
        return (
          <p
            className={cn('text-xl font-bold text-[#1DC467]', changeRender < 0 && 'text-[#F84A4A]')}
          >
            {changeRender >= 0 ? '+' : '-'}
            {formatNumber(changeRender, true)}
          </p>
        );
      },
    },
    {
      accessorKey: 'totalSub',
      header: 'Total Subscribers',
      cell: ({ row, renderValue }) => {
        const totalSubRender = row.original.users;
        return <p className="text-xl font-bold">{formatNumber(totalSubRender, true)}</p>;
      },
    },
    {
      accessorKey: 'daySub',
      header: 'Today Subs Change',
      cell: ({ row, renderValue }) => {
        const changeRender = row.original.change;
        return (
          <p
            className={cn('text-xl font-bold text-[#1DC467]', changeRender < 0 && 'text-[#F84A4A]')}
          >
            {changeRender >= 0 ? '+' : '-'}
            {formatNumber(changeRender, true)}
          </p>
        );
      },
    },
    {
      accessorKey: 'fdv',
      header: 'FDV',
      cell: ({ row, renderValue }) => {
        const fdvRender = '';
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
