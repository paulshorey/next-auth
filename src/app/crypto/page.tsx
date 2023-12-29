'use client';
import * as React from 'react';
import PageContentHeader from '@/src/components/layout/PageContentHeader';
import Coins from '@/src/components/coins';
import useSwr from 'swr';

export type coinType = any;

function Sp({ w = 1 }: { w?: number }) {
  return <span style={{ display: 'inline-block', width: `${w}px` }} />;
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
      {!!isLoading ? (
        <div>...loading new data... ...it takes 10-15 seconds...</div>
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
