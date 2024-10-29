'use client';

import React from 'react';
import { TableCell, TableRow } from '@/components/ui/table';
import { flexRender } from '@tanstack/react-table';

export const StaticTableRow = ({ row }: any) => {
  return (
    <TableRow className="w-full border-[#0F0F0F] bg-[#3A485680]">
      {row.getVisibleCells().map((cell: any, i: any) => {
        return (
          <TableCell key={i}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
        );
      })}
    </TableRow>
  );
};
