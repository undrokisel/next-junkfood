'use client';

import React, { useEffect, useState } from 'react';
import { cn } from '@/shared/lib/utils';
import { ArrowUpDown } from 'lucide-react';
import { useWindowSize } from 'react-use';
import { motion } from 'motion/react';
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
      className={cn(
        `inline-flex gap-1 bg-gray-50 
        p-1 rounded-md bg-transparent`,
        className
      )}
    >
      {barSlice &&
        barSlice.map((category, index) => (
          <li key={index}>
            <motion.div
              initial={{ y: -20 }}
              // animate={{ opacity: 1 }}
              whileInView={{ y: 0 }}
              transition={{ duration: 0.4 + index / 100 }}
              exit={{ opacity: 0 }}
              whileHover={{ y: 2 }}
              whileTap={{ y: 2 }}
            >
              <a
                href={`/#${category.name}`}
                className={cn(
                  `flex items-center font-bold h-11 rounded-md px-5 
              transition-colors duration-300
              hover:text-amber-200 
              focus:text-amber-200 
              focus:border-none
              focus:outline-none
              `,
                  categoryActiveId === category.id &&
                    `shadow-md shadow-gray-400 
              text-primary bg-white bg-green-50 
              hover:text-primary bg-amber-200
              focus:text-primary
              
              `
                )}
              >
                <div>
                  {category.name[0].toUpperCase() + category.name.slice(1)}
                </div>
              </a>
            </motion.div>
          </li>
        ))}

      {dropdownSlice && (
        <Popover>
          <PopoverTrigger
            className={cn(
              `flex items-center font-bold h-11 rounded-md px-5 gap-2 
              transition-all duration-300 
              hover:text-amber-200
              focus:text-amber-200
              focus:border-none
              hover:border-none
              focus:outline-none
              hover:outline-none
              `
            )}
          >
            <span>Ещё</span>
            <ArrowUpDown size='16' />
          </PopoverTrigger>
          <PopoverContent className='w-full bg-green-100'>
            {dropdownSlice.map((category, index) => (
              <OtherPopup
                key={index}
                text={`${category.name[0].toUpperCase()}${category.name.slice(1)}`}
                categoryId={category.id}
                href={`/#${category.name}`}
                className='my-1 bg-green-50 
                  hover:bg-amber-200
                  focus:bg-amber-200
                '
              />
            ))}
          </PopoverContent>
        </Popover>
      )}
    </ul>
  );
};
