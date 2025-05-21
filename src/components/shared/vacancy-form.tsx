'use client';

import { useForm } from 'react-hook-form';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { cn } from '@/shared/lib/utils';
import { baseBgInteractiveClass } from '@/shared/constants/classes/classes';
import toast from 'react-hot-toast';
import axios from 'axios';
import { Heading } from './heading';

// Схема валидации с помощью Zod
const formSchema = z.object({
  fio: z
    .string()
    .min(2, 'Должно быть больше 2 символов')
    .max(50, 'Должно быть меньше 50 символов'),
  phone: z
    .string()
    .min(11, 'Нехватает символов?')
    .max(16, 'Хм... слишком длинный номер'),
  comment: z.string().max(500, 'Не более 500 символов').optional(),
});

export function VacancyForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fio: '',
      phone: '',
      comment: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/applicationVacancy`,
        {
          fio: values.fio,
          phone: values.phone,
          comment: values.comment,
        }
      );

      if (response.status >= 200 && response.status < 300) {
        toast.success('Заявка успешно отправлена!', {
          icon: '✅',
        });
        return;
      }

      throw new Error(`Server returned status ${response.status}`);
    } catch (error) {
      // eslint-disable-next-line
      console.log(`[USER_UPDATE]: ${error}`);
      toast.error('Ошибка при отправке заявки на вакансию', {
        icon: '❌',
      });
    }
  };

  return (
    <div className='flex flex-col items-center justify-center mt-12'>
      <Heading title='Заполни анкету' className='text-amber-100' />
      <div className='w-[90vw] sm:w-[460px]'>
        <Card className='w-full max-w-md mx-auto pt-5 bg-green-50'>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className='space-y-6'
              >
                {/* ФИО */}
                <FormField
                  control={form.control}
                  name='fio'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='text-lg'>ФИО</FormLabel>
                      <FormControl>
                        <Input
                          placeholder='Иванов Иван Иванович'
                          className={cn('text-lg', baseBgInteractiveClass)}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Телефон */}
                <FormField
                  control={form.control}
                  name='phone'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='text-lg'>Телефон</FormLabel>
                      <FormControl>
                        <Input
                          className={cn('text-lg', baseBgInteractiveClass)}
                          placeholder='+7 (999) 123-45-67'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Комментарий */}
                <FormField
                  control={form.control}
                  name='comment'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='text-lg'>
                        Комментарий (необязательно)
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder='Дополнительная информация'
                          className={cn(
                            'resize-none text-lg',
                            baseBgInteractiveClass
                          )}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type='submit' className='w-full'>
                  Отправить анкету
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
