'use client';

import { homeMenu } from '@/common/const/homeMenu';
import { cn } from '@/lib/utils/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface HomeMenuProps {
  isMobile?: boolean;
  actionClose?: () => void;
}

export const HomeMenu = (props: HomeMenuProps) => {
  const { isMobile, actionClose } = props;
  const pathname = usePathname();
  return (
    <div
      className={cn(
        `flex items-center justify-center gap-10 rounded-lg bg-homeMenuBg px-4 py-[14px]`,
        isMobile && 'flex-col',
      )}
    >
      {homeMenu.map((menu) => {
        const key = menu.id;
        let isActive;
        if (pathname.includes(menu.href)) isActive = true;
        if (pathname !== '/' && menu.href === '') isActive = false;
        return (
          <Link key={key} href={`/${menu.href}`} onClick={() => actionClose && actionClose()}>
            <div className="flex cursor-pointer items-center gap-2">
              {menu.icon && <img src={menu.icon} alt={menu.title} />}
              <p className={cn('text-lg font-semibold', isActive && 'text-linear')}>{menu.title}</p>
            </div>
          </Link>
        );
      })}
    </div>
  );
};
