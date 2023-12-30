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
    <div className="grid grid-cols-6 w-full">
      <h3 className="mt-[-0.33rem] ml-[-0.11rem] mb-6">{coin}</h3>
      {Object.entries(times)
        .reverse()
        .map(([time, [last, past]]: any, i) => {
          if (time === '5') return null;
          if (!last) return null;
          let score = 0;
          if (last.delta > 1) score++;
          if (last.delta < -1) score--;
          if (last.score > 80) score--;
          if (last.score < 40) score++;
          if (score > 1) score = 1;
          if (score < -1) score = -1;
          return (
            <span key={time} className={classes.sentimentContainer}>
              <span className={classes.sentiment} data-score={score.toString()}>
                {/* {Math.round(Number(last.delta))} */}
              </span>
            </span>
          );
        })}
    </div>
  );
}
