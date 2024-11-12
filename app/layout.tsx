import type { Metadata } from 'next';
import './globals.css';
import { MainLayout } from '@/components/layouts/MainLayout';
import { Catamaran } from 'next/font/google';
import { Suspense } from 'react';
import { AppProviders } from '@/components/providers/AppProviders';
import logo from './favicon.ico';

export const metadata: Metadata = {
  title: 'Tgecko',
  description:
    'Tgecko offers real-time analytics for tracking Telegram mini apps, focusing on user activity, growth trends, and performance insights.',
  keywords: [
    'Tgecko',
    'analytics',
    'Telegram mini apps tracker',
    'Mini app performance',
    'Active user statistics',
  ],
  icons: {
    icon: [
      {
        url: logo.src,
        media: '(prefers-color-scheme: light)',
      },
      {
        url: logo.src,
        media: '(prefers-color-scheme: dark)',
      },
    ],
  },
};
const catamaranFont = Catamaran({ subsets: ['latin'], display: 'swap' });
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${catamaranFont.className} scrollbar`}>
        <Suspense>
          <AppProviders>
            <MainLayout>{children}</MainLayout>
          </AppProviders>
        </Suspense>
      </body>
    </html>
  );
}
