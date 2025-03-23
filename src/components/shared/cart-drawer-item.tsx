import React from 'react';
import { cn } from '@/shared/lib/utils';

import * as CartItem from '@/components/shared/cart-item-details';
import { CountButton } from '@/components/shared/count-button';
import { Trash2Icon } from 'lucide-react';
import { CartItemProps } from './cart-item-details/cart-item-details.types';

interface Props extends CartItemProps {
  onClickCountButton?: (type: 'plus' | 'minus') => void;
  onClickRemove?: () => void;
  className?: string;
}

export const CartDrawerItem: React.FC<Props> = ({
  imageUrl,
  details,
  name,
  quantity,
  price,
  disabled,
  onClickCountButton,
  onClickRemove,
  className,
}) => {
  return (
    <div
      className={cn(
        'flex bg-white p-5 gap-6',
        {
          'opacity-50 pointer-events-none': disabled,
        },
        className
      )}
    >
      <CartItem.Image src={`/${imageUrl}`} />

      <div className='flex-1'>
        <CartItem.Info name={name} details={details} />

        <hr className='my-3' />

        <div className='flex items-center justify-between'>
          <CountButton onClick={onClickCountButton} value={quantity} />

          <div className='flex items-center gap-3'>
            <CartItem.Price value={price} />
            <Trash2Icon
              onClick={onClickRemove}
              className='text-gray-400 cursor-pointer hover:text-gray-600'
              size={16}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
