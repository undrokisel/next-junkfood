'use client';

import React from 'react';
import { cn } from '@/shared/lib/utils';
import { useRouter } from 'next/navigation';
import { Product } from '@prisma/client';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '@/components/ui/dialog';
import { ChooseProductForm } from '../choose-product-form';

interface Props {
  product: Product;
  className?: string;
}

export const ChooseShaurmaModal: React.FC<Props> = ({ product, className }) => {
  const router = useRouter();

  return (
    <Dialog open={Boolean(product)} onOpenChange={() => router.back()}>
      <DialogContent
        className={cn(
          'p-0 w-[1060px] min-h-[500px] bg-white overflow-hidden',
          className
        )}
      >
        <DialogTitle className='sr-only' />
        <DialogDescription className='sr-only' />

        <ChooseProductForm
          imageUrl={product.imageUrl}
          name={product.name}
          price={100}
          description={product.description || ''}
          // productId={product.id}
          // ingredients={[]}
        />
      </DialogContent>
    </Dialog>
  );
};
