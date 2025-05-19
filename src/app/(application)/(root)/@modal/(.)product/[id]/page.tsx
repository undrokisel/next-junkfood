import { ChooseProductModal } from '@/components/shared';
import { notFound } from 'next/navigation';
import { prisma } from '../../../../../../../prisma/prisma-client';

export default async function ProductModalPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const product = await prisma.product.findFirst({
    where: {
      id: Number(id),
      deletedAt: null,
    },
    include: {
      ingredients: true,
      variants: true,
    },
  });

  if (!product) return notFound();

  return <ChooseProductModal product={product} />;
}
