import Link from 'next/link';
import { Logo } from '@/components/layouts/MainLayout/Logo';

export const Footer = () => {
  return (
    <div className="bg-homeMenuBg p-10">
      <div className="flex flex-wrap items-center justify-between gap-5">
        <Link href={'/'}>
          <Logo />
        </Link>
        <div className="flex flex-col justify-start gap-x-10 gap-y-2 md:flex-row md:items-center">
          <Link href={'/compare'}>
            <p className="text-lg font-semibold">Compare</p>
          </Link>
          <Link href={'/watchlist'}>
            <p className="text-lg font-semibold">Watchlist</p>
          </Link>
          <Link href={'/submit-app'}>
            <p className="text-lg font-semibold">Submit App</p>
          </Link>
        </div>
      </div>
      <div className="mb-10 mt-2 h-[1px] w-full bg-foreground" />
      <div className="flex justify-center gap-1 text-center">
        <p className="font-bold text-foreground">Our bot:</p>
        <Link className="text-linear" href={'https://t.me/teletrending_bot'} target="_blank">
          @teletrending_bot
        </Link>
      </div>
      <p className="mt-4 text-center text-gray-600"> All rights reserved.</p>
    </div>
  );
};
