'use client';

import { AppTrack } from '@/types/app.type';
import { mockAppTracks } from '@/mocks/table';
import {
  ColumnDef,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table';
import { formatNumberWithSpacing } from '@/lib/utils';
import { TableCell, TableRow } from '@/components/ui/table';
import React, { useMemo, useState } from 'react';
import { AppTrackTableRank } from '@/app/components/table/AppTrackTableRank';
import {
  closestCenter,
  DndContext,
  DragOverlay,
  KeyboardSensor,
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

export const WatchlistTable = () => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [appTracks, setAppTracks] = useState(mockAppTracks);

  const columns: ColumnDef<AppTrack>[] = [
    {
      accessorKey: 'order',
      header: () => <div className="w-full text-center">{'No.'}</div>,
      cell: ({ row, renderValue }) => {
        return <AppTrackTableRank isGlobalRank={false} appTrack={row.original} />;
      },
      invertSorting: true,
    },
    {
      accessorKey: 'name',
      header: 'Name',
      cell: ({ row, renderValue }) => {
        return (
          <Link
            href={'/apps/1'}
            onClick={() => {
              console.log('clicking');
            }}
          >
            <div className="flex min-w-[50dvw] items-center gap-2 md:min-w-[20dvw]">
              <img
                src={row.original.image}
                className="h-10 w-10 rounded-md bg-gradient-to-r from-[#24C6DCCC] to-[#514A9DCC] p-[1px]"
                alt={row.original.name}
              />
              <p className="text-2xl font-bold leading-none">{row.original.name}</p>
            </div>
          </Link>
        );
      },
    },
    {
      accessorKey: 'mau',
      header: ({ column }) => {
        const isASC = column.getIsSorted() === 'asc';
        return (
          <div className="flex items-center gap-1">
            <p>MAU</p>
          </div>
        );
      },
      cell: ({ row, renderValue }) => {
        return (
          <div>
            <p className="text-xl font-bold">{formatNumberWithSpacing(row.original.mau)}</p>
          </div>
        );
      },
      invertSorting: true,
    },
    {
      accessorKey: 'dayUpdate',
      header: ({ column }) => {
        return (
          <div className="flex items-center gap-1">
            <p>24H Users Change</p>
          </div>
        );
      },
      invertSorting: true,
      cell: ({ row, renderValue }) => {
        return (
          <p className="text-xl font-bold text-[#1DC467]">
            +1 {formatNumberWithSpacing(row.original.dayUpdate)}
          </p>
        );
      },
    },
    {
      accessorKey: 'totalSub',
      header: 'Total Subscribers',
      cell: ({ row, renderValue }) => {
        return (
          <p className="text-xl font-bold">{formatNumberWithSpacing(row.original.totalSub)}</p>
        );
      },
      invertSorting: true,
    },
    {
      accessorKey: 'daySub',
      header: 'Today Subs Change',
      cell: ({ row, renderValue }) => {
        return (
          <p className="text-xl font-bold text-[#1DC467]">
            {formatNumberWithSpacing(row.original.daySub)}
          </p>
        );
      },
      invertSorting: true,
    },
    {
      accessorKey: 'fdv',
      header: 'FDV',
      cell: ({ row, renderValue }) => {
        return (
          <p className="text-xl font-bold">$ {formatNumberWithSpacing(row.original.daySub)}</p>
        );
      },
      invertSorting: true,
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
        <div className="flex items-center justify-center gap-3 border-4 border-[#0F0F0F] bg-[#3A485680] px-8 py-3 text-xl font-bold text-primary-foreground">
          <p>Get started with your Watchlist today!</p>
        </div>
        <CommonTable table={table}>
          <SortableContext items={appTracks}>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => {
                return <SortableItem key={row.id} row={row} />;
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
            <table style={{ width: '100%' }}>
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
