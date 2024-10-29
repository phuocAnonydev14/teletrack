'use client';

import React, { PropsWithChildren } from 'react';
import type { DraggableSyntheticListeners } from '@dnd-kit/core';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { TableCell, TableRow } from '@/components/ui/table';
import { flexRender, Row } from '@tanstack/react-table';
import { AppTrack } from '@/types/app.type';
import { cn } from '@/lib/utils';

interface Props {
  row: Row<AppTrack>;
  index: number;
}

interface Context {
  attributes: Record<string, any>;
  listeners: DraggableSyntheticListeners;
  ref(node: HTMLElement | null): void;
}

export function SortableItem({ row, index }: Props) {
  const { attributes, listeners, transform, transition, setNodeRef, isDragging } = useSortable({
    id: row.original.id,
  });

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
        <TableCell key={cell.id} className="min-w-[200px] border-4 border-tableBorder px-8 py-3">
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
