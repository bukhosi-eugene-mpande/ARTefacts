import '@/styles/globals.css';
import { Metadata, Viewport } from 'next';
import clsx from 'clsx';
import Image from 'next/image';

import background from '@/public/assets/bg.svg';
import { siteConfig } from '@/config/site';
import { fontSans } from '@/config/fonts';

import { Providers } from './providers';
import ConfigureAmplifyClientSide from './login/amplify-cognito-config';

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
      <head />
      <body
        className={clsx(
          'min-h-screen bg-background font-sans antialiased',
          fontSans.variable
        )}
      >
        <ConfigureAmplifyClientSide />
        <Providers themeProps={{ attribute: 'class', defaultTheme: 'dark' }}>
          <div className="relative flex flex-col h-screen justify-center">
            {/* Background Image (absolute and covers the entire screen) */}
            <Image
              priority // Loads the image quickly
              alt="Background"
              className="absolute inset-0 bg-opacity-90 " // Puts it behind everything
              layout="fill" // Makes it cover the entire div
              objectFit="cover" // Ensures it covers the whole space
              src={background} // Make sure this image is inside the 'public/' folder
            />

            {/* Content (keeps the children on top of the background) */}
            <main className="container mx-auto max-w-7xl pt-16 px-6 flex-grow relative z-10">
              {children}
            </main>

            {/* Footer */}
            <footer className="w-full flex items-center justify-center py-3 relative z-10" />
          </div>
        </Providers>
      </body>
    </html>
  );
}
