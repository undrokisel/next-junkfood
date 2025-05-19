import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// utils/getDomain.ts
export const getDomain = () => {
  // Если мы на стороне клиента
  if (typeof window !== 'undefined') return window.location.origin;

  // На сервере (SSR, API routes)
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;

  // Для локальной разработки
  return 'http://localhost:3000';
};
