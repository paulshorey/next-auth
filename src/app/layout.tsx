import '@/src/styles/tailwind.css';
import '@/src/styles/global.scss';
import '@mantine/core/styles.css';
import { config } from '@fortawesome/fontawesome-svg-core';
import React from 'react';
import { MantineProvider } from '@mantine/core';
import { Toaster } from 'react-hot-toast';
import { theme } from '@/theme';
import SessionProvider from '@/src/context/SessionProvider';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { sessionGet } from '@/src/app/auth/actions/session';
import DrawerWithTrigger from '../components/layout/DrawerWithTrigger';
import TopRightAccountDropdown from '../components/layout/TopRightAccountDropdown';

config.autoAddCss = false;

export const metadata = {
  title: 'Best app authentication / authorization / session management',
};

export default async function RootLayout({ children }: { children: any }) {
  const session = await sessionGet();
  return (
    <html lang="en" data-mantine-color-scheme="dark">
      <head>
        <link rel="shortcut icon" href="/favicon.svg" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
      </head>
      <body>
        <SessionProvider session={session}>
          <MantineProvider defaultColorScheme="dark" theme={theme}>
            <div className="flex w-full" style={{ width: '100%' }}>
              <DrawerWithTrigger />
              <main className="flex flex-col justify-stretch items-stretch p-1 pt-12 pb-24 min-h-screen w-full">
                {children}
              </main>
            </div>
            <Toaster
              containerStyle={{
                maxWidth: '100%',
                padding: '0',
              }}
              toastOptions={{
                className: 'reactHotToast',
                style: {
                  justifyContent: 'bottom',
                  padding: '0 0.75rem 0 1.25rem',
                  maxWidth: '100%',
                  whiteSpace: 'nowrap',
                },
              }}
            />
            <TopRightAccountDropdown />
          </MantineProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
