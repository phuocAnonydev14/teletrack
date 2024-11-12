'use client';

import { AppDetail, AppTrack, Stats } from '@/types/app.type';
import {
  Column,
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table';
import { cn, formatNumber, isOfType } from '@/lib/utils/utils';
import { TableCell, TableRow } from '@/components/ui/table';
import { CSSProperties, useEffect, useState } from 'react';
import { useQueryState } from 'nuqs';
import { TableCategory } from '@/common/enums/tableCategory';
import Link from 'next/link';
import { BadgeIcon } from '@/components/icons';
import { CommonTable } from '@/components/table';
import { DataTablePagination } from '@/components/common/DataPagnation';
import { getLogoUrl } from '@/lib/utils/image.util';
import { AppTrackTableRank } from '@/app/components/AppTrackTable/AppTrackTableRank';
import { useMediaQuery } from 'usehooks-ts';
import { teleService } from '@/services/tele.service';
import { StatsOverall } from '@/app/components/AppTrackTable/StatsOverall';

const tagRanks = {
  users: TableCategory.USERS,
  subscribers: TableCategory.SUBSCRIBERS,
};

interface AppTrackTableProps {
  data: AppDetail[];
  total: number;
  stats: Stats;
}

export const getCommonPinningStyles = (column: Column<any>, status?: boolean): CSSProperties => {
  const isPinned = column.getIsPinned() || status;
  const isLastLeftPinnedColumn = status || (isPinned === 'left' && column.getIsLastColumn('left'));

  const res = {
    boxShadow: isLastLeftPinnedColumn ? '-3px 0 3px -3px gray inset' : undefined,
    // left: isPinned === 'left' ? `${column.id === 'username' ? '72' : '-2'}px` : undefined,
    left: isPinned === 'left' ? `-2px` : undefined,
    position: isPinned ? 'sticky' : 'relative',
    zIndex: isPinned ? 3 : 0,
  };

  if (status) {
    Object.assign(res, {
      backgroundColor: 'hsl(var(--table-header))',
    });
  }

  return res as CSSProperties;
};

export const AppTrackTable = (props: AppTrackTableProps) => {
  const { total, stats } = props;
  const [sorting, setSorting] = useState<SortingState>([]);
  const [selectedCate, setSelectedCate] = useQueryState('q');
  const [appTracks, setAppTracks] = useState<(AppTrack | AppDetail)[]>(
    props.data.map((item, index) => ({ ...item, Order: index + 1 })),
  );
  const [, setCurrentPage] = useQueryState('page');
  const [totalState, setTotalState] = useState(total);
  const matches = useMediaQuery(`(max-width: 1024px)`);

  const columns: ColumnDef<AppTrack | AppDetail>[] = [
    {
      id: 'rank',
      accessorKey: 'rank',
      header: () => <div className="w-full text-center">{matches ? '' : 'Rank'}</div>,
      cell: ({ row, renderValue }) => {
        const appTrack = row.original;
        return (
          <AppTrackTableRank
            username={
              isOfType<AppTrack>(appTrack, ['rank'])
                ? appTrack.username
                : appTrack.Bot?.username || ''
            }
            rank={isOfType<AppTrack>(appTrack, ['rank']) ? appTrack.rank : appTrack?.Order || 0}
            rankChange={
              isOfType<AppTrack>(appTrack, ['rankChange'])
                ? appTrack.rankChange
                : appTrack.Bot.rankChange || 0
            }
            isGlobalRank={true}
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
            {matches && (
              <div className="w-[17px]">
                {/*<BookmarkTooltip*/}
                {/*  username={*/}
                {/*    isOfType<AppTrack>(appTrack, ['rank'])*/}
                {/*      ? appTrack.username*/}
                {/*      : appTrack.Bot?.username || ''*/}
                {/*  }*/}
                {/*  isBookmarked={false}*/}
                {/*/>*/}
                <p className="w-[20px] text-base font-medium">{rankRender}</p>
              </div>
            )}
            <Link
              href={`/apps/${(isOfType<AppTrack>(row.original, ['username']) ? nameRender : row.original?.Bot?.username).replace('@', '')}`}
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
              <span className="inline max-w-[80px] overflow-hidden truncate overflow-ellipsis whitespace-nowrap text-base font-medium leading-none sm:min-w-[20px] sm:max-w-[150px] lg:max-w-[20dvw]">
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
    enableSortingRemoval: false,
    // getPaginationRowModel: getPaginationRowModel(),
  });

  const handleFetchPost = async (page: number) => {
    try {
      if (appTracks.length > 0) return;
      if (!selectedCate) {
        const res = await teleService.getTop50<AppDetail>({ page, limit: 100 }, 'fdv');
        setAppTracks(
          (res.data?.data.map((item, index) => ({ ...item, Order: index + 1 })) as AppDetail[]) ||
            [],
        );
        setTotalState(res.data?.total || 0);
        return;
      }
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
    (async () => {
      if (matches) {
        table.getColumn('rank')?.pin('left');
        table.getColumn('username')?.pin('left');
      } else {
        // table.getColumn('rank')?.pin('left');
        table.getColumn('username')?.pin(false);
      }
      setColumnFiltered(() => {
        if (matches) {
          return columns;
        }
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
      handleFetchPost(1).then(async () => {
        await setCurrentPage('1');
      });
    })();
  }, [selectedCate, matches]);

  return (
    <div>
      <StatsOverall stats={stats} />
      <CommonTable table={table}>
        {table.getRowModel().rows?.length ? (
          table.getRowModel().rows.map((row, index) => {
            return (
              <TableRow
                className={cn(
                  'max-w-[100px] border-tableBorder',
                  index % 2 === 0 ? 'bg-tableRowEven' : 'bg-tableRowOdd',
                )}
                key={row.id}
                data-state={row.getIsSelected() && 'selected'}
              >
                {row.getVisibleCells().map((cell) => {
                  return (
                    <TableCell
                      key={cell.id}
                      className={cn(
                        'relative w-max overflow-hidden border-2 border-tableBorder px-3 py-3',
                        index % 2 === 0 ? 'bg-tableRowEven' : 'bg-tableRowOdd',
                      )}
                      style={matches ? { ...getCommonPinningStyles(cell.column) } : {}}
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  );
                })}
              </TableRow>
            );
          })
        ) : (
          <TableRow>
            <TableCell colSpan={columns.length} className="h-24 text-center">
              No results.
            </TableCell>
          </TableRow>
        )}
      </CommonTable>
      {/*<DataTablePagination*/}
      {/*  total={totalState}*/}
      {/*  fetchAction={handleFetchPost}*/}
      {/*  table={table}*/}
      {/*  limit={10}*/}
      {/*/>*/}
    </div>
  );
};
