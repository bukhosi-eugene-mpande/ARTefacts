import '@/styles/globals.css';
import { Metadata, Viewport } from 'next';
import clsx from 'clsx';

// import { siteConfig } from '@/config/site';
import { fontSans } from '@/config/fonts';

import { Providers } from './providers';

const APP_NAME = 'PWA ARTefacts';
const APP_DEFAULT_TITLE = 'ARTefacts';
const APP_TITLE_TEMPLATE = '%s - PWA ARTefacts';
const APP_DESCRIPTION =
  'PWA ARTefacts is a Progressive Web App to help manage your artifacts.';

export const metadata: Metadata = {
  applicationName: APP_NAME,
  title: {
    default: APP_DEFAULT_TITLE,
    template: APP_TITLE_TEMPLATE,
  },
  description: APP_DESCRIPTION,
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: APP_DEFAULT_TITLE,
    // startUpImage: [],
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: 'website',
    siteName: APP_NAME,
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
  twitter: {
    card: 'summary',
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
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
            {/* <footer className="w-full flex items-center justify-start px-4 py-3 bg-slate-300">
              <span className="text-default-600">
                University of Pretoria &copy;
              </span>
            </footer> */}
          </div>
        </Providers>
      </body>
    </html>
  );
}
