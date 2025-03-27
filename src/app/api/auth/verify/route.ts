import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../../prisma/prisma-client';

export async function GET(req: NextRequest) {
  try {
    const code = req.nextUrl.searchParams.get('code');

    if (!code)
      return NextResponse.json({ error: 'Код не передан!' }, { status: 400 });

    const verificationCode = await prisma.verificationCode.findFirst({
      where: {
        code,
      },
    });

    if (!verificationCode)
      return NextResponse.json(
        { error: 'Ошибка верификации кода' },
        { status: 400 }
      );

    // делаем запись о том, что пользователь подтвержден
    await prisma.user.update({
      where: {
        id: verificationCode.userId,
      },
      data: {
        verified: new Date(),
      },
    });

    // удаляем уже ненужный код из базы
    await prisma.verificationCode.delete({
      where: {
        id: verificationCode.id,
      },
    });

    return NextResponse.redirect(new URL('/?verified', req.url));
  } catch (error) {
    // eslint-disable-next-line
    console.log('[VERIFY_GET] Server error', error);
  }
}
