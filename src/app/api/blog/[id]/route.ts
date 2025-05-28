import { NextRequest, NextResponse } from 'next/server';
import * as Sentry from '@sentry/nextjs';
import { prisma } from '../../../../../prisma/prisma-client';

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = Number(params.id);
    if (!id) return NextResponse.json({ error: 'ID blog not found' });

    const article = await prisma.blog.findFirst({ where: { id } });
    if (!article)
      return NextResponse.json({ error: `Article with ID ${id} not found` });

    return NextResponse.json(article);
  } catch (error) {
    // eslint-disable-next-line
    console.error('[GET ARTICLE ERROR:]: ', error);
    Sentry.captureException(error);
  }
}
