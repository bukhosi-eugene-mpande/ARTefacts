'use client';

import '@/styles/globals.css';
import clsx from 'clsx';
import { Suspense, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { Spinner } from '@heroui/react';

import { fontSans } from '@/config/fonts';

import { Providers } from './providers';

function stopAllCameras() {
  const videos = document.querySelectorAll('video');

  videos.forEach((video) => {
    if (video.srcObject) {
      const tracks = (video.srcObject as MediaStream).getTracks();

      tracks.forEach((track) => track.stop());
      video.srcObject = null;
    }
  });
}

function CameraCleanupEffect() {
  const pathname = usePathname();
  const prevPath = useRef<string | null>(null);

  useEffect(() => {
    if (prevPath.current && prevPath.current !== pathname) {
      stopAllCameras();
    }
    prevPath.current = pathname;
  }, [pathname]);

  return null;
}
// --- End CameraCleanupEffect ---

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
        <Providers themeProps={{ attribute: 'class', defaultTheme: 'light' }}>
          <div className="flex h-screen w-full flex-col">
            <Suspense
              fallback={
                <Spinner
                  className="flex h-screen items-center justify-center text-white"
                  labelColor="foreground"
                >
                  <span className="text-primary">Loading...</span>
                </Spinner>
              }
            >
              <main className="w-full flex-grow">{children}</main>
            </Suspense>
            <CameraCleanupEffect />
          </div>
        </Providers>
      </body>
    </html>
  );
}
