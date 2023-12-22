import '@/src/styles/tailwind.css';
import '@mantine/core/styles.css';
import React from 'react';
import { MantineProvider, ColorSchemeScript } from '@mantine/core';
import { theme } from '@/theme';
import Navbar from '@/src/components/Navbar';
import AuthProvider from '@/src/context/AuthProvider';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { config } from '@fortawesome/fontawesome-svg-core';
config.autoAddCss = false;

export const metadata = {
  title: 'Mantine Next.js template',
  description: 'I am using Mantine with Next.js!',
};

export default function RootLayout({ children }: { children: any }) {
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
        <AuthProvider>
          <MantineProvider defaultColorScheme="dark" theme={theme}>
            <Navbar />
            <main className="flex flex-col justify-stretch items-stretch p-1 pt-12 pb-24 min-h-screen">
              {children}
            </main>
          </MantineProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
