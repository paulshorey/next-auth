'use client';

import { Group } from '@mantine/core';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmarkLarge } from '@fortawesome/pro-regular-svg-icons';
import * as React from 'react';
import { usePathname } from 'next/navigation';
import classes from './index.module.scss';
import { SessionContext } from '@/src/context/SessionProvider';
import { nav } from './const.nav';

export default function NavTop({ open, setOpen }: any) {
  const pathname = usePathname();
  const session = React.useContext(SessionContext);
  console.log('session', session);

  const links = nav.map((item, i) => (
    <Link
      className={`${classes.link}`}
      data-active={pathname === item.link ? true : null}
      href={item.link}
      key={item.label + i}
    >
      {item.label}
    </Link>
  ));

  return (
    <nav className={classes.navbar}>
      <div className={classes.navbarLinks}>{links}</div>
    </nav>
  );
}
