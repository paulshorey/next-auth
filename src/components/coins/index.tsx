import React from 'react';
import { coinType } from '@/src/app/crypto/page';
import classes from './index.module.scss';
import Sentiment from './Sentiment';
import PageContentLayout from '../layout/PageContent';

type Props = {
  debug?: boolean;
  coins?: coinType[];
  options?: any;
};

export default function Coins({ coins, debug, options = {} }: Props) {
  if (!coins) return <p>Loading...</p>;
  if (debug) {
    return (
      <pre>
        <code>{JSON.stringify(coins, null, 2)}</code>
      </pre>
    );
  }
  return (
    <PageContentLayout className="flex flex-col">
      <div className="grid grid-cols-6 w-full mx-1 mb-6 text-center text-stone-500">
        <div />
        <div>M</div>
        <div>W</div>
        <div>D</div>
        <div>4h</div>
        <div>45</div>
      </div>
      {Object.entries(coins).map(([ticker, times]: any, i) => (
        <div key={ticker} className={`${classes.coin}`}>
          <Sentiment ticker={ticker} times={times} />
        </div>
      ))}
      <div className=" mt-7 pt-6 border-t border-stone-700 text-center text-stone-500">
        This tool helps find reversals in buying/selling trends, or to "time the market".
        <br />
        BUY/SELL when ALL 5 cells in the row turn green/red, but ONLY IF they have recently* been
        the opposite!
        <br />
        (*Not time, but how many of buy/sell events (5-in-a-row) have happened since last reversal.)
        <br />
        This obviously requires staring at the chart all day and night for months.
        <br />
        Alerts and trading bot coming soon!
        <br />
        RSI &gt; 80 ⇒ -1 &emsp; RSI&lt;Avg ⇒ -1 &emsp; RSI&gt;Avg ⇒ +1 &emsp; RSI &lt; 40 ⇒ +1
      </div>
      <div className="grid grid-cols-3 w-full mt-5">
        {/* <div className={`${classes.sentiment}`} data-score="-2">
          <span className="absolute">-2</span>
        </div> */}
        <div className={`${classes.sentiment}`} data-score="-1">
          - bearish
        </div>
        <div className={`${classes.sentiment}`} data-score="0">
          0 hodl
        </div>
        <div className={`${classes.sentiment}`} data-score="1">
          + bullish
        </div>
        {/* <div className={`${classes.sentiment}`} data-score="2">
          <span className="absolute">2</span>
        </div> */}
      </div>
    </PageContentLayout>
  );
}
