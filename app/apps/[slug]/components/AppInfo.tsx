'use client';

import { BadgeIcon, BookMarkIcon } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { PlusIcon } from 'lucide-react';
import { AppDetail } from '@/types/app.type';
import { cn, formatNumber } from '@/lib/utils/utils';
import Link from 'next/link';
import { getLogoUrl } from '@/lib/utils/image.util';
import { useMediaQuery } from 'usehooks-ts';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import ArrowUp from '@/components/assets/table/arrow-up.png';
import ArrowDown from '@/components/assets/table/arrow-down.png';
import { ReactNode } from 'react';

interface AppInfoProps {
  appDetail: AppDetail;
}

export const AppInfo = (props: AppInfoProps) => {
  const { appDetail } = props;
  const matches = useMediaQuery(`(max-width: 728px)`);
  const ArrowImage = appDetail.Bot.rankChange > 0 ? ArrowUp : ArrowDown;

  const metricList: MetricBox[] = [
    {
      name: 'Global Rank by Users',
      amount: '#' + appDetail.Bot.rank,
      customContent: appDetail.Bot.rankChange > 0 && (
        <div className="flex items-center gap-1">
          <Image
            className="-translate-y-[1px]"
            src={ArrowImage.src}
            alt="Arrow up"
            width={ArrowImage.width}
            height={ArrowImage.height}
          />
          <p
            className={cn(
              'text-base font-medium text-[#1DC467]',
              appDetail.Bot.rankChange < 0 && 'text-[#F73131]',
            )}
          >
            {Math.abs(appDetail.Bot.rankChange)}
          </p>
        </div>
      ),
    },
    {
      name: 'MAU',
      amount: formatNumber(appDetail.Bot.users),
    },
    {
      name: 'Subscribers',
      amount: formatNumber(appDetail.Channel.users),
    },
    {
      name: 'Token Price',
      amount: appDetail.Price ? '$' + formatNumber(appDetail.Price, true) : 'N/A',
    },
    {
      name: 'FDV',
      amount: appDetail.FDV ? '$' + formatNumber(appDetail.FDV, true) : 'N/A',
    },
  ];

  return (
    <div className="flex flex-col items-start justify-between gap-6 lg:flex-row">
      <img
        src={getLogoUrl(appDetail.Bot.username.replace('@', ''))}
        alt="App Logo"
        className="hidden max-h-[550px] w-max max-w-full rounded-md bg-gradient-to-r from-[#24C6DCCC] to-[#514A9DCC] object-cover object-center p-[5px] lg:block lg:max-w-[40%]"
      />
      <div className="w-full rounded-[12px] bg-appInfoBg p-5 lg:min-w-[60%] lg:p-8">
        <div className="flex flex-wrap items-start justify-between gap-5">
          <div className="flex flex-col gap-4">
            <p className="flex items-center gap-2 text-xl font-bold lg:text-3xl">
              <img
                src={getLogoUrl(appDetail.Bot.username.replace('@', ''))}
                alt="App Logo"
                className="block h-auto w-[40px] rounded-md bg-gradient-to-r from-[#24C6DCCC] to-[#514A9DCC] p-[2px] lg:hidden"
              />{' '}
              {appDetail.Name}{' '}
              {matches ? (
                <BadgeIcon width="18" height="18" />
              ) : (
                <BadgeIcon width="22" height="22" />
              )}
            </p>
            {/*<p>{appDetail.}</p>*/}
            <div className="flex flex-wrap gap-3">
              <Link
                href={`https://t.me/${appDetail.Bot.username.replace('@', '')}`}
                target="_blank"
              >
                <Button size="lg">Play Bot</Button>
              </Link>
              <Link
                href={`https://t.me/${appDetail.Channel.username.replace('@', '')}`}
                target="_blank"
              >
                <Button size="lg">Join Channel</Button>
              </Link>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-[5px] rounded-xl bg-[#CCD8DA] px-3 py-1 text-black">
              <BookMarkIcon fill="hsl(var(--app-info-button))" width={18} height={18} /> 2.2M
            </div>
            <Button
              size="sm"
              className="flex gap-1 font-semibold text-appInfoButton"
              variant="outline"
            >
              <PlusIcon fill="hsl(var(--app-info-button))" size={18} /> Add To Watchlist
            </Button>
          </div>
        </div>
        <div className="my-6 h-[1px] w-full bg-[#525961] lg:my-9" />
        <div className="flex flex-wrap gap-3 lg:gap-6">
          {metricList.map((item) => {
            return (
              <MetricBox
                name={item.name}
                amount={item.amount}
                key={item.name}
                customContent={item?.customContent}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

interface MetricBox {
  name: string;
  amount: string;
  customContent?: ReactNode;
}

const MetricBox = (props: MetricBox) => {
  const { amount, name, customContent } = props;
  const { resolvedTheme } = useTheme();
  return (
    <div className="flex min-w-[40%] flex-1 flex-col rounded-xl bg-appInfoMetric px-4 py-[10px] lg:min-w-[30%]">
      <p
        className={cn(
          'flex items-center gap-3 text-lg font-bold text-secondary lg:text-2xl',
          resolvedTheme === 'dark' && 'text-linear',
        )}
      >
        {amount} {customContent}
      </p>
      <p className="text-base font-semibold lg:text-lg">{name}</p>
    </div>
  );
};
