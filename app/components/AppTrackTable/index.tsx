'use client';

import { AppDetail, AppTrack } from '@/types/app.type';
import {
  Column,
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
import { CSSProperties, useEffect, useState } from 'react';
import { useQueryState } from 'nuqs';
import { TableCategory } from '@/common/enums/tableCategory';
import Link from 'next/link';
import { BadgeIcon } from '@/components/icons';
import { CommonTable } from '@/components/table';
import { DataTablePagination } from '@/components/common/DataPagnation';
import { teleService } from '@/services/tele.service';
import { getLogoUrl } from '@/lib/utils/image.util';
import {
  AppTrackTableRank,
  BookmarkTooltip,
} from '@/app/components/AppTrackTable/AppTrackTableRank';
import { useMediaQuery } from 'usehooks-ts';

const tagRanks = {
  users: TableCategory.USERS,
  subscribers: TableCategory.SUBSCRIBERS,
};

interface AppTrackTableProps {
  data: AppDetail[];
  total: number;
}

export const getCommonPinningStyles = (column: Column<any>, status?: boolean): CSSProperties => {
  const isPinned = column.getIsPinned() || status;
  const isLastLeftPinnedColumn = status || (isPinned === 'left' && column.getIsLastColumn('left'));
  const isFirstRightPinnedColumn = isPinned === 'right' && column.getIsFirstColumn('right');

  const res = {
    boxShadow: isLastLeftPinnedColumn
      ? '-4px 0 4px -4px gray inset'
      : isFirstRightPinnedColumn
        ? '4px 0 4px -4px gray inset'
        : undefined,
    left: isPinned === 'left' ? `-2px` : undefined,
    position: isPinned ? 'sticky' : 'relative',
    width: column.getSize(),
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
  const { total } = props;
  const [sorting, setSorting] = useState<SortingState>([]);
  const [selectedCate, setSelectedCate] = useQueryState('q');
  const [appTracks, setAppTracks] = useState<(AppTrack | AppDetail)[]>(props.data);
  const [, setCurrentPage] = useQueryState('page');
  const [totalState, setTotalState] = useState(total);
  const matches = useMediaQuery(`(max-width: 1024px)`);

  const columns: ColumnDef<AppTrack | AppDetail>[] = [
    {
      id: 'rank',
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
            rank={isOfType<AppTrack>(appTrack, ['rank']) ? appTrack.rank : appTrack?.Order || 0}
            rankChange={isOfType<AppTrack>(appTrack, ['rankChange']) ? appTrack.rankChange : 0}
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
      id: 'username',
      accessorKey: 'username',
      header: 'Name',
      cell: ({ row, renderValue }) => {
        const nameRender = (
          isOfType<AppTrack>(row.original, ['username']) ? row.original.username : row.original.Name
        ).replace('@', '');
        return (
          <div className="flex min-w-max items-center gap-2">
            {matches && <BookmarkTooltip isBookmarked={false} />}
            <Link
              href={`/apps/${(isOfType<AppTrack>(row.original, ['username']) ? nameRender : row.original?.Bot?.username).replace('@', '')}`}
              className="flex min-w-max items-center gap-2"
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
              <p className="min-w-[100px] max-w-[100px] overflow-hidden overflow-ellipsis text-base font-semibold leading-none sm:min-w-fit sm:max-w-full">
                {nameRender}
              </p>
              <div className="hidden min-w-[40px] md:block">
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
          <div className="w-full text-end">
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
          <p className="w-full text-end text-base font-medium">{formatNumber(mauRender, true)}</p>
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
          <div className="flex w-full items-center justify-end gap-1">
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
              'w-full text-end text-base font-medium text-[#1DC467]',
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
      header: () => <p className="w-full text-end">Channel Subscribers</p>,
      cell: ({ row, renderValue }) => {
        const totalSubRender = isOfType<AppTrack>(row.original, ['users'])
          ? row.original.users
          : 'Channel' in row.original
            ? row.original?.Channel?.users
            : 0;
        return (
          <p className="text-end text-base font-medium">{formatNumber(totalSubRender, true)}</p>
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
      header: () => <p className="w-full text-end">Channel Today</p>,
      cell: ({ row, renderValue }) => {
        const changeRender = isOfType<AppTrack>(row.original, ['change'])
          ? row.original.change
          : 'Channel' in row.original
            ? row.original?.Channel?.change
            : 0;
        return (
          <p
            className={cn(
              'w-full text-end text-base font-medium text-[#1DC467]',
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
      header: () => <p className="w-full text-end">FDV</p>,
      cell: ({ row, renderValue }) => {
        const fdvRender = isOfType<AppTrack>(row.original, ['rank'])
          ? 'N/A'
          : 'FDV' in row.original
            ? formatNumber(row.original?.FDV, true)
            : 0;
        return <p className="w-full text-end text-base font-medium">${fdvRender}</p>;
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
        const res = await teleService.getTop50<AppDetail>({ page, limit: 50 }, 'fdv');
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
        table.getColumn('username')?.pin('left');
      } else {
        table.getColumn('username')?.pin(false);
      }
      setColumnFiltered(() => {
        if (matches) {
          return columns.filter((column: any) => {
            return !['rank'].includes(column.accessorKey);
          });
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
      {/*<div className="flex items-center justify-center gap-3 border-4 border-tableBorder bg-tableBg px-8 py-3 text-primary-foreground">*/}
      {/*  <p className="text-xl font-bold">Ranked By:</p>*/}
      {/*  <RadioGroup>*/}
      {/*    <div className="flex items-center gap-5 rounded-xl bg-rankTagBg px-5 py-2">*/}
      {/*      {Object.keys(tagRanks).map((rank) => {*/}
      {/*        return (*/}
      {/*          <TagRank*/}
      {/*            selectedCate={selectedCate || ''}*/}
      {/*            key={rank}*/}
      {/*            name={rank}*/}
      {/*            action={() => {*/}
      {/*              setSelectedCate((state) => (state === rank ? '' : rank));*/}
      {/*            }}*/}
      {/*          />*/}
      {/*        );*/}
      {/*      })}*/}
      {/*    </div>*/}
      {/*  </RadioGroup>*/}
      {/*</div>*/}
      <CommonTable table={table}>
        {table.getRowModel().rows?.length ? (
          table.getRowModel().rows.map((row, index) => (
            <TableRow
              className={cn(
                'max-w-[100px] border-tableBorder',
                index % 2 === 0 ? 'bg-tableRowEven' : 'bg-tableRowOdd',
              )}
              key={row.id}
              data-state={row.getIsSelected() && 'selected'}
            >
              {row.getVisibleCells().map((cell) => (
                <TableCell
                  key={cell.id}
                  className={cn(
                    'border-2 border-tableBorder px-3 py-3',
                    index % 2 === 0 ? 'bg-tableRowEven' : 'bg-tableRowOdd',
                  )}
                  style={matches ? { ...getCommonPinningStyles(cell.column) } : {}}
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
