'use client';
import * as React from 'react';
import { Button, Fieldset, TextInput } from '@mantine/core';
import styles from './index.module.scss';
import phoneOrEmail from '@/src/functions/phoneOrEmail';
import stytchApi from '@/src/functions/stytchApi';

export default function SignupResetPassword({ csrfToken }: any = {}) {
  const formResetPasswordRef = React.useRef<HTMLFormElement>(null);
  return (
    <Fieldset legend={<b>Reset password</b>} className={styles.fieldset}>
      {/* Regular username/password form:  */}
      <form
        className={styles.form}
        ref={formResetPasswordRef}
        onSubmit={async (e) => {
          e.preventDefault();
          if (formResetPasswordRef.current) {
            const formData = new FormData(formResetPasswordRef.current);
            const data = Object.fromEntries(formData.entries());
            const phoneOrEmail = data.phoneOrEmail as string;
            await stytchPasswordResetStart({ phoneOrEmail });
          }
        }}
      >
        <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
        <input type="hidden" name="resetPassword" value="true" />
        <div className={styles.fieldsetStep + ' mt-5'}>
          <TextInput
            name="phoneOrEmail"
            size="lg"
            placeholder="Your phone or email"
            variant="filled"
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
            Send code
          </Button>
        </div>
      </form>
    </Fieldset>
  );
}

async function stytchPasswordResetStart(post: { phoneOrEmail: string }) {
  console.error('\n\n\n', ['stytchPasswordSend'], '\n', post, '\n\n\n');
  let [phone, email, error] = phoneOrEmail(post.phoneOrEmail);
  if (error) {
    return error;
  }
  if (phone) {
    let data = await stytchApi('/passwords/authenticate', {
      phone_number: phone,
    });
    return data;
  }
  if (email) {
    let data = await stytchApi('/passwords/authenticate', {
      email: email,
    });
    return data;
  }
  return 'Invalid phone or email format';
}
