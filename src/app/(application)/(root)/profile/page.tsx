import { redirect } from 'next/navigation';
import { ProfileForm } from '@/components/shared/profile-form';
import { getUserSession } from '@/shared/lib';
import { prisma } from '../../../../../prisma/prisma-client';

export default async function ProfilePage() {
  // проверка на стороне сервера
  const session = await getUserSession();

  if (!session) return redirect('/not-auth');

  const user = await prisma.user.findFirst({
    where: { id: Number(session?.id) },
  });

  if (!user) return redirect('/not-auth');

  return <ProfileForm data={user} />;
}
