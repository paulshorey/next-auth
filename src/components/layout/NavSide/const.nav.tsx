// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faFile, faFileExclamation } from '@fortawesome/pro-light-svg-icons';

export const nav = [
  { link: '/', label: 'Dashboard' }, // , Icon: <FontAwesomeIcon size="xl" icon={faFile} />
  { link: '/crypto', label: 'Crypto' }, // , Icon: <FontAwesomeIcon size="xl" icon={faFile} />
  { link: '/youtube', label: 'YouTube' }, // , Icon: <FontAwesomeIcon size="xl" icon={faFile} />
  {
    link: '/public-client',
    label: 'public "use client"',
    // Icon: <FontAwesomeIcon size="xl" icon={faFile} />,
  },
  {
    link: '/public-server',
    label: 'public "use server"',
    // Icon: <FontAwesomeIcon size="xl" icon={faFile} />,
  },
  {
    link: '/private-client',
    label: 'private "use client"',
    // Icon: <FontAwesomeIcon size="xl" icon={faFileExclamation} />,
  },
  {
    link: '/private-server',
    label: 'private "use server"',
    // Icon: <FontAwesomeIcon size="xl" icon={faFileExclamation} />,
  },
];
