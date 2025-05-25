'use client';

import React, { ChangeEvent, useState } from 'react';
import { Button, Input, Skeleton } from '../ui';
import { FilterCheckbox, FilterCheckboxProps } from './filter-checkbox';

type Item = FilterCheckboxProps;

interface Props {
  title: string;
  items: Item[];
  defaultItems?: Item[];
  limit?: number;
  searchInputPlaceholder?: string;
  onCheckboxClick?: (id: string) => void;
  defaultValue?: string[];
  className?: string;
  loading?: boolean;
  selectedIds?: Set<string>;
  name?: string;
}

export const CheckboxFilterGroup: React.FC<Props> = ({
  title,
  className,
  items,
  defaultItems,
  limit = 3,
  loading = false,
  searchInputPlaceholder = 'Поиск...',
  // eslint-disable-next-line
  defaultValue,
  onCheckboxClick,
  selectedIds,
  name,
}) => {
  const [showAll, setIsShowAll] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const list = showAll
    ? items.filter((item) =>
        item.text.toLowerCase().includes(searchValue.toLocaleLowerCase())
      )
    : (defaultItems || items).slice(0, limit);

  const maxIndex = !showAll ? limit : items.length;

  const onChangeSearchInput = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  if (loading)
    return (
      <div className={className}>
        <p className='font-bold mb-3'>{title}</p>
        {Array.from({ length: limit }).map((_, i) => (
          <Skeleton key={i} className='w-full h-6 my-2 ' />
        ))}
      </div>
    );

  return (
    <div className={className}>
      <p className='font-bold mb-3'>{title}</p>

      {showAll && (
        <div className='mb-5'>
          <Input
            className='bg-gray-50 border-none'
            placeholder={searchInputPlaceholder}
            onChange={onChangeSearchInput}
          />
        </div>
      )}

      <div className='flex flex-col gap-2 max-h-96 pr-2 overflow-auto scrollbar'>
        {list.map(
          (item, index) =>
            index < maxIndex && (
              <div className='flex items-center space-x-2' key={index}>
                <FilterCheckbox
                  key={index}
                  text={item.text}
                  value={item.value}
                  endAdornment={item.endAdornment}
                  checked={selectedIds?.has(item.value) || false}
                  onCheckedChange={() => onCheckboxClick?.(item.value)}
                  name={name}
                />
              </div>
            )
        )}
      </div>

      {items.length > limit && (
        <Button
          onClick={() => setIsShowAll((prev) => !prev)}
          className='mt-5 text-md text-green'
          variant='link'
        >
          {!showAll ? '+ Показать все' : '+ Свернуть'}
        </Button>
      )}
    </div>
  );
};
