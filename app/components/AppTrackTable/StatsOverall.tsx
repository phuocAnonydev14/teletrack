'use client';

import { cn } from '@/lib/utils/utils';
import Image from 'next/image';
import ArrowUp from '@/components/assets/table/arrow-up.png';
import ArrowDown from '@/components/assets/table/arrow-down.png';
import { useTheme } from 'next-themes';
import { Stats } from '@/types/app.type';

interface StatsProps {
  stats: Stats;
}

export const StatsOverall = ({ stats }: StatsProps) => {
  const { resolvedTheme } = useTheme();
  const ArrowImage = stats.mau_change > 0 ? ArrowUp : ArrowDown;

  return (
    <div className="flex items-center justify-center gap-3 rounded-t-lg border-2 border-tableBorder bg-tableBg px-8 py-3 text-primary-foreground md:justify-between">
      <p
        className={cn(
          'hidden text-xl font-bold text-secondary md:inline-block',
          resolvedTheme === 'dark' && 'text-white',
        )}
      >
        Top 100 Mini-apps by MAU
      </p>
      <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 rounded-xl bg-statsBg px-5 py-2 md:gap-x-5">
        <div className="flex gap-1">
          <span
            className={cn('font-semibold text-secondary', resolvedTheme === 'dark' && 'text-white')}
          >
            MAU Overall:{' '}
          </span>
          <span
            className={cn(
              'flex items-center gap-1 font-bold',
              stats.mau_change < 0 ? 'text-[#F73131]' : 'text-[#1DC467]',
            )}
          >
            <Image
              src={ArrowImage.src}
              alt="Arrow up"
              width={ArrowImage.width}
              height={ArrowImage.height}
            />
            {stats.mau_change}%
          </span>
        </div>
        <div>
          <span className="font-medium">Gainer: </span>
          <span className="font-bold text-[#1DC467]">{stats.gainers}</span>
        </div>
        <div>
          <span className="font-medium">Losers: </span>
          <span className="font-bold text-[#F73131]">{stats.losers}</span>
        </div>
      </div>
      {/*<RadioGroup>*/}
      {/*    {Object.keys(tagRanks).map((rank) => {*/}
      {/*      return (*/}
      {/*        <TagRank*/}
      {/*          selectedCate={selectedCate || ''}*/}
      {/*          key={rank}*/}
      {/*          name={rank}*/}
      {/*          action={() => {*/}
      {/*            setSelectedCate((state) => (state === rank ? '' : rank));*/}
      {/*          }}*/}
      {/*        />*/}
      {/*      );*/}
      {/*    })}*/}
      {/*</RadioGroup>*/}
    </div>
  );
};
