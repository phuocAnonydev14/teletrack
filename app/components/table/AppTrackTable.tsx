'use client';

import { AppTrack } from '@/types/app.type';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table';
import { cn, formatNumberWithSpacing } from '@/lib/utils';
import { TableCell, TableRow } from '@/components/ui/table';
import { useEffect, useMemo, useState } from 'react';
import { AppTrackTableRank } from '@/app/components/table/AppTrackTableRank';
import { useQueryState } from 'nuqs';
import { TableCategory } from '@/common/enums/tableCategory';
import Link from 'next/link';
import { BadgeIcon } from '@/components/icons';
import { CommonTable } from '@/components/table';
import { TagRank } from '@/app/components/table/TagRank';
import { RadioGroup } from '@/components/ui/radio-group';
import { DataTablePagination } from '@/components/common/DataPagnation';
import { teleService } from '@/services/tele.service';

const tagRanks = {
  users: TableCategory.USERS,
  subscribers: TableCategory.SUBSCRIBERS,
};

interface AppTrackTableProps {
  data: AppTrack[];
  total: number;
}

export const AppTrackTable = (props: AppTrackTableProps) => {
  const { total } = props;
  const [sorting, setSorting] = useState<SortingState>([]);
  const [selectedCate, setSelectedCate] = useQueryState('q', {
    defaultValue: '',
  });
  const [appTracks, setAppTracks] = useState(props.data);
  const [, setCurrentPage] = useQueryState('page');
  useEffect(() => {
    setAppTracks(props.data);
  }, [props]);

  const columns: ColumnDef<AppTrack>[] = [
    {
      accessorKey: 'rank',
      header: () => (
        <div className="w-full text-center">{selectedCate ? 'Global Rank' : 'No.'}</div>
      ),
      cell: ({ row, renderValue }) => {
        return <AppTrackTableRank isGlobalRank={!!selectedCate} appTrack={row.original} />;
      },
    },
    {
      accessorKey: 'username',
      header: 'Name',
      cell: ({ row, renderValue }) => {
        return (
          <Link href={`/apps/${row.original.username.replace('@', '')}`}>
            <div className="flex min-w-[50dvw] items-center gap-2 md:min-w-[20dvw]">
              <img
                src={''}
                className="h-10 w-10 rounded-md bg-gradient-to-r from-[#24C6DCCC] to-[#514A9DCC] p-[1px]"
                alt={''}
              />
              <p className="text-xl font-bold leading-none md:text-2xl">{row.original.username}</p>
              <BadgeIcon width={20} height={20} />
            </div>
          </Link>
        );
      },
    },
    {
      accessorKey: 'users',
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
            <p className="text-xl font-bold">{formatNumberWithSpacing(row.original.users)}</p>
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
      invertSorting: true,
      cell: ({ row, renderValue }) => {
        return (
          <p
            className={cn(
              'text-xl font-bold text-[#1DC467]',
              row.original.change < 0 && 'text-[#F84A4A]',
            )}
          >
            {row.original.change > 0 && '+'}
            {formatNumberWithSpacing(row.original.change)}
          </p>
        );
      },
    },
    {
      accessorKey: 'totalSub',
      header: 'Total Subscribers',
      cell: ({ row, renderValue }) => {
        return <p className="text-xl font-bold">{formatNumberWithSpacing(row.original.users)}</p>;
      },
    },
    {
      accessorKey: 'daySub',
      header: 'Today Subs Change',
      cell: ({ row, renderValue }) => {
        return (
          <p
            className={cn(
              'text-xl font-bold text-[#1DC467]',
              row.original.change < 0 && 'text-[#F84A4A]',
            )}
          >
            {formatNumberWithSpacing(row.original.change)}
          </p>
        );
      },
      invertSorting: true,
    },
    {
      accessorKey: 'fdv',
      header: 'FDV',
      cell: ({ row, renderValue }) => {
        return <p className="text-xl font-bold">N/A</p>;
      },
    },
  ];

  const columnFiltered = useMemo(() => {
    switch (selectedCate) {
      case 'users':
        return columns.filter((column: any) => {
          return !['totalSub', 'daySub'].includes(column.accessorKey);
        });
      case 'subscribers':
        return columns.filter((column: any) => {
          return ['rank', 'username', 'totalSub', 'daySub'].includes(column.accessorKey);
        });
      default:
        return columns.filter((column: any) => {
          return !['totalSub', 'daySub'].includes(column.accessorKey);
        });
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
    getPaginationRowModel: getPaginationRowModel(),
  });

  const handleFetchPost = async (page: number) => {
    try {
      const res = await teleService.getTop50(
        { page },
        selectedCate ? tagRanks[selectedCate as 'users' | 'subscribers'] : 'bot',
      );
      setAppTracks(res.data?.data || []);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    handleFetchPost(1).then(async () => {
      await setCurrentPage('1');
    });
  }, [selectedCate]);

  return (
    <div>
      <div className="flex items-center justify-center gap-3 border-4 border-tableBorder bg-tableBg px-8 py-3 text-primary-foreground">
        <p className="text-xl font-bold">Ranked By:</p>
        <RadioGroup>
          <div className="flex items-center gap-5 rounded-xl bg-rankTagBg px-5 py-2">
            {Object.keys(tagRanks).map((rank) => {
              return (
                <TagRank
                  selectedCate={selectedCate}
                  key={rank}
                  name={rank}
                  action={() => {
                    setSelectedCate((state) => (state === rank ? '' : rank));
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
      <DataTablePagination total={total} fetchAction={handleFetchPost} table={table} limit={10} />
    </div>
  );
};
