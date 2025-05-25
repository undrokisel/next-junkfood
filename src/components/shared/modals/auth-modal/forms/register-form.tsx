import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Button } from '@/components/ui';
import { registerUser } from '@/app/actions';
import { Title } from '@/components/shared/title';
import { formRegisterSchema, RegisterFormValues } from './schemas';
import { FormInput } from '../../../form/form-input';

interface Props {
  onClose?: VoidFunction;
  onClickLogin?: VoidFunction;
}

export const RegisterForm: React.FC<Props> = ({
  onClose,
  // onClickLogin
}) => {
  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(formRegisterSchema),
    defaultValues: {
      email: '',
      fullName: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (data: RegisterFormValues) => {
    try {
      await registerUser({
        fullName: data.fullName,
        email: data.email,
        password: data.password,
      });

      toast.success('Регистрация успешна! Осталось подтвердить свою почту', {
        icon: '✅',
      });

      onClose?.();
      return true;
    } catch (error) {
      // eslint-disable-next-line
      console.log('[Register error]:', error);
      return toast.error(`${error}! Авторизуйтесь или выберите другую почту!`, {
        icon: '❌',
      });
    }
  };
  return (
    <FormProvider {...form}>
      <form
        className='flex flex-col gap-5'
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className='mr-2'>
          <Title text='Регистрация' size='md' className='font-bold' />
        </div>
        {/* <div className='flex flex-wrap gap-2 justify-between'> */}
        <FormInput name='email' label='Почта' required />
        <FormInput name='fullName' label='Полное имя' required />
        {/* </div> */}
        {/* <div className='flex flex-wrap gap-2 justify-between'> */}
        <FormInput name='password' label='Пароль' type='password' required />
        <FormInput
          name='confirmPassword'
          type='password'
          label='Подтверждение пароля'
          required
        />
        {/* </div> */}

        <Button
          className='h-12 text-base'
          type='submit'
          size='sm'
          loading={form.formState.isSubmitting}
        >
          Зарегистрироваться
        </Button>
      </form>
    </FormProvider>
  );
};
