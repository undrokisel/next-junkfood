import React from 'react';
import { cn } from '@/lib/utils';
import { Checkbox } from '../ui';

export interface FilterCheckboxProps {
  text: string;
  value: string;
  endAdornment?: React.ReactNode;
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  className?: string;
  name?: string;
}

export const FilterCheckbox: React.FC<FilterCheckboxProps> = ({
  text,
  value,
  endAdornment,
  checked,
  onCheckedChange,
  name,
  className,
}) => {
  const labelRelation = `checkbox-${String(value)}-${name}`;
  return (
    <div className={cn(`flex items-center space-x-2`, className)}>
      <Checkbox
        id={labelRelation}
        value={value}
        className='rounded-[6px] w-5 h-5'
        checked={checked}
        onCheckedChange={onCheckedChange}
      />
      <label
        htmlFor={labelRelation}
        className={`
                                    text-sm font-medium leading-none 
                                    peer-disabled:cursor-not-allowed
                                    cursor-pointer 
                                    flex-1
                                    peer-disabled:opacity-70`}
      >
        {text}
      </label>
      {endAdornment}
    </div>
  );
};
