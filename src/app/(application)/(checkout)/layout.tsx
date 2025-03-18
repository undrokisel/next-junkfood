import { Metadata } from 'next';
import { Suspense } from 'react';
import { Container, Header } from '@/components/shared';
import '../../globals.css';

export const metadata: Metadata = {
  title: ' | Корзина',
  description: 'Корзина магазина бытрого питания',
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
