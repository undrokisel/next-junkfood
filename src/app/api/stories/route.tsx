import { NextResponse } from 'next/server';
import * as Sentry from '@sentry/nextjs';
import { prisma } from '../../../../prisma/prisma-client';

export async function GET() {
  try {
    const stories = await prisma.story.findMany({
      include: {
        items: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json(stories);
  } catch (error) {
    Sentry.captureException(error);
    return new Response('Internal Server Error', { status: 500 });
  }
}
