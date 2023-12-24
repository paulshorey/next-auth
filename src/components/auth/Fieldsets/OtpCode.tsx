'use client';

import * as React from 'react';
import { Button, Checkbox, Fieldset, TextInput } from '@mantine/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faCircleXmark } from '@fortawesome/sharp-solid-svg-icons';
import styles from './index.module.scss';
import stytchOtpSend from '@/src/app/auth/actions/stytchOtpSend';
import stytchOtpAuthenticate from '@/src/app/auth/actions/stytchOtpAuthenticate';
import { sessionEdit } from '@/src/app/auth/actions/session';
import makeToast from '@/src/functions/makeToast';

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
          (async () => {
            const session = await sessionEdit({
              ui: { SignupAccordion: 'otp' },
            });
            console.log('session', session);
          })();
          /*
           * Step 2: Authenticate
           */
          if (phoneOrEmail && otpCode.length >= 6) {
            const response = await stytchOtpAuthenticate({ code: otpCode, method_id: otpMethodId });
            console.log('otp data', response);
            // Success
            if (response.session?.user.id) {
              console.log('otp auth success');
              setErrorMessage('');
              setCodeSent(false);
              return;
            }
            // Error
            if (response.message?.includes('method_id')) {
              // resend code
              setErrorMessage('');
              setOtpCode('');
              setOtpMethodId('');
            } else {
              const err = response.message || 'Error';
              setErrorMessage(err);
              makeToast({ title: err, type: 'error' });
              return;
            }
          }
          /*
           * Step 1: Authenticate
           */
          if (phoneOrEmail) {
            const response = await stytchOtpSend({ phoneOrEmail });
            console.log('otp data', response);
            if (response.email_id || response.phone_id) {
              setCodeSent(true);
              setOtpMethodId(response.email_id || response.phone_id);
              setErrorMessage('');
              return;
            }
            const err = response.message || 'Error';
            setErrorMessage(err);
            makeToast({ title: err, type: 'error' });
            return;
          }
          /*
           * 0: No user input
           */
          setErrorMessage('Please enter your phone or email.');
        }}
      >
        <input name="csrfToken" type="hidden" defaultValue={csrfToken} />

        {/* Part 1: Receive code */}
        <div
          className={`${styles.fieldsetStep} mt-3 mb-3`}
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
            <p className="text-green-500 text-sm pt-2">
              Code sent! Now just paste it below.&thinsp;↓
            </p>
          )}
        </div>

        {/* Part 2: Confirm code */}
        <div
          className={`${styles.fieldsetStep} mt-2 mb-2`}
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

        <div className={`${styles.fieldsetStep} mb-1`}>
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
