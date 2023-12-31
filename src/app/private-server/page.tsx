'use server';

import * as React from 'react';
import UserCard from '@/src/components/account/UserCard';
import useSessionOrLoginServer from '@/src/hooks/useSessionOrLoginServer';
import PageContentHeader from '@/src/components/layout/PageContentHeader';
import PageContent from '@/src/components/layout/PageContent';
import DateAndTime from '@/src/components/account/DateAndTime';

export default async function PrivatePage() {
  const session = await useSessionOrLoginServer('/private-server');
  return (
    <div>
      <PageContentHeader title='This page built with NextJS "use server"' />
      <PageContent>
        <DateAndTime />
        <UserCard user={session?.user} />
      </PageContent>
    </div>
  );
}
