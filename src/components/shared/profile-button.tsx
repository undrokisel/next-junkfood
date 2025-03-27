import React from 'react';
import { cn } from '@/shared/lib/utils';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { CircleUser, User } from 'lucide-react';
import { Button } from '../ui';

interface Props {
  onClickSignIn: VoidFunction;
  className?: string;
}

export const ProfileButton: React.FC<Props> = ({
  onClickSignIn,
  className,
}) => {
  const { data: session } = useSession();
  return (
    <div className={cn(className)}>
      {!session ? (
        <Button
          onClick={onClickSignIn}
          variant='outline'
          className='flex items-center gap-1'
        >
          <User size={16} />
          <span>Войти</span>
        </Button>
      ) : (
        <Link href='/profile'>
          <Button variant='secondary' className='flex items-center gap-2'>
            <CircleUser size={18} />
            Профиль
          </Button>
        </Link>
      )}
    </div>
  );
};
