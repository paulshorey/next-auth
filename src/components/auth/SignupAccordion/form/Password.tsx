'use client';
import * as React from 'react';
import { signIn } from 'next-auth/react';
import { Button, Fieldset, TextInput } from '@mantine/core';
import styles from './index.module.scss';

export default function SignupPassword({ csrfToken }: any = {}) {
  const formRef = React.useRef<HTMLFormElement>(null);
  return (
    <Fieldset legend={<b>Sign in</b>} className={styles.fieldset}>
      {/* Regular username/password form:  */}
      <form
        className={styles.form}
        ref={formRef}
        onSubmit={async (e) => {
          e.preventDefault();
          if (formRef.current) {
            const formData = new FormData(formRef.current);
            const data = Object.fromEntries(formData.entries());
            signIn('credentials', {
              phoneOrEmail: data.phoneOrEmail,
              password: data.password,
              csrfToken,
              callbackUrl: '/',
            });
          }
        }}
      >
        <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
        <div className={styles.fieldsetStep + ' mt-6 mb-4'}>
          <TextInput
            name="phoneOrEmail"
            size="lg"
            placeholder="Your phone or email"
            variant="filled"
          />
        </div>
        <div className={styles.fieldsetStep}>
          <TextInput
            name="password"
            type="password"
            size="lg"
            placeholder="Your password"
            variant="filled"
          />
        </div>
        <div className={styles.fieldsetStep}>
          <Button type="submit" size="lg" variant="outline" className={styles.fieldsetSubmitButton}>
            Enter site
          </Button>
        </div>
        <p className="text-stone-500 text-[1rem] pt-5 pb-4 text-center">
          To "sign up" with password, first please "Receive code" above. You'll be able to add a
          password in your profile settings.
        </p>
      </form>
    </Fieldset>
  );
}
