'use client';

import { MoonIcon, SunIcon } from '@/components/icons';
import { useTheme } from 'next-themes';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

export const ThemeSwitch = () => {
  const { setTheme, resolvedTheme } = useTheme();
  const isDarkTheme = resolvedTheme === 'dark';

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
        <DropdownMenuItem onClick={() => handleToggleTheme('system')}>System</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
