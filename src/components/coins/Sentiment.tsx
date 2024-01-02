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
      <h3 className="pt-3 m-0 lg:text-center">{coin}</h3>
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
                  ? Math.round(last.price)
                  : Math.round(last.price * 10) / 10;
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

          return (
            <PopInfo past={past} last={last} timestamp={timestamp} key={time}>
              <div className={classes.sentimentContainer}>
                <div
                  className={`${classes.sentiment} flex justify-between items-center`}
                  data-delta={l}
                  data-rsi={rsi}
                  data-x={x}
                  data-c={c}
                  data-d={d}
                  data-error={last.score === 0 ? true : null}
                >
                  <div className="w-full">
                    <div className="flex justify-between items-center  w-full">
                      <b className="pr-2">{Math.round(last.score)}</b>
                      <span className="text-sm">
                        {last.delta > 0 ? '' : <>&ndash; </>}
                        {Math.abs(Math.round(last.delta * 10) / 10).toFixed(1)}
                      </span>
                      {/* {!!past.price && (
                        <span className="text-xs">
                          {Math.round(((last.price - past.price) / past.price) * 1000) / 10}%
                        </span>
                      )} */}
                      {/* </div>
                    <div className="text-xs flex flex-row justify-between items-center w-full">
                      <span>
                        {(
                          Math.round((last.score - last.delta - (past.score - past.delta)) * 10) /
                          10
                        ).toFixed(1)}
                        &emsp;
                      </span>
                      <span>{(Math.round((last.score - past.score) * 10) / 10).toFixed(1)}</span>
                     */}
                    </div>
                  </div>
                  <Vergence last={last} past={past} />
                </div>
              </div>
            </PopInfo>
          );
        })}
      <div className="pt-3 m-0 text-right lg:text-center">$&thinsp;{price}</div>
    </div>
  );
}
