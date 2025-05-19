'use client';

import * as React from 'react';
import { ChevronsUpDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Command, CommandList } from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/shared/lib/utils';
import { Input } from '../../ui';

interface ComboboxProps {
  filters: any;
  className?: string;
}

export function PriceFilterCombobox({ filters, className }: ComboboxProps) {
  const [open, setOpen] = React.useState(false);
  const [valueFrom, setValueFrom] = React.useState<number>(
    filters.priceRange.priceFrom
  );
  const [valueTo, setValueTo] = React.useState<number>(
    filters.priceRange.priceTo
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant='ghost'
          role='combobox'
          aria-expanded={open}
          className={cn(
            `justify-between text-primary text-lg text-black, 
            bg-green-100 
            hover:bg-amber-200 focus:bg-amber-200
              hover:shadow-lg focus:shadow-lg 
            `,
            className
          )}
        >
          {`Цена: от ${valueFrom} до ${valueTo}`}
          <ChevronsUpDown className='ml-1 h-4 w-4 shrink-0 opacity-50' />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='max-w-[200px] h-9 p-0 '>
        <Command className='bg-green-100'>
          <CommandList className=''>
            <div className='flex gap-2 justify-between'>
              <div className='flex items-center gap-2 pl-2 p-1 '>
                <label htmlFor='from'>от:</label>
                <Input
                  id='from'
                  name='from'
                  type='number'
                  placeholder={String(valueFrom)}
                  min='0'
                  max='1000'
                  value={String(filters.priceRange.priceFrom)}
                  onChange={(e) => {
                    filters.setPriceRange('priceFrom', Number(e.target.value));
                    setValueFrom(Number(e.target.value));
                  }}
                  className={`
                    h-6 
                    bg-green-200 
                    transition-all duration-300
                    hover:bg-amber-200 focus:bg-amber-200
                    `}
                />
              </div>
              <div className='flex items-center gap-2 pl-2 p-1'>
                <label htmlFor='to'>до:</label>
                <Input
                  id='to'
                  name='to'
                  type='number'
                  placeholder={String(valueTo)}
                  min='0'
                  max='1000'
                  value={String(filters.priceRange.priceTo)}
                  onChange={(e) => {
                    filters.setPriceRange('priceTo', Number(e.target.value));
                    setValueTo(Number(e.target.value));
                  }}
                  className={`
                    h-6 
                    bg-green-200 
                    transition-all duration-300
                    hover:bg-amber-200 focus:bg-amber-200
                    `}
                />
              </div>
            </div>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
