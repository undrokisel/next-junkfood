import { NextResponse } from 'next/server';
import { prisma } from '../../../../prisma/prisma-client';

export async function GET() {
  const articles = await prisma.blog.findMany();
  return NextResponse.json(articles);
}
