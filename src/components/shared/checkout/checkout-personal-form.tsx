import React from 'react';
import { cn } from '@/shared/lib/utils';
import { WhiteBlock } from '../white-block';
import { FormInput } from '../form';

interface Props {
  className?: string;
}

export const CheckoutPersonalForm: React.FC<Props> = ({ className }) => {
  return (
    <WhiteBlock
      title='2. Персональные данные'
      className={cn('bg-green-100', className)}
    >
      <div className='grid sm:grid-cols-2 gap-2 sm:gap-5'>
        <FormInput name='firstName' className='text-base' placeholder='Имя' />
        <FormInput
          name='lastName'
          className='text-base'
          placeholder='Фамилия'
        />
        <FormInput name='email' className='text-base' placeholder='E-Mail' />
        <FormInput name='phone' className='text-base' placeholder='Телефон' />
      </div>
    </WhiteBlock>
  );
};
