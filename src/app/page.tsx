import { options } from '@/src/app/api/auth/[...nextauth]';
import { getServerSession } from 'next-auth/next';
import UserCard from '@/src/components/UserCard';

export default async function Home() {
  const session = await getServerSession(options);

  return (
    <>
      {session ? (
        <UserCard user={session?.user} pagetype={'Home'} />
      ) : (
        <h1 className="text-5xl">You Shall Not Pass!</h1>
      )}
    </>
  );
}
