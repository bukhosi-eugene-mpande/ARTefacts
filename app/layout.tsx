import '@/styles/globals.css';
import clsx from 'clsx';
import { Suspense } from 'react';

import { fontSans } from '@/config/fonts';

import { Providers } from './providers';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en">
      <body
        className={clsx(
          'min-h-screen w-screen overflow-x-hidden bg-background font-sans antialiased',
          fontSans.variable
        )}
      >
        <Providers themeProps={{ attribute: 'class', defaultTheme: 'light' }}>
          <div className="flex h-screen flex-col">
            <Suspense fallback={<div>Loading...</div>}>
              {/* <AnimatedWrapper> */}
              <main className="container w-full flex-grow overflow-x-hidden pb-16">
                {children}
              </main>
              {/* </AnimatedWrapper> */}
            </Suspense>
          </div>
        </Providers>
      </body>
    </html>
  );
}
