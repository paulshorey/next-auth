import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faArrowUpRight, faArrowDownRight } from '@fortawesome/sharp-solid-svg-icons';

export default function Arrow({ one, two }: { one: number; two: number }) {
  if (two - one < 1) {
    return <FontAwesomeIcon icon={faArrowDownRight} />;
  }
  if (two - one > 1) {
    return <FontAwesomeIcon icon={faArrowUpRight} />;
  }
  return <FontAwesomeIcon icon={faArrowRight} />;
}
