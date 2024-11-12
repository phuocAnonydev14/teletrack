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

export const formatNumber = (num: number | string, isNotPlus = false): string => {
  const parsedNum = Number(num);
  if (isNaN(parsedNum) || !parsedNum) return '0';
  const numRender = Math.abs(parsedNum);
  if (numRender < 1) return parsedNum.toFixed(4);
  const suffix = isNotPlus ? '' : '+';
  let formatted: string;

  if (numRender >= 1_000_000_000) {
    formatted = `${(numRender / 1_000_000_000).toFixed(numRender % 1_000_000_000 !== 0 ? 2 : 0)}B`;
  } else if (numRender >= 1_000_000) {
    formatted = `${(numRender / 1_000_000).toFixed(numRender % 1_000_000 !== 0 ? 2 : 0)}M`;
  } else if (numRender >= 1_000) {
    formatted = `${(numRender / 1_000).toFixed(numRender % 1_000 !== 0 ? 2 : 0)}K`;
  } else {
    formatted = numRender.toString();
  }

  return `${formatted}${suffix}`;
};

export const isOfType = <T>(data: any, keys: (keyof T)[]): data is T => {
  return keys.every((key) => key in data);
};
