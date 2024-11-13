'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { useCategoryStore } from '../../store/category';

export interface Category {
  name: string;
  id: number;
}
interface Props {
  className?: string;
  categories: Category[];
}

export const Categories: React.FC<Props> = ({ className, categories }) => {
  const categoryActiveId = useCategoryStore((state) => state.activeId);
  return (
    <ul
      className={cn(`inline-flex gap-1 bg-gray-50 p-1 rounded-md`, className)}
    >
      {categories.map(({ name, id }, index) => {
        return (
          <li key={index}>
            <a
              href={`/#${name}`}
              className={cn(
                'flex items-center font-bold h-11 rounded-md px-5',
                categoryActiveId === id &&
                  `shadow-md shadow-gray-400 
                                            text-primary bg-white`
              )}
            >
              <button>{name}</button>
            </a>
          </li>
        );
      })}
    </ul>
  );
};
