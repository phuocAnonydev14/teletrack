'use client';

import { ArrowDownIcon, ArrowUpIcon } from '@/components/icons';

export const SortBox = ({ column }: { column: any }) => {
  const isSorted = column.getIsSorted();
  const isASC = isSorted === 'asc';

  return (
    <div>
      <div className="flex flex-col gap-1">
        <ArrowUpIcon key={'arrow-up'} id="arrow-up" color={!isASC ? 'gray' : ''} />
        <ArrowDownIcon color={isASC ? 'gray' : ''} key={'arrow-down'} id="arrow-down" />
      </div>
    </div>
  );
};
