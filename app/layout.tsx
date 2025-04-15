import '@/styles/globals.css';
import { Metadata, Viewport } from 'next';
import clsx from 'clsx';
import Image from 'next/image';

import background from '@/public/assets/bg.svg';
import { siteConfig } from '@/config/site';
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
          'min-w-screen min-h-screen bg-background font-sans antialiased',
          fontSans.variable
        )}
      >
        <Providers themeProps={{ attribute: 'class', defaultTheme: 'dark' }}>
          <div className="relative flex h-screen flex-col justify-center">
            {/* Background Image (absolute and covers the entire screen) */}
            <Image
              priority // Loads the image quickly
              alt="Background"
              className="absolute inset-0 bg-opacity-90" // Puts it behind everything
              layout="fill" // Makes it cover the entire div
              objectFit="cover" // Ensures it covers the whole space
              src={background} // Make sure this image is inside the 'public/' folder
            />

            {/* Content (keeps the children on top of the background) */}
            <main className="container relative z-10 mx-auto max-w-7xl flex-grow px-6 pt-16">
              {children}
            </main>

            {/* Footer */}
            <footer className="relative z-10 flex w-full items-center justify-center py-3" />
          </div>
        </Providers>
      </body>
    </html>
  );
}
