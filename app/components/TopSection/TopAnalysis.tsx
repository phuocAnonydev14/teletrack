'use client';

import { cn } from '@/lib/utils/utils';
import { useTheme } from 'next-themes';

export const TopAnalysis = () => {
  const { resolvedTheme } = useTheme();

  return (
    <div
      className={cn(
        'flex h-full w-full flex-col items-center justify-center gap-x-1 gap-y-4 rounded-[8px] bg-analysisBg p-5 shadow-[100px_96px_39px_0px_rgba(160,213,232,0.00),64px_62px_36px_0px_rgba(160,213,232,0.01),36px_35px_30px_0px_rgba(160,213,232,0.05),16px_15px_22px_0px_rgba(160,213,232,0.09),4px_4px_12px_0px_rgba(160,213,232,0.10)] md:flex-row md:gap-4 lg:gap-9',
        resolvedTheme == 'light' &&
          'shadow-[34px_97px_29px_0px_rgba(0,0,0,0.00),22px_62px_26px_0px_rgba(0,0,0,0.01),12px_35px_22px_0px_rgba(0,0,0,0.05),5px_15px_16px_0px_rgba(0,0,0,0.09),1px_4px_9px_0px_rgba(0,0,0,0.10)]',
      )}
    >
      <div className="flex flex-col items-center gap-y-2 px-2 text-center md:gap-y-3 md:px-5">
        <p className="text-xl font-extrabold">Total Apps Tracked</p>
        <p className="font-bold">200 mini-apps</p>
      </div>
      <div className="hidden h-[80%] min-h-20 w-[2px] bg-foreground md:block" />
      <div className="flex flex-col items-center gap-y-2 px-2 text-center md:gap-y-3 md:px-5">
        <p className="text-xl font-extrabold">Apps Growth</p>
        <p className="font-bold">200 mini-apps</p>
      </div>
      <div className="hidden h-[80%] min-h-20 w-[2px] bg-foreground md:block" />
      <div className="flex flex-col items-center gap-y-2 px-2 text-center md:gap-y-3 md:px-5">
        <p className="text-xl font-extrabold"> Overall User Growth</p>
        <p className="font-bold">200 mini-apps</p>
      </div>
    </div>
  );
};
