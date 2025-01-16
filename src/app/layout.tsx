import type { Metadata } from 'next';
import { Nunito } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/shared/header';

const nunito = Nunito({
  subsets: ['cyrillic'],
  variable: '--font-nunito',
  weight: ['400', '500', '600', '700', '800', '900'],
});

export const metadata: Metadata = {
  title: 'Shaurma #2',
  description: 'Но мы все равно № 1',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className={nunito.className}>
        <main className='min-h-screen'>
          <Header />
          {children}
        </main>
      </body>
    </html>
  );
}
