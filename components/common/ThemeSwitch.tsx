'use client';

import { MoonIcon, SunIcon } from '@/components/icons';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import { useMediaQuery } from 'usehooks-ts';

export const ThemeSwitch = () => {
  const { setTheme, resolvedTheme } = useTheme();
  const isDarkTheme = resolvedTheme === 'dark';
  const matches = useMediaQuery(`(max-width: 400px)`);

  const handleToggleTheme = (mode: string) => {
    setTheme(mode);
  };

  return (
    // <DropdownMenu>
    //   <DropdownMenuTrigger>
    <Button
      size={matches ? 'sm' : 'default'}
      variant="ghost"
      className="px-3"
      onClick={() => handleToggleTheme(resolvedTheme === 'light' ? 'dark' : 'light')}
    >
      {isDarkTheme ? (
        <MoonIcon width={matches ? '18' : '22'} height={matches ? '18' : '22'} />
      ) : (
        <SunIcon width={matches ? '18' : '22'} height={matches ? '18' : '22'} />
      )}
    </Button>
    // </DropdownMenuTrigger>
    // <DropdownMenuContent>
    //   <DropdownMenuItem onClick={() => handleToggleTheme('dark')}>Dark</DropdownMenuItem>
    //   <DropdownMenuItem onClick={() => handleToggleTheme('light')}>Light</DropdownMenuItem>
    //   <DropdownMenuItem onClick={() => handleToggleTheme('system')}>System</DropdownMenuItem>
    // </DropdownMenuContent>
    // </DropdownMenu>
  );
};
