// app/not-found.tsx

import Link from 'next/link';

export default function NotFound() {
  return (
    <div className='flex min-h-[80vh] flex-col items-center justify-center text-center'>
      <h2 className='mb-4 text-4xl font-bold'>Страница не найдена</h2>
      <p className='mb-6 text-lg text-gray-600'>
        Извините, мы не смогли найти запрашиваемую вами страницу.
      </p>
      <Link href='/' className='text-blue-500 hover:underline'>
        Вернуться на главную
      </Link>
    </div>
  );
}
