'use client';

import React from 'react';
import { cn } from '@/shared/lib/utils';
import { log } from 'console';

type Variant = {
  text: string;
  value: string;
  disabled?: boolean;
};

interface Props {
  items: readonly Variant[];
  onClick?: (value: Variant['value']) => void;
  value?: Variant['value'];
  className?: string;
}

export const GroupVariants: React.FC<Props> = ({ className, items, onClick, value }) => {
  return (
    <div className={cn(className, 'flex justify-between bg=[#f3f3f7] rounded-3xl p-1 select-none')}>
      {items.map((item) => (
        <button
          key={item.value}
          onClick={() => onClick?.(item.value)}
          className={cn(
            'flex items-center justify-center h-[30px] px-5 flex-1 rounded-3xl transition-all duration-400 text-sm',
            {
              'bg-white shadow': item.value === value,
              'text-gray-500 opacity-50 pointer-events-none': item.disabled,
            }
          )}
        >
          {item.text}
        </button>
      ))}
    </div>
  );
};