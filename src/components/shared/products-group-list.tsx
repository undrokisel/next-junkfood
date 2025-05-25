'use client';

import React, { useEffect, useRef } from 'react';
import { cn } from '@/shared/lib/utils';
// eslint-disable-next-line
import { useIntersection } from 'react-use';
import { ProductCard } from './product-card';
import { Title } from './title';
import { useCategoryStore } from '../../store/category';
import { ProductWithRelations } from '../../../@types/prisma';

interface ProductsGroupListProps {
  title: string;
  products: ProductWithRelations[];
  categoryId: number;
  className?: string;
  listClassName?: string;
  nextSection?: string;
}

export const ProductsGroupList: React.FC<ProductsGroupListProps> = ({
  title,
  products,
  listClassName,
  categoryId,
  nextSection,
  className,
}) => {
  const setActiveCategoryId = useCategoryStore((state) => state.setActiveId);
  const intersectionRef = useRef(null);
  const intersection = useIntersection(intersectionRef, {
    threshold: 0.4,
  });

  useEffect(() => {
    if (intersection?.isIntersecting) setActiveCategoryId(categoryId);
    // eslint-disable-next-line
  }, [categoryId, intersection?.isIntersecting, title]);

  return (
    <section ref={intersectionRef} className={cn(className)}>
      <Title text={title} size='lg' className='font-extrabold mb-5' />
      <div
        className={cn(
          `grid 
          grid-cols-1 md:grid-cols-2  lg:grid-cols-3 
          gap-[6px] sm:gap-[10px] md:gap-[10px] _lg:gap-[30px] 
          mr-4`,
          listClassName
        )}
      >
        {products.map((product, index) => {
          return (
            <ProductCard
              key={`product-${index}`}
              id={product.id}
              name={product.name}
              imageUrl={product.imageUrl}
              price={product.variants[0].price}
              ingredients={product.ingredients}
              description={product.description || ''}
            />
          );
        })}
      </div>
      {nextSection && <div className='mb-5' id={nextSection} />}
    </section>
  );
};
