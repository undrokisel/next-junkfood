'use client';

import React, { useEffect, useState } from 'react';
import { cn } from '@/shared/lib/utils';
import { ArrowUpDown } from 'lucide-react';
import { useWindowSize } from 'react-use';
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
  const [maxBarLength, setMaxBarLength] = useState(6);
  const [barSlice, setBarSlice] = useState<Category[]>([]);
  const [dropdownSlice, setDropdownSlice] = useState<Category[]>([]);

  const categoryActiveId = useCategoryStore((state) => state.activeId);

  const { width } = useWindowSize();
  // if (categories.length > maxBarLength) {
  //   barSlice = categories.slice(0, maxBarLength);
  //   dropdownSlice = categories.slice(maxBarLength, categories.length);
  // }

  useEffect(() => {
    setBarSlice(categories.slice(0, maxBarLength));
    setDropdownSlice(categories.slice(maxBarLength, categories.length));
  }, [maxBarLength, categories]);

  useEffect(() => {
    const getMaxBarValue = (w: number) => {
      if (w > 900) return 7;
      if (w > 750) return 6;
      if (w > 650) return 5;
      if (w > 550) return 4;
      if (w > 450) return 3;
      if (w > 350) return 2;
      return 1;
    };
    setMaxBarLength(getMaxBarValue(width));
  }, [width]);

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
                text={`${category.name[0].toUpperCase()}${category.name.slice(1)}`}
                categoryId={category.id}
                href={`/#${category.name}`}
                className='my-1 '
              />
            ))}
          </PopoverContent>
        </Popover>
      )}
    </ul>
  );
};
