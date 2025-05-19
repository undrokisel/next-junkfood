import React from 'react';
import { ArrowRight, Package, Truck } from 'lucide-react';
import { cn } from '@/shared/lib/utils';
import { WhiteBlock } from './white-block';
import { CheckoutItemDetails } from './checkout-item-details';
import { Button, Skeleton } from '../ui';

const VAT = 0;
const DELIVERY_PRICE = 250;

interface Props {
  totalAmount: number;
  loading?: boolean;
  className?: string;
}

export const CheckoutTotalSmBar: React.FC<Props> = ({
  totalAmount,
  loading,
  className,
}) => {
  const vatPrice = (totalAmount * VAT) / 100;
  const totalPrice = totalAmount + DELIVERY_PRICE + vatPrice;

  return (
    <WhiteBlock className={cn('p-2 lg:p-6 sticky top-4 gap-0', className)}>
      <div className='flex justify-between gap-1'>
        <span className='text-xl'>Итого:</span>
        {loading ? (
          <Skeleton className='h-9 w-48' />
        ) : (
          <span className='h-9 text-[24px] font-extrabold'>{totalPrice} ₽</span>
        )}
      </div>

      <CheckoutItemDetails
        className='my-0'
        title={
          <div className='flex items-center leading-none'>
            <Package size={18} className='mr-1 lg:mr-2 text-gray-400' />
            Стоимость корзины:
          </div>
        }
        value={
          loading ? (
            <Skeleton className='h-6 w-16 rounded-[6px]' />
          ) : (
            `${totalAmount} ₽`
          )
        }
      />
      <CheckoutItemDetails
        className='my-0'
        title={
          <div className='flex items-center'>
            <Truck size={18} className='mr-2 text-gray-400' />
            Доставка:
          </div>
        }
        value={
          loading ? (
            <Skeleton className='h-6 w-16 rounded-[6px]' />
          ) : (
            `${DELIVERY_PRICE} ₽`
          )
        }
      />

      <Button
        loading={loading}
        type='submit'
        className='w-full h-14 rounded-2xl mt-1 text-base font-bold'
      >
        Перейти к оплате
        <ArrowRight className='w-5 ml-2' />
      </Button>
    </WhiteBlock>
  );
};
