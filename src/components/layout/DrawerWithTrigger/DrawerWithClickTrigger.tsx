'use client';

import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/sharp-solid-svg-icons';
import classes from './index.module.scss';
import useOutsideClickOrEscape from '@/src/hooks/useOutsideClickOrEscape';
import NavSide from '../NavSide';
import NavTop from '../NavTop';

export default function DrawerWithTrigger() {
  const [open, setOpen] = useState(false);
  const ref = useOutsideClickOrEscape(open, () => {
    setOpen(false);
  });

  return (
    <div className={classes.container} ref={ref}>
      <div className={classes.triggerOutside}>
        <FontAwesomeIcon
          icon={faBars}
          className={classes.triggerOutsideMore}
          role="presentation"
          onClick={() => setOpen(!open)}
        />
        <NavTop />
      </div>
      <div
        className={classes.content}
        data-open={open}
        role="presentation"
        onClick={() => setOpen(false)}
      >
        <NavSide open={open} setOpen={setOpen} />
      </div>
    </div>
  );
}
