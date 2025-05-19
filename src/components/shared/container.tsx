import { cn } from '@/shared/lib/utils';

interface Props {
  className?: string;
}

export const Container: React.FC<React.PropsWithChildren<Props>> = ({
  children,
  className,
}) => {
  return (
    <div className={cn(className, 'mx-auto max-w-[1280px]')}>{children}</div>
  );
};
