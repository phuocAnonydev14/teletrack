'use client';

import { AppTrack } from '@/types/app.type';
import { getLogoUrl } from '@/lib/utils/image.util';
import { cn } from '@/lib/utils/utils';
import { useTheme } from 'next-themes';

interface TopBoxProps {
  title: string;
  list: AppTrack[];
}

export const TopBox = (props: TopBoxProps) => {
  const { title, list } = props;
  const { resolvedTheme } = useTheme();

  return (
    <div
      className={cn(
        'mb-[50px] w-full max-w-[95%] flex-1 rounded-[8px] bg-analysisBg p-5 shadow-[100px_96px_39px_0px_rgba(160,213,232,0.00),64px_62px_36px_0px_rgba(160,213,232,0.01),36px_35px_30px_0px_rgba(160,213,232,0.05),16px_15px_22px_0px_rgba(160,213,232,0.09),4px_4px_12px_0px_rgba(160,213,232,0.10)] lg:mb-0 lg:max-w-[50dvw]',
        resolvedTheme == 'light' &&
          'shadow-[34px_97px_29px_0px_rgba(0,0,0,0.00),22px_62px_26px_0px_rgba(0,0,0,0.01),12px_35px_22px_0px_rgba(0,0,0,0.05),5px_15px_16px_0px_rgba(0,0,0,0.09),1px_4px_9px_0px_rgba(0,0,0,0.10)]',
      )}
    >
      <p className="pb-4 text-xl font-bold leading-6">{title}</p>
      <div className="flex flex-col gap-3">
        {list.map((appTrack) => (
          <div className="flex items-center justify-between gap-2" key={appTrack.username}>
            <div className="flex items-center gap-2">
              <div className="rounded-[5px] pr-1 text-lg font-bold text-analysisForeground lg:text-xl">
                #{appTrack.rank}
              </div>
              <img
                src={getLogoUrl(appTrack.username.replace('@', ''))}
                className="h-10 w-10 rounded-md bg-gradient-to-r from-[#24C6DCCC] to-[#514A9DCC] p-[1px]"
                alt={''}
                loading="lazy"
              />
              <p className="overflow-ellipsis text-lg font-bold">
                {appTrack.username.replace('@', '')}
              </p>
            </div>
            <p className="hidden text-lg font-bold sm:block">{appTrack.users}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
