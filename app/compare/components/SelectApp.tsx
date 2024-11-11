'use client';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useDebounceValue } from 'usehooks-ts';
import useClickOutside from '@/hooks/useClickOutside';
import { SearchPopover } from '@/app/compare/components/SearchPopover';
import { LoadingIcon } from '@/components/icons';
import { teleService } from '@/services/tele.service';
import { getLogoUrl } from '@/lib/utils/image.util';
import { useSearchParams } from 'next/navigation';
import { cn } from '@/lib/utils/utils';
import { RecentSearch } from '@/components/common/RecentSearch';
import { useTheme } from 'next-themes';

interface SelectAppProps {
  setResults: (val: string[]) => void;
  results: string[];
}

export const SelectApp = (props: SelectAppProps) => {
  const { setResults, results } = props;
  const [val, setValue] = useState('');
  const [debouncedValue] = useDebounceValue(val, 500);
  const [loading, setLoading] = useState<boolean>(false);
  const [isFocus, setIsFocus] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);
  const [searchData, setSearchData] = useState<string[]>([]);
  const searchParams = useSearchParams();
  const initApp = searchParams.get('app');

  useClickOutside(ref, () => setIsFocus(false));

  // const handleCheckInitApp = async () => {
  //   try {
  //     if (typeof initApp !== 'string') return;
  //     await teleService.getAppDetail(initApp);
  //     setResults([initApp]);
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };

  // useEffect(() => {
  //   handleCheckInitApp().finally();
  // }, [initApp]);

  const handleSearch = async () => {
    try {
      if (!debouncedValue) return;
      const res = await teleService.searchAppTrack(debouncedValue, 'bot');
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
    <div className="flex flex-col gap-6 rounded-xl bg-homeMenuBg px-5 py-10 md:px-[50px]">
      <div className="relative" ref={ref}>
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#0F0F0F]">
          {loading ? <LoadingIcon /> : <Search size={20} />}
        </div>
        <Input
          placeholder="Enter bot you want to compare here..."
          className="bg-white pl-10 pr-4"
          onFocus={() => {
            setIsFocus(true);
          }}
          value={val}
          onChange={(e) => {
            if (e.target.value.length >= 2) {
              setLoading(true);
            }
            setValue(e.target.value);
          }}
        />
        {debouncedValue && (
          <X
            className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
            size={20}
            onClick={() => setValue('')}
          />
        )}
        {isFocus && debouncedValue && (
          <SearchPopover
            onClose={() => setIsFocus(false)}
            results={results}
            searchData={searchData}
            val={val}
            setResults={setResults}
            loading={loading}
          />
        )}
      </div>

      <div className="flex flex-wrap items-center gap-3">
        {results.map((app) => {
          return (
            <SelectedBtn
              onCancel={() => setResults(results.filter((r) => r !== app))}
              name={app.replace('@', '')}
              key={app}
            />
          );
        })}
      </div>
      <RecentSearch isCompare />
    </div>
  );
};

export const SelectedBtn = ({
  name,
  onCancel,
  isRecent,
  onChoose,
}: {
  name: string;
  onCancel: () => void;
  isRecent?: boolean;
  onChoose?: () => void;
}) => {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';
  return (
    <Button
      variant="secondary"
      className={cn(
        'flex items-center gap-2 bg-[#BEFCFF] font-bold text-[#0F0F0F] hover:bg-[#9ff7fb] hover:text-[#0F0F0F]',
        isRecent &&
          `${isDark ? 'bg-[#394551]' : 'bg-tableBg'} ${isDark ? 'text-white' : 'text-black'}`,
      )}
      onClick={onChoose}
    >
      <img src={getLogoUrl(name)} className="h-6 w-6 rounded-full" alt="logo" />
      {name}
      <X
        size={16}
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
          onCancel();
        }}
      />
    </Button>
  );
};
