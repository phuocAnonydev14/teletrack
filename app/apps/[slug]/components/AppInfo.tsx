'use client';

import { BadgeIcon, BookMarkIcon } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { PlusIcon } from 'lucide-react';
import { AppTrack } from '@/types/app.type';

const mockAppTrack: AppTrack = {
  id: (Math.random() * 1000).toString(),
  order: 1,
  name: 'SEED Updates',
  image:
    'https://seeddao.gitbook.io/~gitbook/image?url=https%3A%2F%2F2590762305-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252FGDg1dndoyRDbESZqHxbk%252Ficon%252FLGXvyroqbiHX0405KwcQ%252Flogo_color.png%3Falt%3Dmedia%26token%3D15dc5d3f-7eab-476b-ab5a-26db7db8ec27&width=32&dpr=1&quality=100&sign=71e238f1&sv=1',
  mau: 1500,
  dayUpdate: 7,
  totalSub: 1000,
  daySub: 50,
  fdv: 120,
  description: 'From a single SEED, a universe was born.',
  totalCost: 33232,
};

export const AppInfo = () => {
  const metricList = [
    {
      name: 'Global Rank by Users',
      amount: '#' + mockAppTrack.order.toLocaleString('en-US'),
    },
    {
      name: 'MAU',
      amount: mockAppTrack.mau.toLocaleString('en-US') + 'M+',
    },
    {
      name: 'Subscribers',
      amount: mockAppTrack.totalSub.toLocaleString('en-US') + 'M+',
    },
    {
      name: mockAppTrack.name,
      amount: '$' + mockAppTrack.totalCost?.toLocaleString('en-US'),
    },
    {
      name: mockAppTrack.name,
      amount: '$' + mockAppTrack.fdv.toLocaleString('en-US'),
    },
  ];

  return (
    <div className="flex flex-col items-start justify-between gap-6 lg:flex-row">
      <img
        src="https://seeddao.gitbook.io/~gitbook/image?url=https%3A%2F%2F2590762305-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252FGDg1dndoyRDbESZqHxbk%252Ficon%252FLGXvyroqbiHX0405KwcQ%252Flogo_color.png%3Falt%3Dmedia%26token%3D15dc5d3f-7eab-476b-ab5a-26db7db8ec27&width=32&dpr=1&quality=100&sign=71e238f1&sv=1"
        alt="App Logo"
        className="hidden w-max max-w-full rounded-md bg-gradient-to-r from-[#24C6DCCC] to-[#514A9DCC] p-[5px] lg:block lg:w-[40%]"
      />
      <div className="w-full rounded-[12px] bg-homeMenuBg p-[50px] lg:w-[60%]">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="flex flex-col gap-5">
            <p className="flex items-center gap-2 text-[40px] font-bold">
              <img
                src="https://seeddao.gitbook.io/~gitbook/image?url=https%3A%2F%2F2590762305-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252FGDg1dndoyRDbESZqHxbk%252Ficon%252FLGXvyroqbiHX0405KwcQ%252Flogo_color.png%3Falt%3Dmedia%26token%3D15dc5d3f-7eab-476b-ab5a-26db7db8ec27&width=32&dpr=1&quality=100&sign=71e238f1&sv=1"
                alt="App Logo"
                className="block h-auto w-[40px] rounded-md bg-gradient-to-r from-[#24C6DCCC] to-[#514A9DCC] p-[2px] lg:hidden"
              />{' '}
              {mockAppTrack.name} <BadgeIcon />
            </p>
            <p>{mockAppTrack.description}</p>
            <div className="flex gap-5">
              <Button size="lg">Play Bot</Button>
              <Button size="lg">Join Channel</Button>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button className="flex gap-2" variant="secondary">
              <BookMarkIcon /> 2.2M
            </Button>
            <Button className="flex gap-1" variant="secondary">
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
    <div className="flex flex-1 flex-col gap-1 rounded-xl bg-tableBg px-4 py-[10px] sm:min-w-[30%]">
      <p className="text-linear text-[40px] font-black text-primary">{amount}</p>
      <p className="text-xl font-extrabold">{name}</p>
    </div>
  );
};
