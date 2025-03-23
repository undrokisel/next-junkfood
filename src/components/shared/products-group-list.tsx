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
}

export const ProductsGroupList: React.FC<ProductsGroupListProps> = ({
  title,
  products,
  listClassName,
  categoryId,
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
    <section className={cn(className)} ref={intersectionRef} id={title}>
      <Title text={title} size='lg' className='font-extrabold mb-5' />
      <div className={cn(`grid grid-cols-3 gap-[50px]`, listClassName)}>
        {products.map((product, index) => {
          return (
            <ProductCard
              key={`product-${index}`}
              id={product.id}
              name={product.name}
              imageUrl={product.imageUrl}
              price={product.variants[0].price}
              ingredients={product.ingredients}
              // description={product.description}
            />
          );
        })}
      </div>
    </section>
  );
};
