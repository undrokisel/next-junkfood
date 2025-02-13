import type { Metadata } from 'next';
// import { Nunito } from 'next/font/google';
import '../../globals.css';
import { Header } from '@/components/shared/header';

// const nunito = Nunito({
//   subsets: ['cyrillic'],
//   variable: '--font-nunito',
//   weight: ['400', '500', '600', '700', '800', '900'],
// });

export const metadata: Metadata = {
  title: 'Твоя Shaurma',
  description: 'И только твоя',
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
