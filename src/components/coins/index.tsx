'use client';

import React from 'react';
import useSwr from 'swr';
import classes from './index.module.scss';
import Sentiment from './Sentiment';

type Props = any;

function fetcher(url: string) {
  return fetch(url).then((r) => r.json());
}

export default function Coins({ debug, view = 'full' }: Props) {
  const { data, error, isLoading } = useSwr(
    'https://crypto-sentiment.paulshorey.workers.dev/get?x=1',
    fetcher
  );

  if (isLoading) {
    return <div className="text-center py-24">...loading new data...</div>;
  }
  if (error) {
    return (
      <pre>
        <code>{JSON.stringify(error, null, 2)}</code>
      </pre>
    );
  }

  return (
    <div className="flex flex-col lg:px-2 max-w-[1110px] mx-auto pt-12">
      {view !== 'minimal' && (
        <div className="grid grid-cols-7 w-full mx-1 mb-6 text-center text-stone-500">
          <div />
          <div>M</div>
          <div>W</div>
          <div>D</div>
          <div>4h</div>
          <div>45</div>
          <div />
        </div>
      )}
      {Object.entries(data).map(([ticker, times]: any) => (
        <div key={ticker} className={`${classes.coin}`}>
          <Sentiment ticker={ticker} times={times} />
        </div>
      ))}
      {false && view === 'full' && (
        <div>
          <div className=" mt-7 pt-6 border-t border-stone-700 text-center text-stone-500">
            This tool helps find reversals in buying/selling trends, to "time the market".
            <br />
            Buy/sell when all 5 cells in the row have turned green/red!
            <br />
            Preferably after a reversal, after they were recently all the same but opposite color.
            <br />
            This timing is impossible for humans to do reliably. Alerts and bot coming soon!
            <br />
            RSI &gt; 80 ⇒ -1 &emsp; RSI&lt;Avg ⇒ -1 &emsp; RSI&gt;Avg ⇒ +1 &emsp; RSI &lt; 40 ⇒ +1
          </div>
          <div className="grid grid-cols-3 w-full mt-5">
            <div className={`${classes.sentiment}`} data-score="-1">
              - bearish
            </div>
            <div className={`${classes.sentiment}`} data-score="0">
              0 hodl
            </div>
            <div className={`${classes.sentiment}`} data-score="1">
              + bullish
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
