import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function HeroVacancy() {
  return (
    <section className='relative h-[600px] h-[100vh] w-full overflow-hidden'>
      {/* Контент */}
      <div className='relative z-10 flex h-full flex-col items-center justify-center px-4 text-center text-white'>
        <div className='max-w-4xl space-y-6'>
          <h1 className='text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl'>
            <span className='block'>Зарабатывай</span>
            <span className='block bg-gradient-to-r from-primary to-yellow-400 bg-clip-text text-transparent'>
              до 70 000 рублей в месяц
            </span>
          </h1>

          <p className='text-2xl text-gray-200 md:text-3xl'>
            Работай в &#39;Твоей шаурме&#39; с гибким графиком и стабильным
            доходом
          </p>

          <div className='flex flex-col items-center justify-center gap-4 sm:flex-row'>
            <Link href='/vacancies/#calculator'>
              <Button className='w-full max-w-xs text-lg font-semibold sm:w-auto'>
                Рассчитай свой доход
              </Button>
            </Link>
            <Link href='/vacancies/#form'>
              <Button
                variant='outline'
                size='lg'
                className='w-full max-w-xs text-lg font-semibold sm:w-auto bg-amber-200'
              >
                Оставить заявку
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Якорь для скролла */}
      {/* <div ref={applicationRef} className='absolute bottom-0 h-0 w-full' /> */}
    </section>
  );
}
