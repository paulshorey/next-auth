import classes from './index.module.scss';

type Props = {
  children: React.ReactNode;
};

export default function PageContent({ children }: Props) {
  return (
    <div className={classes.container}>
      <div className={classes.content}>{children}</div>
    </div>
  );
}
