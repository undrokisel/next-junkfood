import React from 'react';
import { cn } from '@/lib/utils';
import { Title } from './title';
import { Button, Checkbox, Input, Slider } from '../ui';

interface Props {
  className?: string;
}

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
      <Title text='Фильтры' />

      {/* checkboxes */}
      <ul className='flex flex-col gap-4 mt-5'>
        <li>
          <div className='flex items-center space-x-2'>
            <Checkbox id='collect' className='bg-gray-50' />
            <label
              htmlFor='collect'
              className={`
                                    text-sm font-medium leading-none 
                                    peer-disabled:cursor-not-allowed 
                                    peer-disabled:opacity-70`}
            >
              You can collect it
            </label>
          </div>
        </li>
        <li>
          <div className='flex items-center space-x-2'>
            <Checkbox id='newItems' className='bg-gray-50' />
            <label
              htmlFor='newItems'
              className={`
                                    text-sm font-medium leading-none 
                                    peer-disabled:cursor-not-allowed 
                                    peer-disabled:opacity-70`}
            >
              Новинки
            </label>
          </div>
        </li>
      </ul>

      {/* price range filter */}
      <div className='flex flex-col gap-4 mt-10'>
        <Title text='Цена: от и до' size='xs' />
        <div className='flex'>
          <Input type='number' placeholder='0' min='0' max='10000' />
          <Input type='number' placeholder='10000' min='0' max='10000' />
        </div>
        <Slider
          defaultValue={[50]}
          max={10000}
          step={1}
          className={cn('w-[90%]', className)}
        />
      </div>

      {/* ingridients */}
      <Title text='Ингридиенты:' size='xs' className='mt-10' />
      <ul className='flex flex-col gap-4 mt-5'>
        <div className='flex items-center space-x-2'>
          <Checkbox id='newItems' className='bg-gray-50' />
          <label
            htmlFor='newItems'
            className={`
                                    text-sm font-medium leading-none 
                                    peer-disabled:cursor-not-allowed 
                                    peer-disabled:opacity-70`}
          >
            Сырный соус
          </label>
        </div>
        <div className='flex items-center space-x-2'>
          <Checkbox id='newItems' className='bg-gray-50' />
          <label
            htmlFor='newItems'
            className={`
                                    text-sm font-medium leading-none 
                                    peer-disabled:cursor-not-allowed 
                                    peer-disabled:opacity-70`}
          >
            Моцарелла
          </label>
        </div>
      </ul>
      <Button className='mt-5' variant=''>
        + Показать все
      </Button>
    </aside>
  );
};
