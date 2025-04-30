import {
  ProductsGroupList,
  TopBar,
  Container,
  Filters,
  Title,
} from '@/components/shared';
import { cn } from '@/shared/lib/utils';
import { Suspense } from 'react';
import { findShaurma } from '@/shared/lib';
import { GetSearchParams } from '@/shared/lib/find-shaurmas';
import { Stories } from '../../../components/shared/stories';

export default async function Home({
  searchParams,
}: {
  searchParams: GetSearchParams;
}) {
  const categories = await findShaurma(searchParams);

  return (
    <div className='min-h-[1500px]'>
      <TopBar
        categories={categories.filter((cat) => cat.products.length > 0)}
      />

      <Stories />

      <Container className='mt-10'>
        <Title size='lg' text='Весь ассортимент' className='ml-6' />
      </Container>

      <Container className='mt-[40px]'>
        <div className='flex gap-[50px]'>
          <Suspense>
            <Filters
              className={cn(`
              px-6
              w-[250px]
              `)}
            />
          </Suspense>

          <div className='flex flex-col gap-16 mb-4 ml-4'>
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
