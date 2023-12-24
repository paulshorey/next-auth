'use client';

import * as React from 'react';
import { Accordion, AccordionValue, Fieldset } from '@mantine/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/pro-regular-svg-icons';
import styles from './index.module.scss';
import SignupResetPassword from './form/ResetPassword';
import SignupPassword from './form/Password';
import SignupOtpCode from './form/OtpCode';
import { SessionContext } from '@/src/context/SessionProvider';
import { sessionEdit } from '@/src/app/auth/actions/session';
import makeToast from '@/src/functions/makeToast';

export default function SigninSignupReset({ error, csrfToken }: any = {}) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const session = React.useContext(SessionContext);
  // React.useEffect(() => {
  //   sessionStart({ ui: { signupPageTimestamp: Date.now() } });
  // }, []);
  return (
    <div className={styles.container} ref={containerRef}>
      <h1 className={styles.title}>
        <span
          className="text-green-500"
          style={{ textShadow: '3px 5px 4px rgba(0,0,0,0.11)', filter: 'brightness(0.9)' }}
        >
          Sign-up
        </span>{' '}
        <sub>
          <sup>or</sup>
        </sub>{' '}
        sign-in:
      </h1>

      {!!error && (
        <div className={styles.error}>
          <span className="text-red-500">
            <FontAwesomeIcon icon={faCircleXmark} /> &nbsp;{error}
          </span>
        </div>
      )}

      <Accordion
        className={styles.accordion}
        defaultValue={session.ui.signupAccordionItem || 'activeAccordionOtp'}
        onChange={(value: AccordionValue<any>) => {
          const id = typeof value === 'string' ? value : value?.[0] || '';
          makeToast({
            id: 'signupAccordionItem',
            title: `Switched to ${id}`,
            description: 'Next time you load this page, it will auto-open.',
            // x: true,
          });
          const el = document.getElementById(id);
          sessionEdit({ ui: { signupAccordionItem: id } });
          const firstInput = el?.querySelector('input');
          if (firstInput) {
            setTimeout(() => {
              if (firstInput) {
                firstInput.click();
                firstInput.focus();
              }
            }, 500);
          }
        }}
      >
        <Accordion.Item
          value="activeAccordionOtp"
          id="activeAccordionOtp"
          className={styles.accordionItem}
        >
          <Accordion.Control>
            {/* <span className="text-green-500">
              <FontAwesomeIcon icon={faBolt} />
            </span>{' '} */}
            Receive code
          </Accordion.Control>
          <Accordion.Panel>
            <SignupOtpCode csrfToken={csrfToken} />
          </Accordion.Panel>
        </Accordion.Item>
        <Accordion.Item
          value="activeAccordionSocial"
          id="activeAccordionSocial"
          className={styles.accordionItem}
        >
          <Accordion.Control>Google, LinkedIn, Github, Apple</Accordion.Control>
          <Accordion.Panel>
            <Fieldset legend={<b>Login with a social provider</b>} className={styles.fieldset}>
              <p>Coming soon!</p>
            </Fieldset>
          </Accordion.Panel>
        </Accordion.Item>
        <Accordion.Item
          value="activeAccordionPassword"
          id="activeAccordionPassword"
          className={styles.accordionItem}
        >
          <Accordion.Control>Login with password</Accordion.Control>
          <Accordion.Panel>
            <SignupPassword />
          </Accordion.Panel>
        </Accordion.Item>
        <Accordion.Item
          value="activeAccordionResetPassword"
          id="activeAccordionResetPassword"
          className={styles.accordionItem}
        >
          <Accordion.Control>Forgot password</Accordion.Control>
          <Accordion.Panel>
            <SignupResetPassword />
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion>
    </div>
  );
}
