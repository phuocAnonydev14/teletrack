'use client';

import React from 'react';
import { DragHandle } from '@/app/watchlist/components/SortableItem';
import { TableCell, TableRow } from '@/components/ui/table';
import { flexRender } from '@tanstack/react-table';

export const StaticTableRow = ({ row }: any) => {
  return (
    <TableRow className="border-[#0F0F0F] bg-[#3A485680]">
      {row.getVisibleCells().map((cell: any, i: any) => {
        if (i === 0) {
          return (
            <TableCell key={i} className="min-w-[200px] border-4 border-[#0F0F0F] px-8 py-3">
              <DragHandle />
              {flexRender(cell.column.columnDef.cell, cell.getContext())}
            </TableCell>
          );
        }
        return (
          <TableCell key={i}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
        );
      })}
    </TableRow>
  );
};
