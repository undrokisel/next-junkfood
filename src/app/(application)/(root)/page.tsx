import {
  ProductsGroupList,
  TopBar,
  Container,
  Filters,
  Title,
} from '@/components/shared';
import { cn } from '@/shared/lib/utils';
import { Suspense } from 'react';
import { prisma } from '../../../../prisma/prisma-client';

export default async function Home() {
  const categories = await prisma.category.findMany({
    include: {
      products: {
        include: {
          variants: true,
          ingredients: true,
        },
      },
    },
  });

  return (
    <div className='min-h-[1500px]'>
      <TopBar
        categories={categories.filter((cat) => cat.products.length > 0)}
      />
      <Container className='mt-10'>
        <Title size='lg' text='Весь ассортимент' className='ml-6' />
      </Container>

      <Container className='mt-[40px]'>
        <div className='flex gap-[50px]'>
          <Suspense fallback='<...Загрузка>'>
            <Filters
              className={cn(`
              px-6
              w-[250px]
              `)}
            />
          </Suspense>

          <div className='flex flex-col gap-16'>
            {categories.map(
              (category) =>
                category.products.length > 0 && (
                  <ProductsGroupList
                    key={category.id}
                    title={category.name}
                    products={category.products}
                    categoryId={category.id}
                  />
                )
            )}
          </div>
        </div>
      </Container>
    </div>
  );
}
