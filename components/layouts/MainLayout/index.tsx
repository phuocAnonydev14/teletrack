import { Header } from '@/components/layouts/MainLayout/Header';
import { PropsWithChildren } from 'react';
import { Footer } from '@/components/layouts/MainLayout/Footer';
import { HomeMenu } from '@/components/layouts/MainLayout/HomeMenu';

export const MainLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="mx-auto max-w-[1600px]">
      <div className="px-4 md:px-10 lg:px-14 xl:px-20">
        <Header />
        <div className="hidden md:block">
          <HomeMenu />
        </div>
      </div>
      <div className="my-5 lg:my-10">{children}</div>
      <div className="px-0 md:px-10 lg:px-14 xl:px-20">
        <Footer />
      </div>
    </div>
  );
};
