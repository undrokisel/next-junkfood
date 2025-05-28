import { authOptions } from '@/shared/constants/auth-options';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import * as Sentry from '@sentry/nextjs';
import { prisma } from '../../../../../prisma/prisma-client';

export const dynamic = 'force-dynamic';

export async function GET(req: any, res: any) {
  try {
    const user = await getServerSession(req, res, authOptions);
    if (!user)
      return NextResponse.json(
        { message: 'Вы не авторизованы' },
        { status: 401 }
      );

    const data = await prisma.user.findUnique({
      where: {
        id: Number(user.user.id),
      },
      select: {
        fullName: true,
        email: true,
        password: false,
      },
    });

    return NextResponse.json(data);
  } catch (error) {
    // eslint-disable-next-line
    console.log(error);
    Sentry.captureException(error);

    return NextResponse.json(
      { message: '[USER_GET] Server error' },
      { status: 500 }
    );
  }
}
