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
import { useMediaQuery } from 'usehooks-ts';
import { toast } from 'sonner';

interface AppTrackTableRankProps {
  isGlobalRank: boolean;
  rankChange: number;
  rank: number;
  username: string;
  isBookmarked?: boolean;
  bookMarkAction?: () => void;
}

export const AppTrackTableRank = (props: AppTrackTableRankProps) => {
  const {
    isGlobalRank,
    username,
    rank,
    rankChange,
    isBookmarked: initBookmarked,
    bookMarkAction,
  } = props;
  const [isBookmarked, setIsBookmarked] = useState(initBookmarked);
  const ArrowImage = rankChange > 0 ? ArrowUp : ArrowDown;
  const matches = useMediaQuery(`(max-width: 1024px)`);

  const handleToggleWatchList = async () => {
    try {
      if (isBookmarked) await teleService.unWatchList(username);
      else await teleService.addWatchList(username);
      if (bookMarkAction) bookMarkAction();
      toast.success(isBookmarked ? 'Removed from watchlist' : 'Added to watchlist');
      setIsBookmarked(!isBookmarked);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div
      className={cn(
        'relative flex min-w-[100px] items-center justify-center gap-2 overflow-visible',
        matches && 'min-w-[5px] max-w-[50px] justify-start',
      )}
    >
      <div
        className={cn(
          'absolute left-1 top-1/2 -translate-y-1/3 md:left-1',
          matches && 'relative left-0 translate-y-1',
        )}
        onClick={handleToggleWatchList}
      >
        <BookmarkTooltip username={username} isBookmarked={!!isBookmarked} />
      </div>

      {!matches && (
        <div className="text-base font-bold">
          <span>{rank}</span>
        </div>
      )}
      {rankChange !== 0 && (
        <div className={cn('absolute right-0 flex items-center gap-1', matches && 'hidden')}>
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
    await teleService.addWatchList(username);
  };
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <BookMarkIcon
            width="18"
            height="18"
            isBookmarked={isBookmarked}
            onClick={() => withAuth(handleToggleWatchList)}
          />
        </TooltipTrigger>
        {/*<TooltipContent*/}
        {/*  className={cn(*/}
        {/*    'bg-[#BEFCFF4D] font-medium text-[#BEFCFF] backdrop-blur-3xl',*/}
        {/*    !isDark && 'bg-[#befcffb3] text-[#27ACD2]',*/}
        {/*  )}*/}
        {/*>*/}
        {/*  <p>Add to watchlist</p>*/}
        {/*</TooltipContent>*/}
      </Tooltip>
    </TooltipProvider>
  );
};
