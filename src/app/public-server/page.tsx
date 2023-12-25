import * as React from 'react';
import PageContentHeader from '@/src/components/layout/PageContentHeader';
import PageContent from '@/src/components/layout/PageContent';
import DateAndTime from '@/src/components/account/DateAndTime';

export default function PagePublicServer() {
  return (
    <div>
      <PageContentHeader title='This page built with NextJS "use server"' />
      <PageContent>
        <DateAndTime />
      </PageContent>
    </div>
  );
}
