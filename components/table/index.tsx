'use client';

import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { PropsWithChildren } from 'react';
import { flexRender } from '@tanstack/react-table';
import { SortBox } from '@/app/components/table/SortBox';
import { AppDetail, AppTrack } from '@/types/app.type';
import { Table as TableType } from '@tanstack/react-table';
import { useTheme } from 'next-themes';
import { cn } from '@/lib/utils';

interface CommonTableProps extends PropsWithChildren {
  table: TableType<AppTrack | AppDetail>;
}

export const CommonTable = (props: CommonTableProps) => {
  const { table, children } = props;
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <Table className="border-collapse">
      <TableHeader>
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow className="border-tableBorder bg-[#3A485680]" key={headerGroup.id}>
            {headerGroup.headers.map((header) => {
              return (
                <TableHead
                  key={header.id}
                  className={cn(
                    'border-4 border-tableBorder px-8 py-3 text-lg font-bold text-primary-foreground md:text-xl',
                    !isDark && 'bg-[#CCD8DA]',
                  )}
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
      <TableBody className="border">{children}</TableBody>
    </Table>
  );
};
