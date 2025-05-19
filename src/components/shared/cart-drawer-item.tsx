import React from 'react';
import { cn } from '@/shared/lib/utils';

import * as CartItem from '@/components/shared/cart-item-details';
import { CountButton } from '@/components/shared/count-button';
import { Trash2Icon } from 'lucide-react';
import { arrangeImgUrl } from '@/shared/lib/arrangeImgUrl';
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
        'flex bg-white p-5 gap-6 items-center ',
        {
          'opacity-50 pointer-events-none': disabled,
        },
        className
      )}
    >
      <CartItem.Image src={arrangeImgUrl(imageUrl)} />

      <div className='flex-1'>
        <CartItem.Info
          name={name}
          details={details}
          className='text-end sm:text-center'
        />

        <hr className='my-3' />

        <div className='flex items-center justify-between gap-2 flex-wrap'>
          <CountButton
            onClick={onClickCountButton}
            value={quantity}
            className='flex-grow justify-end'
          />

          <div className='flex items-center gap-3 justify-end flex-grow'>
            <CartItem.Price value={price} />
            <Trash2Icon
              onClick={onClickRemove}
              className='text-gray-400 cursor-pointer 
              transition-all duration-300
                hover:text-red-600
                focus:text-red-600
                '
              size={16}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
