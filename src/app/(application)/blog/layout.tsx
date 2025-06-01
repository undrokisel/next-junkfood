import type { Metadata } from 'next';
import '../../globals.css';
import { Header } from '@/components/shared/header';
import { Suspense } from 'react';
import { arrangeImgUrl } from '@/shared/lib/arrangeImgUrl';
import { Footer } from '@/components/shared/footer';

export const metadata: Metadata = {
  title: 'Твоя Shaurma',
  description: 'Ресторан быстрого питания',
};

export default function VacanciesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className='min-h-screen relative'>
      <Suspense>
        <Header
          hasCart={false}
          hasSearch={false}
          theme='dark'
          className={`
              border-none _bg-black/25   inset-0  _sticky z-50
            `}
        />
      </Suspense>
      <div
        style={{
          // backgroundImage: `url(${arrangeImgUrl('images/vacancies/hero.jpg')})`,
          backgroundImage: `url(${arrangeImgUrl('images/vacancies/hero.webp')})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          position: 'fixed',
        }}
        className='absolute inset-0 -z-10 h-screen w-full'
      />
      {/* <img src={arrangeImgUrl('images/vacancies/hero.jpg')} alt='bg' className='abcolute inset-0 fixed -z-10 object-contain'/> */}
      <div className='abcolute inset-0 fixed -z-10 bg-green-900/70 ' />
      {children}
      <Suspense>
        <Footer />
      </Suspense>
    </main>
  );
}
