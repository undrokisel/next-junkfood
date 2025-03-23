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
    <main className='min-h-screen bg-[#F4F1EE]'>
      <Container>
        <Suspense>
          <Header
            hasSearch={false}
            // hasCart={false}
            className='border-b-gray-200'
          />
        </Suspense>
        {children}
      </Container>
    </main>
  );
}
