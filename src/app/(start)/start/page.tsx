'use client';

import { Button } from '@/components/ui';
import Link from 'next/link';
import { Title } from '../../../components/shared/title';
import { Container } from '../../../components/shared/container';
import { FadeVisible } from '../../../components/shared/animation/FadeVisible';

function Start() {
  return (
    <Container className=' flex min-h-screen justify-center text-lg '>
      <div className='bg-green-100 rounded-3xl p-4 sm:p-10 m-4 sm:m-10 min-h-[60vh] flex flex-col text-center gap-2 sm:gap-4 flex-grow'>
        <FadeVisible>
          <Title
            size='lg'
            text='Веб-приложение для сети ресторанов быстрого питания'
            className='sm:ml-6 text-lg sm:text-3xl'
          />
        </FadeVisible>
        <FadeVisible>
          <Title
            size='lg'
            text='&ldquo;Твоя Шаурма&ldquo;'
            className='text-xl sm:text-3xl sm:ml-6'
          />
        </FadeVisible>

        <div className='mt-4 sm:mt-20 flex-grow content-center'>
          <FadeVisible>
            <div className='mb-6 sm:mb-10'>
              <p className='sm:text-[28px] mb-4 sm:mb-8'>
                <b>Уважаемый пользователь!</b>
              </p>
              <p className='sm:text-[28px]'>Представляю Вашему вниманию</p>
              <p className='sm:text-[28px]'>
                веб-приложение для сети ресторанов быстрого питания
              </p>
              <p className='sm:text-[28px]'>
                <b>&ldquo;Твоя Шаурма&ldquo;</b>
              </p>
            </div>
          </FadeVisible>
          <FadeVisible>
            <Button className='sm:mt-8 sm:p-12'>
              <Link href='/' className='text-lg sm:text-[32px]'>
                На главную страницу
              </Link>
            </Button>
          </FadeVisible>
        </div>

        <FadeVisible>
          <div className='mt-4 sm:mt-7 text-center text-[16px] sm:text-lg'>
            <p>Разработчик: студент группы 2-ИС Кисель Андрей Владимирович</p>
            <p>
              Специальность: 09.02.07 &ldquo;Информационные системы и
              программирование&ldquo;
            </p>
            <p>ГБПОУ Пермский краевой колледж &ldquo;Оникс&ldquo;</p>
            <p className='mt-4 sm:mt-8'>Пермь 2025</p>
          </div>
        </FadeVisible>
      </div>
    </Container>
  );
}

export default Start;
