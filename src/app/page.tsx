import { ProductsGroupList, TopBar } from '@/components/shared';
import { cn } from '@/lib/utils';
import { Product } from '@/components/shared/product-card';
import { Suspense } from 'react';
import { Title } from '../components/shared/title';
import { Container } from '../components/shared/container';
import { Filters } from '../components/shared/filters';

const products: Product[] = [
  {
    id: 1,
    name: `Шаурма "Стандарт"`,
    description: 'Обычная шаурма',
    imgUrl: '/images/products/standart.png',
    items: [{ price: 300 }],
  },
  {
    id: 2,
    name: `Шаурма "Мини"`,
    description: 'Мини шаурма',
    imgUrl: '/images/products/mini.png',
    items: [{ price: 250 }],
  },
  {
    id: 3,
    name: `Шаурма "Богатырская"`,
    description: 'Большая шаурма',
    imgUrl: '/images/products/big.png',
    items: [{ price: 400 }],
  },
  {
    id: 4,
    name: `Шаурма "Стандарт"`,
    description: 'Обычная шаурма',
    imgUrl: '/images/products/standart.png',
    items: [{ price: 300 }],
  },
  {
    id: 5,
    name: `Шаурма "Мини"`,
    description: 'Мини шаурма',
    imgUrl: '/images/products/mini.png',
    items: [{ price: 250 }],
  },
  {
    id: 6,
    name: `Шаурма "Богатырская"`,
    description: 'Большая шаурма',
    imgUrl: '/images/products/big.png',
    items: [{ price: 400 }],
  },
];

const categories = [
  {
    id: 1,
    name: 'шаурма',
  },
  {
    id: 2,
    name: 'добавки',
  },
  {
    id: 3,
    name: 'комбо',
  },
  {
    id: 4,
    name: 'акции',
  },
  {
    id: 5,
    name: 'десерты',
  },
];

export default function Home() {
  return (
    <div className='min-h-[1500px]'>
      <TopBar />
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

          <div className='flex flex-col gap-16'>
            {categories.map((category) => (
              <ProductsGroupList
                key={category.id}
                title={category.name}
                products={products}
                categoryId={category.id}
              />
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
}
