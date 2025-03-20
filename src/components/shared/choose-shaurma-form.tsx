'use client';

import React, { useState } from 'react';
import { cn } from '@/shared/lib/utils';
import Image from 'next/image';
import {
  DoughType,
  doughTypes,
  mapDoughType,
} from '@/shared/constants/shaurma';
import { Ingredient, ProductVariant } from '@prisma/client';
import { useSet } from 'react-use';
import { calcTotalShaurmaPrice } from '@/shared/lib';
import { Title } from './title';
import { Button } from '../ui';
import { GroupVariants } from './group-variants';
import { IngredientBadge } from './ingredient-badge';

interface Props {
  imageUrl: string;
  name: string;
  ingredients: Ingredient[];
  variants: ProductVariant[];
  onClickAddtoCart?: VoidFunction;
  className?: string;
}

export const ChooseShaurmaForm: React.FC<Props> = ({
  imageUrl,
  name,
  variants,
  ingredients,
  onClickAddtoCart,
  className,
}) => {
  //   const [size, setSize] = useState<ShaurmaSize>(2);
  const [doughType, setDoughType] = useState<DoughType>(3);

  const [selectedIngredients, { toggle: toggleIngredient }] = useSet(
    new Set<number>([])
  );

  const textDetails = `Классическая шаурма, ${mapDoughType[doughType].toLowerCase()} тесто`;

  const totalPrice = calcTotalShaurmaPrice(
    variants,
    doughType,
    ingredients,
    selectedIngredients
  );

  const handleClickAddToCart = () => {
    onClickAddtoCart?.();
    console.log({
      doughType,
      ingredients: selectedIngredients,
      price: totalPrice,
    });
  };

  return (
    <div className={cn(className, 'flex flex-1 flex-wrap gap-4')}>
      <div className='flex items-center justify-center flex-1 relative w-full'>
        <Image
          src={`/${imageUrl}`}
          width={350}
          height={350}
          alt={name}
          className='
              object-contain
              relative left-2 top-2 transition-all z-10 duration-300 min-w-[270px] w-[350px] h-[350px]'
        />
      </div>

      <div className='w-[490px] bg-[#f7f6f5] p-7'>
        <Title
          text={name}
          size='md'
          className='font-extrabold mb-1 flex-grow'
        />

        <p className='text-gray-400'>{textDetails}</p>

        {/* <p className='text-gray-400 mt-8'>Размер</p>
        <GroupVariants
          variants={shaurmaSizes}
          value={String(size)}
          onClick={(value) => setSize(Number(value) as ShaurmaSize)}
        /> */}

        <p className='text-gray-400 mt-2'>Тип теста</p>
        <GroupVariants
          variants={doughTypes}
          value={String(doughType)}
          onClick={(value) => setDoughType(Number(value) as DoughType)}
        />

        <p className='text-gray-400 mt-2'>Добавить по вкусу</p>

        <div className='bg-gray-50 p-5 rounded-md max-h-[200px] overflow-auto scrollbar scroolbar'>
          <div className='grid grid-cols-3 gap-3 mt-1'>
            {ingredients.map(
              ({
                name: ingredientName,
                imageUrl: ingredientImageUrl,
                price,
                id,
              }) => (
                <IngredientBadge
                  key={id}
                  name={ingredientName}
                  imageUrl={ingredientImageUrl}
                  price={price}
                  onClick={() => toggleIngredient(id)}
                  active={selectedIngredients.has(id)}
                />
              )
            )}
          </div>
        </div>

        <Button
          onClick={handleClickAddToCart}
          className='h-[55px] px-10 text-base rounded-[18px] w-full mt-10'
        >
          Добавить в корзину за {totalPrice} ₽
        </Button>
      </div>
    </div>
  );
};
