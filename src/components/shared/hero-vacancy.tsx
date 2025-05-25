'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { FadeLeft } from './animation/FadeLeft';
import { FadeRight } from './animation/FadeRight';
import { FadeVisible } from './animation/FadeVisible';

export function HeroVacancy() {
  return (
    <section className='relative h-[600px] h-[100vh] w-full overflow-hidden'>
      {/* Контент */}
      <div className='relative z-10 flex h-full flex-col items-center justify-center px-4 text-center text-white'>
        <div className='max-w-4xl space-y-6'>
          <FadeVisible>
            <h1 className='text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl'>
              <span className='block'>Зарабатывай</span>
              <span className='block bg-gradient-to-r from-primary to-yellow-400 bg-clip-text text-transparent'>
                до 70 000 рублей в месяц
              </span>
            </h1>
          </FadeVisible>
          <FadeVisible>
            <p className='text-2xl text-gray-200 md:text-3xl'>
              Работай в &#39;Твоей шаурме&#39; с гибким графиком и стабильным
              доходом
            </p>
          </FadeVisible>

          <div className='flex flex-col items-center justify-center gap-4 sm:flex-row'>
            <Link href='/vacancies/#calculator'>
              <FadeLeft>
                <Button className='w-full max-w-xs text-lg font-semibold sm:w-auto'>
                  Рассчитай свой доход
                </Button>
              </FadeLeft>
            </Link>
            <Link href='/vacancies/#form'>
              <FadeRight>
                <Button
                  variant='outline'
                  size='lg'
                  className='w-full max-w-xs text-lg font-semibold sm:w-auto bg-amber-200'
                >
                  Оставить заявку
                </Button>
              </FadeRight>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
