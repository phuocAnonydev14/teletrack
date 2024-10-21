'use client';

import { PropsWithChildren } from 'react';
import { Card } from '@/components/ui/card';
import { ArrowUpIcon } from '@/components/icons';
import Link from 'next/link';
import { SelectedBtn } from '@/app/compare/components/SelectApp';

interface SearchHeaderPopoverProps extends PropsWithChildren {
  val: string;
}

export const SearchHeaderPopover = (props: SearchHeaderPopoverProps) => {
  return (
    <Card className="absolute left-0 top-[70px] z-40 max-h-[70dvh] min-h-40 w-full overflow-auto rounded-lg bg-[#1dc3d93d] p-4 backdrop-blur-[26px] md:top-[50px]">
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-3">
          <TitleBox name="Trending Apps" />
          <div className="flex flex-col gap-5">
            <AppSearchBox />
            <AppSearchBox />
            <AppSearchBox />
            <AppSearchBox />
          </div>
        </div>{' '}
        <div className="flex flex-col gap-3">
          <TitleBox name="New Apps" />
          <div className="flex flex-col gap-5">
            <AppSearchBox />
            <AppSearchBox />
            <AppSearchBox />
            <AppSearchBox />
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <TitleBox name="Recent search" />
          <div className="flex gap-3">
            {['SEED', 'CATIA'].map((item) => (
              <SelectedBtn key={item} name={item} />
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
};

const TitleBox = ({ name }: { name: string }) => {
  return (
    <div className="w-max rounded-xl bg-[#BEFCFF] px-3 py-2">
      <p className="text-linear my-0 text-lg font-extrabold md:text-xl">{name}</p>
    </div>
  );
};

const AppSearchBox = () => {
  return (
    <Link href={'/apps/1'}>
      <div className="flex justify-between gap-3 hover:text-primary">
        <div className="flex items-center gap-2">
          <div className="">
            <img
              src="https://seeddao.gitbook.io/~gitbook/image?url=https%3A%2F%2F2590762305-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252FGDg1dndoyRDbESZqHxbk%252Ficon%252FLGXvyroqbiHX0405KwcQ%252Flogo_color.png%3Falt%3Dmedia%26token%3D15dc5d3f-7eab-476b-ab5a-26db7db8ec27&width=32&dpr=1&quality=100&sign=71e238f1&sv=1"
              className="h-7 w-7 rounded-full"
              alt="logo"
            />
          </div>
          <p className="text-lg font-bold md:text-xl">Hamster Kombat</p>
          <p className="font-semibold md:text-[15px]">HMSTR</p>
          <p className="font-semibold md:text-[15px]">#161</p>
        </div>
        <div className="hidden items-center gap-4 lg:flex">
          <p className="text-lg font-semibold md:text-xl">$0.0045678</p>
          <p className="flex items-center gap-1 text-lg font-semibold text-[#1DC467] md:text-xl">
            <ArrowUpIcon color="#1DC467" />
            5.52%
          </p>
        </div>
      </div>
    </Link>
  );
};
