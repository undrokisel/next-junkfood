import { cn } from '@/shared/lib/utils';

interface Props {
  src: string;
  className?: string;
}

export const CartItemDetailsImage: React.FC<Props> = ({ src, className }) => {
  return (
    <div className='min-w-[60px]'>
      <img
        // width="60"
        // height="60"
        className={cn('w-[60px] h-[60px] object-contain', className)}
        src={src}
        alt='Cart'
      />
    </div>
  );
};
