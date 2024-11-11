import { PropsWithChildren } from 'react';
import { cn } from '@/lib/utils/utils';

interface ContainerProps extends PropsWithChildren {
  isMobileDisablePx?: boolean;
}

export const Container = ({ children, isMobileDisablePx }: ContainerProps) => {
  return (
    <div className={cn('px-4 md:px-10 lg:px-14 xl:px-20', isMobileDisablePx && 'px-0')}>
      {children}
    </div>
  );
};
