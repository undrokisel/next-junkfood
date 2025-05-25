'use client';

import { cn } from '@/shared/lib/utils';
import React, { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { SearchInput } from '@/components/shared/search-input';
import { Container } from '@/components/shared/container';
import { CartButton } from '@/components/shared/cart-button';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import toast from 'react-hot-toast';
import { AuthModal } from './modals/auth-modal/auth-modal';
import { ProfileButton } from './profile-button';
import { FadeVisible } from './animation/FadeVisible';

interface Props {
  hasSearch?: boolean;
  hasCart?: boolean;
  theme?: 'dark' | 'light';
  className?: string;
}

export const Header: React.FC<Props> = ({
  hasSearch = true,
  hasCart = true,
  theme = 'light',
  className,
}) => {
  const router = useRouter();
  const [openAuthModal, setOpenAuthModal] = React.useState(false);
  const searchParams = useSearchParams();
  const path = usePathname();

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

  const navItems = [
    {
      href: '/about',
      title: 'О нас',
    },
    {
      href: '/blog',
      title: 'Блог',
    },
    {
      href: '/vacancies',
      title: 'Вакансии',
    },
    {
      href: '/',
      title: 'Меню',
    },
  ];

  return (
    <header className={cn('border z-50', className)}>
      <Container className='flex justify-between items-center py-2 _px-2 flex-wrap z-50 gap-2'>
        {/* logo block */}
        <Link
          href='/'
          // ${width < 848 ? `w-[100vw] mb-4` : ''}
          className={`sm:mr-10 z-50  `}
        >
          <div className='flex justify-start items-center gap-2 sm:gap-4 cursor-pointer z-50'>
            <picture>
              <Image
                src='/images/шаурма.webp'
                width='50'
                height='50'
                alt='Логотип'
                className='hidden sm:block rounded-full w-[40px] sm:min-w-[50px]'
              />
            </picture>
            <div className='flex flex-col'>
              <h1
                className={`uppercase text-lg sm:text-2xl font-black ${theme === 'dark' ? 'text-white' : ''}`}
              >
                Твоя шаурма
              </h1>
              <p
                className={`text-black-400 leading-3 text-sm ${theme === 'dark' ? 'text-white' : ''}`}
              >
                И только Твоя
              </p>
            </div>
          </div>
        </Link>

        <div className='flex justify-end items-center flex-grow flex-row flex-wrap sm:flex-nowrap'>
          {/* search block */}
          {hasSearch && (
            <SearchInput
              // ${width < 535 ? ' mr-0 flex-[100%]' : ''}
              className={`
              mr-1 sm:mr-4 lg:mr-10
              sm:min-w-[250px] flex-nogrow sm:flex-grow h-10
              
              `}
            />
          )}

          {/* header button block */}
          <div
            // ${width < 535 ? 'flex-grow mt-4' : ''}
            className={` flex justify-between gap-1 sm:gap-2 `}
          >
            <AuthModal
              open={openAuthModal}
              onClose={() => setOpenAuthModal(false)}
            />

            <ProfileButton
              theme={theme}
              onClickSignIn={() => setOpenAuthModal(true)}
            />

            {hasCart && <CartButton />}
          </div>
        </div>
      </Container>
      <div className='sticky'>
        <FadeVisible>
          <div className='flex  justify-center item-center  gap-2 sm:gap-6 py-1 -ml-[1px] -mb-[1px] px-2 flex-wrap z-50  bg-black/50'>
            {navItems.map((navItem, index) => (
              <Link
                key={index}
                href={navItem.href}
                className={cn(
                  ` 
                text-sm sm:text-lg text-bold text-white underline-offset-4
                transition-all duration-300
             
          `,
                  (path.length > 1 && navItem.href.includes(path.slice(1))) ||
                    path === navItem.href
                    ? 'text-white shadow-2xl shadow-accent border-b-2 text-gray-400 border-gray-400'
                    : `hover:scale-105
                    focus:scale-105
                    hover:text-amber-200
                    focus:text-amber-200
                    hover:underline
                    focus:underline
            `
                )}
              >
                {navItem.title}
              </Link>
            ))}
          </div>
        </FadeVisible>
      </div>
    </header>
  );
};
