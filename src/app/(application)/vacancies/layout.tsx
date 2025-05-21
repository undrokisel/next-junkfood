import type { Metadata } from 'next';
import '../../globals.css';
import { Header } from '@/components/shared/header';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Твоя Shaurma',
  description: 'Ресторан быстрого питания',
};

export default function ApplicationLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <main className='min-h-screen'>
      <Suspense>
        <Header
          hasCart={false}
          hasSearch={false}
          className='bg-green-200/45 border-none'
        />
      </Suspense>
      {children}
      {modal}
    </main>
  );
}
