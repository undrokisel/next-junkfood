import React from 'react';
import { cn } from '@/lib/utils';
import { Categories } from './categories';
import { Popover } from '../ui';
import { PopoverContent, PopoverTrigger } from '../ui/popover';
import { SortPopup } from './sort-popup';
import { Container } from './container';

interface Props {
  className?: string;
}

const categories = ['шаурма', 'добавки', 'комбо', 'акции', 'десерты'];

const activeIndex = 1;

export const TopBar: React.FC<Props> = ({ className }) => {
  return (
    <div
      className={cn(
        `sticky top-0 bg-white shadow-lg shadow-black/5 z-10 py-5`,
        className
      )}
    >
      <Container className='flex justify-between items-center'>
        <Categories categories={categories} activeIndex={activeIndex} />

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
