/* eslint-disable prettier/prettier */
import React from 'react';
import { cn } from '@/shared/lib/utils';
import Link from 'next/link';
import { Plus } from 'lucide-react';
import Image from 'next/image';
import { Ingredient } from '@prisma/client';
import { motion } from 'motion/react';
import { arrangeImgUrl } from '@/shared/lib/arrangeImgUrl';
import { Title } from './title';
import { Button } from '../ui';

export type Product = {
  id: number;
  imageUrl: string;
  name: string;
  description: string;
  variants: [{ price: number }];
  count?: number;
};

export interface ProductCardProps {
  id: number;
  imageUrl: string;
  name: string;
  description: string;
  price: number;
  ingredients: Ingredient[];
  className?: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  id,
  name,
  description,
  price,
  imageUrl,
  ingredients,
  className,
}) => {
  return (
    <article className={cn(`min-h-[100%]`, className)}>
      <motion.div
        className='h-full'
        initial={{ opacity: 0 }}
        // animate={{ opacity: 1 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        exit={{ opacity: 0 }}
        whileHover={{
          scale: 1.02,
          transition: { duration: 0.3 },
        }}
      >
        <Link href={`/product/${id}`}>
          <div
            className='flex flex-col justify-start p-6 bg-secondary rounded-lg transition-all duration-300
                    min-h-[100%] border bg-green-100 hover:bg-amber-100 hover:shadow-2xl
                    '
          >
            {/* card-image */}
            <Image
              width={215}
              height={215}
              className='w-[215px] h-[215px] object-contain mx-auto  transition-all duration-300 
              hover:scale-105 
              '
              src={arrangeImgUrl(imageUrl)}
              alt={name}
            />

            {/* card-body */}
            <Title text={name} size='sm' className='mb-1 mt-3 font-bold' />
            <p className='text-sm text-gray-400'>
              {ingredients.map((ingredient) => ingredient.name).join(', ')}
            </p>
            <p className='flex-grow-1 text-sm text-gray-400 flex-grow'>
              {description}
            </p>

            {/* card-footer */}
            <div className='flex justify-between mt-4 items-center'>
              <span className='text-[20px]'>
                {/* от  */}
                <b>{price} ₽</b>
              </span>

              <Button
                variant='ghost'
                className={`text-base font-bold p-0  transition-all duration-300 
                hover:bg-transparent hover:scale-110 text-primary hover:text-orange-500`}
              >
                <Plus size={20} className='mr-1' />
                Добавить
              </Button>
            </div>
          </div>
        </Link>
      </motion.div>
    </article>
  );
};
