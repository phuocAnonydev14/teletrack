'use client';

import loading from '@/components/assets/common/loading.gif';
import Image from 'next/image';
import { useMediaQuery } from 'usehooks-ts';

export const Loading = () => {
  const matches = useMediaQuery(`(max-width: 728px)`);

  return (
    <div className="flex h-[90dvh] w-full flex-col items-center justify-center gap-2">
      <Image
        src={loading}
        height={matches ? 50 : 65}
        width={matches ? 50 : 65}
        alt={`Loading`}
        unoptimized={true}
      />
      <span className="text-base font-semibold uppercase">Loading...</span>
    </div>
  );
};
