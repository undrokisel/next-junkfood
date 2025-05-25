'use client';

import React from 'react';
import { cn } from '@/shared/lib/utils';
import { useIngredients, useFilters, useQueryFilters } from '@/hooks';
import { Title } from './title';
import { Input, Slider } from '../ui';
import { CheckboxFilterGroup } from './checkbox-filter-group';

interface Props {
  className?: string;
}

export const Filters: React.FC<Props> = ({ className }) => {
  const { ingredients, ingredientsLoading } = useIngredients();
  const filters = useFilters();
  useQueryFilters(filters);

  const updatePriceRange = (prices: number[]) => {
    filters.setPriceRange('priceFrom', prices[0]);
    filters.setPriceRange('priceTo', prices[1]);
  };

  const ingredientsItems = ingredients.map((item) => ({
    // text: item.name,
    text: item.name.toLowerCase(),
    value: String(item.id),
  }));

  return (
    <aside className={cn(`min-h-[100vh]`, className)}>
      <Title text='Фильтры' size='sm' className='font-bold' />

      {/* top checkboxes */}

      {/* sizes checkboxes */}
      <CheckboxFilterGroup
        title='Размер шаурмы'
        className='mt-2'
        items={[
          { text: 'мини', value: '1' },
          { text: 'стандарт', value: '2' },
          { text: 'богатырь', value: '3' },
        ]}
        onCheckboxClick={filters.toggleSizes}
        selectedIds={filters.selectedSizes}
        name='sizes'
      />

      {/* dought checkboxes */}
      {/* <CheckboxFilterGroup
        title='Варианты теста'
        className='mt-5'
        items={[
          { text: 'сырное', value: '1' },
          { text: 'стандартное', value: '2' },
          { text: 'томатное', value: '3' },
        ]}
        onCheckboxClick={filters.toggleDought}
        selectedIds={filters.selectedDought}
        name='dought'
      /> */}

      {/* price range filter */}
      <div className='flex flex-col gap-4 mt-5'>
        <div className='flex gap-1'>
          <Input
            type='number'
            placeholder='0'
            min='0'
            max='1000'
            value={String(filters.priceRange.priceFrom)}
            onChange={(e) =>
              filters.setPriceRange('priceFrom', Number(e.target.value))
            }
            className={`
              bg-green-100 transition-all duration-300 
              focus:bg-amber-100
              hover:bg-amber-100
              `}
          />
          <Input
            type='number'
            placeholder='1000'
            min='0'
            max='1000'
            value={String(filters.priceRange.priceTo)}
            onChange={(e) =>
              filters.setPriceRange('priceTo', Number(e.target.value))
            }
            className={`
              bg-green-100 transition-all duration-300 
              focus:bg-amber-100
              hover:bg-amber-100
              `}
          />
        </div>
        <Slider
          min={0}
          max={1000}
          value={[filters.priceRange.priceFrom, filters.priceRange.priceTo]}
          step={10}
          className={cn('w-[90%]', className)}
          onValueChange={updatePriceRange}
        />
      </div>

      {/* ingridients bottom */}
      <CheckboxFilterGroup
        title='Ингредиенты: '
        items={ingredientsItems}
        defaultItems={ingredientsItems.slice(0, 6)}
        className='mt-5'
        limit={5}
        loading={ingredientsLoading}
        onCheckboxClick={filters.toggleIngredients}
        selectedIds={filters.selectedIngredients}
        name='ingredients'
      />
    </aside>
  );
};
