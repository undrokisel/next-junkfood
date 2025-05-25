'use client';

import { useState } from 'react';
import { Slider } from '@/components/ui/slider';
import { Card, CardContent } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/shared/lib/utils';
import { baseBgInteractiveClass } from '@/shared/constants/classes/classes';
import { Heading } from './heading';
import { FadeVisible } from './animation/FadeVisible';

const RATES = {
  cashier: 100,
  courier: 150,
  cook: 150,
};

export function IncomeCalculator({ className }: { className?: string }) {
  const [position, setPosition] = useState<'cashier' | 'courier' | 'cook'>(
    'cashier'
  );
  const [hoursPerDay, setHoursPerDay] = useState(8);
  const [deliveriesPerDay, setDeliveriesPerDay] = useState(5);
  const [workDays, setWorkDays] = useState(24);

  const calculateIncome = () => {
    if (position === 'courier')
      return deliveriesPerDay * workDays * RATES.courier;
    return hoursPerDay * workDays * RATES[position];
  };

  const income = calculateIncome();

  return (
    <FadeVisible>
      <div className='flex flex-col items-center justify-center'>
        <Heading title='Калькулятор дохода' className='text-amber-100' />
        <div className='w-[90vw] sm:w-[460px] flex items-center justify-center'>
          <Card
            className={cn(
              'w-full max-w-md bg-white rounded-xl shadow-md bg-green-50',
              className
            )}
          >
            <CardContent className='space-y-6 pt-5'>
              <div className='space-y-6'>
                <div>
                  <label className='block text-lg font-medium text-gray-700 mb-2'>
                    Должность
                  </label>
                  <Select
                    value={position}
                    onValueChange={(value: 'cashier' | 'courier' | 'cook') =>
                      setPosition(value)
                    }
                  >
                    <SelectTrigger
                      className={cn(
                        'w-full  border-1 border-green-600 text-lg',
                        baseBgInteractiveClass
                      )}
                    >
                      <SelectValue placeholder='Выберите должность' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem
                        value='cashier'
                        className={cn('text-md', baseBgInteractiveClass)}
                      >
                        Кассир
                      </SelectItem>

                      <SelectItem
                        value='courier'
                        className={cn('text-md', baseBgInteractiveClass)}
                      >
                        Курьер
                      </SelectItem>

                      <SelectItem
                        value='cook'
                        className={cn('text-md', baseBgInteractiveClass)}
                      >
                        Повар
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Slider1 */}
                <div>
                  <div className='flex justify-between items-center mb-4'>
                    <span className='text-lg font-medium text-gray-700'>
                      {position === 'courier'
                        ? 'Доставок в день'
                        : 'Рабочие часы в день'}
                    </span>
                    <Badge
                      variant='outline'
                      className='px-3 py-1 rounded-sm bg-green-100 text-lg border-green-600'
                    >
                      {position === 'courier' ? deliveriesPerDay : hoursPerDay}
                    </Badge>
                  </div>
                  <div className='mt-4 mb-8'>
                    <Slider
                      value={
                        position === 'courier'
                          ? [deliveriesPerDay]
                          : [hoursPerDay]
                      }
                      onValueChange={(value) => {
                        return position === 'courier'
                          ? setDeliveriesPerDay(value[0])
                          : setHoursPerDay(value[0]);
                      }}
                      min={1}
                      max={position === 'courier' ? 30 : 12}
                      step={1}
                      className='w-full'
                    />
                  </div>
                </div>

                <div className='mt-6'>
                  <div className='flex justify-between items-center mb-2'>
                    <span className='text-lg font-medium text-gray-700'>
                      Рабочие дни в месяц
                    </span>
                    <Badge
                      variant='outline'
                      className='px-3 py-1 rounded-sm bg-green-100 text-lg border-green-600'
                    >
                      {workDays}
                    </Badge>
                  </div>
                  <div className='mt-4 mb-8'>
                    <Slider
                      value={[workDays]}
                      onValueChange={(value) => setWorkDays(value[0])}
                      min={1}
                      max={30}
                      step={1}
                      className='w-full'
                    />
                  </div>
                </div>
              </div>

              <div className='bg-green-100 p-4 rounded-lg space-y-2 mt-12'>
                <div className='flex justify-between text-lg'>
                  <span className='font-medium text-xl'>Итого:</span>
                  <span className='font-bold text-primary'>
                    {income.toLocaleString('ru-RU')} ₽
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </FadeVisible>
  );
}
