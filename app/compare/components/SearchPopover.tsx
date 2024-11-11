'use client';

import { PropsWithChildren } from 'react';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils/utils';
import { toast } from 'sonner';
import { getLogoUrl } from '@/lib/utils/image.util';
import { addKeyLocal } from '@/lib/utils/manageKeyLocal';
import { EKeyLocal } from '@/common/enums/keysLocal';

interface SearchPopoverProps extends PropsWithChildren {
  val: string;
  searchData: string[];
  results: string[];
  setResults: (val: string[]) => void;
  onClose: () => void;
  loading: boolean;
}

export const SearchPopover = (props: SearchPopoverProps) => {
  const { searchData, val, setResults, results, onClose, loading } = props;

  const handleSelect = (username: string, isSelected: boolean) => {
    if (results.length >= 5) {
      toast.error("You can't select more than 5 apps");
      return;
    }
    if (isSelected) setResults(results.filter((r) => r !== username));
    else {
      setResults([...results, username]);
      addKeyLocal(EKeyLocal.CONPARE, username);
    }
    onClose();
  };

  return (
    <Card className="absolute left-0 top-[50px] z-40 max-h-[50dvh] min-h-20 w-full overflow-auto rounded-lg p-4">
      {searchData.length === 0 && !loading && (
        <>
          <p className="text-center font-semibold">
            {val.length < 2 ? 'Search at least 2 letters' : 'No bot found'}
          </p>
        </>
      )}
      {searchData.length > 0 && (
        <div className="flex flex-col gap-1">
          {searchData.map((app) => {
            const username = app.replace('@', '');
            const isSelected = results.includes(username);
            return (
              <div
                key={app}
                className={cn(
                  'flex cursor-pointer items-center gap-2 rounded-md px-2 py-1 hover:bg-gray-200',
                  isSelected && 'bg-gray-300',
                )}
                onClick={() => handleSelect(username, isSelected)}
              >
                <img src={getLogoUrl(username)} className="h-7 w-7 rounded-full" alt="logo" />
                <p>{username}</p>
              </div>
            );
          })}
        </div>
      )}
    </Card>
  );
};
