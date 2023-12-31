import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFile, faFileExclamation } from '@fortawesome/pro-light-svg-icons';

export const nav = [
  { link: '/', label: 'Home', Icon: <FontAwesomeIcon size="xl" icon={faFile} /> },
  { link: '/crypto', label: 'Crypto', Icon: <FontAwesomeIcon size="xl" icon={faFile} /> },
  { link: '/youtube', label: 'YouTube', Icon: <FontAwesomeIcon size="xl" icon={faFile} /> },
  {
    link: '/public-client',
    label: 'Public "use client"',
    Icon: <FontAwesomeIcon size="xl" icon={faFile} />,
  },
  {
    link: '/public-server',
    label: 'Public "use server"',
    Icon: <FontAwesomeIcon size="xl" icon={faFile} />,
  },
  {
    link: '/private-client',
    label: 'Private "use client"',
    Icon: <FontAwesomeIcon size="xl" icon={faFileExclamation} />,
  },
  {
    link: '/private-server',
    label: 'Private "use server"',
    Icon: <FontAwesomeIcon size="xl" icon={faFileExclamation} />,
  },
];
