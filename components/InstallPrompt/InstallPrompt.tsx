'use client';

import { useEffect, useState } from 'react';
import { Download } from 'lucide-react';

export default function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  // iOS detection
  const isIOS =
    typeof window !== 'undefined' &&
    /iPhone|iPad|iPod/i.test(navigator.userAgent) &&
    !window.matchMedia('(display-mode: standalone)').matches;

  useEffect(() => {
    const handler = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e.detail || e);
      setShowPrompt(true);

      if (window.innerWidth >= 900) {
        setIsExpanded(true);
      } else {
        setIsExpanded(false);
      }
    };

    window.addEventListener('beforeinstallprompt', handler);

    // 🧪 Simulate install prompt in dev mode
    if (process.env.NODE_ENV === 'development') {
      const fakePromptEvent = {
        prompt: () => {
          console.log('🧪 Simulated prompt shown');
          return Promise.resolve();
        },
        userChoice: new Promise((resolve) =>
          setTimeout(() => {
            console.log('🧪 Simulated user choice: accepted');
            resolve({ outcome: 'accepted' });
          }, 2000)
        ),
      };

      setTimeout(() => {
        window.dispatchEvent(
          new CustomEvent('beforeinstallprompt', { detail: fakePromptEvent })
        );
      }, 1000);
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === 'accepted') {
      console.log('✅ User accepted install');
    } else {
      console.log('❌ User dismissed install');
    }

    setDeferredPrompt(null);
    setShowPrompt(false);
    setIsExpanded(false);
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    setIsExpanded(false);
  };

  if (!showPrompt && !isIOS) return null;

  return (
    <>
      {/* 📱 Floating install icon */}
      {!isExpanded && !isIOS && (
        <button
          aria-label="Install App"
          className="fixed left-2 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-[#4B3832] shadow-lg lg:hidden"
          style={{ bottom: '13%' }}
          onClick={() => setIsExpanded(true)}
        >
          <Download className="h-6 w-6 text-white" />
        </button>
      )}

      {/* 📱 Modal-style prompt for mobile */}
      {(isExpanded || isIOS) && (
        <>
          {/* Backdrop blur */}
          <div className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden" />

          {/* Centered modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4 lg:hidden">
            <div className="w-full max-w-sm space-y-4 rounded-2xl bg-[#2C1B13] px-6 py-6 text-center text-white shadow-2xl">
              <h2 className="text-lg font-bold uppercase tracking-wide">
                Are you enjoying Artefacts?
              </h2>

              <p className="font-garamond text-sm text-white/90">
                {isIOS ? (
                  <div className="space-y-2 px-4 text-left text-sm text-white/90">
                    <p className="pb-1">
                      Download the app and play daily, right from your home
                      screen.
                    </p>
                    <ul className="list-inside list-disc space-y-1 text-left text-sm text-white/90">
                      <p className="font-semibold">To install:</p>
                      <li>
                        Tap the <b>Share</b> icon at the bottom of your screen
                      </li>
                      <li>
                        Select <b>Add to Home Screen</b> from the menu
                      </li>
                    </ul>
                  </div>
                ) : (
                  <>
                    Download the app and play daily, right from your home
                    screen.
                  </>
                )}
              </p>

              {!isIOS && (
                <button
                  className="w-[30%] rounded-full bg-white px-5 py-2 text-sm font-semibold text-[#4B3832] transition hover:bg-opacity-90"
                  onClick={handleInstallClick}
                >
                  Install
                </button>
              )}

              <button
                className="block w-full text-xs text-white/70 underline underline-offset-2"
                onClick={handleDismiss}
              >
                Dismiss
              </button>
            </div>
          </div>
        </>
      )}

      {/* 🖥️ Full prompt on desktop/tablet */}
      {(isExpanded || isIOS) && (
        <div className="hidden lg:fixed lg:bottom-4 lg:right-4 lg:z-50 lg:flex lg:max-w-xs lg:flex-row lg:items-center lg:gap-2 lg:rounded-xl lg:bg-[#4B3832] lg:px-4 lg:py-3 lg:text-white lg:shadow-xl">
          <div className="text-sm">
            <>✨ Want to install this app?</>
          </div>

          <button
            className="rounded bg-white px-3 py-1 text-sm font-semibold text-[#4B3832]"
            onClick={handleInstallClick}
          >
            Install
          </button>

          <button
            className="text-xs text-white/80 underline underline-offset-2"
            onClick={handleDismiss}
          >
            Dismiss
          </button>
        </div>
      )}
    </>
  );
}
