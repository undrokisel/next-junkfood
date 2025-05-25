import {
  ProductsGroupList,
  TopBar,
  Container,
  Filters,
  Title,
  FiltersMob,
} from '@/components/shared';
import { cn } from '@/shared/lib/utils';
import { Suspense } from 'react';
import { findShaurma } from '@/shared/lib';
import { GetSearchParams } from '@/shared/lib/find-shaurmas';
import { Chat } from '@/shared/lib/ElfsightWidget';
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
        {/* костыль для прокрутки */}
        <div className='invisible' id='шаурма' />
        <Title size='lg' text='Весь ассортимент' className='ml-4' />
      </Container>

      <Suspense>
        <FiltersMob
          className={cn(`
              md:hidden ml-1 sm:ml-4 sticky top-[54px] sm:top-[68px] h-full z-50 py-1
              `)}
        />
      </Suspense>
      <Container className='md:mt-[40px] '>
        <div className='flex h-full gap-[10px] lg:gap-[50px] relative'>
          <div className='md:h-screen hidden md:overflow-y-auto md:block md:sticky md:top-[70px] md:min-w-[275px]'>
            <Suspense>
              <Filters
                className={cn(`
                pl-4  
                w-[250px] 
                `)}
              />
            </Suspense>
          </div>

          <div className='flex flex-col gap-16 mb-4 ml-4 mt-6 md:mt-0'>
            {categories.map(
              (category, index) =>
                category.products.length > 0 && (
                  <ProductsGroupList
                    key={category.id}
                    title={category.name}
                    products={category.products}
                    categoryId={category.id}
                    // костыль для прокрутки
                    nextSection={
                      index < categories.length
                        ? categories[index + 1]?.name
                        : ''
                    }
                  />
                )
            )}
          </div>
          <div className='overflow-hidden bg-green-50'>
            <Chat />
          </div>
        </div>
      </Container>
    </div>
  );
}
