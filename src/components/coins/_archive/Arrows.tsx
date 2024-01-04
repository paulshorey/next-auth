import { faArrowLeftLong, faLeftLong } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Vergence({ last, past }: { last: any; past: any }) {
  // const min = Math.min(last.score, past.score, last.score - last.delta, past.score - past.delta);
  // const max = Math.max(last.score, past.score, last.score - last.delta, past.score - past.delta);

  const avgDegree =
    Math.min(Math.max(last.score - last.delta - (past.score - past.delta), -15), 15) * 6;
  const rsiDegree = Math.min(Math.max(last.score - past.score, -15), 15) * 6;

  return (
    <span className="pl-3">
      <FontAwesomeIcon
        size="xs"
        icon={faLeftLong}
        className="opacity-90"
        style={{ transform: `rotate(${rsiDegree}deg) scaleX(-1)` }}
      />
      <FontAwesomeIcon
        size="xs"
        icon={faArrowLeftLong}
        className="opacity-45"
        style={{ transform: `rotate(${avgDegree}deg) scaleX(-1)` }}
      />
    </span>
  );
}
