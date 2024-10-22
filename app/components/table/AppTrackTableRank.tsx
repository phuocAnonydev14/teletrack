'use client';

import { BookMarkIcon } from '@/components/icons';
import { AppTrack } from '@/types/app.type';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useState } from 'react';
import ArrowUp from '@/components/assets/table/arrow-up.png';
import Image from 'next/image';

interface AppTrackTableRankProps {
  appTrack: AppTrack;
  isGlobalRank: boolean;
}

export const AppTrackTableRank = (props: AppTrackTableRankProps) => {
  const { appTrack, isGlobalRank } = props;
  const [isBookmarked, setIsBookmarked] = useState(false);

  return (
    <div className="relative flex items-center justify-center gap-2">
      <div
        className="absolute -left-2 top-1/2 z-40 -translate-y-1/3 md:-left-4"
        onClick={() => setIsBookmarked(!isBookmarked)}
      >
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <BookMarkIcon isBookmarked={isBookmarked} />
            </TooltipTrigger>
            <TooltipContent className="bg-[#befcff4d] font-medium text-[#BEFCFF]">
              <p>Add to watchlist</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <div className="rounded-[5px] bg-secondary px-[10px] py-[5px] text-2xl font-bold text-secondary-foreground">
        # {appTrack.order}
      </div>

      {isGlobalRank && (
        <div className="absolute -right-4 flex items-center gap-1">
          {/*<ArrowUpIconFixedColor />*/}
          <Image src={ArrowUp.src} alt="Arrow up" width={ArrowUp.width} height={ArrowUp.height} />
          {/*<Image*/}
          {/*  src={ArrowDown.src}*/}
          {/*  alt="Arrow down"*/}
          {/*  width={ArrowDown.width}*/}
          {/*  height={ArrowDown.height}*/}
          {/*/>*/}
          <p className="text-xl font-bold text-[#1DC467]">10</p>
        </div>
      )}
    </div>
  );
};
