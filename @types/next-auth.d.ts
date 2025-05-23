// Ref: https://next-auth.js.org/getting-started/typescript#module-augmentation

import { UserRole } from '@prisma/client';
import { DefaultUser } from 'next-auth';
import {
  // JWT,
  DefaultJWT,
} from 'next-auth/jwt';

// костыли для кастомной формы авторизации а не от next/auth
// берем модули и переопределяем (докручиваем до необходимого)
declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      role: UserRole;
      name: string;
      image: string;
    };
  }

  interface User extends DefaultUser {
    id: number;
    role: UserRole;
  }
}

declare module 'next-auth/jwt' {
  interface JWT extends DefaultJWT {
    id: string;
    role: UserRole;
  }
}
