'use client';

import React from 'react';
import { cn } from '@/shared/lib/utils';
import { useRouter } from 'next/navigation';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '@/components/ui/dialog';
import { ProductWithRelations } from '../../../../@types/prisma';
import { ProductForm } from '../product-form';

interface Props {
  product: ProductWithRelations;
  className?: string;
}

export const ChooseProductModal: React.FC<Props> = ({ product, className }) => {
  const router = useRouter();

  return (
    <Dialog open={Boolean(product)} onOpenChange={() => router.back()}>
      <DialogContent
        className={cn(
          `p-0 
          w-[90vw] max-w-[1060px]
          min-h-[500px] max-h-[90vh] 
          _my-10
        bg-white overflow-hidden overflow-y-auto rounded-lg
        bg-green-50
        `,
          className
        )}
      >
        <DialogTitle className='sr-only' />
        <DialogDescription className='sr-only' />
        <ProductForm product={product} onSubmit={() => router.back()} />
      </DialogContent>
    </Dialog>
  );
};
