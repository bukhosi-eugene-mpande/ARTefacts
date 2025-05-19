import AnimatedWrapper from './AnimatedWrapper';

import '@/styles/globals.css';
import clsx from 'clsx';

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
          'min-h-screen w-screen bg-background font-sans antialiased',
          fontSans.variable
        )}
      >
        <Providers themeProps={{ attribute: 'class', defaultTheme: 'light' }}>
          <div className="flex h-screen w-full flex-col">
            <AnimatedWrapper>
              <main className="container w-full flex-grow pb-16">
                {children}
              </main>
            </AnimatedWrapper>
          </div>
        </Providers>
      </body>
    </html>
  );
}
