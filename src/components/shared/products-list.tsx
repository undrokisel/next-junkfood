import React from 'react';
import { cn } from '@/lib/utils';

interface Props {
  className?: string;
}

export const ProductsList: React.FC<Props> = ({ className }) => {
  return (
    <main
      className={cn(
        `
            bg-accent
        `,
        className
      )}
    >
      products
    </main>
  );
};
