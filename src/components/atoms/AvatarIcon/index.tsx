import * as React from 'react';
import { Avatar } from '@mantine/core';
import classes from './index.module.scss';

export default function AvatarIcon({ size }: { size?: string } = {}) {
  return <Avatar radius={size} data-size={size} className={classes.avatar} />;
}
