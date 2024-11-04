'use client';

import { AppDetail, AppTrack } from '@/types/app.type';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table';
import { cn, formatNumber, isOfType } from '@/lib/utils/utils';
import { TableCell, TableRow } from '@/components/ui/table';
import { useEffect, useState } from 'react';
import { useQueryState } from 'nuqs';
import { TableCategory } from '@/common/enums/tableCategory';
import Link from 'next/link';
import { BadgeIcon } from '@/components/icons';
import { CommonTable } from '@/components/table';
import { RadioGroup } from '@/components/ui/radio-group';
import { DataTablePagination } from '@/components/common/DataPagnation';
import { teleService } from '@/services/tele.service';
import { getLogoUrl } from '@/lib/utils/image.util';
import { AppTrackTableRank } from '@/app/components/AppTrackTable/AppTrackTableRank';
import { TagRank } from '@/app/components/AppTrackTable/TagRank';

const tagRanks = {
  users: TableCategory.USERS,
  subscribers: TableCategory.SUBSCRIBERS,
};

interface AppTrackTableProps {
  data: AppDetail[];
  total: number;
}

export const AppTrackTable = (props: AppTrackTableProps) => {
  const { total } = props;
  const [sorting, setSorting] = useState<SortingState>([]);
  const [selectedCate, setSelectedCate] = useQueryState('q');
  const [appTracks, setAppTracks] = useState<(AppTrack | AppDetail)[]>(props.data);
  const [, setCurrentPage] = useQueryState('page');
  const [totalState, setTotalState] = useState(total);

  const columns: ColumnDef<AppTrack | AppDetail>[] = [
    {
      accessorKey: 'rank',
      header: () => (
        <div className="w-full text-center">{selectedCate ? 'Global Rank' : 'No.'}</div>
      ),
      cell: ({ row, renderValue }) => {
        const appTrack = row.original;
        return (
          <AppTrackTableRank
            username={
              isOfType<AppTrack>(appTrack, ['rank'])
                ? appTrack.username
                : appTrack.Bot?.username || ''
            }
            rank={isOfType<AppTrack>(appTrack, ['rank']) ? appTrack.rank : 0}
            rankChange={
              isOfType<AppTrack>(appTrack, ['rankChange'])
                ? appTrack.rankChange
                : appTrack?.Order || 0
            }
            isGlobalRank={!!selectedCate}
          />
        );
      },
      sortingFn: (rowA, rowB, columnId) => {
        const appA = rowA.original;
        const appB = rowB.original;
        if (isOfType<AppTrack>(appA, ['rank']) && isOfType<AppTrack>(appB, ['rank'])) {
          return appA.rank > appB.rank ? 1 : -1;
        }
        return (('Order' in appA && appA?.Order) || 0) > (('Order' in appB && appB?.Order) || 0)
          ? 1
          : -1;
      },
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
            <div className="flex min-w-max items-center gap-2">
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
              <p className="text-xl font-bold leading-none lg:text-2xl">{nameRender}</p>
              <div className="min-w-[40px]">
                <BadgeIcon width={20} height={20} />
              </div>
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

  const [columnFiltered, setColumnFiltered] = useState<ColumnDef<AppTrack | AppDetail>[]>(columns);

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
      if (!selectedCate) {
        console.log('fetch cate');
        const res = await teleService.getTop50<AppDetail>({ page, limit: 50 }, 'fdv');
        setAppTracks(
          (res.data?.data.map((item, index) => ({ ...item, Order: index + 1 })) as AppDetail[]) ||
            [],
        );
        setTotalState(res.data?.total || 0);
        return;
      }
      console.log('fetch query');
      const res = await teleService.getTop50<AppTrack>(
        { page },
        tagRanks[selectedCate as 'users' | 'subscribers'],
      );
      setTotalState(res.data?.total || 0);
      setAppTracks(res.data?.data || []);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    setColumnFiltered(() => {
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
          return columns;
      }
    });
    console.log('start fetch post');
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
                  selectedCate={selectedCate || ''}
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
      <DataTablePagination
        total={totalState}
        fetchAction={handleFetchPost}
        table={table}
        limit={10}
      />
    </div>
  );
};
