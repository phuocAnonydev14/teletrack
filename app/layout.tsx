import type { Metadata } from 'next';
import './globals.css';
import { MainLayout } from '@/components/layouts/MainLayout';
import { Catamaran } from 'next/font/google';
import { Suspense } from 'react';
import { AppProviders } from '@/components/providers/AppProviders';
import logo from './favicon.ico';
import { Loading } from '@/components/common/Loading';
import Script from 'next/script';
import { GA_KEY } from '@/common/const/envKeys';
import { GoogleAnalytics } from '@next/third-parties/google';
export const metadata: Metadata = {
  title: 'Botgecko',
  description:
    'Botgecko offers real-time analytics for tracking Telegram mini apps, focusing on user activity, growth trends, and performance insights.',
  keywords: [
    'Botgecko',
    'analytics',
    'Telegram mini apps tracker',
    'Mini app performance',
    'Active user statistics',
  ],
  openGraph: {
    title: 'Botgecko',
    description:
      'Botgecko offers real-time analytics for tracking Telegram mini apps, focusing on user activity, growth trends, and performance insights.',
    images: [logo.src],
  },
  twitter: {
    title: 'Botgecko',
    description:
      'Botgecko offers real-time analytics for tracking Telegram mini apps, focusing on user activity, growth trends, and performance insights.',
    images: [logo.src],
  },
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
      <Script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_KEY}`}></Script>
      <body className={`${catamaranFont.className} scrollbar`}>
        <Suspense fallback={<Loading />}>
          <AppProviders>
            <MainLayout>{children}</MainLayout>
          </AppProviders>
        </Suspense>
      </body>
      <GoogleAnalytics gaId={GA_KEY} />
    </html>
  );
}
