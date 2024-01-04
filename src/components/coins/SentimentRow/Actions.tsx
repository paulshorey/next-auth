import React from 'react';
import classes from './Actions.module.scss';

type Props = {
  ticker: string;
  momentumx: Record<string, number>;
  divergingx: Record<string, number>;
  reversedx: Record<string, number>;
  rsix: Record<string, number>;
  hpricex: Record<string, number>;
  price: number;
};

export default function Label({
  ticker,
  momentumx,
  divergingx,
  reversedx,
  rsix,
  price,
  hpricex,
}: Props) {
  if (!price) return null;
  const whySell = [];
  const whyBuy = [];
  const coin = ticker.split('USD')[0];
  let score = 0;

  if (momentumx.M > 1) {
    if (divergingx.M > 0) {
      score += 5;
      whyBuy.push('M momentum diverging +5');
    } else {
      score += 2;
      whyBuy.push('M momentum +2');
    }
  }
  if (momentumx.W > 1) {
    if (divergingx.W > 0) {
      score += 3;
      whyBuy.push('W momentum diverging +3');
    } else {
      score += 2;
      whyBuy.push('W momentum +2');
    }
  }
  if (momentumx.D > 1) {
    if (divergingx.D > 0) {
      score += 2;
      whyBuy.push('D momentum diverging +2');
    } else {
      score += 1;
      whyBuy.push('D momentum +1');
    }
  }
  if (momentumx['240'] > 1) {
    if (divergingx['240'] > 0) {
      score += 1;
      whyBuy.push('240 momentum diverging +1');
    }
  }

  if (momentumx.M < -1) {
    score -= 10;
    whySell.push('M momentum -10');
  }
  if (momentumx.W < -1) {
    if (divergingx.W < 0) {
      score -= 8;
      whySell.push('W momentum diverging -8');
    } else {
      score -= 7;
      whySell.push('W momentum -7');
    }
  }
  if (momentumx.D < -1) {
    if (divergingx.D < 0) {
      score -= 4;
      whySell.push('D momentum diverging -4');
    } else {
      score -= 3;
      whySell.push('D momentum -3');
    }
  }
  if (momentumx['240'] < -1) {
    if (divergingx['240'] < 0) {
      score -= 2;
      whySell.push('240 momentum diverging -2');
    }
  }

  if (reversedx.M > 0) {
    score += 4;
    whyBuy.push('M reversed +4');
  }
  if (reversedx.W > 0) {
    score += 3;
    whyBuy.push('W reversed +3');
  }
  if (reversedx.D > 0) {
    score += 2;
    whyBuy.push('D reversed +2');
  }
  if (reversedx['240'] > 0) {
    score += 1;
    whyBuy.push('240 reversed +1');
  }

  if (reversedx.M < 0) {
    score -= 4;
    whySell.push('M reversed -4');
  }
  if (reversedx.W < 0) {
    score -= 3;
    whySell.push('W reversed -3');
  }
  if (reversedx.D < 0) {
    score -= 2;
    whySell.push('D reversed -2');
  }
  if (reversedx['240'] < 0) {
    score -= 1;
    whySell.push('240 reversed -1');
  }

  if (rsix.M > 90 && momentumx.M < 1) {
    score += -3;
    whySell.push('M rsi 90s -3');
  }
  if (rsix.W > 90 && momentumx.W < 1) {
    score += -2;
    whySell.push('W rsi 90s -2');
  }
  if (rsix.D > 90 && momentumx.D < 1) {
    score += -1;
    whySell.push('D rsi 90s -1');
  }
  if (rsix.W < 70) {
    score += 1;
    whyBuy.push('W rsi ok +1');
  }
  if (rsix.D < 60) {
    score += 2;
    whyBuy.push('D rsi low +2');
  } else if (rsix.D < 70) {
    score += 1;
    whyBuy.push('D rsi ok +1');
  }
  if (rsix['240'] < 50) {
    score += 1;
    whyBuy.push('240 rsi low +1');
  }

  const dpriced = ((price - hpricex.D) / hpricex.D) * 100;
  if (dpriced > 5) {
    const n = Math.abs(Math.round(dpriced / 2));
    score -= n;
    whySell.push(`D price spiked ${Math.abs(Math.round(dpriced))}% -${n}`);
  }
  if (dpriced < -5) {
    const n = Math.abs(Math.round(dpriced / 2));
    score += n;
    whyBuy.push(`D price dropped ${Math.abs(Math.round(dpriced))}% +${n}`);
  }

  const action = score >= 5 ? 'buy' : score <= -5 ? 'sell' : 'hodl';
  return (
    <div className={`${classes.label} text-xs`}>
      <span className={`${classes.title}`} data-action={action}>
        <span className="inline-block">
          {coin}
          {score !== 0 && (
            <span className="pl-1">
              {score > 0 ? '+' : '-'}
              {Math.abs(Math.round(score * 10) / 10)}
            </span>
          )}
        </span>
      </span>
      <span className={`${classes.reasons}`}>
        {!!whyBuy.length && (
          <strong className={`${classes.title} ${classes.reason}`} data-action="buy">
            {whyBuy.join(', ')}
          </strong>
        )}
        {!!whySell.length && (
          <>
            <span className={`${classes.reason} pl-3`} data-action="sell">
              {whySell.join(', ')}
            </span>
          </>
        )}
      </span>
      <span className={`${classes.price} float-right pl-3`}> ${price}</span>
    </div>
  );
}
