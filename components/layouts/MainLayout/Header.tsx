'use client';

import { SearchHeader } from '@/components/layouts/MainLayout/SearchHeader';
import { Button } from '@/components/ui/button';
import { EnterIcon } from '@/components/icons';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { useState } from 'react';
import { MenuIcon, SearchIcon, User } from 'lucide-react';
import { HomeMenu } from '@/components/layouts/MainLayout/HomeMenu';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import Link from 'next/link';
import { ThemeSwitch } from '@/components/common/ThemeSwitch';
import { Logo } from '@/components/layouts/MainLayout/Logo';
import { LoginModal } from '@/components/auth/LoginModal';
import { useAuthContext } from '@/components/providers/AuthProvider';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useMediaQuery } from 'usehooks-ts';
export const Header = () => {
  const [openLogin, setOpenLogin] = useState(false);
  const [isOpenSheet, setIsOpenSheet] = useState(false);
  const [openSearchModal, setOpenSearchModal] = useState(false);
  const { name, id, handleLogout } = useAuthContext();
  const matches = useMediaQuery(`(max-width: 400px)`);

  return (
    <div className="flex items-center justify-between gap-3 py-4">
      <div className="flex items-center gap-2">
        <div className="block h-max md:hidden">
          <Sheet open={isOpenSheet} onOpenChange={setIsOpenSheet}>
            <SheetTrigger>
              {/*<Button size="icon" variant="secondary">*/}
              <MenuIcon
                className="translate-y-1"
                width={matches ? '16' : '20'}
                height={matches ? '16' : '20'}
              />
              {/*</Button>*/}
            </SheetTrigger>
            <SheetContent side="left" className={'bg-homeMenuBg'}>
              <HomeMenu isMobile={true} actionClose={() => setIsOpenSheet(false)} />
            </SheetContent>
          </Sheet>
        </div>
        <Link href={'/'}>
          <Logo />
        </Link>
      </div>
      <div className="flex items-center gap-2">
        <ThemeSwitch />
        <div className="hidden md:block">
          <SearchHeader />
        </div>
        <div className="block md:hidden">
          <Dialog open={openSearchModal} onOpenChange={setOpenSearchModal}>
            <DialogTrigger asChild>
              <Button size={matches ? 'sm' : 'icon'} variant="secondary">
                <SearchIcon width={matches ? '16' : '20'} height={matches ? '16' : '20'} />
              </Button>
            </DialogTrigger>
            <DialogContent className="top-[10%] min-w-[90dvw]">
              <div className="mt-5">
                <SearchHeader onClose={() => setOpenSearchModal(false)} />
              </div>
            </DialogContent>
          </Dialog>
        </div>
        {id ? (
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Button variant="ghost">
                <p className="hidden md:block">{name}</p>
                <div className="block md:hidden">
                  <User width={matches ? '16' : '20'} height={matches ? '16' : '20'} />
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Button
            size={matches ? 'sm' : 'default'}
            className="flex items-center gap-1 font-semibold"
            onClick={() => setOpenLogin(true)}
          >
            <EnterIcon height={18} width={18} /> <p className="hidden md:block">Sign In</p>
          </Button>
        )}
      </div>
      <LoginModal open={openLogin} onOpenChange={(open) => setOpenLogin(open)} />
    </div>
  );
};
