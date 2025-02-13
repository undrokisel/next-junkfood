'use client';

import React, { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
// eslint-disable-next-line
import { useIntersection } from 'react-use';
import { Product, ProductCard } from './product-card';
import { Title } from './title';
import { useCategoryStore } from '../../store/category';

interface ProductsGroupListProps {
  products: Product[];
  categoryId: number;
  title: string;
  className?: string;
  listClassName?: string;
}

export const ProductsGroupList: React.FC<ProductsGroupListProps> = ({
  products,
  className,
  categoryId,
  title,
  listClassName,
}) => {
  const setActiveCategoryId = useCategoryStore((state) => state.setActiveId);
  const intersectionRef = useRef(null);
  const intersection = useIntersection(intersectionRef, {
    threshold: 0.4,
  });

  useEffect(() => {
    if (intersection?.isIntersecting) setActiveCategoryId(categoryId);
  }, [categoryId, intersection?.isIntersecting, title, setActiveCategoryId]);

  return (
    <section className={cn(className)} ref={intersectionRef} id={title}>
      <Title text={title} size='lg' className='font-extrabold mb-5' />
      <div className={cn(`grid grid-cols-3 gap-[50px]`, listClassName)}>
        {products.map((product, index) => {
          return (
            <ProductCard
              key={`product-${index}`}
              name={product.name}
              description={product.description}
              price={product.items[0].price}
              imgUrl={product.imgUrl}
              id={product.id}
            />
          );
        })}
      </div>
    </section>
  );
};
