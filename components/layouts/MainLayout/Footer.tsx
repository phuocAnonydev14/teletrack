import Link from 'next/link';
import { Logo } from '@/components/layouts/MainLayout/Logo';

export const Footer = () => {
  return (
    <div className="mt-10 bg-homeMenuBg p-10">
      <div className="flex flex-wrap items-start justify-between gap-5">
        <Link href={'/'}>
          <Logo />
        </Link>
        <div className="flex flex-col justify-start gap-x-10 gap-y-2 md:flex-row md:items-center">
          <Link href={'/compare'}>
            <p className="text-lg font-medium">Compare</p>
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
      <div className="flex flex-col justify-center gap-x-5 gap-y-1 md:flex-row">
        <div className="flex justify-center gap-1 text-center">
          <p className="font-medium text-foreground">Our bot:</p>
          <Link className="text-linear" href={'https://t.me/botgecko_bot'} target="_blank">
            @botgecko_bot
          </Link>
        </div>
        <div className="flex justify-center gap-1 text-center">
          <p className="font-medium text-foreground">Our channel:</p>
          <Link className="text-linear" href={'https://t.me/botgecko_news'} target="_blank">
            @botgecko_news
          </Link>
        </div>
        <div className="flex justify-center gap-1 text-center">
          <p className="font-medium text-foreground">Our tool:</p>
          <Link className="text-linear" href={'https://tonsend.io/'} target="_blank">
            @tonsend.io
          </Link>
        </div>
      </div>
      <p className="mt-4 flex items-center justify-center gap-x-1 text-center text-gray-600">
        {' '}
        Copyright ©|{' '}
        <Link className="underline underline-offset-2" href="https://playable.gg/" target="_blank">
          Playable Studio.
        </Link>
      </p>
    </div>
  );
};
