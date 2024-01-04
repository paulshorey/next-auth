import { Popover } from '@mantine/core';

export default function PopInfo({ children, past, last, timestamp }: any) {
  if (!past) return children;
  return (
    <Popover width={200} position="bottom" withArrow shadow="md">
      <Popover.Target>{children}</Popover.Target>
      <Popover.Dropdown className="overflow-scroll">
        {timestamp}
        <pre>
          <code>
            change{' '}
            {JSON.stringify(
              {
                score: last.score - past.score,
                avg: last.score - last.delta - (past.score - past.delta),
                delta: last.delta - past.delta,
                price: last.price - past.price,
              },
              null,
              2
            )}
          </code>
        </pre>
        <pre>
          <code>
            last{' '}
            {JSON.stringify(
              {
                score: last.score,
                avg: last.score - last.delta,
                delta: last.delta,
                price: last.price,
                // days: last.days,
                // mins: last.mins.toString(),
              },
              null,
              2
            )}
          </code>
        </pre>
        {!!past?.score && (
          <pre>
            <code>
              past
              {JSON.stringify(
                {
                  score: past.score,
                  avg: past.score - past.delta,
                  delta: past.delta,
                  price: past.price,
                  // days: past.days,
                  // mins: past.mins.toString(),
                },
                null,
                2
              )}
            </code>
          </pre>
        )}
      </Popover.Dropdown>
    </Popover>
  );
}
