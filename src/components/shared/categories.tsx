'use client';

import React from 'react';
import { cn } from '@/shared/lib/utils';
import { ArrowUpDown } from 'lucide-react';
import { useCategoryStore } from '../../store/category';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { OtherPopup } from './other-popup';

export interface Category {
  name: string;
  id: number;
}
interface Props {
  categories: Category[];
  className?: string;
}

export const Categories: React.FC<Props> = ({ categories, className }) => {
  const categoryActiveId = useCategoryStore((state) => state.activeId);

  let barSlice;
  let dropdownSlice;
  const maxBarLength = 6;
  if (categories.length > maxBarLength) {
    barSlice = categories.slice(0, maxBarLength);
    dropdownSlice = categories.slice(maxBarLength, categories.length);
  }

  return (
    <ul
      className={cn(`inline-flex gap-1 bg-gray-50 p-1 rounded-md`, className)}
    >
      {barSlice &&
        barSlice.map((category, index) => (
          <li key={index}>
            <a
              href={`/#${category.name}`}
              className={cn(
                'flex items-center font-bold h-11 rounded-md px-5',
                categoryActiveId === category.id &&
                  `shadow-md shadow-gray-400 
              text-primary bg-white`
              )}
            >
              <button>
                {category.name[0].toUpperCase() + category.name.slice(1)}
              </button>
            </a>
          </li>
        ))}

      {dropdownSlice && (
        <Popover>
          <PopoverTrigger
            className={cn(
              'flex items-center font-bold h-11 rounded-md px-5 gap-2 '
            )}
          >
            <span>Ещё</span>
            <ArrowUpDown size='16' />
          </PopoverTrigger>
          <PopoverContent className='w-full'>
            {dropdownSlice.map((category, index) => (
              <OtherPopup
                key={index}
                text={category.name}
                categoryId={category.id}
                href={`/#${category.name}`}
                className='capitalize my-1'
              />
            ))}
          </PopoverContent>
        </Popover>
      )}
    </ul>
  );
};
