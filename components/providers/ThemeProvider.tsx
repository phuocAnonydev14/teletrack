'use client';

import * as React from 'react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { type ThemeProviderProps } from 'next-themes/dist/types';
import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider {...props}>
      <ProgressBar
        height="3px"
        color="hsl(var(--nprogress))"
        options={{ showSpinner: false }}
        shallowRouting
      />
      {children}
    </NextThemesProvider>
  );
}
