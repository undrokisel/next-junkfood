'use client';

import React, { useRef, useState } from 'react';
import { Search } from 'lucide-react';
import { cn } from '@/shared/lib/utils';
import { useClickAway, useDebounce } from 'react-use';
import Link from 'next/link';
import { Api } from '@/services/api-client';
import { Product } from '@prisma/client';

interface Props {
  className?: string;
}

export const SearchInput: React.FC<Props> = (props: Props) => {
  const [focused, setFocused] = useState(false);
  const [query, setQuery] = useState('');
  const [products, setProducts] = useState<Product[]>([]);

  //   ref for click outside of search input to close curtain
  const ref = useRef(null);

  //    switch state of showing curtain to OFF
  useClickAway(ref, () => setFocused(false), ['click']);

  // под капотом use effect
  useDebounce(
    async () => {
      try {
        const response = await Api.products.search(query);
        setProducts(response);
      } catch (error) {
        // eslint-disable-next-line
        console.log(error);
      }
    },
    500,
    [query]
  );

  const onClickItemProduct = () => {
    setFocused(false);
    setProducts([]);
    setQuery('');
  };

  const { className } = props;
  return (
    <>
      {/* темная шторка  */}
      {focused && (
        <div className='fixed top-0 left-0 right-0 bottom-0 bg-black/30 z-30' />
      )}

      <div
        ref={ref}
        className={cn(
          'rounded-2xl flex flex-1 justify-between relative h-11 border-slate-700 z-30',
          className
        )}
      >
        {/* иконка поиска */}
        <Search className='absolute top-1/2 translate-y-[-50%] left-3 h-7 text-gray-500' />
        <input
          type='text'
          placeholder='Поиск по ассортименту ...'
          className='rounded-2xl outline-none bg-slate-100 pr-4 pl-10 w-full'
          onFocus={() => setFocused(true)}
          onChange={(e) => setQuery(e.target.value)}
          value={query}
        />

        {products?.length > 0 && (
          <div
            className={cn(
              'bg-white absolute top-14 left-0 w-full rounded-2xl overflow-hidden px-4 py-2 shadow-md transition-all duration-200 opacity-0 invisible z-30',
              focused && 'visible opacity-100 top-12'
            )}
          >
            {products?.length > 0 &&
              products.map((product, index) => (
                <Link
                  key={index}
                  onClick={() => onClickItemProduct()}
                  className='flex items-center gap-3 w-full hover:bg-primary/10 rounded-2xl px-3 py-2'
                  href={`/product/${product.id}`}
                >
                  <img
                    src={`/${product.imageUrl}`}
                    alt={product.name}
                    className='rounded-sm h-8 w-8'
                  />
                  <span>{product.name}</span>
                </Link>
              ))}
          </div>
        )}
      </div>
    </>
  );
};
