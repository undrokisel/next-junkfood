import { cn } from '@/shared/lib/utils';

interface HeadingProps {
  title: string;
  className?: string;
}
export const Heading = ({ title, className }: HeadingProps) => {
  return (
    <div className={cn('text-center mb-5', className)}>
      <h1 className='text-3xl font-bold tracking-tight'>{title}</h1>
    </div>
  );
};
