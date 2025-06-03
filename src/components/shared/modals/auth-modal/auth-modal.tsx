'use client';

import { Button, Dialog } from '@/components/ui';
import {
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '@/components/ui/dialog';
import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { LoginForm } from './forms/login-form';
import { RegisterForm } from './forms/register-form';

interface Props {
  open: boolean;
  onClose: () => void;
}

export const AuthModal: React.FC<Props> = ({ open, onClose }) => {
  const [type, setType] = useState<'login' | 'register'>('login');

  const onSwitchType = () => {
    setType(type === 'login' ? 'register' : 'login');
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className='w-[90vw] md:min-w-[550px] bg-green-100 sm:p-10 rounded-3xl max-h-[90vh] overflow-y-auto scrollbar'>
        {type === 'login' ? (
          <LoginForm onClose={handleClose} />
        ) : (
          <RegisterForm onClose={handleClose} />
        )}

        <hr />
        <DialogTitle className='sr-only' />
        <DialogDescription className='sr-only' />

        {/* {type === 'login' && ( */}
        <div className=''>
          {/* <p className='text-center text-primary mb-4'>
              Если Вы уже зарегистрированы, то можете войти через:
            </p> */}
          <div className='flex gap-2'>
            <Button
              variant='secondary'
              onClick={() =>
                signIn('github', {
                  callbackUrl: '/',
                  redirect: true,
                })
              }
              type='button'
              className='gap-2 h-12 p-2 flex-1 
                      bg-green-200
                      transition-all duration-300
                      hover:bg-amber-200
                      focus:bg-amber-200
                      hover:shadow-sm
                      focus:shadow-sm
                      '
            >
              <img
                className='w-6 h-6'
                src='/images/auth_providers/github.svg'
                alt='авторизация на guthub'
              />
              GitHub
            </Button>

            <Button
              variant='secondary'
              onClick={() =>
                signIn('google', {
                  callbackUrl: '/',
                  redirect: true,
                })
              }
              type='button'
              className='gap-2 h-12 p-2 flex-1
                      bg-green-200
                      transition-all duration-300
                      hover:bg-amber-200
                      focus:bg-amber-200
                      hover:shadow-sm
                      focus:shadow-sm
              '
            >
              <img
                className='w-6 h-6'
                // src='https://fonts.gstatic.com/s/i/productlogos/googleg/v6/24px.svg'
                src='/images/auth_providers/google.svg'
                alt='авторизация на google'
              />
              Google
            </Button>

            {/* <Button
                variant='secondary'
                onClick={() =>
                  signIn('vk', {
                    callbackUrl: '/',
                    redirect: true,
                  })
                }
                type='button'
                className='gap-2 h-12 p-2 flex-1'
              >
                <img
                  className='w-6 h-6'
                  src='/images/auth_providers/vk.jpg'
                  alt='авторизация на vk'
                />
                Вконтакте
              </Button> */}
          </div>
        </div>
        {/* )} */}

        <Button
          variant='outline'
          onClick={onSwitchType}
          type='button'
          className='h-12'
        >
          {type !== 'login' ? 'Войти' : 'Регистрация'}
        </Button>
      </DialogContent>
    </Dialog>
  );
};
