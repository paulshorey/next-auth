'use client';

import { HoverCard, Group } from '@mantine/core';
import * as React from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/pro-solid-svg-icons';
import { usePathname } from 'next/navigation';
import { SessionContext } from '@/src/context/SessionProvider';
import classes from './index.module.scss';
import stytchRevokeSession from '@/src/app/auth/actions/stytchRevokeSession';
import AvatarIcon from '../../atoms/AvatarIcon';

export default function TopRightAccountDropdown() {
  const session = React.useContext(SessionContext);
  const pathname = usePathname();
  if (!session.user?.auth && pathname.substring(0, 5) === '/auth') return null;
  return (
    <Group justify="center" className={classes.container}>
      <HoverCard shadow="lg" transitionProps={{ duration: 500, transition: 'slide-down' }}>
        <HoverCard.Target>
          <div className={classes.trigger}>
            <div className={classes.triggerContent}>
              {session.user?.auth ? (
                <>
                  <FontAwesomeIcon icon={faCheck} className="text-green-500" />
                  <AvatarIcon size="xl" />
                </>
              ) : (
                <AvatarIcon size="xl" />
              )}
            </div>
          </div>
        </HoverCard.Target>
        <HoverCard.Dropdown className={classes.dropdown}>
          {session.user?.auth ? (
            <button
              type="button"
              onClick={() => {
                stytchRevokeSession();
              }}
            >
              Sign out
            </button>
          ) : (
            <Link href="/auth/signin">Sign in</Link>
          )}
          <hr />
          Client side session:
          <pre className="text-left">
            <code>{JSON.stringify(session, null, 2)}</code>
          </pre>
        </HoverCard.Dropdown>
      </HoverCard>
    </Group>
  );
}
