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
        `flex 
        _flex-col _sm:flex-row items-center
        _max-w-[200px] sm:max-w-[100%] flex-wrap sm:flex-nowrap
        justify-between bg-[#F3F3F7] rounded-3xl p-1 select-none `,
        className
      )}
    >
      {variants.map((item) => (
        <button
          onClick={() => onClick?.(item.value)}
          key={item.name}
          className={cn(
            `flex items-center justify-center 
            cursor-pointer 
            h-[30px] px-5 py-2 _max-w-[150px]
            flex-1 w-full
            rounded-3xl transition-all duration-400 text-sm`,
            {
              'bg-amber-100 shadow': item.value === value,
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
