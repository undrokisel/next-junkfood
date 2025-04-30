import { Button } from '@/components/ui';
import Link from 'next/link';
import { Title } from '../../../components/shared/title';
import { Container } from '../../../components/shared/container';

function Start() {
  return (
    <Container className=' flex min-h-screen justify-center text-lg '>
      <div className='bg-green-100 rounded-3xl p-10 m-10 min-h-[60vh] flex flex-col text-center gap-4 flex-grow'>
        <Title
          size='lg'
          text='Веб-приложение для сети ресторанов быстрого питания'
          className='ml-6'
        />
        <Title size='lg' text='&ldquo;Твоя Шаурма&ldquo;' className='ml-6' />

        <div className='mt-20 flex-grow content-center'>
          <div className='mb-10'>
            <p className='text-[28px] mb-8'>Уважаемый пользователь!</p>
            <p className='text-[28px]'>Представляю Вашему вниманию</p>
            <p className='text-[28px]'>
              веб-приложение для сети ресторанов быстрого питания
            </p>
            <p className='text-[28px]'>&ldquo;Твоя Шаурма&ldquo;</p>
          </div>
          <Button className='mt-8 p-12'>
            <Link href='/' className='text-[32px]'>
              Переход на главную страницу сайта
            </Link>
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
