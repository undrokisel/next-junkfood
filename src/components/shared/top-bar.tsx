import React from 'react';
import { cn } from '@/lib/utils';
import { Categories, Category } from './categories';
import { Popover } from '../ui';
import { PopoverContent, PopoverTrigger } from '../ui/popover';
import { SortPopup } from './sort-popup';
import { Container } from './container';

interface Props {
  className?: string;
}

const categories: Category[] = [
  { name: 'шаурма', id: 1 },
  { name: 'добавки', id: 2 },
  { name: 'комбо', id: 3 },
  { name: 'акции', id: 4 },
  { name: 'десерты', id: 5 },
];

export const TopBar: React.FC<Props> = ({ className }) => {
  return (
    <div
      className={cn(
        `sticky top-0 bg-white shadow-lg shadow-black/5 z-10 py-5`,
        className
      )}
    >
      <Container className='flex justify-between items-center'>
        <Categories categories={categories} />

        <Popover>
          <PopoverTrigger>
            <SortPopup sortBy='популярные' />
          </PopoverTrigger>
          <PopoverContent>
            <SortPopup sortBy='популярные' />
          </PopoverContent>
        </Popover>
      </Container>
    </div>
  );
};
