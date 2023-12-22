'use client';
import * as React from 'react';
import { signIn } from 'next-auth/react';
import { Accordion, AccordionValue, Button, Fieldset, TextInput } from '@mantine/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/sharp-solid-svg-icons';
import { faBolt } from '@fortawesome/free-solid-svg-icons';
import { Input } from '@mantine/core';
import styles from './index.module.scss';

export default function SigninSignupReset() {
  const [phoneOrEmail, setPhoneOrEmail] = React.useState('');
  const containerRef = React.useRef<HTMLDivElement>(null);
  const formCodeRef = React.useRef<HTMLFormElement>(null);
  const formPasswordRef = React.useRef<HTMLFormElement>(null);
  const formResetPasswordRef = React.useRef<HTMLFormElement>(null);
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

      <Accordion
        className={styles.accordion}
        defaultValue="activeAccordionItem1"
        onChange={(value: AccordionValue<any>) => {
          let el = document.getElementById(typeof value === 'string' ? value : value?.[0] || '');
          let firstInput = el?.querySelector('input');
          if (firstInput) {
            setTimeout(() => {
              if (firstInput) {
                firstInput.click();
                firstInput.focus();
              }
            }, 500);
          }
          console.log('onChange', firstInput);
        }}
      >
        <Accordion.Item
          value="activeAccordionItem1"
          id="activeAccordionItem1"
          className={styles.accordionItem}
        >
          <Accordion.Control>
            <span className="text-green-500">
              <FontAwesomeIcon icon={faBolt} />
            </span>{' '}
            Receive code
          </Accordion.Control>
          <Accordion.Panel>
            <Fieldset legend="No passwords or secret questions!" className={styles.fieldset}>
              {/* Part 1: Receive code */}
              <form
                className={styles.form}
                ref={formCodeRef}
                onSubmit={async (e) => {
                  e.preventDefault();
                  if (formCodeRef.current) {
                    const formData = new FormData(formCodeRef.current);
                    const data = Object.fromEntries(formData.entries());
                    console.warn('data', data);
                    // await sleep(10000);
                    signIn('credentials', { ...data, callbackUrl: '/' });
                  }
                }}
              >
                <div className={styles.fieldsetStep}>
                  <TextInput
                    name="phoneOrEmail"
                    size="lg"
                    label="1. Receive code"
                    placeholder="Your phone or email"
                    variant="filled"
                    value={phoneOrEmail}
                    onChange={(e) => setPhoneOrEmail(e.currentTarget.value)}
                    autoFocus={true}
                    rightSection={
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
                    }
                  />
                </div>

                {/* Part 2: Confirm code */}
                <div className={styles.fieldsetStep} data-disabled="true">
                  <TextInput
                    name="confirmCode"
                    size="lg"
                    label="2. Confirm code"
                    placeholder="_ _ _ _ _ _"
                    variant="filled"
                    disabled
                  />
                  {/* <legend>Everything else is optional!</legend> */}
                </div>
                <div className={styles.fieldsetStep}>
                  <Button
                    type="submit"
                    size="lg"
                    variant="outline"
                    className={styles.fieldsetSubmitButton}
                  >
                    Submit
                  </Button>
                </div>
              </form>
            </Fieldset>
          </Accordion.Panel>
        </Accordion.Item>
        <Accordion.Item
          value="activeAccordionItem2"
          id="activeAccordionItem2"
          className={styles.accordionItem}
        >
          <Accordion.Control>Login with password</Accordion.Control>
          <Accordion.Panel>
            <Fieldset legend={<b>Sign in</b>} className={styles.fieldset}>
              {/* Regular username/password form:  */}
              <form
                className={styles.form}
                ref={formPasswordRef}
                onSubmit={async (e) => {
                  e.preventDefault();
                  if (formPasswordRef.current) {
                    const formData = new FormData(formPasswordRef.current);
                    const data = Object.fromEntries(formData.entries());
                    console.warn('data', data);
                    signIn('credentials', { ...data, callbackUrl: '/' });
                  }
                }}
              >
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
                  <Button
                    type="submit"
                    size="lg"
                    variant="outline"
                    className={styles.fieldsetSubmitButton}
                  >
                    Enter site
                  </Button>
                </div>
              </form>
            </Fieldset>
          </Accordion.Panel>
        </Accordion.Item>
        <Accordion.Item
          value="activeAccordionItem3"
          id="activeAccordionItem3"
          className={styles.accordionItem}
        >
          <Accordion.Control>Forgot password</Accordion.Control>
          <Accordion.Panel>
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
                    console.warn('data', data);
                    signIn('credentials', { ...data, callbackUrl: '/' });
                  }
                }}
              >
                <input type="hidden" name="resetPassword" value="true" />
                <div className={styles.fieldsetStep + ' mt-6'}>
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
                  >
                    Send code
                  </Button>
                </div>
              </form>
            </Fieldset>
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion>

      {/* <Input
          placeholder="@ email or phone #"
          variant="filled"
          size={'lg'}
          className={styles.inputText}
        />
        <Button type="submit" size={'lg'} className={styles.fieldsetSubmitButton}>
          Send code &ensp; <FontAwesomeIcon icon={faPaperPlaneTop} />
        </Button> */}

      {/* <Accordion defaultValue="activeAccordionItem">
          <Accordion.Item value="activeAccordionItempassword" id="activeAccordionItempassword" className={styles.accordionItem}>
            <Accordion.Control>With password:</Accordion.Control>
            <Accordion.Panel>
              <fieldset>
                <input type="text" name="username" placeholder="email or phone" />
              </fieldset>
              <fieldset>
                <input type="password" name="password" placeholder="password" />
              </fieldset>
              <fieldset className="text-right">
                <button type="submit" className="text-green-500 font-bold">
                  &nbsp;
                  <FontAwesomeIcon icon={faPaperPlaneTop} />
                </button>
              </fieldset>
            </Accordion.Panel>
          </Accordion.Item>
          <Accordion.Item value="activeAccordionItememail" id="activeAccordionItememail" className={styles.accordionItem}>
            <Accordion.Control>
              <sup className="text-green-500">
                <FontAwesomeIcon icon={faBolt} />
              </sup>{' '}
              with email:
            </Accordion.Control>
            <Accordion.Panel>
              <input type="text" name="username" placeholder="email" />
              <button type="submit" className="text-green-500 font-bold">
                &nbsp;
                <FontAwesomeIcon icon={faPaperPlaneTop} />
              </button>
            </Accordion.Panel>
          </Accordion.Item>
          <Accordion.Item value="activeAccordionItemphone" id="activeAccordionItemphone" className={styles.accordionItem}>
            <Accordion.Control>
              <sup className="text-green-500">
                <FontAwesomeIcon icon={faBolt} />
              </sup>{' '}
              or phone:
            </Accordion.Control>
            <Accordion.Panel>
              <input type="text" name="username" placeholder="phone #" />
              <button type="submit" className="text-green-500 font-bold">
                &nbsp;
                <FontAwesomeIcon icon={faPaperPlaneTop} />
              </button>
            </Accordion.Panel>
          </Accordion.Item>
        </Accordion> */}
    </div>
  );
}

async function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
