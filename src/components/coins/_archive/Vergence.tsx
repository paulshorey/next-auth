import { faArrowLeftLong, faLeftLong } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Vergence({
  deltaAvg,
  deltaRsi,
  className,
}: { deltaAvg: any; deltaRsi: any } & any) {
  const rsiDegree = Math.min(Math.max(deltaRsi, -15), 15) * -6;
  const avgDegree = Math.min(Math.max(deltaAvg, -15), 15) * -6;

  return (
    <span className={`${className} pr-1`}>
      {/* {Math.round(deltaRsi)} */}
      <FontAwesomeIcon
        size="xs"
        icon={faLeftLong}
        className="opacity-70 mr-[-0.33rem]"
        style={{ transform: `rotate(${rsiDegree}deg) scaleX(-1)` }}
      />
      {/* {Math.round(deltaAvg)} */}
      <FontAwesomeIcon
        size="xs"
        icon={faArrowLeftLong}
        className="opacity-35"
        style={{ transform: `rotate(${avgDegree}deg) scaleX(-1)` }}
      />
    </span>
  );
}
