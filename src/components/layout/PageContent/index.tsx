import classes from './index.module.scss';

type Props = {
  children: React.ReactNode;
};

export default function PageContentLayout({ children }: Props) {
  return (
    <div className={classes.container}>
      <div className={classes.content}>{children}</div>
    </div>
  );
}
