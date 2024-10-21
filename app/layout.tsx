import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import { MainLayout } from '@/components/layouts/MainLayout';
import { Catamaran } from 'next/font/google';
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
      <body className={`antialiased ${catamaranFont.className}`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <MainLayout>{children}</MainLayout>
        </ThemeProvider>
      </body>
    </html>
  );
}
