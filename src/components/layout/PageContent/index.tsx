import React from 'react';
import classes from './index.module.scss';

type Props = React.HTMLAttributes<HTMLDivElement> & {};

export default function PageContentLayout({ children, className = '', ...props }: Props) {
  return (
    <div className={`${classes.container} ${className}`} {...props}>
      <div className={classes.content}>{children}</div>
    </div>
  );
}
