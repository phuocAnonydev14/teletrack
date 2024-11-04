'use client';

import { SearchHeader } from '@/components/layouts/MainLayout/SearchHeader';
import { Button } from '@/components/ui/button';
import { EnterIcon } from '@/components/icons';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { useState } from 'react';
import { MenuIcon, SearchIcon } from 'lucide-react';
import { HomeMenu } from '@/components/layouts/MainLayout/HomeMenu';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import Link from 'next/link';
import { ThemeSwitch } from '@/components/common/ThemeSwitch';
import { Logo } from '@/components/layouts/MainLayout/Logo';
import { LoginModal } from '@/components/layouts/MainLayout/LoginModal';
import { useAuthContext } from '@/components/providers/AuthProvider';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
export const Header = () => {
  const [openLogin, setOpenLogin] = useState(false);
  const [isOpenSheet, setIsOpenSheet] = useState(false);
  const [openSearchModal, setOpenSearchModal] = useState(false);
  const { name, id, handleLogout } = useAuthContext();

  return (
    <div className="flex items-center justify-between gap-3 py-5">
      <div className="flex items-center gap-2">
        <div className="block md:hidden">
          <Sheet open={isOpenSheet} onOpenChange={setIsOpenSheet}>
            <SheetTrigger>
              {/*<Button size="icon" variant="secondary">*/}
              <MenuIcon />
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
              <Button size="icon" variant="secondary">
                <SearchIcon />
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
              <Button variant="ghost">{name}</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Button
            className="flex items-center gap-1 text-lg font-semibold"
            onClick={() => setOpenLogin(true)}
          >
            <EnterIcon height={20} width={20} /> <p className="hidden md:block">Sign Up</p>
          </Button>
        )}
      </div>
      <LoginModal open={openLogin} onOpenChange={(open) => setOpenLogin(open)} />
    </div>
  );
};
