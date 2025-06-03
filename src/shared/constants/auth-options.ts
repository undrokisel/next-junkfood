import { AuthOptions } from 'next-auth';
import GitHubProvider from 'next-auth/providers/github';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import AppleProvider from 'next-auth/providers/apple';
import VkProvider from 'next-auth/providers/vk';

import { UserRole } from '@prisma/client';
import { prisma } from '../../../prisma/prisma-client';
import { customCompare, getHash } from '../lib/bcript';

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
          role: 'USER' as UserRole,
        };
      },
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID || '',
      clientSecret: process.env.GITHUB_SECRET || '',
      profile(profile) {
        return {
          id: profile.id,
          name: profile.name || profile.login,
          email: profile.email,
          image: profile.avatar_url,
          role: 'USER' as UserRole,
        };
      },
    }),
    AppleProvider({
      clientId: process.env.APPLE_ID || '',
      clientSecret: process.env.APPLE_SECRET || '',
    }),
    VkProvider({
      clientId: process.env.VK_CLIENT_ID || '',
      clientSecret: process.env.VK_CLIENT_SECRET || '',
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials) return null;

        const values = {
          email: credentials.email,
          // password: credentials.password,
        };

        const findUser = await prisma.user.findFirst({ where: values });

        if (!findUser) return null;

        const isPasswordValid = await customCompare(
          credentials.password,
          findUser.password
        );

        if (!isPasswordValid) return null;

        if (!findUser.verified) return null;

        return {
          id: findUser.id,
          email: findUser.email,
          name: findUser.fullName,
          role: findUser.role,
        };
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
  },
  // функции: signIn, jwt, session
  callbacks: {
    /**
     * функция будет срабатывать при авторизации от провайдера (гитхаб, гугл и т.д.)
     * Или по почте и паролю из формы, при подтверждении формы Войти
     *
     */
    async signIn({ user, account }) {
      if (!account || !user) return false;

      try {
        // если есть авторизация типа credentials, то есть по почте и паролю,
        // то пропускаем дальше
        if (account?.provider === 'credentials') return true;

        // если нет, то
        // если нет почты - возвращаем false, что будет значить ошибку авторизации
        if (!user.email) return false;

        // а если есть почта
        // то  ищем пользователя в базе по почте
        // или данным об OAuth авторизации от провайдера
        // пример использования логики:
        // если пользователь ранее авторизовался через гитхаб,
        // но потом в гитхабе сменил почту и даже при отсутствии почты в нашей базе,
        // он сможет аутентифицироваться через гитхаб
        const findUser = await prisma.user.findFirst({
          where: {
            OR: [
              {
                // название провайдера
                provider: account?.provider,
                // id профиля в гугле/гитхабе/другом провайдере
                providerId: account?.providerAccountId,
              },
              { email: user.email },
            ],
          },
        });

        // если пользователь нашелся,
        // то обновляем ему данные о провайдере и аккаунте в провайдере
        if (findUser) {
          await prisma.user.update({
            where: {
              id: findUser.id,
            },
            data: {
              provider: account?.provider,
              providerId: account?.providerAccountId,
            },
          });

          // возвращаем булево значение
          return true;
        }
        const passwordHash: string = await getHash(user.id.toString(), 10);

        // если пользователь не нашелся, то создаем его
        const newUser = await prisma.user.create({
          data: {
            email: user.email,
            fullName: user.name || `Пользователь # + ${user.id}`,
            // password: hashSync(user.id.toString(), 10),
            // заглушка пароля, надо заменить
            password: passwordHash,
            // если авторизовался через OAuth, то аккаунт будет считаться подтвержденным
            verified: new Date(),
            provider: account?.provider,
            providerId: account?.providerAccountId,
          },
        });

        if (!newUser) {
          // eslint-disable-next-line
          console.error('Failed to create new user');
          return false;
        }

        return true;
      } catch (error) {
        // eslint-disable-next-line
        console.error('Error [SIGNIN]', error);
        return false;
      }
    },
    async jwt({ token }) {
      if (!token.email) return token;

      const findUser = await prisma.user.findFirst({
        where: {
          email: token.email,
        },
      });

      // вшиваем в токен дополнительную информацию для нашего приложения
      if (findUser) {
        // eslint-disable-next-line
        token.id = String(findUser.id);
        // eslint-disable-next-line
        token.email = findUser.email;
        // eslint-disable-next-line
        token.fullName = findUser.fullName;
        // eslint-disable-next-line
        token.role = findUser.role;
      }

      return token;
    },
    session({ session, token }) {
      // дополняем сессию данными об id и role пользователя
      // на основании ранее сохраненных в токене данных
      if (session?.user) {
        // eslint-disable-next-line
        session.user.id = token.id;
        // eslint-disable-next-line
        session.user.role = token.role;
      }

      return session;
    },
  },
};
