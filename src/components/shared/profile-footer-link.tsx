import React from 'react';
import { cn } from '@/shared/lib/utils';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { footerInteractiveClass } from '@/shared/constants/classes/classes';

interface Props {
  onClickSignIn: VoidFunction;
  className?: string;
}

export const ProfileFooterLink: React.FC<Props> = ({
  onClickSignIn,
  className,
}) => {
  const { data: session } = useSession();
  return (
    <div className={cn(className)}>
      {!session ? (
        <div
          role='button'
          tabIndex={0}
          onClick={onClickSignIn}
          onKeyDown={onClickSignIn}
          className={`${footerInteractiveClass}`}
        >
          <span>Войти в систему</span>
        </div>
      ) : (
        <Link href='/profile' className={`${footerInteractiveClass}`}>
          <div>
            <span>Личный кабинет</span>
          </div>
        </Link>
      )}
    </div>
  );
};
