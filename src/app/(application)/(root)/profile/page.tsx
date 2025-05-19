import { redirect } from 'next/navigation';
import { ProfileForm } from '@/components/shared/profile-form';
import { getUserSession } from '@/shared/lib';
import ExampleTable from '@/components/shared/table/table';
import { Title } from '@/components/shared';
import { prisma } from '../../../../../prisma/prisma-client';

export default async function ProfilePage() {
  // проверка на стороне сервера
  const session = await getUserSession();

  if (!session) return redirect('/not-auth');

  const user = await prisma.user.findFirst({
    where: { id: Number(session?.id) },
  });

  if (!user) return redirect('/not-auth');

  const orders = await prisma.order.findMany({
    where: {
      email: user.email,
    },
  });

  return (
    <div className='flex flex-wrap'>
      {orders ? (
        <div className='flex justify-start flex-col mt-10 w-full'>
          <Title
            text='История заказов'
            size='lg'
            className='font-bold text-center'
          />
          <Title
            text={`${user.email.slice(0, 20)}`}
            size='sm'
            className='font-bold text-center'
          />
          <ExampleTable email={user.email} />
        </div>
      ) : (
        <Title text='История заказов пуста' />
      )}
      <ProfileForm data={user} />
    </div>
  );
}
