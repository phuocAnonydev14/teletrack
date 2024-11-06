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

  useClickOutside(ref, () => setIsFocus(false));

  const handleSearch = async () => {
    try {
      if (!debouncedValue) return;
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
    <div className="flex flex-col gap-6 rounded-xl bg-homeMenuBg px-5 py-10 md:px-[50px]">
      <div className="relative" ref={ref}>
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#0F0F0F]">
          {loading ? <LoadingIcon /> : <Search size={20} />}
        </div>
        <Input
          placeholder="Enter apps you want to compare here..."
          className="bg-white pl-10 pr-4"
          onFocus={() => {
            setIsFocus(true);
          }}
          value={val}
          onChange={(e) => {
            setLoading(true);
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
            val={debouncedValue}
            setResults={setResults}
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
    </div>
  );
};

export const SelectedBtn = ({ name, onCancel }: { name: string; onCancel: () => void }) => {
  return (
    <Button
      variant="secondary"
      className="flex items-center gap-2 bg-[#BEFCFF] font-bold text-[#0F0F0F] hover:bg-[#9ff7fb]"
    >
      {name}
      <X size={18} onClick={onCancel} />
    </Button>
  );
};
