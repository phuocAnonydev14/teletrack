import type { Metadata } from 'next';
import './globals.css';
import { MainLayout } from '@/components/layouts/MainLayout';
import { Catamaran } from 'next/font/google';
import { Suspense } from 'react';
import { AppProviders } from '@/components/providers/AppProviders';
export const metadata: Metadata = {
  title: 'Teletrack',
  description: 'Teletrack',
};
const catamaranFont = Catamaran({ subsets: ['latin'], display: 'swap' });
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${catamaranFont.className}`}>
        <Suspense>
          <AppProviders>
            <MainLayout>{children}</MainLayout>
          </AppProviders>
        </Suspense>
      </body>
    </html>
  );
}
