'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface LoginModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const LoginModal = (props: LoginModalProps) => {
  const { onOpenChange, open } = props;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-homeMenuBg">
        <DialogHeader>
          <DialogTitle className="mb-2 text-3xl font-bold">LOGIN</DialogTitle>
          <DialogDescription className="bg-tableRowOdd p-8 font-semibold">
            <p className="mb-2">You will be sent to a dialog with our @botgecko_bot.</p>
            <p>Press the /start button in the dialog with the bot</p>
            <Link href={'https://t.me/botgecko_bot'} target="_blank">
              <Button className="mt-8 w-full">Sign In With Telegram</Button>
            </Link>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
