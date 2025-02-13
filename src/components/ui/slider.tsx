'use client';

import * as React from 'react';
import * as SliderPrimitive from '@radix-ui/react-slider';

import { cn } from '@/shared/lib/utils';

type SliderProps = {
  className?: string;
  min: number;
  max: number;
  step: number;
  value?: number[] | readonly number[];
  formatLabel?: (value: number) => string;
  onValueChange?: (values: number[]) => void;
};

const Slider = React.forwardRef(
  (
    {
      className,
      min,
      max,
      step,
      formatLabel,
      onValueChange,
      value,
      ...props
    }: SliderProps,
    ref
  ) => {
    const initialValue = Array.isArray(value) ? value : [min, max];
    const [localValues, setLocalValues] = React.useState(initialValue);
    React.useEffect(() => {
      // update LocalValue when the exernal value prop changes
      setLocalValues(Array.isArray(value) ? value : [min, max]);
    }, [min, max, value]);

    const handleValueChange = (newValues: number[]) => {
      setLocalValues(newValues);
      if (onValueChange) onValueChange(newValues);
    };

    return (
      <SliderPrimitive.Root
        ref={ref as React.RefObject<HTMLDivElement>}
        min={min}
        max={max}
        step={step}
        value={localValues}
        onValueChange={handleValueChange}
        className={cn(
          'relative flex w-full touch-none select-none mb-6 items-center',
          className
        )}
        {...props}
      >
        <SliderPrimitive.Track className='relative h-1 w-full grow overflow-hidden rounded-full bg-primary/20'>
          <SliderPrimitive.Range className='absolute h-full bg-primary' />
        </SliderPrimitive.Track>
        {localValues.map((localvalue, index) => (
          <React.Fragment key={index}>
            <div
              className='absolute text-center'
              style={{
                left: `calc(${((localvalue - min) / (max - min)) * 90}% - 0px)`,
                top: `10px`,
              }}
            >
              <span className='text-sm'>
                {formatLabel ? formatLabel(localvalue) : localvalue}
              </span>
            </div>
            <SliderPrimitive.Thumb
              className={`block h-4 w-4 rounded-full border-2 border-primary/50 bg-white shadow 
              ring-offset-background transition-colors
              focus-visible:outline-none focus-visible:ring-1
            focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50`}
            />
          </React.Fragment>
        ))}
      </SliderPrimitive.Root>
    );
  }
);

Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };
