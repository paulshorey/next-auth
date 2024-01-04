import React from 'react';
// import { alertType } from '@/src/app/crypto/page';
import classes from './index.module.scss';
// import Vergence from '../_archive/Vergence';
import PopInfo from '../PopInfo';
import Actions from './Actions';

type Props = any;

export default function Sentiment({ ticker, times, timestamp }: Props) {
  if (!times.D?.[0]?.price) return null;
  let latestTimestamp = 0;
  let price = 0;
  const momentumx: any = {
    M: 0,
    W: 0,
    D: 0,
    240: 0,
    45: 0,
  };
  const divergingx: any = {
    M: 0,
    W: 0,
    D: 0,
    240: 0,
    45: 0,
  };
  const reversedx: any = {
    M: 0,
    W: 0,
    D: 0,
    240: 0,
    45: 0,
  };
  const rsix: any = {
    M: 0,
    W: 0,
    D: 0,
    240: 0,
    45: 0,
  };
  const hpricex: any = {
    M: 0,
    W: 0,
    D: 0,
    240: 0,
    45: 0,
  };
  return (
    <div>
      <div className={`grid grid-cols-5 w-full ${ticker === 'DX!' && 'mt-12'}`}>
        {Object.entries(times)
          .reverse()
          .map(([time, [last, past]]: any) => {
            if (time === '5') return null;
            if (!last) return null;

            // price
            if (last.timestamp > latestTimestamp) {
              latestTimestamp = last.timestamp;
              price = formatPrice(last.price);
            }
            hpricex[time] = past?.price;
            // rsi
            rsix[time] = last.score;
            // momentum
            momentumx[time] += last.delta;
            if (past) {
              if (past.delta > 0) {
                // diverging up
                if (last.delta - past.delta > 0) {
                  divergingx[time] += 1;
                }
              }
              if (past.delta < 0) {
                // diverging down
                if (last.delta - past.delta < 0) {
                  divergingx[time] -= 1;
                }
              }
              // reversed up
              if (past.delta < 3 && last.delta > 3) {
                reversedx[time] += 1;
              }
              // reversed down
              if (past.delta > 3 && last.delta < 3) {
                reversedx[time] -= 1;
              }
            }

            let cssRsi = '0';
            if (last.score > 70) {
              cssRsi = '70';
            }
            if (last.score > 80) {
              cssRsi = '80';
            }
            if (last.score > 90) {
              cssRsi = '90';
            }
            if (last.score < 50) {
              cssRsi = '50';
            }
            if (last.score < 40) {
              cssRsi = '40';
            }
            if (last.score < 30) {
              cssRsi = '30';
            }
            let cssDelta = '0';
            if (last.delta > 0.5) cssDelta = '0.1';
            if (last.delta > 1) cssDelta = '1';
            if (last.delta < -0.5) cssDelta = '-0.1';
            if (last.delta < -1) cssDelta = '-1';

            const deltaPricePercent = !past?.price
              ? 0
              : Math.round(((last.price - past.price) / past.price) * 1000) / 10;
            let displayDeltaPricePercent = !past?.price
              ? []
              : Math.abs(Math.round(deltaPricePercent * 10) / 10).toString();
            if (displayDeltaPricePercent[0] === '0' && displayDeltaPricePercent[1] === '.') {
              displayDeltaPricePercent = displayDeltaPricePercent.slice(1);
            }
            return (
              <PopInfo past={past} last={last} timestamp={timestamp} key={time}>
                <div className={classes.sentimentContainer}>
                  <div
                    className={`${classes.sentiment} text-center`}
                    data-delta={cssDelta}
                    data-rsi={cssRsi}
                    data-error={last.score === 0 ? true : null}
                  >
                    <span className="text-xs lg:text-sm inline-flex flex-col lg:flex-row text-center font-semibold">
                      <span className={`${classes.rsi} w-7 text-left opacity-75`}>
                        {Math.round(last.score)}
                      </span>{' '}
                      &nbsp;
                      <span className="opacity-50 w-10 text-center">
                        {last.delta > 0 ? '+' : '-'}
                        {Math.abs(Math.round(last.delta))}
                      </span>
                      {!!past?.price && (
                        <span className="opacity-50 w-11 text-right">
                          {!!deltaPricePercent && (
                            <span className="mr-[1px]">{deltaPricePercent > 0 ? '+' : '-'}</span>
                          )}
                          <span>{displayDeltaPricePercent}%</span>
                        </span>
                      )}
                    </span>
                  </div>
                </div>
              </PopInfo>
            );
          })}
      </div>
      <Actions
        momentumx={momentumx}
        ticker={ticker}
        divergingx={divergingx}
        reversedx={reversedx}
        rsix={rsix}
        price={price}
        hpricex={hpricex}
      />
    </div>
  );
}

function formatPrice(price: number) {
  return price > 9999
    ? Math.round(price)
    : price >= 100
      ? Math.round(price * 10) / 10
      : Math.round(price * 100) / 100;
}
