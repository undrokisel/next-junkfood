'use client';

import React from 'react';
import { cn } from '@/shared/lib/utils';
import { useIngredients, useFilters, useQueryFilters } from '@/hooks';
import { useWindowSize } from 'react-use';
import { CheckboxFilterCombobox } from './mob-filters/checkbox-filter-combobox';
import { PriceFilterCombobox } from './mob-filters/price-filter-combobox';

interface Props {
  className?: string;
}

export const FiltersMob: React.FC<Props> = ({ className }) => {
  const { width } = useWindowSize();
  const { ingredients } = useIngredients();

  const filters = useFilters();
  useQueryFilters(filters);

  if (width >= 800) return null;

  const ingredientsItems = ingredients.map((item) => ({
    // text: item.name,
    text: item.name.toLowerCase(),
    value: String(item.id),
  }));

  return (
    <section className={cn(``, className)}>
      {/* <Title text='Фильтры' size='sm' className='font-bold' /> */}

      {/* top checkboxes */}

      <div className='flex gap-2 flex-wrap'>
        {/* sizes checkboxes */}
        <CheckboxFilterCombobox
          title='Размер шаурмы'
          items={[
            { text: 'мини', value: '1' },
            { text: 'стандарт', value: '2' },
            { text: 'богатырь', value: '3' },
          ]}
          onCheckboxClick={filters.toggleSizes}
          selectedIds={filters.selectedSizes}
          name='sizes'
        />

        {/* ingridients bottom */}
        <CheckboxFilterCombobox
          title='Ингредиенты: '
          items={ingredientsItems}
          defaultItems={ingredientsItems.slice(0, 6)}
          limit={5}
          onCheckboxClick={filters.toggleIngredients}
          selectedIds={filters.selectedIngredients}
          name='ingredients'
        />

        <PriceFilterCombobox filters={filters} />
      </div>
    </section>
  );
};
