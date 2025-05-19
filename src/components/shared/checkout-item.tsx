'use client';

import React from 'react';
import { cn } from '@/shared/lib/utils';
import { X } from 'lucide-react';
import { useWindowSize } from 'react-use';
import * as CartItemDetails from './cart-item-details';
import { CartItemProps } from './cart-item-details/cart-item-details.types';
import { CountButton } from './count-button';

interface Props extends CartItemProps {
  onClickCountButton?: (type: 'plus' | 'minus') => void;
  onClickRemove?: () => void;
  className?: string;
}

export const CheckoutItem: React.FC<Props> = ({
  name,
  price,
  imageUrl,
  quantity,
  details,
  className,
  disabled,
  onClickCountButton,
  onClickRemove,
}) => {
  const { width } = useWindowSize();
  return (
    <div
      className={cn(
        `flex 
        items-center justify-between 
        gap-2 border-t`,
        {
          'opacity-50 pointer-events-none': disabled,
        },
        className
      )}
    >
      <div className='flex _flex-col _sm:flex-row items-center gap-2 lg:gap-5 flex-1'>
        <CartItemDetails.Image src={imageUrl} />
        {width > 700 && <CartItemDetails.Info name={name} details={details} />}
      </div>

      <div className='flex flex-col items-end justify-end'>
        <div className='flex items-center'>
          <CartItemDetails.Price value={price} />
          <div className='flex items-center gap-2 md:gap-5 ml-2 md:ml-4 lg:ml-10'>
            <CountButton onClick={onClickCountButton} value={quantity} />
            <button type='button' onClick={onClickRemove}>
              <X
                className='text-gray-400 cursor-pointer hover:text-gray-600'
                size={20}
              />
            </button>
          </div>
        </div>
        {width <= 700 && (
          <CartItemDetails.Info
            name={name}
            details={details}
            className='mt-2'
          />
        )}
      </div>
    </div>
  );
};
