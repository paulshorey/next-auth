import React from 'react';
// import { alertType } from '@/src/app/crypto/page';
import classes from './index.module.scss';
import Vergence from './Vergence';
import PopInfo from './PopInfo';

type Props = any;

export default function Sentiment({ ticker, times, timestamp }: Props) {
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
      <h3 className="pt-2 m-0 lg:text-center">{coin}</h3>
      {Object.entries(times)
        .reverse()
        .map(([time, [last, past]]: any) => {
          if (time === '5') return null;
          if (!last) return null;
          if (last.timestamp > latestTimestamp) {
            latestTimestamp = last.timestamp;
            price = last.price > 1000 ? Math.round(last.price) : last.price.toFixed(2);
          }
          let delta = '0';
          if (last.delta > 0.5) delta = '0.1';
          if (last.delta > 1) delta = '1';
          if (last.delta < -0.5) delta = '-0.1';
          if (last.delta < -1) delta = '-1';

          let rsi = '0';
          if (last.score > 70) {
            rsi = '70';
          }
          if (last.score > 80) {
            rsi = '80';
          }
          if (last.score > 90) {
            rsi = '90';
          }
          if (last.score < 50) {
            rsi = '50';
          }
          if (last.score < 40) {
            rsi = '40';
          }
          if (last.score < 30) {
            rsi = '30';
          }
          return (
            <PopInfo past={past} last={last} timestamp={timestamp} key={time}>
              <span className={classes.sentimentContainer}>
                <span
                  className={`${classes.sentiment}`}
                  data-delta={delta}
                  data-rsi={rsi}
                  data-error={last.score === 0 ? true : null}
                >
                  <span>
                    <b>{Math.round(last.score)}</b>
                    {/* <sup className="absolute w-full h-full top-0 left-0 text-center leading-[0.33rem]">
                    {last.delta > 3.33 ? 'overbought' : last.delta < -3.33 ? 'oversold' : ''}
                  </sup> */}
                    {/* &thinsp; <sup>{last.delta.toFixed(1)}</sup> */}
                  </span>
                  <span>
                    <Vergence
                      rsipast={past?.score}
                      delta={last.delta}
                      rsiup={last.score - past.score}
                      avgup={last.score - last.delta - (past.score - past.delta)}
                    />
                    {/* <Arrow one={past.score} two={last.score} /> */}
                    {/* <Arrow one={past.score - past.delta} two={last.score - last.delta} /> */}
                  </span>
                </span>
              </span>
            </PopInfo>
          );
        })}
      <div className="text-right lg:text-center">$&thinsp;{price}</div>
    </div>
  );
}
