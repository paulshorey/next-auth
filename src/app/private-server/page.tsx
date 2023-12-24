'use server';

import * as React from 'react';
import UserCard from '@/src/components/account/UserCard';
import useSessionOrLoginServer from '@/src/hooks/useSessionOrLoginServer';

export default async function PrivatePage() {
  const session = await useSessionOrLoginServer('/private-server');

  return (
    <section className="flex flex-col gap-6">
      <UserCard user={session?.user} pagetype="Private SERVER" />
    </section>
  );
}
