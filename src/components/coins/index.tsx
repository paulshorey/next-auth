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
      <div className=" mt-7 pt-5 border-t border-stone-700 text-center text-stone-500">
        <b>Instructions:</b> Buy/Sell immediately when 5-in-a-row are green/red. Patience is
        important. HODL!
        {/* <br />
        Obviously, higher-order timeframes are more important than the short term. But if you don't
        mind watching it closely and day trading, you could make it work in the short term without
        the monthly. */}
        {/* If you do buy/sell, then make sure to catch the very next subsequent buy/sell. <br /> */}
        {/* Coming soon: a current and historical list of optimal buy/sell times. */}
      </div>
      <div className="grid grid-cols-5 w-full mt-5">
        <div className={classes.sentiment + ' p-1'} data-s1={'BUY'} data-s2={'low'}>
          Buy!!!
          <hr />
          bullish &gt; 1<br />
          rsi &lt; 30
        </div>
        <div className={classes.sentiment + ' p-1'} data-s1={'BUY'} data-s2={'middle'}>
          Buy
          <hr />
          bullish &gt; 1
        </div>
        <div className={classes.sentiment + ' p-1'} data-s1={'HODL'} data-s2={'middle'}>
          Hodl
          <hr />
          {/* uncertain */}
          <div className="border-red-800 border-2 mt-1">rsi &gt; 70</div>
          <div className="border-green-700 border-2 mt-1">rsi &lt; 30</div>
        </div>
        <div className={classes.sentiment + ' p-1'} data-s1={'SELL'} data-s2={'middle'}>
          Sell
          <hr />
          bearish &lt; -1
        </div>
        <div className={classes.sentiment + ' p-1'} data-s1={'SELL'} data-s2={'high'}>
          Sell!!!
          <hr />
          bearish &lt; -1
          <br />
          rsi &gt; 70
        </div>
      </div>
    </PageContentLayout>
  );
}
