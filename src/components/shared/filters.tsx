'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { Title } from './title';
import { Input, Slider } from '../ui';
import { FilterCheckbox } from './filter-checkbox';
import { CheckboxFilterGroup } from './checkbox-filter-group';

interface Props {
  className?: string;
}

const items = [
  { text: 'сыр', value: 'сыр' },
  { text: 'бекон', value: 'бекон' },
  { text: 'пепперони', value: 'пепперони' },
  { text: 'ананас', value: 'ананас' },
  { text: 'картофель фри', value: 'картофель' },
  { text: 'капуста', value: 'капуста' },
];

export const Filters: React.FC<Props> = ({ className }) => {
  return (
    <aside
      className={cn(
        `
            min-h-[100vh]
        `,
        className
      )}
    >
      <Title text='Фильтры' size='sm' className='font-bold' />

      {/* checkboxes */}
      <div className='flex flex-col gap-4 mt-5'>
        <FilterCheckbox text='Новинки' value='new' />
        <FilterCheckbox text='Собрать свое' value='collect' />
      </div>

      {/* price range filter */}
      <div className='flex flex-col gap-4 mt-10'>
        <Title text='Цена: от и до' size='xs' />
        <div className='flex'>
          <Input type='number' placeholder='0' min='0' max='10000' />
          <Input type='number' placeholder='10000' min='0' max='10000' />
        </div>
        <Slider
          min={0}
          max={10000}
          step={1}
          className={cn('w-[90%]', className)}
        />
      </div>

      {/* ingridients */}
      <CheckboxFilterGroup
        title='Ингридиенты: '
        items={items}
        defaultItems={items.slice(0, 5)}
        className='mt-5'
        limit={5}
      />
    </aside>
  );
};
