import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowUp,
  faArrowDown,
  faArrowUpRight,
  faArrowDownRight,
  faDownRight,
  faUpRight,
  faDown,
  faUp,
} from '@fortawesome/sharp-solid-svg-icons';

export default function Vergence({
  rsiup,
  avgup,
  delta,
  rsipast,
}: {
  rsiup: number;
  avgup: number;
  delta: number;
  rsipast: number;
}) {
  const displayDelta = (
    <span className="text-xs pr-[5px] mt-[-10px] inline-block align-[2px]">
      {Math.round(delta)}
    </span>
  );
  if (!rsipast) {
    return <>{displayDelta}</>;
  }
  if (avgup < 0 && rsiup < 0) {
    // Going DOWN
    if (rsiup < avgup) {
      // RSI going down faster than average
      return (
        <>
          {displayDelta}
          <FontAwesomeIcon size="xs" icon={faDown} />
          <FontAwesomeIcon size="xs" icon={faArrowDownRight} />
        </>
      );
    } else {
      // RSI and average converging down
      return (
        <>
          {displayDelta}
          <FontAwesomeIcon size="xs" icon={faDownRight} />
          <FontAwesomeIcon size="xs" icon={faArrowDown} />
        </>
      );
    }
  }
  if (avgup > 0 && rsiup > 0) {
    // Going UP
    if (rsiup > avgup) {
      // RSI going up faster than average
      return (
        <>
          {displayDelta}
          <FontAwesomeIcon size="xs" icon={faUp} />
          <FontAwesomeIcon size="xs" icon={faArrowUpRight} />
        </>
      );
    } else {
      // RSI and average converging up
      return (
        <>
          {displayDelta}
          <FontAwesomeIcon size="xs" icon={faUpRight} />
          <FontAwesomeIcon size="xs" icon={faArrowUp} />
        </>
      );
    }
  }
  if (rsiup > 0 && avgup < 0) {
    return (
      <>
        {displayDelta}
        <FontAwesomeIcon size="xs" icon={faUpRight} />
        <FontAwesomeIcon size="xs" icon={faArrowDownRight} />
      </>
    );
  } else if (avgup > 0 && rsiup < 0) {
    return (
      <>
        {displayDelta}
        <FontAwesomeIcon size="xs" icon={faDownRight} />
        <FontAwesomeIcon size="xs" icon={faArrowUpRight} />
      </>
    );
  }
  return null;
}
