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
    <div className={`grid grid-cols-7 w-full ${ticker === 'DX!' && 'mt-12'}`}>
      <h3 className="pt-3 m-0 text-center text-xs lg:text-sm">{coin}</h3>
      {Object.entries(times)
        .reverse()
        .map(([time, [last, past]]: any) => {
          if (time === '5') return null;
          if (!last) return null;
          if (last.timestamp > latestTimestamp) {
            latestTimestamp = last.timestamp;
            price =
              last.price > 9999
                ? Math.round(last.price)
                : last.price >= 100
                  ? Math.round(last.price * 10) / 10
                  : Math.round(last.price * 100) / 100;
          }

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

          let l = '0';
          if (last.delta > 0.5) l = '0.1';
          if (last.delta > 1) l = '1';
          if (last.delta < -0.5) l = '-0.1';
          if (last.delta < -1) l = '-1';
          let x = '';
          if (last.delta > 0 && past.delta < 0) {
            x = 'up';
          }
          if (last.delta < 0 && past.delta > 0) {
            x = 'down';
          }
          let c = '';
          let d = '';
          if (last.delta > 0 && past.delta > 0) {
            if (last.delta < past.delta) {
              c = 'up';
            }
            if (last.delta > past.delta) {
              d = 'up';
            }
          }
          if (last.delta < 0 && past.delta < 0) {
            if (last.delta < past.delta) {
              c = 'down';
            }
            if (last.delta > past.delta) {
              d = 'down';
            }
          }

          // const delta = last.delta;
          // const rsiup = last.score - past.score;
          // const avgup = last.score - last.delta - (past.score - past.delta);

          let mArrows = 1;
          if (time === '45') mArrows = 90 / 45;
          if (time === '240') mArrows = 240 / 240;
          if (time === 'D') mArrows = 720 / 1440;
          if (time === 'W') mArrows = 9000 / 10080;
          if (time === 'M') mArrows = 36000 / 43200;

          const deltaRsi = mArrows * (last.score - past.score);
          const deltaAvg = mArrows * (last.score - last.delta - (past.score - past.delta));
          const deltaDelta = last.delta - past.delta;
          const deltaPrice = Math.round(((last.price - past.price) / past.price) * 1000) / 10;

          return (
            <PopInfo past={past} last={last} timestamp={timestamp} key={time}>
              <div className={classes.sentimentContainer}>
                <div
                  className={`${classes.sentiment} flex justify-center items-center flex-col xl:flex-row`}
                  data-delta={l}
                  data-rsi={rsi}
                  data-x={x}
                  data-c={c}
                  data-d={d}
                  data-error={last.score === 0 ? true : null}
                >
                  <div className="flex flex-col lg:flex-row text-center">
                    <b className="text-center w-11">{Math.round(last.score)}</b>
                    {!!past.price && <Vergence deltaRsi={deltaRsi} deltaAvg={deltaAvg} />}
                    <span className="text-xs lg:text-sm opacity-50 font-semibold text-center w-8">
                      {deltaDelta > 0 ? '+' : '-'}
                      {Math.abs(Math.round(deltaDelta))}
                    </span>
                  </div>

                  {!!past.price && time !== '45' && (
                    <span className="text-xs lg:text-sm opacity-70 font-bold text-center w-7">
                      {deltaPrice > 0 ? '+' : '-'}
                      {Math.abs(Math.round(deltaPrice))}
                    </span>
                  )}
                </div>
              </div>
            </PopInfo>
          );
        })}
      <div className="pt-3 m-0 text-center text-xs lg:text-sm">$&thinsp;{price}</div>
    </div>
  );
}
