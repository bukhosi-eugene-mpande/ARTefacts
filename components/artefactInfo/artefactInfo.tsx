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
  const viewerRef = useRef<{ resetZoom: () => void }>(null);
  const id = useId();

  const [viewFull, setViewFull] = useState(false);

  const descriptionLines = data.AdditionalInfo?.split('\n') || [];
  const firstPart = descriptionLines
    .slice(0, Math.ceil(descriptionLines.length / 2))
    .join('\n');
  const secondPart = descriptionLines
    .slice(Math.ceil(descriptionLines.length / 2))
    .join('\n');

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
  }, [onClose]);

  useEffect(() => {
    async function fetchRelatedArtefacts() {
      try {
        setLoadingRelated(true);
        const result: ArtefactData = await getArtefact(String(data.ID));

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
        {data && (
          <motion.div
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            initial={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {data && (
          <motion.div
            animate={{ opacity: 1 }}
            className="fixed md:left-[30vw] md:top-[20vh] w-full inset-0 z-[100] flex flex-col font-garamond overflow-y-scroll"
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
              className="relative flex h-full w-full flex-col bg-[#79706c] sm:rounded-3xl md:h-fit md:max-h-[90%] md:max-w-[40%]"
              layoutId={`card-${data.ArtworkTitle}-${id}`}
            >
              {/* Close button */}
              <motion.button
                key={`button-${data.ArtworkTitle}-${id}`}
                layout
                animate={{ opacity: 1 }}
                aria-label="Close"
                className="absolute right-4 top-4 z-50 flex h-8 w-8 items-center justify-center rounded-full bg-neutral-800 transition hover:bg-neutral-700"
                exit={{ opacity: 0, transition: { duration: 0.05 } }}
                initial={{ opacity: 0 }}
                onClick={onClose}
              >
                <CloseIcon />
              </motion.button>
              <motion.div
                className="flex flex-col overflow-y-auto px-4 py-6 sm:px-8 lg:px-12"
                style={{ scrollbarWidth: 'none' }}
              >
                <div className="mb-6 mt-6 flex flex-col lg:mt-20 lg:flex-row lg:items-start lg:gap-12">
                  <div className="w-full flex-1 space-y-4 lg:w-1/2">
                    <motion.h1
                      className="text-3xl font-semibold text-neutral-200"
                      layoutId={`title-${data.ArtworkTitle}-${id}`}
                    >
                      {data.ArtworkTitle}
                    </motion.h1>

                    <div className="space-y-1 text-lg text-neutral-400">
                      <p>
                        <span className="font-semibold text-neutral-100">
                          Artist:
                        </span>{' '}
                        <span className="cursor-default text-neutral-100">
                          {data.ArtistName}
                        </span>
                      </p>
                      <p>
                        <span className="font-semibold text-neutral-100">
                          Year:
                        </span>{' '}
                        <span className="cursor-default text-neutral-100">
                          {data.CreationYear}
                        </span>
                      </p>
                      <p>
                        <span className="font-semibold text-neutral-100">
                          Category:
                        </span>{' '}
                        <span className="cursor-default text-neutral-100">
                          {data.Category}
                        </span>
                      </p>
                    </div>

                    {firstPart && (
                      <motion.p className="whitespace-pre-wrap py-8 leading-relaxed text-neutral-300">
                        {firstPart}
                      </motion.p>
                    )}
                  </div>

                  <div className="flex w-full justify-center p-2 lg:w-1/2">
                    <motion.div
                      className="relative flex w-full max-w-[500px] md:top-[10vh] flex-col items-center justify-center rounded-lg border border-neutral-700 bg-neutral-900 p-2"
                      layoutId={`image-${data.ArtworkTitle}-${id}`}
                    >
                      <ArtifactViewer
                        ref={viewerRef}
                        altnativeText={data.ArtworkTitle}
                        artifactClass="w-full max-h-[400px] object-contain"
                        artifactUrl={
                          data.ObjectUrl?.includes('default.glb')
                            ? data.ImageUrl
                            : data.ObjectUrl
                        }
                        category={
                          data.ObjectUrl?.includes('default.glb')
                            ? 'Image'
                            : 'Object'
                        }
                      />

                      <p className="absolute bottom-2 right-4 select-none rounded bg-white/90 px-2 py-1 text-xs font-semibold shadow">
                        Drag to rotate | Scroll or pinch to zoom
                      </p>

                      <button
                        className="absolute right-2 top-2 rounded bg-white/90 px-2 py-1 text-xs font-semibold shadow transition hover:bg-neutral-700"
                        onClick={() => {
                          viewerRef.current?.resetZoom();
                        }}
                      >
                        Reset Zoom
                      </button>
                    </motion.div>
                  </div>
                </div>

                {secondPart && (
                  <motion.div>
                    <motion.p
                      className={`transition-max-height mb-2 whitespace-pre-wrap leading-relaxed text-neutral-300 duration-300 ease-in-out ${
                        viewFull
                          ? 'max-h-[2000px]'
                          : 'max-h-[4.5rem] overflow-hidden'
                      }`}
                    >
                      {secondPart}
                    </motion.p>
                    <button
                      aria-controls="additional-description"
                      aria-expanded={viewFull}
                      className="mb-6 text-sm font-semibold text-[#9E876D] hover:underline focus:outline-none"
                      onClick={() => setViewFull(!viewFull)}
                    >
                      {viewFull ? 'Show Less' : 'Show More'}
                    </button>
                  </motion.div>
                )}

                <section className="mb-8">
                  <h2 className="mb-4 text-2xl font-semibold text-neutral-200">
                    More by Artist
                  </h2>
                  {loadingRelated ? (
                    <Spinner />
                  ) : (
                    <motion.div className="scrollbar-none flex gap-4 overflow-x-auto">
                      {sameArtist.map((item) => (
                        <div
                          key={item.ID}
                          aria-label={`View details for ${item.ArtworkTitle}`}
                          className="group min-w-[150px] cursor-pointer rounded-lg border border-transparent transition hover:border-[#A48456]"
                          role="button"
                          tabIndex={0}
                          onClick={() => {}}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                            }
                          }}
                        >
                          <motion.img
                            alt={item.ArtworkTitle}
                            className="h-52 w-full rounded-t-lg bg-gray-100 object-cover"
                            src={item.ImageUrl}
                          />
                          <div className="p-2">
                            <p className="truncate text-lg font-medium text-neutral-100 group-hover:text-[#A48456]">
                              {item.ArtworkTitle}
                            </p>
                            <p className="truncate text-sm text-[#A48456] group-hover:underline">
                              {item.ArtistName}
                            </p>
                          </div>
                        </div>
                      ))}
                    </motion.div>
                  )}
                </section>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export const CloseIcon = () => {
  return (
    <motion.svg
      animate={{ opacity: 1 }}
      className="h-4 w-4 text-white"
      exit={{ opacity: 0, transition: { duration: 0.05 } }}
      fill="none"
      height="24"
      initial={{ opacity: 0 }}
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
