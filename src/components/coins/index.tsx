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
      <div className="grid grid-cols-7 w-full mx-1 mb-6 text-center text-stone-500">
        <div></div>
        <div>Month</div>
        <div>Week</div>
        <div>Day</div>
        <div>4hr</div>
        <div>45min</div>
        <div>5min</div>
      </div>
      {Object.entries(coins).map(([ticker, times]: any, i) => (
        <div key={ticker} className={classes.coin + ' mb-6'}>
          <Sentiment ticker={ticker} times={times} />
        </div>
      ))}
      <div></div>
      <div className="grid grid-cols-7 w-full m-1 mt-7 pt-7 border-t border-stone-700">
        <h3 className={' p-1'}>Legend</h3>
        <div className={classes.sentiment + ' p-1'} data-s1={'BUY'} data-s2={'low'}>
          Buy!!!
        </div>
        <div className={classes.sentiment + ' p-1'} data-s1={'BUY'} data-s2={'middle'}>
          Buy
        </div>
        <div className={classes.sentiment + ' p-1'} data-s1={'HODL'} data-s2={'middle'}>
          Hodl
        </div>
        <div className={classes.sentiment + ' p-1'} data-s1={'SELL'} data-s2={'middle'}>
          Sell
        </div>
        <div className={classes.sentiment + ' p-1'} data-s1={'SELL'} data-s2={'high'}>
          Sell!!!
        </div>
      </div>
    </PageContentLayout>
  );
}
