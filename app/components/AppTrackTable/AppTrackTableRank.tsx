'use client';

import { BookMarkIcon } from '@/components/icons';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useState } from 'react';
import ArrowUp from '@/components/assets/table/arrow-up.png';
import ArrowDown from '@/components/assets/table/arrow-down.png';
import Image from 'next/image';
import { cn } from '@/lib/utils/utils';
import { teleService } from '@/services/tele.service';
import { useTheme } from 'next-themes';
import { useAuthContext } from '@/components/providers/AuthProvider';

interface AppTrackTableRankProps {
  isGlobalRank: boolean;
  rankChange: number;
  rank: number;
  username: string;
}

export const AppTrackTableRank = (props: AppTrackTableRankProps) => {
  const { isGlobalRank, username, rank, rankChange } = props;
  const [isBookmarked, setIsBookmarked] = useState(false);
  const ArrowImage = rankChange > 0 ? ArrowUp : ArrowDown;

  const handleToggleWatchList = async () => {
    await teleService.addWatchList(username);
    setIsBookmarked(!isBookmarked);
  };

  return (
    <div className="relative flex min-w-[100px] items-center justify-center gap-2 overflow-visible">
      <div
        className="absolute left-1 top-1/2 -translate-y-1/3 md:left-1"
        onClick={handleToggleWatchList}
      >
        <BookmarkTooltip username={username} isBookmarked={isBookmarked} />
      </div>
      <div className="px-[5px] py-[5px] text-base font-bold">{rank}</div>

      {isGlobalRank && rankChange !== 0 && (
        <div className="absolute -right-3 flex items-center gap-1">
          {/*<ArrowUpIconFixedColor />*/}
          <Image
            src={ArrowImage.src}
            alt="Arrow up"
            width={ArrowImage.width}
            height={ArrowImage.height}
          />
          <p
            className={cn('text-base font-bold text-[#1DC467]', rankChange < 0 && 'text-[#F73131]')}
          >
            {Math.abs(rankChange)}
          </p>
        </div>
      )}
    </div>
  );
};

export const BookmarkTooltip = ({
  isBookmarked,
  username,
}: {
  isBookmarked: boolean;
  username: string;
}) => {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';
  const { withAuth } = useAuthContext();
  const handleToggleWatchList = async () => {
    await teleService.addWatchList(username.replace('@', ''));
  };
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <BookMarkIcon
            isBookmarked={isBookmarked}
            onClick={() => withAuth(handleToggleWatchList)}
          />
        </TooltipTrigger>
        <TooltipContent
          className={cn(
            'bg-[#BEFCFF4D] font-medium text-[#BEFCFF] backdrop-blur-3xl',
            !isDark && 'bg-[#befcffb3] text-[#27ACD2]',
          )}
        >
          <p>Add to watchlist</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
