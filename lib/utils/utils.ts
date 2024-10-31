import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { AppDetail, AppTrack } from '@/types/app.type';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatNumberWithSpacing(number: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'decimal',
    useGrouping: true,
  })
    .format(number)
    .replace(/,/g, ' ');
}

export const formatNumber = (num: number | string, isNotPlus = false) => {
  const numRender = Math.abs(+num);
  if (numRender >= 1_000_000_000) {
    return `${(numRender / 1_000_000_000).toFixed(2).replace('.', ',')}B${isNotPlus ? '' : '+'}`;
  } else if (numRender >= 1_000_000) {
    return `${(numRender / 1_000_000).toFixed(2).replace('.', ',')}M${isNotPlus ? '' : '+'}`;
  } else if (numRender >= 1_000) {
    return `${(numRender / 1_000).toFixed(2).replace('.', ',')}K${isNotPlus ? '' : '+'}`;
  }
  return numRender.toString();
};

export const isAppTrackType = (item: AppTrack | AppDetail): item is AppTrack => {
  return 'username' in item;
};

export const isOfType = <T>(data: any, keys: (keyof T)[]): data is T => {
  return keys.every((key) => key in data);
};
