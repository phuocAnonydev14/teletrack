import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

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

export const formatNumber = (num: number, isNotPlus = false) => {
  if (num >= 1_000_000_000) {
    return `${(num / 1_000_000_000).toFixed(2).replace('.', ',')}B${isNotPlus ? '' : '+'}`;
  } else if (num >= 1_000_000) {
    return `${(num / 1_000_000).toFixed(2).replace('.', ',')}M${isNotPlus ? '' : '+'}`;
  } else if (num >= 1_000) {
    return `${(num / 1_000).toFixed(2).replace('.', ',')}K${isNotPlus ? '' : '+'}`;
  }
  return num.toString();
};
