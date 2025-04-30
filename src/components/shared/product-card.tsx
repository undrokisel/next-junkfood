/* eslint-disable prettier/prettier */
import React from 'react';
import { cn } from '@/shared/lib/utils';
import Link from 'next/link';
import { Plus } from 'lucide-react';
import Image from 'next/image';
import { Ingredient } from '@prisma/client';
import { descriptions } from '@/shared/constants/descriptions/product-description';
import { Title } from './title';
import { Button } from '../ui';

export type Product = {
  id: number;
  imageUrl: string;
  name: string;
  // description: string;
  variants: [{ price: number }];
  count?: number;
};

export interface ProductCardProps {
  id: number;
  imageUrl: string;
  name: string;
  // description: string;
  price: number;
  ingredients: Ingredient[];
  className?: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  id,
  name,
  // description,
  price,
  imageUrl,
  ingredients,
  className,
}) => {
  const productDescriptions = descriptions;

  return (
    <article className={cn(`min-h-[100%]`, className)}>
      <Link href={`/product/${id}`}>
        <div
          className='flex flex-col justify-start p-6 bg-secondary rounded-lg 
                    min-h-[100%] border
                    '
        >
          {/* card-image */}
          <Image
            width={215}
            height={215}
            className='w-[215px] h-[215px] object-contain mx-auto'
            src={`/${imageUrl}`}
            alt={name}
          />

          {/* card-body */}
          <Title text={name} size='sm' className='mb-1 mt-3 font-bold' />
          <p className='text-sm text-gray-400'>
            {ingredients.map((ingredient) => ingredient.name).join(', ')}
          </p>
          <p className='flex-grow-1 text-sm text-gray-400 flex-grow'>
            {/* {description} */}
            {productDescriptions[Number(id) - 1]}
            {/* Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam,
            dolore dolorem. Temporibus quasi quam quibusdam impedit sequi dolore
            iste. Non dolores impedit, esse reprehenderit doloribus natus quis?
            Aperiam, cupiditate quis. */}
          </p>

          {/* card-footer */}
          <div className='flex justify-between mt-4 items-center'>
            <span className='text-[20px]'>
              {/* от  */}
              <b>{price} р.</b>
            </span>

            <Button variant='secondary' className='text-base font-bold p-0'>
              <Plus size={20} className='mr-1' />
              Добавить
            </Button>
          </div>
        </div>
      </Link>
    </article>
  );
};
