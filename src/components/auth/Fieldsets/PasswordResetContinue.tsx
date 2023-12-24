'use client';

import * as React from 'react';
import { Button, Fieldset, TextInput } from '@mantine/core';
import { useSearchParams, useParams } from 'next/navigation';
import styles from './index.module.scss';
// import stytchApi from '@/src/functions/stytchApi';
import FieldErrorMessage from '@/src/components/atoms/FieldErrorMessage';
import makeToast from '@/src/functions/makeToast';
import stytchPasswordResetAuthenticate from '@/src/app/auth/actions/stytchPasswordResetAuthenticate';

export default function PasswordResetContinue() {
  const [errorMessage, setErrorMessage] = React.useState('');
  const formResetPasswordRef = React.useRef<HTMLFormElement>(null);
  const searchParams = useSearchParams();
  const token = searchParams.get('token') || '';
  return (
    <Fieldset legend={<b>Enter a new password:</b>} className={styles.fieldset}>
      {/*
       * Password reset form:
       */}
      <form
        className={styles.form}
        ref={formResetPasswordRef}
        onSubmit={async (e) => {
          e.preventDefault();
          if (formResetPasswordRef.current) {
            const formData = new FormData(formResetPasswordRef.current);
            const data = Object.fromEntries(
              Array.from(formData.entries()).map(([key, value]) => [key, String(value)])
            );
            if (!data.password) {
              setErrorMessage('You have not entered a password.');
              return;
            }
            if (data.password !== data.password2) {
              setErrorMessage("Oops! The passwords don't match.");
              return;
            }
            const response = await stytchPasswordResetAuthenticate({
              password: data.password,
              token: data.token,
            });
            if (response.status_code === 200) {
              // Success
              console.log('password auth success');
              setErrorMessage('');
            } else {
              const err = response.message || 'Error';
              setErrorMessage(err);
              makeToast({ title: err, type: 'error' });
            }
          }
          e.preventDefault();
        }}
      >
        <FieldErrorMessage errorMessage={errorMessage} />
        <code>{token}</code>
        <input type="hidden" name="token" value={token} />
        <div className={`${styles.fieldsetStep} mt-5`}>
          <TextInput
            name="password"
            size="lg"
            type="password"
            placeholder="New password"
            variant="filled"
            onChange={() => {
              setErrorMessage('');
            }}
          />
        </div>
        <div className={`${styles.fieldsetStep} mt-4`}>
          <TextInput
            name="password2"
            size="lg"
            type="password"
            placeholder="Re-enter password"
            variant="filled"
            onChange={() => {
              setErrorMessage('');
            }}
          />
        </div>
        <div className={styles.fieldsetStep}>
          <Button
            type="submit"
            size="lg"
            variant="outline"
            className={styles.fieldsetSubmitButton}
            style={{ marginTop: '1rem' }}
          >
            Sign in
          </Button>
        </div>
        <p className="text-stone-500 text-[1rem] pt-5 pb-4 text-center">
          Password must be at least 8 characters long and contain at least one of each: uppercase,
          lowercase, number, and special character.
        </p>
        <p className="text-stone-500 text-[1rem] pt-5 pb-4 text-center">
          This page contains your secret access code. It is valid for 10 minutes from the time it
          was requested. Do not leave your computer unattended during this time.
          {/* If you do not finish this process and leave the computer unattended,
          someone may be able to use this form to steal your account. After you complete this form,
          this page will become invalid. */}
        </p>
      </form>
    </Fieldset>
  );
}
