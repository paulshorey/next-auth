import React from 'react';
// import { alertType } from '@/src/app/crypto/page';
import classes from './index.module.scss';

type Props = {
  debug?: boolean;
  alerts?: any;
  options?: any;
};

export default function Sentiment({ alerts, debug, options = {} }: Props) {
  let sentiment = [
    {
      timeframe: '5',
      displayTime: '5min',
    },
    {
      timeframe: '45',
      displayTime: '45min',
    },
    {
      timeframe: '240',
      displayTime: '4hr',
    },
    {
      timeframe: 'D',
      displayTime: '1day',
    },
    {
      timeframe: 'W',
      displayTime: '1week',
    },
    {
      timeframe: 'M',
      displayTime: '1month',
    },
  ];
  for (let alert of alerts) {
    for (let s in sentiment) {
      let state = sentiment[s];
      if (alert.timeframe === state.timeframe) {
        sentiment[s] = { ...state, ...alert };
      }
    }
  }
  return (
    <div className="flex flex-col">
      {sentiment.map(({ timeframe, delta, score }: any, i) => (
        <span
          key={timeframe}
          className={classes.sentiment}
          data-s1={delta > 1 ? 'BUY' : delta < -1 ? 'SELL' : 'HODL'}
          data-s2={score > 70 ? 'high' : score < 30 ? 'low' : 'middle'}
        >
          {timeframe} {delta} {score}
        </span>
      ))}
    </div>
  );
}
