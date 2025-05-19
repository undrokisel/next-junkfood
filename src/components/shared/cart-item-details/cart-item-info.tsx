import { cn } from '@/shared/lib/utils';

interface Props {
  name: string;
  details: string;
  className?: string;
}

export const CartItemInfo: React.FC<Props> = ({ name, details, className }) => {
  return (
    <div className='w-full overflow-hidden'>
      <div className={cn('flex items-center justify-between', className)}>
        <h2
          className={`
          text-sm sm:text-lg font-bold flex-1 
          text-end md:text-center 
          leading-none sm:leading-none
          `}
        >
          {name}
        </h2>
      </div>
      {details && (
        <p
          className={`
        w-full text-xs leading-none text-gray-400 w-[90%] 
        text-end md:text-center
        `}
        >
          {details}
        </p>
      )}
    </div>
  );
};
