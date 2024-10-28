'use client';

import { cn } from '@/lib/utils';
import { useMemo } from 'react';
import {RadioGroupItem} from "@/components/ui/radio-group";
import {Label} from "@/components/ui/label";

export const TagRank = (props: { name: string; action: () => void; selectedCate: string }) => {
  const { name, action, selectedCate } = props;

  const selectedRank = useMemo(() => selectedCate === name, [selectedCate, name]);

  return (
    <div
      onClick={action}
      className={cn(
        'cursor-pointer text-xl font-semibold capitalize flex items-center gap-1',
        selectedRank && 'bg-linear border-primary text-white',
      )}
    >
      <RadioGroupItem value={name} id={name} />
      <Label htmlFor={name} className="cursor-pointer translate-y-[1px]">{name}</Label>
    </div>
  );
};
