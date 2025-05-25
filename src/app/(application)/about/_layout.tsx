import type { Metadata } from 'next';
import '../../globals.css';

export const metadata: Metadata = {
  title: 'About Твоя Shaurma',
  description: 'Страница о нас',
};

export default function AboutLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <main className='min-h-screen relative'>{children}</main>;
}
