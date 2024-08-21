import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '../ui';
import { ArrowUpDown } from 'lucide-react';

interface Props {
  className?: string;
  sortBy?: string;
}

const typeSort = [
  'возрастание цены',
  'убывание цены',
  'алфавиту',
  'популярные',
];

export const SortPopup: React.FC<Props> = ({ className, sortBy }) => {
  return (
    <div
      className={cn(
        `
                    inline-flex
                    items-center
                    gap-1
                    bg-gray-50
                    px-5 h-[52px]
                    rounded-md
                    cursor-pointer
                `,
        className
      )}
    >
      <ArrowUpDown size='16' />
      <b>Сортировать: </b>
      <span className='text-primary'>{sortBy}</span>
    </div>
  );
};
