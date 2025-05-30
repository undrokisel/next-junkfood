'use client';

import { Button } from '@/components/ui';
import Link from 'next/link';
import { Title } from '../../../components/shared/title';
import { Container } from '../../../components/shared/container';
import { FadeVisible } from '../../../components/shared/animation/FadeVisible';

function Start() {
  return (
    <Container className=' flex min-h-screen justify-center text-lg '>
      <div
        className={`
        bg-green-100 rounded-3xl 
        p-4 xl:p-6 2xl:p-10 
        m-2 xl:m-6 2xl:m-10 
        min-h-[60vh] flex flex-col justify-between text-center gap-4
        _gap-2 _sm:gap-4 flex-grow
        `}
      >
        <div className='flex flex-col gap-0'>
          <FadeVisible>
            <Title
              size='lg'
              text='Веб-приложение для клиентов сети ресторанов быстрого питания'
              className='sm:ml-6 text-xl sm:text-2xl lg:text-3xl 2xl:text-4xl leading-none font-bold'
            />
          </FadeVisible>
          {/* <FadeVisible>
            <Title
              size='lg'
              text='&ldquo;Твоя Шаурма&ldquo;'
              className='text-xl text-lg sm:text-xl lg:text-2xl 2xl:text-3xl leading-none'
            />
          </FadeVisible> */}
        </div>

        {/* центральный блок */}
        <div className='mt-4 2xl:mt-20 content-center flex flex-col gap-2 _sm:gap-4 justify-between'>
          <FadeVisible>
            <div className='_mb-6 _sm:mb-10 flex flex-col gap-0'>
              <span className='text-lg sm:text-xl lg:text-2xl 2xl:text-3xl leading-none'>
                Уважаемый Пользователь!
              </span>
              <span className='text-lg sm:text-xl lg:text-2xl 2xl:text-3xl leading-none'>
                Представляю Вашему вниманию
              </span>
              <span className='text-lg sm:text-xl lg:text-2xl 2xl:text-3xl leading-none'>
                веб-приложение для клиентов сети ресторанов быстрого питания
              </span>
              <span className='text-lg sm:text-xl lg:text-2xl 2xl:text-3xl leading-none'>
                <b>&ldquo;Твоя Шаурма&ldquo;</b>
              </span>
            </div>
          </FadeVisible>
        </div>
        <FadeVisible>
          {/* <ShimmerButton> */}
          <Button className='mt-4 2xl:mt-8 p-6 sm:p-8 lg:p-8 xl:p-8 2xl:p-12 animate-pulse relative overflow-hidden bg-gradient-to-r from-green-500 to-green-800'>
            <Link
              href='/'
              className='text-lg sm:text-xl lg:text-2xl 2xl:text-3xl'
            >
              На главную страницу
            </Link>
          </Button>
          {/* </ShimmerButton> */}
        </FadeVisible>

        <FadeVisible>
          <div className='mt-1 text-center text-[16px] sm:text-lg flex flex-col gap-0 leading-tight'>
            <p>Разработчик: студент группы 2-ИС Кисель Андрей Владимирович</p>
            <p>
              Специальность: 09.02.07 &ldquo;Информационные системы и
              программирование&ldquo;
            </p>
            <p>ГБПОУ Пермский краевой колледж &ldquo;Оникс&ldquo;</p>
            <p className='mt-2'>Пермь 2025</p>
          </div>
        </FadeVisible>
      </div>
    </Container>
  );
}

export default Start;
