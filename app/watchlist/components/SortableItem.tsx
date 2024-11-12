'use client';

import React, { PropsWithChildren } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { TableCell, TableRow } from '@/components/ui/table';
import { flexRender, Row } from '@tanstack/react-table';
import { AppDetail, AppTrack } from '@/types/app.type';
import { cn } from '@/lib/utils/utils';
import { getCommonPinningStyles } from '@/app/components/AppTrackTable';
import { useMediaQuery } from 'usehooks-ts';

interface Props {
  row: Row<AppTrack | AppDetail | any>;
  index: number;
}

export function SortableItem({ row, index }: Props) {
  const { attributes, listeners, transform, transition, setNodeRef } = useSortable({
    id: row.original.id || '',
  } as any);
  const matches = useMediaQuery(`(max-width: 1024px)`);

  const style = {
    transform: CSS.Transform.toString(transform),
    transition: transition,
  };

  return (
    <TableRow
      className={cn('border-tableBorder', index % 2 === 0 ? 'bg-tableRowEven' : 'bg-tableRowOdd')}
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    >
      {row.getVisibleCells().map((cell) => (
        <TableCell
          key={cell.id}
          className={cn(
            'relative overflow-hidden border-2 border-tableBorder px-3 py-3',
            index % 2 === 0 ? 'bg-tableRowEven' : 'bg-tableRowOdd',
          )}
          style={matches ? { ...getCommonPinningStyles(cell.column) } : {}}
        >
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </TableCell>
      ))}
    </TableRow>
  );
}

export function DragHandle({
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & PropsWithChildren) {
  return <div {...props}>{children}</div>;
}
