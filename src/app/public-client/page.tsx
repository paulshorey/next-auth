'use client';

import * as React from 'react';
import dynamic from 'next/dynamic';
import PageContentHeader from '@/src/components/layout/PageContentHeader';
import PageContent from '@/src/components/layout/PageContent';

const DateAndTime = dynamic(() => import('@/src/components/account/DateAndTime'), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});

export default function PublicPageClient() {
  return (
    <div>
      <PageContentHeader title='This page built with NextJS "use client"' />
      <PageContent>
        {/* @ts-ignore */}
        <DateAndTime />
      </PageContent>
    </div>
  );
}
