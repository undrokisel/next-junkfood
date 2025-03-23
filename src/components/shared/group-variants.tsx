import React from 'react';
import { cn } from '@/shared/lib/utils';

export type Variant = {
  name: string;
  value: string;
  disabled?: boolean;
};

interface Props {
  variants: readonly Variant[];
  onClick?: (value: Variant['value']) => void;
  value?: Variant['value'];
  className?: string;
}

export const GroupVariants: React.FC<Props> = ({
  variants,
  onClick,
  value,
  className,
}) => {
  return (
    <div
      className={cn(
        className,
        'flex justify-between bg-[#F3F3F7] rounded-3xl p-1 select-none'
      )}
    >
      {variants.map((item) => (
        <button
          onClick={() => onClick?.(item.value)}
          key={item.name}
          className={cn(
            'flex items-center justify-center cursor-pointer h-[30px] px-5 flex-1 rounded-3xl transition-all duration-400 text-sm',
            {
              'bg-white shadow': item.value === value,
              'text-gray-500 opacity-50 pointer-events-none': item.disabled,
            }
          )}
        >
          {item.name}
        </button>
      ))}
    </div>
  );
};
