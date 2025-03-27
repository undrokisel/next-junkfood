'use client';

import { cn } from '@/shared/lib/utils';
import React, { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { SearchInput } from '@/components/shared/search-input';
import { Container } from '@/components/shared/container';
import { CartButton } from '@/components/shared/cart-button';
import { useRouter, useSearchParams } from 'next/navigation';
import toast from 'react-hot-toast';
import { AuthModal } from './modals/auth-modal/auth-modal';
import { ProfileButton } from './profile-button';

interface Props {
  hasSearch?: boolean;
  hasCart?: boolean;
  className?: string;
}

export const Header: React.FC<Props> = ({
  hasSearch = true,
  hasCart = true,
  className,
}) => {
  const router = useRouter();
  const [openAuthModal, setOpenAuthModal] = React.useState(false);
  const searchParams = useSearchParams();

  useEffect(() => {
    let toastMessage = '';
    if (searchParams.has('paid'))
      toastMessage = 'Заказ успешно оплачен! Информация отправлена на почту.';

    if (searchParams.has('verified'))
      toastMessage = 'Почта успешно подтверждена!';

    if (toastMessage)
      setTimeout(() => {
        router.replace('/');
        toast.success(toastMessage, {
          duration: 3000,
        });
      }, 500);

    // eslint-disable-next-line
  }, []);

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
          <AuthModal
            open={openAuthModal}
            onClose={() => setOpenAuthModal(false)}
          />

          <ProfileButton onClickSignIn={() => setOpenAuthModal(true)} />

          {hasCart && <CartButton />}
        </div>
      </Container>
    </header>
  );
};
