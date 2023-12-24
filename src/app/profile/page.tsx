import * as React from 'react';
import UserCard from '@/src/components/account/UserCard';
import { sessionGet } from '@/src/app/auth/actions/session';

export default async function Home() {
  let session = await sessionGet();

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
