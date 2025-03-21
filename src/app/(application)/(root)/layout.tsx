import type { Metadata } from 'next';
import '../../globals.css';
import { Header } from '@/components/shared/header';

export const metadata: Metadata = {
  title: 'Твоя Shaurma',
  description: 'Ресторан быстрого питания',
};

export default function ApplicationLayout({
  children,
  // modal,
}: Readonly<{
  children: React.ReactNode;
  // modal: React.ReactNode | never;
}>) {
  return (
    // <html lang='en' suppressHydrationWarning>
    // <body className={nunito.className}>
    <main className='min-h-screen'>
      <Header />
      {children}
      {/* {modal} */}
    </main>
    // </body>
    // </html>
  );
}
