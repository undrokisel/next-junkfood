import { Title } from '../components/shared/title';
import { Container } from '../components/shared/container';
import { TopBar } from '@/components/shared';

export default function Home() {
  



  return (
  <div className='min-h-[1500px]'>
    <Container className="mt-10">
      <Title size="lg" text="Весь ассортимент" />        
    </Container>
    <TopBar className=''/>
  </div>
  );
}
