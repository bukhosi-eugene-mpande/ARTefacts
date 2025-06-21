'use client';

import { Suspense, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

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

export default function LayoutShell({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen w-full flex-col">
      <Suspense fallback={<div>Loading...</div>}>
        <main className="w-full flex-grow">{children}</main>
      </Suspense>
      <CameraCleanupEffect />
    </div>
  );
}
