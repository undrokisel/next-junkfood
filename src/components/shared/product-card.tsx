/* eslint-disable prettier/prettier */
import React from 'react';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { Plus } from 'lucide-react';
import { Title } from './title';
import { Button } from '../ui';

export type Product = {
  id: number;
  imgUrl: string;
  name: string;
  description: string;
  items: [{ price: number }];
  count?: number;
};

export interface ProductCardProps {
  id: number;
  imgUrl: string;
  name: string;
  description: string;
  price: number;
  className?: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  name,
  imgUrl,
  description,
  id,
  price,
  className,
}) => {
  return (
    <article className={cn(`min-h-[100%]`, className)}>
      <Link href={`/product/${id}`}>
        <div
          className='flex flex-col justify-center p-6 bg-secondary rounded-lg 
        min-h-[100%]
         border
        '
        >
          {/* card-image */}
          <img className='w-[215px] h-[215px]' src={imgUrl} alt={name} />

          {/* card-body */}
          <Title text={name} size='sm' className='mb-1 mt-3 font-bold' />
          <p className='flex-grow-1 text-sm text-gray-400'>{description}</p>

          {/* card-footer */}
          <div className='flex justify-between mt-4 items-center'>
            <span className='text-[20px]'>
              от <b>{price} р.</b>
            </span>

            <Button variant='secondary' className='text-base font-bold'>
              <Plus size={20} className='mr-1' />
              Добавить
            </Button>
          </div>
        </div>
      </Link>
    </article>
  );
};
