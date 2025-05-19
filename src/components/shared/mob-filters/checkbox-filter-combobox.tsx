'use client';

import * as React from 'react';
import { ChevronsUpDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ChangeEvent, useState } from 'react';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  FilterCheckbox,
  FilterCheckboxProps,
} from '@/components/shared/filter-checkbox';
import { Input } from '../../ui';

type Item = FilterCheckboxProps;

interface ComboboxProps {
  title: string;
  items: Item[];
  hasSearch?: boolean;
  defaultItems?: Item[];
  limit?: number;
  searchInputPlaceholder?: string;
  onCheckboxClick?: (id: string) => void;
  defaultValue?: string[];
  selectedIds?: Set<string>;
  name?: string;
}

export function CheckboxFilterCombobox({
  hasSearch = false,
  title,
  items,
  defaultItems,
  limit = 3,
  searchInputPlaceholder = 'Поиск...',
  // eslint-disable-next-line
  defaultValue,
  onCheckboxClick,
  selectedIds,
  name,
}: ComboboxProps) {
  const [open, setOpen] = React.useState(false);
  // const [value, setValue] = React.useState('');
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

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant='ghost'
          role='combobox'
          aria-expanded={open}
          className={`
            justify-between text-black text-lg
             bg-green-100 transition-all duration-300 
             hover:shadow-lg focus:shadow-lg 
             hover:bg-amber-200 focus:bg-amber-200
             `}
        >
          {title}
          <ChevronsUpDown className='ml-1 h-4 w-4 shrink-0 opacity-50' />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='max-w-[180px] p-0 '>
        <Command className='bg-green-50'>
          {hasSearch && <CommandInput placeholder='Найти...' />}
          {showAll && (
            <div className='mb-5'>
              <Input
                className='bg-green-50 border-none'
                placeholder={searchInputPlaceholder}
                onChange={onChangeSearchInput}
              />
            </div>
          )}

          <CommandList className='bg-green-100'>
            {hasSearch && <CommandEmpty>Нет совпадений</CommandEmpty>}
            <CommandGroup>
              {list.map(
                (item, index) =>
                  index < maxIndex && (
                    <div
                      className='flex items-center space-x-2 bg-green-50 p-1 rounded-sm transition-colors duration-300 hover:bg-amber-200'
                      key={`${String(index)}_${item.value}`}
                    >
                      <FilterCheckbox
                        key={index}
                        text={item.text}
                        value={item.value}
                        endAdornment={item.endAdornment}
                        checked={selectedIds?.has(item.value) || false}
                        onCheckedChange={() => onCheckboxClick?.(item.value)}
                        name={name}
                        className='my-1'
                      />
                    </div>
                  )
              )}
            </CommandGroup>
            {items.length > limit && (
              <Button
                onClick={() => setIsShowAll((prev) => !prev)}
                className='-mt-4'
                variant='link'
              >
                {!showAll ? '+ Показать все' : '+ Свернуть'}
              </Button>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
