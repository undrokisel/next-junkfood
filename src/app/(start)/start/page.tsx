import { Button } from '@/components/ui';
import Link from 'next/link';
import { Title } from '../../../components/shared/title';
import { Container } from '../../../components/shared/container';

function Start() {
  return (
    <Container className=' flex min-h-screen justify-center text-lg'>
      <div className='bg-green-100 rounded-3xl p-10 m-10 min-h-[60vh] flex flex-col text-center gap-4'>
        <Title
          size='lg'
          text='Веб-приложение для сети ресторанов быстрого питания'
          className='ml-6'
        />
        <Title size='lg' text='&ldquo;Твоя Шаурма&ldquo;' className='ml-6' />

        <div className='mt-20 flex-grow'>
          <p>Уважаемый пользователь!</p>
          <p>
            Представляю вашему вниманию веб-приложение для сети ресторанов
            быстрого питания &ldquo;Твоя Шаурма&ldquo;
          </p>
          <Button className='mt-8 '>
            <Link href='/'>Переход на главную</Link>
          </Button>
        </div>

        <div className='mt-7 text-center'>
          <p>Разработчик: студент группы 2-ИС Кисель Андрей Владимирович</p>
          <p>
            Специальность: 09.02.07 &ldquo;Информационные системы и
            программирование&ldquo;
          </p>
          <p>ГБПОУ Пермский краевой колледж &ldquo;Оникс&ldquo;</p>
          <p className='mt-8'>Пермь 2025</p>
        </div>
      </div>
    </Container>
  );
}

export default Start;
