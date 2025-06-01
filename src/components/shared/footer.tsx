'use client';

import { cn } from '@/shared/lib/utils';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Container } from '@/components/shared/container';
// import { usePathname } from 'next/navigation';
import { footerInteractiveClass } from '@/shared/constants/classes/classes';
import { ArrowUp, MailIcon, PhoneCallIcon } from 'lucide-react';
import { PiTelegramLogo } from 'react-icons/pi';
import { IoLogoVk } from 'react-icons/io5';
import { AuthModal } from './modals/auth-modal/auth-modal';
import { ProfileFooterLink } from './profile-footer-link';

interface Props {
  theme?: 'dark' | 'light';
  className?: string;
}

export const Footer: React.FC<Props> = ({ theme = 'light', className }) => {
  // const router = useRouter();
  const [openAuthModal, setOpenAuthModal] = React.useState(false);
  // const searchParams = useSearchParams();
  // const path = usePathname();

  return (
    <footer className={cn('min-h-800px bg-black/30  w-full', className)}>
      <Container className=' '>
        <div className='flex justify-between gap-4 px-4 flex-wrap lg:flex-nowrap'>
          <div className='flex flex-col  _flex-[50%] flex-grow gap-4'>
            {/* logo block */}
            <div className='text-amber-200 max-w-min mt-4 self-center footer__logo'>
              <Link
                href='/'
                className='place-content-start'
                // className={`sm:mr-10`}
              >
                <div className='flex justify-start items-center gap-2 sm:gap-4 cursor-pointer'>
                  <picture>
                    <Image
                      src='/images/шаурма.webp'
                      width='50'
                      height='50'
                      alt='Логотип'
                      className='rounded-full w-[40px] min-w-[50px]'
                    />
                  </picture>
                  <div className='flex flex-col'>
                    <p
                      className={` min-w-[200px] uppercase _text-lg text-2xl font-black ${theme === 'dark' ? 'text-white' : ''}`}
                    >
                      Твоя шаурма
                    </p>
                    <p
                      className={`text-black-400 leading-3 text-sm ${theme === 'dark' ? 'text-white' : ''}`}
                    >
                      И только Твоя
                    </p>
                  </div>
                </div>
              </Link>
            </div>
            {/* колонки */}
            <div className='flex _justify-between _justify-center justify-around gap-4 flex-wrap '>
              {/* Первая колонка */}
              <ul
                className={`
                flex flex-col justify-between gap-1
                _text-sm sm:text-lg _text-white text-amber-50 footer-text
              `}
              >
                <li className='flex flex-col'>
                  <span className='text-amber-200 font-bold'>Часы работы:</span>
                  <span>c 8:00 до 22:00 ежедневно</span>
                </li>
                <li className='flex flex-col'>
                  <span className='text-amber-200 font-bold'>Адрес:</span>
                  <span className='_text-[16px] leading-none'>
                    Пермский район, д. Кондратово,
                    <br /> ул. Культуры, д. 2Б
                  </span>
                </li>

                <div className='flex flex-col mb-2'>
                  <span className='text-amber-200 font-bold'>Контакты:</span>
                  <li>
                    <Link
                      href='tel:891289887898'
                      target='_blank'
                      className={`${footerInteractiveClass} flex item-center gap-3`}
                    >
                      <PhoneCallIcon />
                      <span>+7(912)-898-878-98</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href='mailto:twoya-shaurma@gmail.com'
                      target='_blank'
                      className={`${footerInteractiveClass} flex item-center gap-3`}
                    >
                      <MailIcon />
                      <span>twoya-shaurma@gmail.com</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href='https://t.me/duhovnij'
                      target='_blank'
                      className={`${footerInteractiveClass} flex item-center gap-3`}
                      style={{}}
                    >
                      <PiTelegramLogo size={24} />
                      <span>@twoya_shaurma</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href='https://vk.com'
                      target='_blank'
                      className={`${footerInteractiveClass} flex item-center gap-3`}
                    >
                      <IoLogoVk size={24} />
                      <span>twoya_shaurma</span>
                    </Link>
                  </li>
                </div>
              </ul>
              <ul
                className={`
                flex flex-col gap-1 justify-between
                _text-sm sm:text-lg text-white footer-text
              `}
              >
                <li>
                  <Link
                    href='#start'
                    className={`${footerInteractiveClass} flex gap-1`}
                  >
                    <span>Наверх страницы</span>
                    <ArrowUp />
                  </Link>
                </li>
                <li>
                  <Link href='/' className={`${footerInteractiveClass}`}>
                    Меню
                  </Link>
                </li>
                <li>
                  <Link className={`${footerInteractiveClass}`} href='/about'>
                    О нас
                  </Link>
                </li>
                <li>
                  <Link
                    className={`${footerInteractiveClass}`}
                    href='/vacancies'
                  >
                    Вакансии
                  </Link>
                </li>
                <li>
                  <Link className={`${footerInteractiveClass}`} href='/blog'>
                    Блог
                  </Link>
                </li>

                <div className={` flex justify-between gap-1 sm:gap-2 `}>
                  <AuthModal
                    open={openAuthModal}
                    onClose={() => setOpenAuthModal(false)}
                  />

                  <ProfileFooterLink
                    onClickSignIn={() => setOpenAuthModal(true)}
                  />
                </div>

                <li>
                  <Link
                    className={`${footerInteractiveClass} leading-none`}
                    target='_blank'
                    href='https://next-junkfood-users-docs.vercel.app/'
                  >
                    Пользовательская
                    <br /> документация
                  </Link>
                </li>
                <li>
                  <Link
                    className={`${footerInteractiveClass}`}
                    target='_blank'
                    href='https://nuxt-junkfood-admin.vercel.app/'
                  >
                    Администраторам
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          {/* карта */}
          <div className='flex-grow lg:flex-[35%] mt-4'>
            <div className='sm:hidden text-2xl text-center text-amber-200 mb-4'>
              Как добраться
            </div>
            <div
              className={` 
              min-h-[100%]
            rounded-3xl overflow-hidden w-full _bg-pink-400
          `}
            >
              <div
                style={{
                  position: 'relative',
                  overflow: 'hidden',
                  borderRadius: '1.5rem',
                }}
              >
                <a
                  href='https://yandex.ru/maps/org/ekspress_new_shaurma/244203129255/?utm_medium=mapframe&utm_source=maps'
                  style={{
                    color: '#eee',
                    fontSize: '12px',
                    position: 'absolute',
                    top: '0px',
                  }}
                >
                  Твоя шаурма
                </a>
                <a
                  href='https://yandex.ru/maps/11108/perm-krai/category/fast_food/184106386/?utm_medium=mapframe&utm_source=maps'
                  style={{
                    color: '#eee',
                    fontSize: '12px',
                    position: 'absolute',
                    top: '14px',
                  }}
                >
                  И только твоя
                </a>
                <a
                  href='https://yandex.ru/maps/11108/perm-krai/category/coffee_to_go/178781223490/?utm_medium=mapframe&utm_source=maps'
                  style={{
                    color: '#eee',
                    fontSize: '12px',
                    position: 'absolute',
                    top: '28px',
                  }}
                >
                  Лучшая шаурма в городе
                </a>
                <div className='relative'>
                  <iframe
                    title='map'
                    src='https://yandex.ru/map-widget/v1/?from=mapframe&ll=56.105909%2C57.976507&mode=poi&poi%5Bpoint%5D=56.105686%2C57.976412&poi%5Buri%5D=ymapsbm1%3A%2F%2Forg%3Foid%3D244203129255&source=mapframe&um=constructor%3A3GbTRNmB8Pz5lk_2mngDAxWGCr7ZhJ8L&utm_source=mapframe&z=18.2'
                    // width='560'
                    height='340'
                    style={{ position: 'relative', width: '100%' }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      background: 'rgba(0, 0, 0, 0.15)',
                      pointerEvents: 'none', // Важно! Пропускает клики сквозь слой
                      mixBlendMode: 'multiply',
                      borderRadius: '1.5rem',
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
      <Container className='bg-transparent-400 text-white min-h-10 flex justify-center  items-end mt-10'>
        <p>Designed by A.V. Kisel, ONIX, 2025</p>
      </Container>
    </footer>
  );
};
