// 'use client';

import { cn } from '@/shared/lib/utils';
import React from 'react';
import { ArrowRight, ShoppingCart, User } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '../ui/button';
import { Container } from './container';
import { SearchInput } from './search-input';

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
          <Button className='group relative'>
            <b>100 pуб</b>
            {/* divider */}
            <span className='h-full bg-secondary w-[1px] mx-2' />
            <div className='flex gap-1 items-center transition duration-300 group-hover:opacity-0'>
              <ShoppingCart strokeWidth={2} className='h-4 w-4 relative' />
              <b>2</b>
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
        </div>
      </Container>
    </header>
  );
};
