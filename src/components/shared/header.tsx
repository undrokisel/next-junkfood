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
import { useWindowSize } from 'react-use';
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
  const { width } = useWindowSize();

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
    <header className={cn('border ', className)}>
      <Container className='flex justify-between items-center py-7 px-2 flex-wrap'>
        {/* logo block */}
        <Link
          href='/'
          className={`mr-10 ${width < 848 ? `w-[100vw] mb-4` : ''}`}
        >
          <div className='flex justify-start items-center gap-4'>
            <picture>
              <Image
                src='/images/шаурма.webp'
                width='50'
                height='50'
                alt='Логотип'
                className='rounded-full min-w-[50px]'
              />
            </picture>
            <div className='flex flex-col'>
              <h1 className='uppercase text-2xl font-black'>Твоя шаурма</h1>
              <p className='text-black-400 leading-3 text-sm'>И только Твоя</p>
            </div>
          </div>
        </Link>

        {/* search block */}
        {hasSearch && (
          <SearchInput
            className={`
              mr-4 lg:mr-10 
              min-w-[250px] flex-grow
              ${width < 535 ? ' mr-0 flex-[100%]' : ''}
              `}
          />
        )}

        {/* header button block */}
        <div
          className={`flex justify-between gap-2  ${width < 535 ? 'flex-grow mt-4' : ''}`}
        >
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
