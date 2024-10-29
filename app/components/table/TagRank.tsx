'use client';

import { cn } from '@/lib/utils';
import { useMemo } from 'react';
import { RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

export const TagRank = (props: { name: string; action: () => void; selectedCate: string }) => {
  const { name, action, selectedCate } = props;

  const selectedRank = useMemo(() => selectedCate === name, [selectedCate, name]);

  return (
    <div onClick={action} className={cn('flex cursor-pointer items-center gap-2')}>
      <RadioGroupItem value={name} id={name} />
      <Label
        onClick={action}
        htmlFor={name}
        className="text-red z-10 translate-y-[1px] cursor-pointer text-lg font-semibold capitalize md:text-xl"
      >
        <p className="text-primary-foreground">{name}</p>
      </Label>
    </div>
  );
};
