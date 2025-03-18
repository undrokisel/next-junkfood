import { notFound } from 'next/navigation';
import { Container, ProductForm } from '@/components/shared';
import { prisma } from '../../../../../../prisma/prisma-client';

export default async function ProductPage({
  params: { id },
}: {
  params: { id: string };
}) {
  console.log('id');
  console.log(id);

  const product = await prisma.product.findFirst({
    where: { id: Number(id) },
    include: {
      ingredients: true,
      category: {
        include: {
          products: {
            include: {
              variants: true,
            },
          },
        },
      },
      variants: true,
    },
  });

  if (!product) return notFound();

  return (
    <Container className='flex flex-col my-10'>
      <ProductForm product={product} />
    </Container>
  );
}
