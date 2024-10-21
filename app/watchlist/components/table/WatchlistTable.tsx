'use client';

import { AppTrack } from '@/types/app.type';
import { mockAppTracks } from '@/mocks/table';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table';
import { formatNumberWithSpacing } from '@/lib/utils';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import React, { useMemo, useState } from 'react';
import { SortBox } from '@/app/components/table/SortBox';
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
          <div className="flex items-center gap-2">
            <img
              src={row.original.image}
              className="h-10 w-10 rounded-md bg-gradient-to-r from-[#24C6DCCC] to-[#514A9DCC] p-[1px]"
              alt={row.original.name}
            />
            <p className="text-2xl font-bold leading-none">{row.original.name}</p>
          </div>
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
    useSensor(MouseSensor, {}),
    useSensor(TouchSensor, {}),
    useSensor(KeyboardSensor, {}),
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
  }, [activeId, table.getRowModel().rows]);

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
        {/**/}
        <Table className="border-collapse">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow className="border-[#0F0F0F] bg-[#3A485680]" key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      className="border-4 border-[#0F0F0F] px-8 py-3 text-xl font-bold text-primary-foreground"
                    >
                      <div
                        className="relative flex cursor-pointer select-none items-center gap-2"
                        onClick={header.column.getToggleSortingHandler()}
                        title={
                          header.column.getCanSort()
                            ? header.column.getNextSortingOrder() === 'asc'
                              ? 'Sort ascending'
                              : header.column.getNextSortingOrder() === 'desc'
                                ? 'Sort descending'
                                : 'Clear sort'
                            : undefined
                        }
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(header.column.columnDef.header, header.getContext())}
                        {{
                          asc: <SortBox column={header.column} />,
                          desc: <SortBox column={header.column} />,
                        }[header.column.getIsSorted() as string] ?? null}
                      </div>
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody className="border">
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
          </TableBody>
        </Table>
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
