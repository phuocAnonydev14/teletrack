import { PropsWithChildren } from 'react';

export const Container = ({ children }: PropsWithChildren) => {
  return <div className="px-4 md:px-10 lg:px-14 xl:px-20">{children}</div>;
};
