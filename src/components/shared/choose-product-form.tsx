import React from 'react';
import { cn } from '@/shared/lib/utils';
import Image from 'next/image';
import { arrangeImgUrl } from '@/shared/lib/arrangeImgUrl';
import { Title } from './title';
import { Button } from '../ui';

interface Props {
  imageUrl: string;
  name: string;
  price: number;
  description: string;
  loading?: boolean;
  onSubmit?: VoidFunction;
  className?: string;
}

/**
 * Форма выбора ПРОДУКТА
 */
export const ChooseProductForm: React.FC<Props> = ({
  name,
  imageUrl,
  price,
  description,
  onSubmit,
  className,
  loading,
}) => {
  return (
    <div
      className={cn(
        className,
        `flex flex-1 
        flex-col md:flex-row
        _flex-wrap 
        gap-4`
      )}
    >
      {/* image */}
      <div className='flex items-center justify-center flex-1 relative w-full md:flex-[100%] '>
        <Image
          src={arrangeImgUrl(imageUrl)}
          width={300}
          height={300}
          alt={name}
          className='
          object-contain
          relative left-2 top-2 transition-all z-10 duration-300 
          min-w-[270px] 
          py-6
          w-[200px] h-[200px]
          sm:w-[250px] sm:h-[250px]
          md:w-[300px] md:h-[300px]
          lg:w-[350px] lg:h-[350px]
          hover:scale-110
          '
        />
      </div>

      <div
        className={`
          w-full lg:w-[490px] bg-[#f7f6f5] 
          p-4 sm:p-7 
          flex flex-col flex-grow md:flex-grow-0 bg-green-100`}
      >
        <Title
          text={name}
          // size='lg'
          className='font-extrabold mb-2 lg:my-6 leading-none text-xl sm:text-3xl'
        />
        <div className='flex-grow content-start'>
          <p className='text-gray-600 leading-snug'>{description}</p>
        </div>

        <Button
          loading={loading}
          onClick={() => onSubmit?.()}
          className={`
            h-[55px] 
            px-1 sm:px-10 
            text-base rounded-[18px] w-full 
            mt-2 md:mt-4 lg:mt-10
            `}
        >
          Добавить в корзину за {price} ₽
        </Button>
      </div>
    </div>
  );
};
