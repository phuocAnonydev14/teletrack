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
        'bg-analysisBg w-full flex-1 rounded-[8px] p-5 shadow-[100px_96px_39px_0px_rgba(160,213,232,0.00),64px_62px_36px_0px_rgba(160,213,232,0.01),36px_35px_30px_0px_rgba(160,213,232,0.05),16px_15px_22px_0px_rgba(160,213,232,0.09),4px_4px_12px_0px_rgba(160,213,232,0.10)] lg:max-w-[50dvw]',
        resolvedTheme == 'light' &&
          'shadow-[34px_97px_29px_0px_rgba(0,0,0,0.00),22px_62px_26px_0px_rgba(0,0,0,0.01),12px_35px_22px_0px_rgba(0,0,0,0.05),5px_15px_16px_0px_rgba(0,0,0,0.09),1px_4px_9px_0px_rgba(0,0,0,0.10)]',
      )}
    >
      <p className="pb-4 text-xl font-extrabold leading-6">{title}</p>
      <div className="flex flex-col gap-3">
        {list.map((appTrack) => (
          <div className="flex items-center justify-between gap-2" key={appTrack.username}>
            <div className="flex items-center gap-2">
              <div className="text-analysisForeground rounded-[5px] pr-1 text-2xl font-bold">
                #{appTrack.rank}
              </div>
              <img
                src={getLogoUrl(appTrack.username.replace('@', ''))}
                className="h-10 w-10 rounded-md bg-gradient-to-r from-[#24C6DCCC] to-[#514A9DCC] p-[1px]"
                alt={''}
                loading="lazy"
              />
              <p className="text-lg font-bold">{appTrack.username.replace('@', '')}</p>
            </div>
            <p className="text-lg font-extrabold">{appTrack.users}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
