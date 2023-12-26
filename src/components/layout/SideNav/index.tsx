'use client';

import { Group } from '@mantine/core';
import { IconBellRinging, IconKey } from '@tabler/icons-react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmarkLarge } from '@fortawesome/pro-regular-svg-icons';
import { faFile, faFileExclamation } from '@fortawesome/pro-light-svg-icons';
import * as React from 'react';
import { usePathname } from 'next/navigation';
import classes from './index.module.scss';
import { SessionContext } from '@/src/context/SessionProvider';
import AvatarIcon from '../../atoms/AvatarIcon';

const nav = [
  { link: '/', label: 'Home', Icon: <FontAwesomeIcon size="xl" icon={faFile} /> },
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

export default function SideNav({ open, setOpen }: any) {
  const pathname = usePathname();
  const session = React.useContext(SessionContext);
  console.log('session', session);

  const links = nav.map((item, i) => (
    <Link
      className={`${classes.link} py-3 mb-2`}
      data-active={pathname === item.link ? true : null}
      href={item.link}
      key={item.label + i}
    >
      {item.Icon}&ensp;&thinsp;
      <span className="pt-[2px]">{item.label}</span>
    </Link>
  ));

  return (
    <nav className={classes.navbar}>
      <div className={classes.navbarContent}>
        <Group className={classes.header} justify="space-between">
          <FontAwesomeIcon
            icon={faXmarkLarge}
            className={classes.triggerX}
            onClick={() => setOpen(!open)}
          />
          <Link href="/" className={classes.triggerLogo}>
            <b className="shadow-md shadow-stone-800">
              <span className="text-green-500">Techy</span>.Tools
            </b>
          </Link>
        </Group>
        <div className={classes.navbarLinks}>{links}</div>
      </div>

      {/* {session.user?.auth ? (
        <div className={classes.footer}>
          <Link
            href="/account"
            className={classes.link}
            data-active={pathname.substring(0, 7) === '/account' ? true : null}
          >
            <IconBellRinging className={classes.linkIcon} stroke={1.5} />
            <span>Your account</span>
          </Link>
          <Link
            href="/auth"
            className={classes.link}
            data-active={pathname.substring(0, 5) === '/auth' ? true : null}
          >
            <IconKey className={classes.linkIcon} stroke={1.5} />
            <span>Logout</span>
          </Link>
        </div>
      ) : (
        <div className={classes.footer}>
          <Link
            href="/auth"
            className={classes.link}
            data-active={pathname.substring(0, 5) === '/auth' ? true : null}
          >
            <AvatarIcon size="md" />
            <span>Sign-up or sign-in</span>
          </Link>
        </div>
      )} */}
    </nav>
  );
}
