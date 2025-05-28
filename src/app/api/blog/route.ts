import { NextResponse } from 'next/server';
import * as Sentry from '@sentry/nextjs';
import { prisma } from '../../../../prisma/prisma-client';

export async function GET() {
  try {
    const articles = await prisma.blog.findMany();
    return NextResponse.json(articles);
  } catch (error) {
    Sentry.captureException(error);
    return new Response('Internal Server Error', { status: 500 });
  }
}
