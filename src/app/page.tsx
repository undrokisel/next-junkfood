import { ProductsList, TopBar } from '@/components/shared';
import { Title } from '../components/shared/title';
import { Container } from '../components/shared/container';
import { Filters } from '../components/shared/filters';

export default function Home() {
  return (
    <div className='min-h-[1500px]'>
      <Container className='mt-10'>
        <Title size='lg' text='Весь ассортимент' />
      </Container>
      <TopBar />

      <Container className='mt-[40px]'>
        <div className='grid grid-cols-5'>
          <Filters className='' />
          <ProductsList className='col-span-4' />
        </div>
      </Container>
    </div>
  );
}
