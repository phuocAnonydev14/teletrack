'use client';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

export const SelectApp = () => {
  return (
    <div className="flex flex-col gap-9 rounded-xl bg-[#252C33] px-[50px] py-10">
      <Input
        placeholder="Enter apps you want to compare here..."
        className="bg-white text-[#0F0F0F] placeholder:text-[#0F0F0F]"
      />
      <div className="flex items-center gap-3">
        {['SEED', 'CATIA'].map((item) => {
          return <SelectedBtn name={item} key={item} />;
        })}
      </div>
    </div>
  );
};

export const SelectedBtn = ({ name }: { name: string }) => {
  return (
    <Button
      variant="secondary"
      className="flex items-center gap-2 bg-[#BEFCFF] font-bold text-[#0F0F0F] hover:bg-[#9ff7fb]"
    >
      {name}
      <X size={18} />
    </Button>
  );
};
