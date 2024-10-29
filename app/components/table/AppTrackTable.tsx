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
import { cn, formatNumberWithSpacing } from '@/lib/utils';
import { TableCell, TableRow } from '@/components/ui/table';
import { useMemo, useState } from 'react';
import { AppTrackTableRank } from '@/app/components/table/AppTrackTableRank';
import { useQueryState } from 'nuqs';
import { TableCategory } from '@/common/enums/tableCategory';
import Link from 'next/link';
import { BadgeIcon } from '@/components/icons';
import { CommonTable } from '@/components/table';
import { TagRank } from '@/app/components/table/TagRank';
import { RadioGroup } from '@/components/ui/radio-group';
import { useTheme } from 'next-themes';

const tagRanks = [
  {
    name: TableCategory.USERS,
  },
  {
    name: TableCategory.SUBSCRIBERS,
  },
];

export const AppTrackTable = () => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [selectedCate, setSelectedCate] = useQueryState('q', {
    defaultValue: '',
  });
  const [appTracks, setAppTracks] = useState(mockAppTracks);
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const columns: ColumnDef<AppTrack>[] = [
    {
      accessorKey: 'order',
      header: () => (
        <div className="w-full text-center">{selectedCate ? 'Global Rank' : 'No.'}</div>
      ),
      cell: ({ row, renderValue }) => {
        return <AppTrackTableRank isGlobalRank={!!selectedCate} appTrack={row.original} />;
      },
      invertSorting: true,
    },
    {
      accessorKey: 'name',
      header: 'Name',
      cell: ({ row, renderValue }) => {
        return (
          <Link href={'/apps/1'}>
            <div className="flex min-w-[50dvw] items-center gap-2 md:min-w-[20dvw]">
              <img
                src={row.original.image}
                className="h-10 w-10 rounded-md bg-gradient-to-r from-[#24C6DCCC] to-[#514A9DCC] p-[1px]"
                alt={row.original.name}
              />
              <p className="text-xl font-bold leading-none md:text-2xl">{row.original.name}</p>
              <BadgeIcon width={20} height={20} />
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

  const columnFiltered = useMemo(() => {
    switch (selectedCate) {
      case TableCategory.USERS:
        return columns.filter((column: any) => {
          console.log(column);
          return !['totalSub', 'daySub'].includes(column.accessorKey);
        });
      case TableCategory.SUBSCRIBERS:
        return columns.filter((column: any) => {
          return ['order', 'name', 'totalSub', 'daySub'].includes(column.accessorKey);
        });
      default:
        return columns;
    }
  }, [columns, selectedCate]);

  const table = useReactTable({
    data: appTracks,
    columns: columnFiltered,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
    },
  });

  return (
    <div>
      <div className="flex items-center justify-center gap-3 border-4 border-tableBorder bg-tableBg px-8 py-3 text-primary-foreground">
        <p className="text-xl font-bold">Ranked By:</p>
        <RadioGroup>
          <div className="flex items-center gap-5 rounded-xl bg-rankTagBg px-5 py-2">
            {tagRanks.map((rank) => {
              return (
                <TagRank
                  selectedCate={selectedCate}
                  key={rank.name}
                  name={rank.name}
                  action={() => {
                    setSelectedCate((state) => (state === rank.name ? '' : rank.name));
                  }}
                />
              );
            })}
          </div>
        </RadioGroup>
      </div>
      <CommonTable table={table}>
        {table.getRowModel().rows?.length ? (
          table.getRowModel().rows.map((row, index) => (
            <TableRow
              className={cn(
                'border-tableBorder',
                index % 2 === 0 ? 'bg-tableRowEven' : 'bg-tableRowOdd',
              )}
              key={row.id}
              data-state={row.getIsSelected() && 'selected'}
            >
              {row.getVisibleCells().map((cell) => (
                <TableCell
                  key={cell.id}
                  className="min-w-[200px] border-4 border-tableBorder px-8 py-3"
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={columns.length} className="h-24 text-center">
              No results.
            </TableCell>
          </TableRow>
        )}
      </CommonTable>
    </div>
  );
};
