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
        <Title size='lg' text='Весь ассортимент' />
      </Container>

      <Container className='mt-[40px]'>
        <div className='flex gap-[30px]'>
          <Filters
            className={cn(`
            px-[30px]
            w-[250px]
            `)}
          />
          <ProductsList className='flex-1' />
        </div>
      </Container>
    </div>
  );
}
