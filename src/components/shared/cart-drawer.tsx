'use client';

import React, { PropsWithChildren } from 'react';
import { cn } from '@/shared/lib/utils';

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  // SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import Link from 'next/link';
import { ArrowBigRight, ArrowLeft } from 'lucide-react';
import { DoughType, ShaurmaSize } from '@/shared/constants/shaurma';
import Image from 'next/image';
import { getCartItemDetails } from '@/shared/lib';
import { useCart } from '@/hooks';
import { Button } from '../ui';
import { CartDrawerItem } from './cart-drawer-item';
import { Title } from './title';

export const CartDrawer: React.FC<PropsWithChildren> = ({ children }) => {
  const { totalAmount, updateItemQuantity, items, removeCartItem } = useCart();
  const [redirecting, setRedirecting] = React.useState(false);

  const onClickCountButton = (
    id: number,
    quantity: number,
    type: 'plus' | 'minus'
  ) => {
    const newQuantity = type === 'plus' ? quantity + 1 : quantity - 1;
    updateItemQuantity(id, newQuantity);
  };

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>

      <SheetContent className='flex flex-col justify-between pb-0 bg-green-100 '>
        <SheetDescription className='sr-only' />
        <div
          className={cn(
            'flex flex-col h-full',
            !totalAmount && 'justify-center'
          )}
        >
          {totalAmount > 0 && (
            <SheetHeader>
              <SheetTitle className='text-md sm:text-lg leading-none'>
                В корзине{' '}
                <span className='font-bold'>{items.length} товара</span>
              </SheetTitle>
            </SheetHeader>
          )}

          {!totalAmount && (
            <div className='flex flex-col items-center justify-center w-72 mx-auto'>
              <Image
                src='/images/empty-box.png'
                alt='Empty cart'
                width={120}
                height={120}
              />
              <Title
                size='sm'
                text='Корзина пустая'
                className='text-center font-bold my-2'
              />
              <p className='text-center text-neutral-500 mb-5'>
                Добавьте хотя бы один продукт, чтобы совершить заказ
              </p>

              <SheetClose>
                <Button className='w-56 h-12 text-base' size='lg'>
                  <ArrowLeft className='w-5 mr-2' />
                  Вернуться назад
                </Button>
              </SheetClose>
            </div>
          )}

          {totalAmount > 0 && (
            <>
              <div className='-mx-6 mt-4 sm:mt-5 overflow-auto flex-1 '>
                {items.map((item) => (
                  <div key={item.id} className='mb-1 sm:mb-2'>
                    <CartDrawerItem
                      id={item.id}
                      imageUrl={item.imageUrl}
                      details={getCartItemDetails(
                        item.ingredients,
                        item.doughType as DoughType,
                        item.shaurmaSize as ShaurmaSize
                      )}
                      disabled={item.disabled}
                      name={item.name}
                      price={item.price}
                      quantity={item.quantity}
                      onClickCountButton={(type) =>
                        onClickCountButton(item.id, item.quantity, type)
                      }
                      onClickRemove={() => removeCartItem(item.id)}
                      className='bg-green-50'
                    />
                  </div>
                ))}
              </div>

              <SheetFooter className='-mx-6 bg-white p-2 sm:p-8 border-t-2 bg-green-100'>
                <div className='w-full'>
                  <div className='flex mb-2 sm:mb-4'>
                    <span className='flex flex-1 text-lg text-neutral-500'>
                      Итого
                      <div className='flex-1 border-b border-dashed border-b-neutral-400 relative -top-1 mx-2' />
                    </span>
                    <span className='font-bold text-lg'>{totalAmount}</span>
                  </div>

                  <Link href='/checkout'>
                    <Button
                      onClick={() => setRedirecting(true)}
                      loading={redirecting}
                      type='submit'
                      className={`
                        w-full h-12 text-base animate-pulse relative 
                        overflow-hidden bg-gradient-to-r from-green-500 to-green-800
                        hover:animate-none
                        focus:animate-none
                        `}
                    >
                      Оформить заказ
                      <ArrowBigRight className='w-5 ml-2' />
                    </Button>
                  </Link>
                </div>
              </SheetFooter>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};
