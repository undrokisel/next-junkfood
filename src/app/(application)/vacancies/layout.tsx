import type { Metadata } from 'next';
import '../../globals.css';
import { Header } from '@/components/shared/header';
import { Suspense } from 'react';

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
    <main className='min-h-screen'>
      <Suspense>
        <Header
          hasCart={false}
          hasSearch={false}
          theme='dark'
          className={`
              border-none bg-white/25   inset-0  _sticky z-50
            `}
        />
      </Suspense>
      {children}
    </main>
  );
}
