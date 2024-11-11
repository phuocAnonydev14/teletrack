import { Suspense } from 'react';
import { Container } from '@/components/common/Container';

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <Container>
      <Suspense fallback="Loading...">{children}</Suspense>
    </Container>
  );
}
