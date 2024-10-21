'use client';

import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { useDebounceValue } from 'usehooks-ts';
import { useEffect, useRef, useState } from 'react';
import { LoadingIcon } from '@/components/icons';
import { cn } from '@/lib/utils';
import { SearchHeaderPopover } from '@/components/layouts/MainLayout/SearchHeaderPopover';
import useClickOutside from '@/hooks/useClickOutside';

export const SearchHeader = () => {
  const [debouncedValue, setValue] = useDebounceValue('', 500);
  const [loading, setLoading] = useState<boolean>(false);
  const [isFocus, setIsFocus] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useClickOutside(ref, () => setIsFocus(false));

  useEffect(() => {
    setLoading(false);
  }, [debouncedValue]);

  return (
    <div className="relative" ref={ref}>
      <div className="absolute left-1 top-1/2 -translate-y-1/2 text-[#0F0F0F]">
        {loading ? <LoadingIcon /> : <Search size={20} />}
      </div>
      <Input
        size={isFocus ? 100 : 30}
        onFocus={() => {
          setIsFocus(true);
        }}
        placeholder="Search apps. channel. contact or coin"
        className={cn('bg-white pl-7 text-[#0F0F0F] transition placeholder:text-[#0F0F0F]')}
        onChange={(e) => {
          setLoading(true);
          setValue(e.target.value);
        }}
      />
      {isFocus && debouncedValue && <SearchHeaderPopover val={debouncedValue} />}
    </div>
  );
};
