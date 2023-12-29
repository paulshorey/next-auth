import * as React from 'react';
import PageContentHeader from '@/src/components/layout/PageContentHeader';
import Coins from '@/src/components/coins';

export type coinType = any;

function Sp({ w = 1 }: { w?: number }) {
  return <span style={{ display: 'inline-block', width: `${w}px` }} />;
}

export default async function PageCrypto() {
  const coins = await fetch('https://crypto-sentiment.paulshorey.workers.dev/get?x=1', {
    // cache: 'no-cache',
  }).then((res) => res.json());
  return (
    <div>
      <PageContentHeader
        title={
          <div>
            nohype
            <Sp w={1} />
            .<Sp w={1} />
            ai / crypto
          </div>
        }
        subtitle={
          <div className="font-extralight tracking-wide pb-1">
            r.s.i. sentiment analysis
            {/* robot financial adviser - no emotions or incentives - just accurate analysis */}
          </div>
        }
      />
      <Coins coins={coins} options={{}} />
    </div>
  );
}
