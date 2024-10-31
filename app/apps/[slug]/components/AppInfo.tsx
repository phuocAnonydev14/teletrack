'use client';

import { BadgeIcon, BookMarkIcon } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { PlusIcon } from 'lucide-react';
import { AppDetail } from '@/types/app.type';
import { formatNumber } from '@/lib/utils/utils';
import Link from 'next/link';

interface AppInfoProps {
  appDetail: AppDetail;
}

export const AppInfo = (props: AppInfoProps) => {
  const { appDetail } = props;

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
        src={appDetail.Logo}
        alt="App Logo"
        className="hidden max-h-[550px] w-max max-w-full rounded-md bg-gradient-to-r from-[#24C6DCCC] to-[#514A9DCC] object-cover object-center p-[5px] lg:block lg:max-w-[40%]"
      />
      <div className="w-full rounded-[12px] bg-appInfoBg p-[50px] lg:min-w-[60%]">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="flex flex-col gap-5">
            <p className="flex items-center gap-2 text-3xl font-bold lg:text-[40px]">
              <img
                src={appDetail.Logo}
                alt="App Logo"
                className="block h-auto w-[40px] rounded-md bg-gradient-to-r from-[#24C6DCCC] to-[#514A9DCC] p-[2px] lg:hidden"
              />{' '}
              {appDetail.Name} <BadgeIcon />
            </p>
            {/*<p>{appDetail.}</p>*/}
            <div className="flex gap-5">
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
          <div className="flex items-center gap-3 text-appInfoButton">
            <Button size="sm" className="flex gap-2" variant="outline">
              <BookMarkIcon fill="hsl(var(--app-info-button))" /> 2.2M
            </Button>
            <Button size="sm" className="flex gap-1" variant="outline">
              <PlusIcon /> Add To Watchlist
            </Button>
          </div>
        </div>
        <div className="my-9 h-[1px] w-full bg-[#525961]" />
        <div className="flex flex-wrap gap-6">
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

  return (
    <div className="flex flex-1 flex-col gap-1 rounded-xl bg-appInfoMetric px-4 py-[10px] sm:min-w-[40%] lg:min-w-[30%]">
      <p className="text-linear text-[40px] font-black text-primary">{amount}</p>
      <p className="text-xl font-extrabold">{name}</p>
    </div>
  );
};
