'use client';

import React from 'react';
import useSwr from 'swr';
import classes from './index.module.scss';
import Sentiment from './SentimentRow';

type Props = any;

function fetcher(url: string) {
  return fetch(url).then((r) => r.json());
}
let interval: any;
export default function Coins({ debug, view = 'full' }: Props) {
  const { data, error, mutate, isLoading } = useSwr(
    `${process.env.NEXT_PUBLIC_CRYPTO_SENTIMENT_API_HOST}/get?nocache=1`,
    fetcher
  );

  React.useEffect(() => {
    setTimeout(() => {
      // @ts-ignore
      window.sound.play();
    }, 3000);
    interval = setInterval(() => {
      mutate();
    }, 60000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  if (isLoading) {
    return <div className="text-center py-24">...loading new data...</div>;
  }
  if (error) {
    return (
      <pre>
        <code>{JSON.stringify(error, null, 2)}</code>
      </pre>
    );
  }

  return (
    <div className="flex flex-col lg:px-2 max-w-[1100px] mx-auto mt-2">
      {view !== 'minimal' && (
        <div className="grid grid-cols-5 w-full mx-1 mb-6 text-center text-stone-500">
          <div>M</div>
          <div>W</div>
          <div>D</div>
          <div>4h</div>
          <div>45</div>
        </div>
      )}
      {Object.entries(data).map(([ticker, times]: any) => (
        <div key={ticker} className={`${classes.coin}`}>
          <Sentiment ticker={ticker} times={times} timestamp={Date.now()} />
        </div>
      ))}
      {view === 'full' && (
        <div className="pb-12">
          <ul className=" mt-8 pt-6 border-t border-stone-700 text-center text-stone-500">
            <li>Fat arrow = RSI line direction in chart in time period</li>
            <li>Skinny arrow = RSI SMA Average direction in time period</li>
            <li>
              +/- small number in the middle = <b>%</b> RSI/SMA divergence in time period (positive
              = lines diverging, negative = lines converging)
            </li>
            <li>
              +/- small number on the right = <b>%</b> $USD price change in time period
            </li>
            <li>Green background = RSI above SMA (bullish momentum)</li>
            <li>Red background = RSI below SMA (bearish momentum)</li>
            <li>DX! = US Dollar Futures, SP! = S&P500 Futures</li>
          </ul>
        </div>
      )}
    </div>
  );
}
