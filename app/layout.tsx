import '@/styles/globals.css';
import { Metadata, Viewport } from 'next';
import clsx from 'clsx';

import { siteConfig } from '@/config/site';
import { fontSans } from '@/config/fonts';

import { Providers } from './providers';

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: '/favicon.ico',
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en">
      <head title="Artefacts" />
      <body
        className={clsx(
          'min-h-screen min-w-screen bg-background font-sans antialiased',
          fontSans.variable
        )}
      >
        <Providers themeProps={{ attribute: 'class', defaultTheme: 'light' }}>
          <div className="w-full flex flex-col h-screen">
            {/* <Navbar /> */}
            <main className="container w-full flex-grow">{children}</main>
            <footer className="w-full flex items-center justify-start px-4 py-3 bg-slate-300">
              <span className="text-default-600">
                University of Pretoria &copy;
              </span>
            </footer>
          </div>
        </Providers>
      </body>
    </html>
  );
}
