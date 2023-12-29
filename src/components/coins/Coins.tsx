import React from 'react';
import { coinType } from '@/src/app/crypto/page';
import classes from './index.module.scss';
import Sentiment from './Sentiment';

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
    <div className="flex flex-col">
      {Object.entries(coins).map(([ticker, data]: any, i) => (
        <div key={ticker} className={classes.coin}>
          <h3>{ticker}</h3> <Sentiment alerts={data} />
        </div>
      ))}
    </div>
  );
}
