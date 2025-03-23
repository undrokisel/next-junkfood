'use client';

import { cn } from '@/shared/lib/utils';
import React from 'react';
import { User } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { SearchInput } from '@/components/shared/search-input';
import { Container } from '@/components/shared/container';
import { CartButton } from '@/components/shared/cart-button';

interface Props {
  className?: string;
  hasSearch?: boolean;
}

export const Header: React.FC<Props> = ({ className, hasSearch = true }) => {
  return (
    <header className={cn('border border-b-2 ', className)}>
      <Container className='flex justify-between items-center py-7 px-2'>
        {/* logo block */}
        <Link href='/'>
          <div className='flex justify-between gap-4'>
            <picture>
              <Image
                src='/images/шаурма.webp'
                width='50'
                height='50'
                alt='Логотип'
                className='rounded-full'
              />
            </picture>
            <div className='flex flex-col'>
              <h1 className='uppercase text-2xl font-black'>Твоя шаурма</h1>
              <p className='text-gray-400 leading-3 text-sm'>И только твоя</p>
            </div>
          </div>
        </Link>

        {/* search block */}
        {hasSearch && <SearchInput className='mx-10' />}

        {/* header button block */}
        <div className='flex justify-between gap-2'>
          <Button variant='outline' className='flex items-center gap-1'>
            <User size={16} />
            <span>Войти</span>
          </Button>

          <CartButton />
        </div>
      </Container>
    </header>
  );
};
