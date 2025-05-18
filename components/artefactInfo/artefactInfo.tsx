'use client';

import React, { useEffect, useId, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { useWindowSize } from 'react-use';
import Confetti from 'react-confetti';
import { Spinner } from '@heroui/react';

import { useOutsideClick } from '@/hooks/use-outside-click';
import {
  Artefact,
  ArtefactData,
} from '@/app/actions/artefacts/artefacts.types';
import { getArtefact } from '@/app/actions/artefacts/artefacts';

import ArtifactViewer from '../artifact/ArtifactViewer';

export default function ExpandableCard({
  onClose,
  data,
  confetti,
}: {
  onClose: () => void;
  data: Artefact;
  confetti: boolean;
}) {
  const { width, height } = useWindowSize();
  const [sameArtist, setSameArtist] = useState<Artefact[]>([]);
  const [similarArtefacts, setSimilarArtefacts] = useState<Artefact[]>([]);
  const [loadingRelated, setLoadingRelated] = useState(true);
  const ref = useRef<HTMLDivElement>(null);
  const id = useId();
  const [viewFull, setViewFull] = useState(false);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        onClose();
      }
    }

    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', onKeyDown);
    };
  }, []);

  useEffect(() => {
    async function fetchRelatedArtefacts() {
      try {
        setLoadingRelated(true);
        const result: ArtefactData = await getArtefact(data.ID.toString());

        setSameArtist(result.same_artist);
        setSimilarArtefacts(result.similar);
      } catch (error) {
        console.error('Error loading related artefacts:', error);
      } finally {
        setLoadingRelated(false);
      }
    }

    fetchRelatedArtefacts();
  }, [data.ID]);

  useOutsideClick(ref, () => onClose());

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
            transition={{ duration: 0.3 }}
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
              className="relative flex h-full w-full flex-col overflow-hidden bg-white dark:bg-neutral-900 sm:rounded-3xl md:h-fit md:max-h-[90%] md:max-w-[90%]"
              layoutId={`card-${data.ArtworkTitle}-${id}`}
            >
              {/* Close button - now visible on all screens */}
              <motion.button
                key={`button-${data.ArtworkTitle}-${id}`}
                layout
                animate={{
                  opacity: 1,
                }}
                className="absolute right-4 top-4 z-50 flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-lg"
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

              {/* Image section with fixed height */}
              <motion.div
                className="w-full aspect-[4/5] relative flex items-center justify-center"
                layoutId={`image-${data.ArtworkTitle}-${id}`}
              >
                <ArtifactViewer
                  altnativeText={data.ArtworkTitle}
                  artifactClass="w-full h-full object-contain"
                  artifactUrl={data.ImageUrl}
                  category={data.ImageUrl.match('glb') ? 'Object' : 'Image'}
                />
              </motion.div>

              {/* Content section */}
              <motion.div
                animate={{ y: viewFull ? -340 : 0 }}
                className="z-200 min-h-[85vh] w-full cursor-pointer overflow-y-scroll rounded-t-xl bg-[#FEFCF4] pb-16 pt-4 dark:bg-neutral-900"
                transition={{ duration: 0.3, type: 'tween' }}
                onClick={() => setViewFull(!viewFull)}
              >
                <div className="px-4">
                  <div className="flex items-start justify-between">
                    <motion.div className="">
                      <motion.p
                        className="font-sans text-2xl font-medium dark:text-neutral-200"
                        layoutId={`title-${data.ArtworkTitle}-${id}`}
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
                      href="#"
                      layoutId={`button-${data.ArtworkTitle}-${id}`}
                    >
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
                    </div>
                    {loadingRelated ? (
                      <Spinner />
                    ) : (
                      <motion.div className="flex gap-4 overflow-x-scroll">
                        {sameArtist.map((item) => (
                          <div key={item.ID}>
                            <motion.img
                              alt={item.ArtworkTitle}
                              className="h-52 min-w-36 rounded-lg bg-gray-100"
                              src={item.ImageUrl}
                            />
                            <div>
                              <p className="text-xl">{item.ArtworkTitle}</p>
                              <p className="text-medium text-[#A48456]">
                                {item.ArtistName}
                              </p>
                            </div>
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </div>

                  <div className="relative text-2xl">
                    <div className="flex items-center justify-between pb-2">
                      <motion.h2 className="font-sans">
                        Similar Artefacts
                      </motion.h2>
                    </div>
                    {loadingRelated ? (
                      <Spinner />
                    ) : (
                      <motion.div className="flex gap-4 overflow-x-scroll">
                        {similarArtefacts.map((item) => (
                          <div key={item.ID}>
                            <motion.img
                              alt={item.ArtworkTitle}
                              className="h-52 min-w-36 rounded-lg bg-gray-100"
                              src={item.ImageUrl}
                            />
                            <div>
                              <p className="text-xl">{item.ArtworkTitle}</p>
                              <p className="text-medium text-[#A48456]">
                                {item.ArtistName}
                              </p>
                            </div>
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </div>
                </div>
                <footer className="mt-4 flex w-full items-center justify-start px-4 py-3">
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
