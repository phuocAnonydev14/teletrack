'use client';

import { SearchHeader } from '@/components/layouts/MainLayout/SearchHeader';
import { Button } from '@/components/ui/button';
import { EnterIcon } from '@/components/icons';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useState } from 'react';
import { MenuIcon, SearchIcon } from 'lucide-react';
import { HomeMenu } from '@/components/layouts/MainLayout/HomeMenu';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import Link from 'next/link';
import { useMediaQuery } from 'usehooks-ts';
import { ThemeSwitch } from '@/components/common/ThemeSwitch';
import { Logo } from '@/components/layouts/MainLayout/Logo';
export const Header = () => {
  const [openLogin, setOpenLogin] = useState(false);
  const [isOpenSheet, setIsOpenSheet] = useState(false);
  const [openSearchModal, setOpenSearchModal] = useState(false);
  const matches = useMediaQuery('(max-width: 768px)');
  return (
    <div className="flex items-center justify-between gap-6 py-5">
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
        <Button
          className="flex items-center gap-1 text-lg font-semibold"
          onClick={() => setOpenLogin(true)}
        >
          <EnterIcon height={20} width={20} /> Sign Up
        </Button>
      </div>
      <LoginModal open={openLogin} onOpenChange={(open) => setOpenLogin(open)} />
    </div>
  );
};

const LoginModal = ({
  onOpenChange,
  open,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-homeMenuBg">
        <DialogHeader>
          <DialogTitle className="mb-2 text-3xl font-bold">LOGIN</DialogTitle>
          <DialogDescription className="bg-tableRowOdd p-8 font-semibold">
            <p className="mb-2">You will be sent to a dialog with our @bot.</p>
            <p>Press the /start button in the dialog with the bot</p>
            <Button className="mt-8 w-full">Sign In With Telegram</Button>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
