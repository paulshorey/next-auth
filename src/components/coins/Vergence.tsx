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
  faX,
} from '@fortawesome/sharp-solid-svg-icons';

export default function Vergence({ rsi, avg }: { rsi: number; avg: number }) {
  if (avg < 0 && rsi < 0) {
    // Going DOWN
    if (rsi < avg) {
      // RSI going down faster than average
      return (
        <>
          <FontAwesomeIcon icon={faDown} />
          <FontAwesomeIcon icon={faArrowDownRight} />
        </>
      );
    } else {
      // RSI and average converging down
      return (
        <>
          <FontAwesomeIcon icon={faDownRight} />
          <FontAwesomeIcon icon={faArrowDown} />
        </>
      );
    }
  }
  if (avg > 0 && rsi > 0) {
    // Going UP
    if (rsi > avg) {
      // RSI going up faster than average
      return (
        <>
          <FontAwesomeIcon icon={faUp} />
          <FontAwesomeIcon icon={faArrowUpRight} />
        </>
      );
    } else {
      // RSI and average converging up
      return (
        <>
          <FontAwesomeIcon icon={faUpRight} />
          <FontAwesomeIcon icon={faArrowUp} />
        </>
      );
    }
  }
  if (rsi > 0 && avg < 0) {
    return (
      <>
        <FontAwesomeIcon size="" icon={faUpRight} />
        <FontAwesomeIcon size="" icon={faArrowDownRight} />
      </>
    );
  } else if (avg > 0 && rsi < 0) {
    return (
      <>
        <FontAwesomeIcon size="" icon={faDownRight} />
        <FontAwesomeIcon size="" icon={faArrowUpRight} />
      </>
    );
  }
  return null;
}
