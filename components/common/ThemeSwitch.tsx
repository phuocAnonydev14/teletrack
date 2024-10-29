'use client';

import { MoonIcon, SunIcon } from '@/components/icons';
import { useTheme } from 'next-themes';
import { useRef } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

export const ThemeSwitch = () => {
  const { setTheme, theme } = useTheme();
  const inputRef = useRef();
  const isDarkTheme = theme === 'dark';

  const handleToggleTheme = (mode: string) => {
    setTheme(mode);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button variant="ghost" className="px-3">
          {isDarkTheme ? <MoonIcon /> : <SunIcon />}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={() => handleToggleTheme('dark')}>Dark</DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleToggleTheme('light')}>Light</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
