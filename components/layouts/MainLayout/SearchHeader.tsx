'use client';

import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { useDebounceValue } from 'usehooks-ts';
import { useEffect, useRef, useState } from 'react';
import { LoadingIcon } from '@/components/icons';
import { cn } from '@/lib/utils/utils';
import { SearchHeaderPopover } from '@/components/layouts/MainLayout/SearchHeaderPopover';
import useClickOutside from '@/hooks/useClickOutside';
import { teleService } from '@/services/tele.service';

interface SearchHeaderProps {
  onClose?: () => void;
}

export const SearchHeader = ({ onClose }: SearchHeaderProps) => {
  const [val, setValue] = useState('');
  const [debouncedValue] = useDebounceValue(val, 500);
  const [loading, setLoading] = useState<boolean>(false);
  const [isFocus, setIsFocus] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);
  const [searchData, setSearchData] = useState<string[]>([]);

  useClickOutside(ref, () => setIsFocus(false));

  const handleSearch = async () => {
    try {
      if (!debouncedValue) {
        setSearchData([]);
        return;
      }
      const res = await teleService.searchAppTrack(debouncedValue);
      setSearchData(res.data.data);
    } catch (e) {
      console.log(e);
      setSearchData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleSearch().finally();
  }, [debouncedValue]);

  return (
    <div className="relative" ref={ref}>
      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#0F0F0F]">
        {loading ? <LoadingIcon /> : <Search size={20} />}
      </div>
      <Input
        value={val}
        size={isFocus ? 70 : 30}
        onFocus={() => {
          setIsFocus(true);
        }}
        placeholder="Search apps. channel. contact or coin..."
        className={cn('bg-white pl-10 text-[#0F0F0F] transition')}
        onChange={(e) => {
          if (e.target.value.length >= 2) {
            setLoading(true);
          }
          setValue(e.target.value);
        }}
      />
      {isFocus && (
        <SearchHeaderPopover
          searchData={searchData}
          onClose={() => {
            // eslint-disable-next-line @typescript-eslint/no-unused-expressions
            onClose && onClose();
            setIsFocus(false);
          }}
          val={debouncedValue}
        />
      )}
    </div>
  );
};
