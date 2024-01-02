// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import {
//   faArrowUp,
//   faArrowDown,
//   faArrowUpRight,
//   faArrowDownRight,
//   faDownRight,
//   faUpRight,
//   faRight,
//   faDown,
//   faUp,
// } from '@fortawesome/sharp-solid-svg-icons';
// @ts-ignore
import React from 'react';
import classes from './index.module.scss';

export default function Vergence({ last, past }: { last: any; past: any }) {
  // export default function Vergence() {
  // const last = {
  //   delta: 1.6914166666666668,
  //   score: 55.95106666666666,
  //   avg: 54.259649999999993,
  // };
  // const past = {
  //   delta: 2.2680666666666665,
  //   score: 38.65513333333333,
  //   avg: 36.38706666666666,
  // };
  const mx = function (size: number) {
    return size * 10;
  };

  if (!past?.score || !last?.score) return null;
  const min = Math.min(last.score, past.score, last.score - last.delta, past.score - past.delta);
  const max = Math.max(last.score, past.score, last.score - last.delta, past.score - past.delta);
  const hx = mx(max - min);
  const wx = mx(max - min);
  const canvasRef = React.useRef(null);
  React.useEffect(() => {
    const canvas = canvasRef?.current;
    if (!canvas) return;
    // @ts-ignore
    const context = canvas.getContext('2d');
    context.fillStyle = 'white';
    context.fillRect(0, 0, wx, hx);
    context.clearRect(0, 0, wx, hx);
    // Avg
    context.beginPath();
    context.moveTo(0, hx - mx(past.score - past.delta - min));
    context.lineTo(wx, hx - mx(last.score - last.delta - min));
    context.strokeStyle = 'cornflowerblue';
    context.lineWidth = 3;
    context.stroke();
    // Rsi
    context.beginPath();
    context.moveTo(0, hx - mx(past.score - min));
    context.lineTo(wx, hx - mx(last.score - min));
    context.strokeStyle = 'orange';
    context.lineWidth = 3;
    context.stroke();
    //
  }, [last, past]);

  return (
    <div className={`${classes.vergence} ml-2`}>
      <canvas ref={canvasRef} width={wx} height={hx} />
    </div>
  );
}
