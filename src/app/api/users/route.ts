import { NextRequest, NextResponse } from 'next/server';
import * as Sentry from '@sentry/nextjs';
import { prisma } from '../../../../prisma/prisma-client';

export async function GET() {
  try {
    const users = await prisma.user.findMany();

    return NextResponse.json(users);
  } catch (error) {
    Sentry.captureException(error);
    return new Response('Internal Server Error', { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const user = await prisma.user.create({
      data,
    });
    return NextResponse.json(user);
  } catch (error) {
    Sentry.captureException(error);
    return new Response('Internal Server Error', { status: 500 });
  }
}
