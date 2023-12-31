'use client';

import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/sharp-regular-svg-icons';
import classes from './index.module.scss';
// import useOutsideClickOrEscape from '@/src/hooks/useOutsideClickOrEscape';
import SideNav from '../NavSide';

export default function DrawerWithTrigger() {
  const [open, setOpen] = useState(false);
  // const ref = useOutsideClickOrEscape(open, () => {
  //   setOpen(false);
  // });

  return (
    <div
      className={classes.container}
      // ref={ref}
      onMouseEnter={() => {
        setOpen(true);
      }}
      onMouseLeave={() => {
        setOpen(false);
      }}
    >
      <FontAwesomeIcon
        icon={faBars}
        className={classes.triggerOutside}
        role="presentation"
        onClick={() => setOpen(!open)}
      />
      <div
        className={classes.content}
        data-open={open}
        role="presentation"
        onClick={() => setOpen(false)}
      >
        <SideNav open={open} setOpen={setOpen} />
      </div>
    </div>
  );
}
