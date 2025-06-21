import '@/styles/globals.css';
import type { Metadata, Viewport } from 'next';

import clsx from 'clsx';

import { fontSans } from '@/config/fonts';
import LayoutShell from '@/components/LayoutShell'; // your client layout

const APP_NAME = 'ArtEfacts';
const APP_DEFAULT_TITLE = 'ArtEfacts';
const APP_TITLE_TEMPLATE = '%s - PWA App';
const APP_DESCRIPTION = 'Best PWA app in the world!';

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
  themeColor: '#FFFFFF',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en">
      <body
        className={clsx(
          'min-h-screen w-screen overflow-x-hidden bg-[#3C2A21] font-sans antialiased',
          fontSans.variable
        )}
      >
        <LayoutShell>{children}</LayoutShell>
      </body>
    </html>
  );
}
