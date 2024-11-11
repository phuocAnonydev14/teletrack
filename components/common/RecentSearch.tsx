'use client';
import { SelectedBtn } from '@/app/compare/components/SelectApp';
import { cn } from '@/lib/utils/utils';
import { useEffect, useState } from 'react';
import { addKeyLocal, getKeyLocal, removeKeyLocal } from '@/lib/utils/manageKeyLocal';
import { EKeyLocal } from '@/common/enums/keysLocal';
import { useQueryState } from 'nuqs';

export interface RecentSearchProps {
  isCompare: boolean;
}

export const RecentSearch = ({ isCompare }: RecentSearchProps) => {
  const [recentSearch, setRecentSearch] = useState([]);
  const [appQuery, setAppQuery] = useQueryState('app');

  useEffect(() => {
    (() => {
      const recent = getKeyLocal(EKeyLocal.CONPARE);
      setRecentSearch(recent.reverse());
    })();
  }, []);

  if (recentSearch.length === 0) return null;

  return (
    <div className="flex flex-col gap-3">
      <TitleBox name="Recent" isCompare={isCompare} />
      <div className="flex flex-wrap items-center gap-3">
        {recentSearch.map((app: string) => {
          const username = app.replace('@', '');
          return (
            <SelectedBtn
              isRecent
              onCancel={() => {
                removeKeyLocal(EKeyLocal.CONPARE, app);
                setRecentSearch(recentSearch.filter((r) => r !== app));
              }}
              key={app}
              name={app}
              onChoose={() => {
                const currentAppQuery: string[] = JSON.parse(appQuery || '[]') || [];
                const existApp = currentAppQuery.find((item) => item === username);
                if (existApp || currentAppQuery.length >= 5) {
                  return;
                }
                addKeyLocal(EKeyLocal.CONPARE, username);
                setAppQuery(JSON.stringify([...currentAppQuery, username])).finally();
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

const TitleBox = ({ name, isCompare }: { name: string } & RecentSearchProps) => {
  return (
    <div className={cn('w-max rounded-lg bg-[#BEFCFF] px-3 py-1', isCompare && 'bg-tableBg')}>
      <p className={cn('my-0 text-base font-semibold text-black')}>{name}</p>
    </div>
  );
};
