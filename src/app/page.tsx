import * as React from 'react';
import PageContentHeader from '../components/layout/PageContentHeader';
import PageContent from '../components/layout/PageContent';
import HomePhind from '../components/home/Phind';
import HomeYoutube from '@/src/components/home/Youtube';
import HomeString from '@/src/components/home/String';

export default async function Home() {
  return (
    <div>
      <PageContentHeader title="Your custom homepage" />
      <PageContent>
        <HomePhind />
        <HomeYoutube />
        <HomeString />
      </PageContent>
    </div>
  );
}
