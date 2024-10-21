'use client';

import React, { createContext, PropsWithChildren } from 'react';
import type { DraggableSyntheticListeners } from '@dnd-kit/core';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { TableCell, TableRow } from '@/components/ui/table';
import { flexRender, Row } from '@tanstack/react-table';

interface Props {
  row: Row<any>; // Dùng Row<any> để đảm bảo row là một hàng từ react-table
}

interface Context {
  attributes: Record<string, any>;
  listeners: DraggableSyntheticListeners;
  ref(node: HTMLElement | null): void;
}

const SortableItemContext = createContext<Context>({
  attributes: {},
  listeners: undefined,
  ref() {},
});

export function SortableItem({ row }: Props) {
  const { attributes, listeners, transform, transition, setNodeRef, isDragging } = useSortable({
    id: row.original.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition: transition,
  };

  return (
    <TableRow className="border-[#0F0F0F] bg-[#3A485680]" ref={setNodeRef} style={style}>
      {isDragging ? (
        <TableCell colSpan={row.getAllCells().length}>&nbsp;</TableCell>
      ) : (
        row.getVisibleCells().map((cell) => (
          <TableCell key={cell.id} className="min-w-[200px] border-4 border-[#0F0F0F] px-8 py-3">
            <DragHandle {...attributes} {...listeners}>
              {flexRender(cell.column.columnDef.cell, cell.getContext())}
            </DragHandle>
          </TableCell>
        ))
      )}
    </TableRow>
  );
}

export function DragHandle({
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & PropsWithChildren) {
  return <div {...props}>{children}</div>;
}
