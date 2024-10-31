'use client';

import logoLight from '@/components/assets/logo-light.png';
import logoDark from '@/components/assets/logo-dark.png';
import Image from 'next/image';
import { useMediaQuery } from 'usehooks-ts';
import { useTheme } from 'next-themes';

export const Logo = () => {
  const matches = useMediaQuery('(max-width: 768px)');
  const { resolvedTheme } = useTheme();
  const isDarkTheme = resolvedTheme === 'dark';

  return (
    <Image
      src={isDarkTheme ? logoDark.src : logoLight.src}
      alt="Teletrack Logo"
      width={matches ? 100 : logoLight.width}
      height={matches ? 100 : logoLight.height}
    />
  );
};
