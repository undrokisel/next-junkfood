import { ProductsList, TopBar } from '@/components/shared';
import { cn } from '@/lib/utils';
import { Title } from '../components/shared/title';
import { Container } from '../components/shared/container';
import { Filters } from '../components/shared/filters';

export default function Home() {
  return (
    <div className='min-h-[1500px]'>
      <TopBar />
      <Container className='mt-10'>
        <Title size='lg' text='Весь ассортимент' className='ml-6' />
      </Container>

      <Container className='mt-[40px]'>
        <div className='flex gap-[50px]'>
          <Filters
            className={cn(`
            px-6
            w-[250px]
            `)}
          />
          <ProductsList className='flex-1' />
        </div>
      </Container>
    </div>
  );
}
