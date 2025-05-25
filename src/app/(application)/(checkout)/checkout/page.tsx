'use client';

import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSession } from 'next-auth/react';
import toast from 'react-hot-toast';
import {
  CheckoutFormValues,
  checkoutFormSchema,
} from '@/shared/constants/checkout-form-schema';
import {
  CheckoutSidebar,
  CheckoutTotalSmBar,
  Container,
  Title,
  CheckoutAddressForm,
  CheckoutCart,
  CheckoutPersonalForm,
} from '@/components/shared';
import { useCart } from '@/hooks';
import { createOrder } from '@/app/actions';
import { Api } from '@/services/api-client';
import { useWindowSize } from 'react-use';

export default function CheckoutPage() {
  const { width } = useWindowSize();
  const [submitting, setSubmitting] = React.useState(false);
  const { totalAmount, updateItemQuantity, items, removeCartItem, loading } =
    useCart();
  const { data: session } = useSession();

  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: {
      email: '',
      firstName: '',
      lastName: '',
      phone: '',
      address: '',
      comment: '',
    },
  });

  React.useEffect(() => {
    async function fetchUserInfo() {
      const data = await Api.auth.getMe();
      const [firstName, lastName] = data.fullName.split(' ');

      form.setValue('firstName', firstName);
      form.setValue('lastName', lastName);
      form.setValue('email', data.email);
    }

    if (session) fetchUserInfo();
  }, [form, session]);

  const onSubmit = async (data: CheckoutFormValues) => {
    try {
      setSubmitting(true);
      const url = await createOrder(data);

      toast.error('Заказ успешно оформлен! 📝 Переход на оплату... ', {
        icon: '✅',
      });
      // редирект на страницу оплаты
      if (url) window.location.href = url;
    } catch (err) {
      // eslint-disable-next-line
      console.log(err);
      setSubmitting(false);
      toast.error('Не удалось создать заказ', { icon: '❌' });
    }
  };

  const onClickCountButton = (
    id: number,
    quantity: number,
    type: 'plus' | 'minus'
  ) => {
    const newQuantity = type === 'plus' ? quantity + 1 : quantity - 1;
    updateItemQuantity(id, newQuantity);
  };

  return (
    <Container className='mt-4 sm:mt-10'>
      <Title
        text='Оформление заказа'
        className='font-extrabold mb-4 sm:mb-8 text-2xl sm:text-[36px]'
      />
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className='flex gap-2 lg:gap-10 '>
            <div className='flex flex-col gap-2 lg:gap-10 flex-1 mb-20'>
              {width <= 600 && (
                <CheckoutTotalSmBar
                  totalAmount={totalAmount}
                  loading={loading || submitting}
                />
              )}
              <CheckoutCart
                items={items}
                onClickCountButton={onClickCountButton}
                removeCartItem={removeCartItem}
                loading={loading}
              />

              <CheckoutPersonalForm
                className={loading ? 'opacity-40 pointer-events-none' : ''}
              />
              <CheckoutAddressForm
                className={loading ? 'opacity-40 pointer-events-none' : ''}
              />
            </div>

            {/* Правая часть */}
            {width > 600 && (
              <div className='w-[220px] _sm:w-[300px] _md:w-[350px] lg:w-[350px] '>
                <CheckoutSidebar
                  totalAmount={totalAmount}
                  loading={loading || submitting}
                  className='bg-green-100'
                />
              </div>
            )}
          </div>
        </form>
      </FormProvider>
    </Container>
  );
}
