import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../prisma/prisma-client';

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const applicationVacancy = await prisma.applicationVacancy.create({
      data,
    });
    return NextResponse.json(applicationVacancy);
  } catch (error) {
    // eslint-disable-next-line
    console.error('[CREATE_APPLICATION_VACANCY_ERROR]:', error);
    return NextResponse.json(
      { message: 'Не удалось создать заявку на вакансию' },
      { status: 500 }
    );
  }
}
