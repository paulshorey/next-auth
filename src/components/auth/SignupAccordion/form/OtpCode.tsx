'use client';
import * as React from 'react';
import { Button, Checkbox, Fieldset, TextInput } from '@mantine/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faCircleXmark } from '@fortawesome/sharp-solid-svg-icons';
import styles from './index.module.scss';
import { signIn } from 'next-auth/react';
import stytchOtpSend from '@/src/app/auth/actions/stytchOtpSend';
import stytchOtpAuthenticate from '@/src/app/auth/actions/stytchOtpAuthenticate';

export default function SignupOtpCode({ csrfToken }: any = {}) {
  const [errorMessage, setErrorMessage] = React.useState('');
  const [phoneOrEmail, setPhoneOrEmail] = React.useState('');
  const [codeSent, setCodeSent] = React.useState(false);
  const [otpMethodId, setOtpMethodId] = React.useState('');
  const [otpCode, setOtpCode] = React.useState('');
  const handleInputChange = (value: string) => {
    setPhoneOrEmail(value);
    setCodeSent(false);
  };
  return (
    <Fieldset legend="No password or registration needed!" className={styles.fieldset}>
      <form
        className={styles.form}
        onSubmit={async (e) => {
          e.preventDefault();
          if (phoneOrEmail && otpCode.length >= 6) {
            // Sign in
            let data = await stytchOtpAuthenticate({ code: otpCode, method_id: otpMethodId });
            console.log('otp data', data);
            if (data.status_code === 200) {
              // Success
              console.log('otp auth success');
              setErrorMessage('');
              setCodeSent(false);
            } else {
              setErrorMessage(data.message || 'Error');
            }
          } else if (phoneOrEmail) {
            // Get code
            let data = await stytchOtpSend({ phoneOrEmail });
            console.log('otp data', data);
            if (data.status_code === 200 && (data.email_id || data.phone_id)) {
              setCodeSent(true);
              setOtpMethodId(data.email_id || data.phone_id);
              setErrorMessage('');
            } else {
              setErrorMessage(data.message || 'Error');
            }
          }
        }}
      >
        <input name="csrfToken" type="hidden" defaultValue={csrfToken} />

        {/* Part 1: Receive code */}
        <div
          className={styles.fieldsetStep + ' mt-3 mb-3'}
          data-state={codeSent ? 'disabled' : 'active'}
        >
          <TextInput
            name="phoneOrEmail"
            size="lg"
            label="1. Receive code"
            placeholder="Your phone or email"
            variant="filled"
            value={phoneOrEmail}
            onChange={(e) => handleInputChange(e.currentTarget.value)}
            autoFocus={!codeSent}
            rightSection={
              codeSent ? null : (
                <Button className={styles.buttonLink} style={{ scale: '1.33' }} type="submit">
                  <FontAwesomeIcon
                    icon={faPaperPlane}
                    className="text-green-500"
                    style={{
                      textShadow: '2px 3px 4px black',
                      filter: 'brightness(0.9)',
                      scale: '1.1',
                    }}
                  />
                </Button>
              )
            }
          />
          {!!errorMessage && (
            <p className="text-red-500 text-sm pt-2">
              <FontAwesomeIcon icon={faCircleXmark} /> &nbsp;{errorMessage}
            </p>
          )}
          {!!codeSent && (
            <p className="text-green-500 text-sm pt-2">Success! Now paste the code below. 👇</p>
          )}
        </div>

        {/* Part 2: Confirm code */}
        <div
          className={styles.fieldsetStep + ' mt-2 mb-2'}
          data-state={!codeSent ? 'disabled' : 'active'}
        >
          <TextInput
            className="shdow-sm"
            name="confirmCode"
            size="lg"
            label="2. Confirm code"
            placeholder="_ _ _ _ _ _"
            variant="filled"
            value={otpCode}
            onChange={(e) => setOtpCode(e.currentTarget.value)}
          />
          <Checkbox
            label={<span className="text-sm">Remember me until I sign out</span>}
            className="pt-4"
          />
        </div>

        <div className={styles.fieldsetStep + ' mb-1'}>
          <Button type="submit" size="lg" variant="outline" className={styles.fieldsetSubmitButton}>
            {/* {!codeSent ? 'Submit' : 'Enter site'} */}
            Enter site
          </Button>
        </div>

        {/* <p className="text-stone-500 text-[1rem] pt-5 pb-5 text-center">
          You'll be able to add a password later if you really want to.
        </p> */}
      </form>
    </Fieldset>
  );
}
