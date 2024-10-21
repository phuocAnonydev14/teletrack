import logo from '@/components/assets/logo.png';
import Image from 'next/image';
import Link from 'next/link';

export const Footer = () => {
  return (
    <div className="bg-[#2A272A] p-10">
      <div className="flex flex-wrap items-center justify-between gap-5">
        <Link href={'/'}>
          <Image src={logo.src} alt="Teletrack Logo" width={logo.width} height={logo.height} />
        </Link>
        <div className="flex items-center gap-10">
          <Link href={'/compare'}>
            <p className="text-xl font-semibold">Compare</p>
          </Link>
          <Link href={'/watchlist'}>
            <p className="text-xl font-semibold">Watchlist</p>
          </Link>
          <Link href={'/submit-app'}>
            <p className="text-xl font-semibold">Submit App</p>
          </Link>
        </div>
      </div>
      <div className="my-10 h-[1px] w-full bg-white" />
      <div className="flex justify-center gap-1 text-center">
        <p className="font-bold text-[#FCFCFC]">Our bot:</p>
        <Link className="text-linear" href={''}>
          @teletrending_bot
        </Link>
      </div>
      <p className="mt-4 text-center text-[#D6D6D6]"> All rights reserved.</p>
    </div>
  );
};
