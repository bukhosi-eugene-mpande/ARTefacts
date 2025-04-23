'use client';

import React, { useEffect, useId, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { BookmarkIcon } from '@heroicons/react/24/outline';
import { useWindowSize } from 'react-use';
import Confetti from 'react-confetti';

import { useOutsideClick } from '@/hooks/use-outside-click';
import { Artefact } from '@/app/actions/artefacts/artefacts.types';

import ArtifactViewer from '../artifact/ArtifactViewer';

export function ExpandableCard({
  onClose,
  data,
  confetti,
}: {
  onClose: () => void;
  data: Artefact;
  confetti: boolean;
}) {
  const { width, height } = useWindowSize();
  const [active, setActive] = useState<boolean | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const id = useId();
  const [viewFull, setViewFull] = useState(false);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        onClose();
      }
    }

    if (card && typeof active === 'object') {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    window.addEventListener('keydown', onKeyDown);

    return () => window.removeEventListener('keydown', onKeyDown);
  }, [active]);

  useOutsideClick(ref, () => onClose());

  const card = {
    description: 'Lana Del Rey',
    title: 'Summertime Sadness',
    src: `/assets/${data.ImageUrl}`,
    ctaText: 'Play',
    ctaLink: 'https://ui.aceternity.com/templates',
    content: () => {
      return (
        <p>
          Ethereal Embrace is a breathtaking, 3-meter-tall bronze and glass
          sculpture that depicts two intertwined, elongated figures seemingly
          dissolving into swirling wisps of light. The figures, partially
          transparent due to embedded glass elements, appear weightless, as
          though caught in a moment of transformation between the physical and
          the ethereal. The sculpture is set on a black marble base, which
          features subtle, glowing inlays that shift in intensity based on
          ambient light. Inspired by the fleeting nature of human connection,
          Veyron crafted this piece to symbolize the way relationships,
          memories, and emotions exist in a liminal space between presence and
          absence.
        </p>
      );
    },
  };

  return (
    <>
      <AnimatePresence>
        {data && typeof data === 'object' && (
          <motion.div
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-10 h-full w-full bg-black/20"
            exit={{ opacity: 0 }}
            initial={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {data && typeof data === 'object' ? (
          <motion.div
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-[100] grid place-items-center font-garamond"
            exit={{ opacity: 0.5 }}
            initial={{ opacity: 0 }}
            transition={{ duration: 2 }}
          >
            {confetti && (
              <Confetti
                gravity={0.2}
                height={height}
                numberOfPieces={50}
                width={width}
              />
            )}
            <motion.div
              ref={ref}
              className="flex h-full w-full flex-col overflow-hidden bg-transparent dark:bg-neutral-900 sm:rounded-3xl md:h-fit md:max-h-[90%]"
              layoutId={`card-${card.title}-${id}`}
            >
              <motion.button
                key={`button-${card.title}-${id}`}
                layout
                animate={{
                  opacity: 1,
                }}
                className="absolute right-2 top-2 z-50 flex h-6 w-6 items-center justify-center rounded-full bg-white lg:hidden"
                exit={{
                  opacity: 0,
                  transition: {
                    duration: 0.05,
                  },
                }}
                initial={{
                  opacity: 0,
                }}
                onClick={() => onClose()}
              >
                <CloseIcon />
              </motion.button>
              <motion.div
                className="min-h-[60vh] items-center justify-center"
                layoutId={`image-${data.ArtworkTitle}-${id}`}
              >
                <ArtifactViewer
                  altnativeText={data.ArtworkTitle}
                  artifactClass="w-full min-h-full items-center justify-center flex flex-col lg:h-80 sm:rounded-tr-lg sm:rounded-tl-lg bg-transparent"
                  artifactUrl={data.ImageUrl}
                  category={data.ImageUrl.match('glb') ? 'Object' : 'Image'}
                  height={577}
                // width={100}
                />
              </motion.div>

              <motion.div
                animate={{ y: viewFull ? -347 : 100 }}
                className="z-200 min-h-[85vh] w-full cursor-pointer overflow-y-scroll rounded-t-xl bg-[#FEFCF4] pb-16 pt-4 dark:bg-neutral-900"
                transition={{ duration: 0.3, type: 'tween' }}
                onClick={() => setViewFull(!viewFull)}
              >
                <div className="px-4">
                  <div className="flex items-start justify-between">
                    <motion.div className="">
                      <motion.p
                        className="font-sans text-2xl font-medium dark:text-neutral-200"
                        layoutId={`title-${card.title}-${id}`}
                      >
                        {data.ArtworkTitle}
                      </motion.p>
                      <motion.div className="text-lg">
                        <p>
                          Artist:{' '}
                          <span className="text-[#9E876D]">
                            {data.ArtistName}
                          </span>
                        </p>
                        <p>
                          Year:{' '}
                          <span className="text-[#9E876D]">
                            {data.CreationYear}
                          </span>
                        </p>
                        <p>
                          Category:{' '}
                          <span className="text-[#9E876D]">
                            {data.Category}
                          </span>
                        </p>
                      </motion.div>
                    </motion.div>
                    <motion.a
                      className="flex flex-col rounded-full text-sm font-bold text-gray-500"
                      href={card.ctaLink}
                      layoutId={`button-${card.title}-${id}`}
                    >
                      <BookmarkIcon />
                      <span>save</span>
                    </motion.a>
                  </div>
                  <div className="relative">
                    <motion.div
                      layout
                      animate={{ opacity: 1 }}
                      className="text-md md:text-md flex flex-col items-start gap-4 overflow-auto pb-10 text-neutral-600 [-ms-overflow-style:none] [-webkit-overflow-scrolling:touch] [scrollbar-width:none] dark:text-neutral-400 md:h-fit lg:text-base"
                      exit={{ opacity: 0 }}
                      initial={{ opacity: 0 }}
                    >
                      {data.AdditionalInfo}
                    </motion.div>
                  </div>
                  <div className="relative mb-8 text-2xl">
                    <div className="flex items-center justify-between pb-2">
                      <motion.h2 className="font-sans">
                        More by Artist
                      </motion.h2>
                      <a
                        className="text-sm text-[#2A2725] underline"
                        href="/artefacts"
                      >
                        View all
                      </a>
                    </div>
                    <motion.div className="flex gap-4 overflow-x-scroll">
                      <div>
                        <motion.img
                          className="h-52 min-w-36 rounded-lg bg-gray-100"
                          src="https://english.ahram.org.eg/media/news/2024/12/13/2024-638696994153807693-380.jpg"
                        />
                        <div>
                          <p className="text-xl">Veil of Echoes</p>
                          <p className="text-medium text-[#A48456]">
                            Leona Veyron
                          </p>
                        </div>
                      </div>
                      <div>
                        <motion.img
                          className="h-52 min-w-36 rounded-lg bg-gray-100"
                          src="https://cdn.sanity.io/images/cxgd3urn/production/c170a298815aad72c6b84d6e186c8ae21e033eca-5484x7320.jpg?rect=0,0,5483,7320&w=1200&h=1602&q=85&fit=crop&auto=format"
                        />
                        <div>
                          <p className="text-xl">Veil of Echoes</p>
                          <p className="text-medium text-[#A48456]">
                            Leona Veyron
                          </p>
                        </div>
                      </div>
                      <div>
                        <motion.img
                          className="h-52 min-w-36 rounded-lg bg-gray-100"
                          src="https://english.ahram.org.eg/media/news/2024/12/13/2024-638696994153807693-380.jpg"
                        />
                        <div>
                          <p className="text-xl">Veil of Echoes</p>
                          <p className="text-medium text-[#A48456]">
                            Leona Veyron
                          </p>
                        </div>
                      </div>{' '}
                      <div>
                        <motion.img
                          className="h-52 min-w-36 rounded-lg bg-gray-100"
                          src="https://cdn.sanity.io/images/cxgd3urn/production/c170a298815aad72c6b84d6e186c8ae21e033eca-5484x7320.jpg?rect=0,0,5483,7320&w=1200&h=1602&q=85&fit=crop&auto=format"
                        />
                        <div>
                          <p className="text-xl">Veil of Echoes</p>
                          <p className="text-medium text-[#A48456]">
                            Leona Veyron
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  </div>

                  <div className="relative text-2xl">
                    <div className="flex items-center justify-between pb-2">
                      <motion.h2 className="font-sans">
                        Popular this week
                      </motion.h2>
                      <a
                        className="text-sm text-[#2A2725] underline"
                        href="/artefacts"
                      >
                        View all
                      </a>
                    </div>

                    <motion.div className="flex gap-4 overflow-x-auto">
                      <div>
                        <motion.img
                          className="h-52 min-w-36 rounded-lg bg-gray-100"
                          src="https://english.ahram.org.eg/media/news/2024/12/13/2024-638696994153807693-380.jpg"
                        />
                        <div>
                          <p className="text-xl">Veil of Echoes</p>
                          <p className="text-medium text-[#A48456]">
                            Leona Veyron
                          </p>
                        </div>
                      </div>
                      <div>
                        <motion.img
                          className="h-52 min-w-36 rounded-lg bg-gray-100"
                          src="https://cdn.sanity.io/images/cxgd3urn/production/c170a298815aad72c6b84d6e186c8ae21e033eca-5484x7320.jpg?rect=0,0,5483,7320&w=1200&h=1602&q=85&fit=crop&auto=format"
                        />
                        <div>
                          <p className="text-xl">Veil of Echoes</p>
                          <p className="text-medium text-[#A48456]">
                            Leona Veyron
                          </p>
                        </div>
                      </div>
                      <div>
                        <motion.img
                          className="h-52 min-w-36 rounded-lg bg-gray-100"
                          src="https://english.ahram.org.eg/media/news/2024/12/13/2024-638696994153807693-380.jpg"
                        />
                        <div>
                          <p className="text-xl">Veil of Echoes</p>
                          <p className="text-medium text-[#A48456]">
                            Leona Veyron
                          </p>
                        </div>
                      </div>{' '}
                      <div>
                        <motion.img
                          className="h-52 min-w-36 rounded-lg bg-gray-100"
                          src="https://cdn.sanity.io/images/cxgd3urn/production/c170a298815aad72c6b84d6e186c8ae21e033eca-5484x7320.jpg?rect=0,0,5483,7320&w=1200&h=1602&q=85&fit=crop&auto=format"
                        />
                        <div>
                          <p className="text-xl">Veil of Echoes</p>
                          <p className="text-medium text-[#A48456]">
                            Leona Veyron
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </div>

                <footer className="mt-4 flex w-full items-center justify-start bg-slate-300 px-4 py-3">
                  <span className="text-default-600">
                    University of Pretoria &copy;
                  </span>
                </footer>
              </motion.div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}

export const CloseIcon = () => {
  return (
    <motion.svg
      animate={{
        opacity: 1,
      }}
      className="h-4 w-4 text-black"
      exit={{
        opacity: 0,
        transition: {
          duration: 0.05,
        },
      }}
      fill="none"
      height="24"
      initial={{
        opacity: 0,
      }}
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
      width="24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M0 0h24v24H0z" fill="none" stroke="none" />
      <path d="M18 6l-12 12" />
      <path d="M6 6l12 12" />
    </motion.svg>
  );
};
