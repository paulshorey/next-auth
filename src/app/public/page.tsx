'use client';

import * as React from 'react';
import UserCard from '@/src/components/account/UserCard';

export default function PublicPage() {
  return (
    <section className="flex flex-col gap-6">
      <UserCard user={undefined} pagetype="Public" />
    </section>
  );
}
