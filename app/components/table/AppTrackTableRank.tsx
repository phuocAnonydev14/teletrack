'use client';

import { BookMarkIcon } from '@/components/icons';
import { AppDetail, AppTrack } from '@/types/app.type';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useState } from 'react';
import ArrowUp from '@/components/assets/table/arrow-up.png';
import ArrowDown from '@/components/assets/table/arrow-down.png';
import Image from 'next/image';
import { cn, isAppTrackType } from '@/lib/utils';

interface AppTrackTableRankProps {
  appTrack: AppTrack | AppDetail;
  isGlobalRank: boolean;
}

export const AppTrackTableRank = (props: AppTrackTableRankProps) => {
  const { appTrack, isGlobalRank } = props;
  const [isBookmarked, setIsBookmarked] = useState(false);
  const rankChange = isAppTrackType(appTrack) ? appTrack.rankChange : 0;
  const ArrowImage = rankChange > 0 ? ArrowUp : ArrowDown;

  return (
    <div className="relative flex items-center justify-center gap-2 overflow-visible">
      <div
        className="absolute -left-2 top-1/2 -translate-y-1/3 md:-left-4"
        onClick={() => setIsBookmarked(!isBookmarked)}
      >
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <BookMarkIcon isBookmarked={isBookmarked} />
            </TooltipTrigger>
            <TooltipContent className="bg-[#BEFCFF4D] font-medium text-[#BEFCFF] backdrop-blur-3xl">
              <p>Add to watchlist</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <div className="rounded-[5px] bg-secondary px-[10px] py-[5px] text-2xl font-bold text-secondary-foreground">
        # {isAppTrackType(appTrack) ? appTrack.rank : appTrack?.Order}
      </div>

      {isGlobalRank && rankChange !== 0 && (
        <div className="absolute -right-4 flex items-center gap-1">
          {/*<ArrowUpIconFixedColor />*/}
          <Image
            src={ArrowImage.src}
            alt="Arrow up"
            width={ArrowImage.width}
            height={ArrowImage.height}
          />
          {/*<Image*/}
          {/*  src={ArrowDown.src}*/}
          {/*  alt="Arrow down"*/}
          {/*  width={ArrowDown.width}*/}
          {/*  height={ArrowDown.height}*/}
          {/*/>*/}
          <p className={cn('text-xl font-bold text-[#1DC467]', rankChange < 0 && 'text-[#F73131]')}>
            {Math.abs(rankChange)}
          </p>
        </div>
      )}
    </div>
  );
};
