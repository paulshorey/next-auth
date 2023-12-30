'use client';
import * as React from 'react';
import PageContentHeader from '@/src/components/layout/PageContentHeader';
import Coins from '@/src/components/coins';
import useSwr from 'swr';
import PageContentLayout from '@/src/components/layout/PageContent';

export type coinType = any;

function Sp({ w = 1 }: { w?: number }) {
  return <span style={{ display: 'inline-block', width: `${w * 0.5}px` }} />;
}

function fetcher(url: string) {
  return fetch(url).then((r) => r.json());
}

export default function PageCrypto() {
  const { data, error, isLoading } = useSwr(
    'https://crypto-sentiment.paulshorey.workers.dev/get?x=1',
    fetcher
  );
  return (
    <div>
      <PageContentHeader
        title={
          <div>
            nohype
            <Sp w={1} />
            .<Sp w={1} />
            ai
            <Sp w={3} />/<Sp w={3} />
            crypto
          </div>
        }
        subtitle={
          <div className="font-extralight tracking-wide pb-1">
            rsi sentiment per timeframe
            {/* robot financial adviser - no emotions or incentives - just accurate analysis */}
          </div>
        }
      />
      {!!isLoading ? (
        <PageContentLayout className="text-center">
          <b>...loading new data...</b> ...takes 30 seconds...
        </PageContentLayout>
      ) : !!error ? (
        <pre>
          <code>{JSON.stringify(error, null, 2)}</code>
        </pre>
      ) : (
        <Coins coins={data} options={{}} />
      )}
    </div>
  );
}
