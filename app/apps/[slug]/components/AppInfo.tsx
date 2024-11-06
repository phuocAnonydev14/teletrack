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

interface AppInfoProps {
  appDetail: AppDetail;
}

export const AppInfo = (props: AppInfoProps) => {
  const { appDetail } = props;
  const matches = useMediaQuery(`(max-width: 728px)`);

  const metricList = [
    {
      name: 'Global Rank by Users',
      amount: '#' + appDetail.Bot.rank,
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
      name: appDetail.Name,
      amount: 'N/A',
    },
    {
      name: 'FDV',
      amount: 'N/A',
    },
  ];

  return (
    <div className="flex flex-col items-start justify-between gap-6 lg:flex-row">
      <img
        src={getLogoUrl(appDetail.Bot.username.replace('@', ''))}
        alt="App Logo"
        className="hidden max-h-[550px] w-max max-w-full rounded-md bg-gradient-to-r from-[#24C6DCCC] to-[#514A9DCC] object-cover object-center p-[5px] lg:block lg:max-w-[40%]"
      />
      <div className="w-full rounded-[12px] bg-appInfoBg p-5 lg:min-w-[60%] lg:p-[50px]">
        <div className="flex flex-wrap items-start justify-between gap-5">
          <div className="flex flex-col gap-4">
            <p className="flex items-center gap-2 text-xl font-bold lg:text-[40px]">
              <img
                src={getLogoUrl(appDetail.Bot.username.replace('@', ''))}
                alt="App Logo"
                className="block h-auto w-[40px] rounded-md bg-gradient-to-r from-[#24C6DCCC] to-[#514A9DCC] p-[2px] lg:hidden"
              />{' '}
              {appDetail.Name} {matches ? <BadgeIcon width="20" height="20" /> : <BadgeIcon />}
            </p>
            {/*<p>{appDetail.}</p>*/}
            <div className="flex flex-wrap gap-5">
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
            <div className="flex items-center gap-[5px] rounded-xl bg-[#CCD8DA] px-3 py-[5px]">
              <BookMarkIcon fill="hsl(var(--app-info-button))" /> 2.2M
            </div>
            <Button
              size="sm"
              className="flex gap-1 font-semibold text-appInfoButton"
              variant="outline"
            >
              <PlusIcon fill="hsl(var(--app-info-button))" /> Add To Watchlist
            </Button>
          </div>
        </div>
        <div className="my-6 h-[1px] w-full bg-[#525961] lg:my-9" />
        <div className="flex flex-wrap gap-3 lg:gap-6">
          {metricList.map((item) => {
            return <MetricBox name={item.name} amount={item.amount} key={item.name} />;
          })}
        </div>
      </div>
    </div>
  );
};

interface MetricBox {
  name: string;
  amount: string;
}

const MetricBox = (props: MetricBox) => {
  const { amount, name } = props;
  const { resolvedTheme } = useTheme();
  return (
    <div className="flex min-w-[40%] flex-1 flex-col rounded-xl bg-appInfoMetric px-4 py-[10px] lg:min-w-[30%]">
      <p
        className={cn(
          'text-lg font-bold text-secondary lg:text-2xl',
          resolvedTheme === 'dark' && 'text-linear',
        )}
      >
        {amount}
      </p>
      <p className="text-base font-semibold lg:text-lg">{name}</p>
    </div>
  );
};
