'use client';

import * as React from 'react';
import UserCard from '@/src/components/account/UserCard';
import useSessionOrLogin from '@/src/hooks/useSessionOrLoginClient';

export default function PrivatePage() {
  const session = useSessionOrLogin();

  return (
    <section className="flex flex-col gap-6">
      <UserCard user={session?.user} pagetype="Private client" />
    </section>
  );
}
