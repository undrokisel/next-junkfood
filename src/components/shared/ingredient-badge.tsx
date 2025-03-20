import React from 'react';
import { cn } from '@/shared/lib/utils';
import Image from 'next/image';
import { CheckCircle } from 'lucide-react';

interface Props {
  imageUrl: string;
  name: string;
  price: number;
  active?: boolean;
  onClick?: () => void;

  className?: string;
}

export const IngredientBadge: React.FC<Props> = ({
  className,
  imageUrl,
  name,
  price,
  active,
  onClick,
}) => {
  return (
    <div
      role='button'
      tabIndex={0}
      onClick={onClick}
      onKeyDown={onClick}
      className={cn(
        'w-32 flex flex-col justify-center items-center p-1 bg-white rounded-md text-center relative cursor-pointer shadow-md',
        {
          'border border-primary': active,
        },
        className
      )}
    >
      <Image src={`${imageUrl}`} alt={name} width={50} height={50} />
      {active && (
        <CheckCircle
          size={20}
          className='absolute top-1 right-1 text-primary'
        />
      )}
      <span className='text-xs text-center'>{name}</span>
      <span className='font-bold  text-center'>{price}</span>
    </div>
  );
};
