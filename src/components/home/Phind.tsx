'use client';

import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSend } from '@fortawesome/sharp-solid-svg-icons';
import { Button, Group, Textarea } from '@mantine/core';
import classes from './index.module.scss';

export default function HomePhind() {
  const [previousKey, setPreviousKey] = React.useState('');
  const [value, setValue] = React.useState('');
  const formRef = React.useRef<HTMLFormElement>(null);
  return (
    <div className={`${classes.container} pb-6`}>
      <div className="flex flex-row justify-between">
        <h2 className={`${classes.title}`}>Phind.com</h2>
        <span className={classes.titleTip}>
          press <b>Shift</b> + <b>Cmd</b> + <b>Enter</b> to submit
        </span>
      </div>
      <form
        ref={formRef}
        method="GET"
        action="https://phind.com/search"
        target="_blank"
        onSubmit={(e) => {
          if (!value) {
            e.preventDefault();
          }
        }}
      >
        <Group className={classes.inputGroup}>
          <Textarea
            name="q"
            className={classes.textarea}
            placeholder="Ask a technical or programming question. Include links and code blocks..."
            onKeyDown={(e) => {
              if (
                (previousKey === 'Shift' || previousKey === 'Meta') &&
                (e.key === 'Shift' || e.key === 'Meta')
              ) {
                setPreviousKey(previousKey + e.key);
              } else {
                setPreviousKey(e.key);
              }
              console.log(previousKey, e.key);
              if (
                (previousKey === 'ShiftMeta' || previousKey === 'MetaShift') &&
                e.key === 'Enter'
              ) {
                e.preventDefault();
                if (e.currentTarget.value) {
                  formRef.current?.submit();
                }
              }
            }}
            onChange={(e) => {
              setValue(e.currentTarget.value);
            }}
          />
          {/* <div className={classes.buttonContainer}>
            <Button type="submit" className={`${classes.button} text-green-500`}>
              <FontAwesomeIcon size="lg" icon={faSend} />
            </Button>
          </div> */}
        </Group>
      </form>
    </div>
  );
}
