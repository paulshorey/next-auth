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
  let latestTimestamp = 0;
  let price = 0;
  return (
    <div className="grid grid-cols-7 w-full">
      <h3 className="pt-2 mb-6 lg:text-center">{coin}</h3>
      {Object.entries(times)
        .reverse()
        .map(([time, [last, past]]: any, i) => {
          if (time === '5') return null;
          if (!last) return null;
          if (last.timestamp > latestTimestamp) {
            latestTimestamp = last.timestamp;
            price = last.price.toFixed(2);
          }
          let score = 0;
          if (last.delta > 1) score++;
          if (last.delta < -1) score--;
          if (last.score > 80) score--;
          if (last.score < 40) score++;
          if (score > 0.1) score = 1;
          if (score < -0.1) score = -1;
          return (
            <span key={time} className={classes.sentimentContainer}>
              <span className={classes.sentiment} data-score={score.toString()}>
                {Math.round(Number(last.score))} &thinsp; <sup>{Number(last.delta).toFixed(1)}</sup>
              </span>
            </span>
          );
        })}
      <div className="text-right lg:text-center">$&thinsp;{price}</div>
    </div>
  );
}
