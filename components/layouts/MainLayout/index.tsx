import { Header } from '@/components/layouts/MainLayout/Header';
import { Container } from '@/components/common/Container';
import { PropsWithChildren } from 'react';
import { Footer } from '@/components/layouts/MainLayout/Footer';
import { HomeMenu } from '@/components/layouts/MainLayout/HomeMenu';

export const MainLayout = ({ children }: PropsWithChildren) => {
  return (
    <Container>
      <Header />
      <div className="hidden md:block">
        <HomeMenu />
      </div>
      <div className="my-5 overflow-visible">{children}</div>
      <Footer />
    </Container>
  );
};
