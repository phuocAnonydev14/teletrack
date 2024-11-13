'use client';

import { PropsWithChildren } from 'react';
import * as React from 'react';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import { AuthProvider } from '@/components/providers/AuthProvider';
import { Toaster } from '@/components/ui/sonner';
export const AppProviders = (props: PropsWithChildren) => {
  const { children } = props;
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
      <Toaster />
      <AuthProvider>{children}</AuthProvider>
    </ThemeProvider>
  );
};
