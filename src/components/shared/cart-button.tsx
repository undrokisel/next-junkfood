'use client';

import React from 'react';
import { cn } from '@/shared/lib/utils';
import { useCartStore } from '@/store';
import { CartDrawer } from '@/components/shared/cart-drawer';
import { ArrowRight, ShoppingCart } from 'lucide-react';
import { Button } from '../ui';

interface Props {
  className?: string;
}

export const CartButton: React.FC<Props> = ({ className }) => {
  const totalAmount = useCartStore((state) => state.totalAmount);
  const items = useCartStore((state) => state.items);
  const loading = useCartStore((state) => state.loading);

  return (
    <CartDrawer>
      <Button
        loading={loading}
        className={cn('group relative', { 'w-[105px]': loading }, className)}
      >
        <b>{totalAmount} ₽</b>

        {/* divider */}
        <span className='h-full bg-secondary w-[1px] mx-2' />
        <div className='flex gap-1 items-center transition duration-300 group-hover:opacity-0'>
          <ShoppingCart strokeWidth={2} className='h-4 w-4 relative' />

          <b>{items.length}</b>
        </div>
        <ArrowRight
          className='w-5 absolute right-5 
                    transition duration-300
                    -translate-x-2 
                    opacity-0 
                    group-hover:opacity-100 
                    group-hover:translate-x-0
                  '
        />
      </Button>
    </CartDrawer>
  );
};
