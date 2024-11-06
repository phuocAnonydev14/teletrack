'use client';

import { PropsWithChildren } from 'react';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils/utils';

interface SearchPopoverProps extends PropsWithChildren {
  val: string;
  searchData: string[];
  results: string[];
  setResults: (val: string[]) => void;
}

export const SearchPopover = (props: SearchPopoverProps) => {
  const { searchData, val, setResults, results } = props;
  return (
    <Card className="absolute left-0 top-[50px] z-40 max-h-[70dvh] min-h-20 w-full overflow-auto rounded-lg p-4">
      {searchData.length === 0 && (
        <>
          <p className="text-center font-semibold">No app found</p>
        </>
      )}
      {searchData.length > 0 && (
        <div className="flex flex-col gap-1">
          {searchData.map((app) => {
            const isSelected = results.includes(app);
            return (
              <div
                key={app}
                className={cn(
                  'cursor-pointer rounded-md px-2 py-1 hover:bg-gray-200',
                  isSelected && 'bg-gray-300',
                )}
                onClick={() => {
                  if (isSelected) {
                    setResults(results.filter((r) => r !== app));
                    return;
                  }
                  setResults([...results, app]);
                }}
              >
                <p>{app.replace('@', '')}</p>
              </div>
            );
          })}
        </div>
      )}
    </Card>
  );
};
