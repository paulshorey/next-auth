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
    <span className="text-xs pl-[5px] inline-block align-[2px]">{Math.round(delta)}</span>
  );
  if (!rsipast) {
    return <>{displayDelta}</>;
  }
  if (avgup < 0 && rsiup < 0) {
    // Going DOWN
    if (rsiup < avgup) {
      // RSI going down faster than average
      return (
        <span className="px-2">
          <FontAwesomeIcon size="xs" icon={faDown} />
          <FontAwesomeIcon size="xs" icon={faArrowDownRight} />
          {displayDelta}
        </span>
      );
    } else {
      // RSI and average converging down
      return (
        <span className="px-2">
          <FontAwesomeIcon size="xs" icon={faDownRight} />
          <FontAwesomeIcon size="xs" icon={faArrowDown} />
          {displayDelta}
        </span>
      );
    }
  }
  if (avgup > 0 && rsiup > 0) {
    // Going UP
    if (rsiup > avgup) {
      // RSI going up faster than average
      return (
        <span className="px-2">
          <FontAwesomeIcon size="xs" icon={faUp} />
          <FontAwesomeIcon size="xs" icon={faArrowUpRight} />
          {displayDelta}
        </span>
      );
    } else {
      // RSI and average converging up
      return (
        <span className="px-2">
          <FontAwesomeIcon size="xs" icon={faUpRight} />
          <FontAwesomeIcon size="xs" icon={faArrowUp} />
          {displayDelta}
        </span>
      );
    }
  }
  if (rsiup > 0 && avgup < 0) {
    return (
      <span className="px-2">
        <FontAwesomeIcon size="xs" icon={faUpRight} />
        <FontAwesomeIcon size="xs" icon={faArrowDownRight} />
        {displayDelta}
      </span>
    );
  } else if (avgup > 0 && rsiup < 0) {
    return (
      <span className="px-2">
        <FontAwesomeIcon size="xs" icon={faDownRight} />
        <FontAwesomeIcon size="xs" icon={faArrowUpRight} />
        {displayDelta}
      </span>
    );
  }
  return null;
}
