import { options } from '@/src/app/api/auth/[...nextauth]';
import { getServerSession } from 'next-auth/next';
import UserCard from '@/src/components/UserCard';
import { redirect } from 'next/navigation';

export default async function ServerPage() {
  const session = await getServerSession(options);

  if (!session) {
    redirect('/api/auth/signin?callbackUrl=/profile');
  }

  return (
    <section className="flex flex-col gap-6">
      <UserCard user={session?.user} pagetype={'Profile'} />
    </section>
  );
}
