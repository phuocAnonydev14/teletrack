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

export const formatNumber = (num: number) => {
  if (num >= 1_000_000) {
    return `${Math.floor(num / 1_000_000)}M+`;
  }
  return num.toString();
};
