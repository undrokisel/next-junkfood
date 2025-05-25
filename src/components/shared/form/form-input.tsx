'use client';

import { useFormContext } from 'react-hook-form';
import { Input } from '../../ui/input';
import { ClearButton } from '../clear-button';
import { ErrorText } from '../error-text';
import { RequiredSymbol } from '../required-symbol';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  required?: boolean;
  className?: string;
}

export const FormInput: React.FC<Props> = ({
  className,
  name,
  label,
  required,
  ...props
}) => {
  const {
    register,
    formState: { errors },
    watch,
    setValue,
  } = useFormContext();

  const value = watch(name);
  const errorText = errors[name]?.message as string;

  const onClickClear = () => {
    setValue(name, '', { shouldValidate: true });
  };

  return (
    <div className={className}>
      {label && (
        <p className='font-medium sm:mb-2'>
          {label} {required && <RequiredSymbol />}
        </p>
      )}

      <div className='relative'>
        <Input
          className={`
          h-10 text-md bg-green-50
          transition-all duration-300 
          hover:bg-amber-100
          focus:bg-amber-100
        `}
          {...register(name)}
          {...props}
        />

        {value && <ClearButton onClick={onClickClear} className='ml-4' />}
      </div>

      {errorText && <ErrorText text={errorText} className='mt-2' />}
    </div>
  );
};
