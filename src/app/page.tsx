import * as React from 'react';
import HomeComponent from '../components/home';
import Coins from '@/src/components/coins';

export default async function Home() {
  return (
    <div className="page-height">
      <div className="page-width">
        <HomeComponent />
      </div>
      <div className="page-width-full">
        <Coins view="minimal" />
      </div>
    </div>
  );
}
