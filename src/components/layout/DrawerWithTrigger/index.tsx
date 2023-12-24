'use client';

import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/sharp-solid-svg-icons';
import classes from './index.module.scss';
import useOutsideClickOrEscape from '@/src/hooks/useOutsideClickOrEscape';
import SideNav from './SideNav';

export default function DrawerWithTrigger() {
  const [open, setOpen] = useState(false);
  const ref = useOutsideClickOrEscape(open, () => {
    setOpen(false);
  });

  return (
    <div className={classes.container} ref={ref}>
      <button type="button" className={classes.triggerOutside} onClick={() => setOpen(!open)}>
        <FontAwesomeIcon icon={faBars} />
      </button>
      <div className={classes.content} data-open={open}>
        <SideNav open={open} setOpen={setOpen} />
      </div>
    </div>
  );
}
