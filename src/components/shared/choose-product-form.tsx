import React from 'react';
import { cn } from '@/shared/lib/utils';
import Image from 'next/image';
import { Title } from './title';
import { Button } from '../ui';

interface Props {
  imageUrl: string;
  name: string;
  price: number;
  //   loading?: boolean;
  //   onSubmit?: VoidFunction;
  className?: string;
}

export const ChooseProductForm: React.FC<Props> = ({
  name,
  imageUrl,
  price,
  //   onSubmit,
  className,
  //   loading,
}) => {
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

      <div className='w-[490px] bg-[#f7f6f5] p-7 flex flex-col  flex-grow md:flex-grow-0'>
        <Title
          text={name}
          size='md'
          className='font-extrabold mb-1 flex-grow'
        />

        <p className='text-gray-400'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid rerum
          unde ipsum error ducimus explicabo quidem sequi debitis. Quae optio
          rem voluptatem laborum voluptas quam id, totam nostrum corrupti
          dolorem?
        </p>

        <Button
          //   loading={loading}
          //   onClick={() => onSubmit?.()}
          className='h-[55px] px-10 text-base rounded-[18px] w-full mt-10'
        >
          Добавить в корзину за {price} ₽
        </Button>
      </div>
    </div>
  );
};
