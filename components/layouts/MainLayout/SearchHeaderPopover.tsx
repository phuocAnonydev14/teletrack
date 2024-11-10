'use client';

import { PropsWithChildren } from 'react';
import { Card } from '@/components/ui/card';
import Link from 'next/link';
import { getLogoUrl } from '@/lib/utils/image.util';

interface SearchHeaderPopoverProps extends PropsWithChildren {
  val: string;
  onClose?: () => void;
  searchData: string[];
}

export const SearchHeaderPopover = ({ onClose, searchData, val }: SearchHeaderPopoverProps) => {
  return (
    <Card className="absolute left-0 top-[70px] z-40 max-h-[70dvh] min-h-20 w-full overflow-auto rounded-lg bg-[#004e5980] p-4 text-white backdrop-blur-[26px] md:top-[50px]">
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-3">
          {searchData.length === 0 && (
            <>
              <p className="text-center font-semibold">
                {val.length < 2 ? 'Search at least 2 letters' : 'No app found'}
              </p>
            </>
          )}
          {/*<TitleBox name="Trending Apps" />*/}
          <div className="flex flex-col gap-3">
            {searchData.map((app) => {
              return <AppSearchBox data={app} key={app} onClose={onClose} />;
            })}
          </div>
        </div>
        {/*<div className="flex flex-col gap-3">*/}
        {/*  <TitleBox name="New Apps" />*/}
        {/*  <div className="flex flex-col gap-5">*/}
        {/*    <AppSearchBox onClose={onClose} />*/}
        {/*    <AppSearchBox onClose={onClose} />*/}
        {/*    <AppSearchBox onClose={onClose} />*/}
        {/*  </div>*/}
        {/*</div>*/}
        <div className="flex flex-col gap-3">
          {/*<TitleBox name="Recent search" />*/}
          <div className="flex gap-3">
            {/*{['SEED', 'CATIA'].map((item) => (*/}
            {/*  <SelectedBtn key={item} name={item} />*/}
            {/*))}*/}
          </div>
        </div>
      </div>
    </Card>
  );
};

const TitleBox = ({ name }: { name: string }) => {
  return (
    <div className="w-max rounded-xl bg-[#BEFCFF] px-3 py-2">
      <p className="text-linear my-0 text-lg font-extrabold">{name}</p>
    </div>
  );
};

const AppSearchBox = ({
  onClose,
  data,
}: Pick<SearchHeaderPopoverProps, 'onClose'> & { data: string }) => {
  const username = data.replace('@', '');
  return (
    <Link href={`/apps/${username}`} onClick={() => onClose && onClose()}>
      <div className="flex justify-between gap-3 hover:text-secondary-foreground">
        <div className="flex items-center gap-2">
          <img src={getLogoUrl(username)} className="h-7 w-7 rounded-full" alt="logo" />
          <p className="text-lg font-bold">{data.replace('@', '')}</p>
          {/*<p className="font-semibold">HMSTR</p>*/}
          {/*<p className="font-semibold">#161</p>*/}
        </div>
        {/*<div className="hidden items-center gap-4 lg:flex">*/}
        {/*  <p className="text-lg font-semibold">$0.0045678</p>*/}
        {/*  <p className="flex items-center gap-1 text-lg font-semibold text-[#BEFBFF]">*/}
        {/*    <ArrowUpIcon color="#BEFBFF" />*/}
        {/*    5.52%*/}
        {/*  </p>*/}
        {/*</div>*/}
      </div>
    </Link>
  );
};
