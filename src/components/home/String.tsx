'use client';

import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSend } from '@fortawesome/sharp-solid-svg-icons';
import { faCopy } from '@fortawesome/pro-light-svg-icons';
import {
  Button,
  ButtonGroup,
  NativeSelect,
  PillGroup,
  Select,
  Textarea,
  TextInput,
} from '@mantine/core';
import { fromByteArray } from 'base64-js';
import classes from './index.module.scss';

export default function HomeYoutube() {
  const [input, setInput] = React.useState('');
  const [output, setOutput] = React.useState('');
  const [operation, setOperation] = React.useState('');
  const [disabled, setDisabled] = React.useState(true);
  const formRef = React.useRef<HTMLFormElement>(null);
  const handleSubmit = () => {
    try {
      switch (operation) {
        case 'decode URL':
          setOutput(decodeURIComponent(input));
          break;
        case 'encode URL':
          setOutput(encodeURIComponent(input));
          break;
        case 'decode base64': {
          const uint8 = new TextEncoder().encode(decodeURIComponent(input));
          setOutput(fromByteArray(uint8));
          break;
        }
        default:
          setOutput('');
          break;
      }
    } catch (err: any) {
      setOutput(err?.message || err?.toString() || '');
    }
    setDisabled(false);
  };
  return (
    <div className={`${classes.container} pb-6`}>
      <h2 className={`${classes.title}`}>string</h2>
      <form
        ref={formRef}
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <div className={classes.inputGroup}>
          <TextInput
            name="input"
            className={classes.textarea}
            placeholder="..."
            onChange={(e) => {
              console.log('e.target.value', e.target.value);
              setOutput('');
              setOperation('');
              setInput(e.target.value);
              setDisabled(true);
            }}
          />
        </div>
        <NativeSelect
          name="operation"
          data={['decode URL', 'decode base64', 'encode URL']}
          defaultValue={operation}
          rightSection={
            <Button type="submit" className={`${classes.button} text-green-500`}>
              <FontAwesomeIcon size="lg" icon={faSend} />
            </Button>
          }
          onChange={(e) => {
            console.log('e.target.value', e.target.value);
            setOutput('');
            setOperation(e.target.value);
            setDisabled(true);
            if (input) {
              handleSubmit();
            }
          }}
        />
      </form>
      {!disabled && (
        <TextInput
          className={classes.textarea}
          placeholder=""
          value={output}
          rightSection={<FontAwesomeIcon icon={faCopy} opacity={0.75} />}
        />
      )}
    </div>
  );
}
