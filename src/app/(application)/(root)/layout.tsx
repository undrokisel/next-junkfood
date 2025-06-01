import type { Metadata } from 'next';
import '../../globals.css';
import { Header } from '@/components/shared/header';
import { Suspense } from 'react';
import { Footer } from '@/components/shared/footer';

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
        <Header />
      </Suspense>
      {children}
      {modal}
      <Suspense>
        <Footer className='mt-8' />
      </Suspense>
    </main>
  );
}
