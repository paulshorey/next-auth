import React from 'react';
// import { alertType } from '@/src/app/crypto/page';
import classes from './index.module.scss';

type Props = any;

export default function Sentiment({ ticker, times }: Props) {
  // let convert: any = {
  //   '5': '5min',
  //   '45': '45min',
  //   '240': '4hr',
  //   D: '1day',
  //   W: '1week',
  //   M: '1month',
  // };
  const coin = ticker.split('USD')[0];
  return (
    <div className="grid grid-cols-7 w-full m-1">
      <h3 className="p-1">{coin}</h3>
      {Object.entries(times)
        .reverse()
        .map(([time, [last, past]]: any, i) =>
          !last ? null : (
            <span
              key={time}
              className={classes.sentiment + ' p-1'}
              data-s1={last.delta > 1 ? 'BUY' : last.delta < -1 ? 'SELL' : 'HODL'}
              data-s2={last.score > 70 ? 'high' : last.score < 30 ? 'low' : 'middle'}
            >
              {Math.round(Number(last.delta))}
            </span>
          )
        )}
    </div>
  );
}
