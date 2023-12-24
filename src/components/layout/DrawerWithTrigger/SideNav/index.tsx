'use client';

import { useState } from 'react';
import { Group, Code } from '@mantine/core';
import {
  IconSwitchHorizontal,
  IconLogout,
  IconBellRinging,
  IconFingerprint,
  IconKey,
  IconSettings,
  Icon2fa,
  IconDatabaseImport,
  IconReceipt2,
} from '@tabler/icons-react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/sharp-solid-svg-icons';
import classes from './index.module.css';

const nav = [
  { link: '/', label: 'Home', icon: IconBellRinging },
  { link: '/profile', label: 'Profile', icon: IconReceipt2 },
  { link: '/auth/signin', label: 'Login', icon: IconFingerprint },
  { link: '/auth/signout', label: 'Logout', icon: IconKey },
  { link: '/server', label: 'Server', icon: IconDatabaseImport },
  { link: '/client', label: 'Client', icon: Icon2fa },
  { link: '/extra', label: 'Extra', icon: IconSettings },
];

export default function SideNav({ open, setOpen }: any) {
  const [active, setActive] = useState('Billing');

  const links = nav.map((item) => (
    <Link
      className={classes.link}
      data-active={item.label === active || undefined}
      href={item.link}
      key={item.label}
      onClick={() => {
        setActive(item.label);
      }}
    >
      <item.icon className={classes.linkIcon} stroke={1.5} />
      <span>{item.label}</span>
    </Link>
  ));

  return (
    <nav className={classes.navbar}>
      <div className={classes.navbarMain}>
        <Group className={classes.header} justify="space-between">
          <button type="button" className={classes.triggerInside} onClick={() => setOpen(!open)}>
            <FontAwesomeIcon icon={faBars} />
          </button>
          <Code fw={700}>v3.1.2</Code>
        </Group>
        {links}
      </div>

      <div className={classes.footer}>
        <a href="#" className={classes.link} onClick={(event) => event.preventDefault()}>
          <IconSwitchHorizontal className={classes.linkIcon} stroke={1.5} />
          <span>Change account</span>
        </a>

        <a href="#" className={classes.link} onClick={(event) => event.preventDefault()}>
          <IconLogout className={classes.linkIcon} stroke={1.5} />
          <span>Logout</span>
        </a>
      </div>
    </nav>
  );
}
