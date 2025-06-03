'use client';

import { Suspense } from 'react';
import '../../globals.css';
import { Header } from '@/components/shared/header';
import { FadeVisible } from '@/components/shared/animation/FadeVisible';
import TeamSlider from '@/components/shared/team-slider';
import { adventages } from '@/shared/constants/mockData/adventages/adventages';
import { AdventagesBlock } from '@/components/shared/adventages-block';
import { FoodsBlock } from '@/components/shared/foods-block';
import { foodsBlockData } from '@/shared/constants/mockData/foods-block/foods-block';
import Link from 'next/link';
import { Button } from '@/components/ui';
import { baseBgInteractiveClass } from '@/shared/constants/classes/classes';
import { cn } from '@/shared/lib/utils';
import { FadeLeft } from '@/components/shared/animation/FadeLeft';
import { FadeRight } from '@/components/shared/animation/FadeRight';
import { Footer } from '@/components/shared/footer';
import { Container } from '@/components/shared';
import { FadeUp } from '../../../components/shared/animation/FadeUp';

const teamMembers = [
  {
    imageUrl: '/images/about/team/girl.webp',
    name: 'Елизавета',
    position: 'Лучший повар-шаурмист',
  },
  {
    imageUrl: '/images/about/team/girl3.webp',
    name: 'Алена',
    position: 'Самый быстрый курьер',
  },
  {
    imageUrl: '/images/about/team/man2.webp',
    name: 'Андрей',
    position: 'Основатель и Главный любитель шаурмы',
  },
  {
    imageUrl: '/images/about/team/man3.webp',
    name: 'Егор',
    position: 'Шеф-повар с 20-летним стажем ',
  },
  {
    imageUrl: '/images/about/team/girl2.webp',
    name: 'Алина',
    position: 'Администратор, решит любой вопрос',
  },
  {
    imageUrl: '/images/about/team/girl4.webp',
    name: 'Юлия',
    position: 'Кассир, чья улыбка поднимет настроение',
  },
];

export default function AboutPage() {
  return (
    <>
      <div>
        {/* hero */}

        <section className='relative h-[100vh] w-full overflow-hidden rounded-b-3xl md:rounded-b-[5rem] '>
          <div
            className='fixed top-0 left-0 right-0 bottom-0 -z-10 _rounded-b-3xl _md:rounded-b-[5rem]'
            style={{
              // backgroundImage: "url('/images/about/hero.jpg')",
              backgroundImage: "url('/images/about/hero.webp')",
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundAttachment: 'fixed',
            }}
          >
            <div className='absolute inset-0 bg-green-400/20' />
          </div>
          <Suspense>
            <Header
              hasCart={false}
              hasSearch={false}
              theme='dark'
              className={`
            border-none _bg-black/25   inset-0  sticky z-50
            `}
            />
          </Suspense>
          <div className='container relative z-10 mx-auto flex h-full flex-col items-center justify-center text-white -mt-16 max-w-[1280px] '>
            <FadeVisible>
              <h1 className='text-4xl font-bold tracking-tight sm:text-6xl lg:text-8xl'>
                Твоя шаурма
              </h1>
            </FadeVisible>
            <FadeVisible>
              <p className='mt-4 max-w-xl text-center text-lg sm:text-2xl opacity-90'>
                Мы делаем шаурму, которую хочется есть снова и снова.
              </p>
            </FadeVisible>
          </div>
        </section>

        {/* Mission */}
        <Container>
          <section className=' py-20 overflow-hidden rounded-b-3xl md:rounded-b-[5rem]'>
            <div className='container mx-auto px-4'>
              <div
                className={`
              flex justify-center items-center
              flex-col sm:flex-row
              gap-2 sm:gap-10 
              relative z-10 mx-auto 
              h-full text-white -mt-16
            `}
              >
                <FadeLeft>
                  <h2 className='text-2xl text-center font-bold tracking-tight sm:text-4xl lg:text-6xl'>
                    Наша миссия
                  </h2>
                </FadeLeft>
                <FadeRight>
                  <p className='mt-4 max-w-xl text-center text-lg sm:text-2xl opacity-90'>
                    Мы хотим приносить радость каждому через вкусную и свежую
                    шаурму. Наши рецепты — это сочетание традиций и инноваций, а
                    главная цель — сделать ваш день лучше.{' '}
                  </p>
                </FadeRight>
              </div>
            </div>
          </section>
        </Container>

        {/* Team */}
        <section className='bg-green-100 py-20'>
          <div className='container mx-auto px-4 max-w-[1280px]'>
            <FadeUp>
              <h2 className='mb-10 text-center text-3xl font-semibold text-green-800'>
                Наша команда
              </h2>
            </FadeUp>
            <FadeVisible>
              <TeamSlider members={teamMembers} />
            </FadeVisible>
            <FadeUp>
              <div className='text-center mt-12'>
                <Link href='/vacancies' className=' mt-10 z-10'>
                  <Button
                    size='lg'
                    className={cn(
                      baseBgInteractiveClass,
                      `min-w-[250px] text-lg bg-primary text-white _hover:text-primary _focus:text-primary 
                      transition-all duration-[3000] animate-pulse bg-gradient-to-r from-green-500 to-green-800
                      hover:animate-none
                      focus:animate-none
                      `
                    )}
                  >
                    Cтать частью команды
                  </Button>
                </Link>
              </div>
            </FadeUp>
          </div>
        </section>

        {/* Values */}
        <section className='bg-green-50 py-20 '>
          <div className='container mx-auto px-4 overflow-hidden max-w-[1280px]'>
            <FadeUp>
              <h2 className='mb-10 text-center text-3xl font-semibold text-green-800'>
                Наши ценности
              </h2>
            </FadeUp>
            <AdventagesBlock adventages={adventages} />
          </div>
        </section>

        {/* Food Gallery */}
        <section className='bg-green-50 py-20'>
          <div className='container mx-auto px-4 max-w-[1280px]'>
            <FadeUp>
              <h2 className='mb-10 text-center text-3xl font-semibold text-green-800'>
                Наша специализация - наша гордость!
              </h2>
            </FadeUp>
            <FoodsBlock foodsBlockData={foodsBlockData} />
          </div>
        </section>
      </div>

      <Suspense>
        <Footer />
      </Suspense>
    </>
  );
}
