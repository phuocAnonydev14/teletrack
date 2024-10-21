'use client';

import { ArrowDownIcon, ArrowUpIcon } from '@/components/icons';

export const SortBox = ({ column }: { column: any }) => {
  const isSorted = column.getIsSorted();
  const isASC = isSorted === 'asc';

  return (
    <div>
      <div className="absolute top-1/2 flex -translate-y-1/2 flex-col gap-1">
        <ArrowUpIcon color={!isASC ? 'gray' : ''} />
        <ArrowDownIcon color={isASC ? 'gray' : ''} />
      </div>
    </div>
  );
};
