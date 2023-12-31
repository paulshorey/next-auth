import * as React from 'react';
import PageContentHeader from '@/src/components/layout/PageContentHeader';
import Coins from '@/src/components/coins';

function Sp({ w = 1 }: { w?: number }) {
  return <span style={{ display: 'inline-block', width: `${w * 0.5}px` }} />;
}

export default function PageCrypto() {
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
      <Coins />
    </div>
  );
}
