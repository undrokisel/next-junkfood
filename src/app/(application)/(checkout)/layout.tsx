import { Metadata } from 'next';
import { Suspense } from 'react';
import { Container } from '@/components/shared';
import { Header } from '@/components/shared/header';
import '../../globals.css';

export const metadata: Metadata = {
  title: ' | Корзина',
  description: 'Оформление заказа',
};

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className='min-h-screen mx-10'>
      <Container className=''>
        <Suspense>
          <Header
            hasSearch={false}
            hasCart={false}
            className='border-b-amber-900'
          />
        </Suspense>
        {children}
      </Container>
    </main>
  );
}
