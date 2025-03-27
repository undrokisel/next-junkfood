'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { signOut } from 'next-auth/react';
import { updateUserInfo } from '@/app/actions';
import { User } from '@prisma/client';
import { Container } from './container';
import { Title } from './title';
import { FormInput } from './form/form-input';
import { Button } from '../ui';
import {
  formRegisterSchema,
  RegisterFormValues,
} from './modals/auth-modal/forms/schemas';

interface Props {
  data: User;
}

export const ProfileForm: React.FC<Props> = ({ data }) => {
  const form = useForm({
    resolver: zodResolver(formRegisterSchema),
    defaultValues: {
      fullName: data.fullName,
      email: data.email,
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (dataOnSubmit: RegisterFormValues) => {
    try {
      await updateUserInfo({
        email: dataOnSubmit.email,
        fullName: dataOnSubmit.fullName,
        password: dataOnSubmit.password,
      });
      return toast.error('Данные обновлены 📝', {
        icon: '✅',
      });
    } catch (error) {
      // eslint-disable-next-line
      console.log(`[USER_UPDATE]: ${error}`);
      return toast.error('Ошибка при обновлении данных', {
        icon: '❌',
      });
    }
  };

  const onClickSignOut = () => {
    signOut({
      callbackUrl: '/',
    });
  };

  return (
    <Container className='my-10'>
      <Title
        text={`Личные данные | #${data.id}`}
        size='lg'
        className='font-bold text-center'
      />

      <FormProvider {...form}>
        <form
          className='flex flex-col gap-5 w-96 mt-10  mx-auto'
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormInput name='email' label='E-Mail' required />
          <FormInput name='fullName' label='Полное имя' required />

          <FormInput
            type='password'
            name='password'
            label='Новый пароль'
            required
          />
          <FormInput
            type='password'
            name='confirmPassword'
            label='Повторите пароль'
            required
          />

          <Button
            disabled={form.formState.isSubmitting}
            className='text-base mt-10'
            type='submit'
          >
            Сохранить
          </Button>

          <Button
            onClick={onClickSignOut}
            variant='secondary'
            disabled={form.formState.isSubmitting}
            className='text-base'
            type='button'
          >
            Выйти
          </Button>
        </form>
      </FormProvider>
    </Container>
  );
};
