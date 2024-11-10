'use client';

import { ArrowDownIcon, ArrowUpIcon } from '@/components/icons';

export const SortBox = ({ column }: { column: any }) => {
  const isSorted = column.getIsSorted();
  const isASC = isSorted === 'asc';

  return (
    <div>
      <div className="absolute -right-[2px] top-[40%] flex -translate-y-1/2 flex-col items-center justify-center">
        <ArrowUpIcon
          key={'arrow-up'}
          id="arrow-up"
          color={!isASC ? 'gray' : ''}
          width={15}
          height={15}
          className="translate-y-1"
        />
        <ArrowDownIcon
          color={isASC ? 'gray' : ''}
          key={'arrow-down'}
          id="arrow-down"
          width={15}
          height={15}
        />
      </div>
    </div>
  );
};
