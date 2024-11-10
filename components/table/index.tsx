'use client';

import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { PropsWithChildren } from 'react';
import { flexRender } from '@tanstack/react-table';
import { Table as TableType } from '@tanstack/react-table';
import { useTheme } from 'next-themes';
import { cn } from '@/lib/utils/utils';
import { SortBox } from '@/app/components/AppTrackTable/SortBox';
import { getCommonPinningStyles } from '@/app/components/AppTrackTable';
import { useMediaQuery } from 'usehooks-ts';

interface CommonTableProps extends PropsWithChildren {
  table: TableType<any>;
}

export const CommonTable = (props: CommonTableProps) => {
  const { table, children } = props;
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';
  const matches = useMediaQuery(`(max-width: 1024px)`);

  return (
    <Table className="border-collapse bg-[#3A485680]">
      <TableHeader>
        {table.getHeaderGroups().map((headerGroup, index) => (
          <TableRow
            style={{ backgroundColor: '#3A485680' }}
            className="border-tableBorder"
            key={headerGroup.id}
          >
            {headerGroup.headers.map((header) => {
              return (
                <TableHead
                  key={header.id}
                  className={cn(
                    'min-w-[120px] border-2 border-tableBorder bg-[#3A485680] px-3 py-3 text-base font-semibold text-primary-foreground',
                    !isDark && 'bg-[#CCD8DA]',
                    header.column.getIsSorted() && 'min-w-[130px]',
                    header.column.id === 'rank' && matches && 'min-w-[50px]',
                  )}
                  style={
                    matches
                      ? {
                          ...getCommonPinningStyles(
                            table.getColumn(header.column.id) as any,
                            header.column.id === 'username',
                          ),
                        }
                      : {}
                  }
                >
                  <div
                    className="relative flex cursor-pointer select-none items-center gap-2"
                    onClick={() => header.column.toggleSorting()}
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
      <TableBody className="border">{children}</TableBody>
    </Table>
  );
};
