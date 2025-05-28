import { NextRequest, NextResponse } from 'next/server';
import * as Sentry from '@sentry/nextjs';
import { prisma } from '../../../../../prisma/prisma-client';

export async function GET(req: NextRequest) {
  try {
    const query = req?.nextUrl?.searchParams?.get('query') || '';
    const products = await prisma.product.findMany({
      where: {
        name: {
          contains: query,
          mode: 'insensitive',
        },
        deletedAt: null,
      },
      take: 5,
    });

    return NextResponse.json(products);
  } catch (error) {
    Sentry.captureException(error);
    return new Response('Internal Server Error', { status: 500 });
  }
}
