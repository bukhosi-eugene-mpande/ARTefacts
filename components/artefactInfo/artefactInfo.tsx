'use client';
import Image from 'next/image';
import React, { useEffect, useId, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { BookmarkIcon } from '@heroicons/react/24/outline';

import { useOutsideClick } from '@/hooks/use-outside-click';

import ArtifactViewer from '../artifact/ArtifactViewer';

export function ExpandableCard() {
  const [active, setActive] = useState<(typeof cards)[number] | boolean | null>(
    null
  );
  const ref = useRef<HTMLDivElement>(null);
  const id = useId();
  const [viewFull, setViewFull] = useState(false);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setActive(false);
      }
    }

    if (active && typeof active === 'object') {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    window.addEventListener('keydown', onKeyDown);

    return () => window.removeEventListener('keydown', onKeyDown);
  }, [active]);

  useOutsideClick(ref, () => setActive(null));

  return (
    <>
      <AnimatePresence>
        {active && typeof active === 'object' && (
          <motion.div
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black/20 h-full w-full z-10"
            exit={{ opacity: 0 }}
            initial={{ opacity: 0 }}
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {active && typeof active === 'object' ? (
          <div className="fixed inset-0  grid place-items-center z-[100] font-garamond">
            <motion.div
              ref={ref}
              className="w-full h-full md:h-fit md:max-h-[90%]  flex flex-col bg-transparent dark:bg-neutral-900 sm:rounded-3xl overflow-hidden"
              layoutId={`card-${active.title}-${id}`}
            >
              <motion.button
                key={`button-${active.title}-${id}`}
                layout
                animate={{
                  opacity: 1,
                }}
                className="flex absolute top-2 right-2 lg:hidden items-center z-50 justify-center bg-white rounded-full h-6 w-6"
                exit={{
                  opacity: 0,
                  transition: {
                    duration: 0.05,
                  },
                }}
                initial={{
                  opacity: 0,
                }}
                onClick={() => setActive(null)}
              >
                <CloseIcon />
              </motion.button>
              <motion.div
                className="min-h-[60vh] justify-center items-center"
                layoutId={`image-${active.title}-${id}`}
              >
                <ArtifactViewer
                  altnativeText={active.title}
                  artifactClass="w-full min-h-full items-center justify-center flex flex-col lg:h-80 sm:rounded-tr-lg sm:rounded-tl-lg"
                  artifactUrl={active.src}
                  category="Object"
                  height={750}
                  // width={100}
                />
              </motion.div>

              <motion.div
                animate={{ y: viewFull ? -347 : 200 }}
                className="bg-[#FEFCF4] dark:bg-neutral-900 pt-4 min-h-[85vh] pb-16 w-full cursor-pointer z-200 rounded-t-xl overflow-y-scroll"
                transition={{ duration: 0.3, type: 'tween' }}
                onClick={() => setViewFull(!viewFull)}
              >
                <div className="px-4">
                  <div className="flex justify-between items-start">
                    <motion.div className="">
                      <motion.p
                        className="text-2xl font-sans font-medium dark:text-neutral-200"
                        layoutId={`title-${active.title}-${id}`}
                      >
                        Ethereal Embrace
                      </motion.p>
                      <motion.div className="text-lg">
                        <p>
                          Artist:{' '}
                          <span className="text-[#9E876D]">Leona Veyron</span>
                        </p>
                        <p>
                          Year: <span className="text-[#9E876D]">1987</span>
                        </p>
                        <p>
                          Location:{' '}
                          <span className="text-[#9E876D]">
                            Abstract Surrealism
                          </span>
                        </p>
                      </motion.div>
                    </motion.div>
                    <motion.a
                      className="text-sm rounded-full font-bold flex flex-col text-gray-500"
                      href={active.ctaLink}
                      layoutId={`button-${active.title}-${id}`}
                    >
                      <BookmarkIcon />
                      <span>save</span>
                    </motion.a>
                  </div>
                  <div className="relative">
                    <motion.div
                      layout
                      animate={{ opacity: 1 }}
                      className="text-neutral-600 text-md md:text-md lg:text-base md:h-fit pb-10 flex flex-col items-start gap-4 overflow-auto dark:text-neutral-400 [scrollbar-width:none] [-ms-overflow-style:none] [-webkit-overflow-scrolling:touch]"
                      exit={{ opacity: 0 }}
                      initial={{ opacity: 0 }}
                    >
                      {typeof active.content === 'function'
                        ? active.content()
                        : active.content}
                    </motion.div>
                  </div>
                  <div className="relative text-2xl mb-8">
                    <div className="flex justify-between items-center pb-2">
                      <motion.h2 className="font-sans">
                        More by Artist
                      </motion.h2>
                      <a
                        className="text-sm underline text-[#2A2725]"
                        href="/artefacts"
                      >
                        View all
                      </a>
                    </div>
                    <motion.div className="flex gap-4 overflow-x-scroll">
                      <div>
                        <motion.img
                          className="h-52 min-w-36 bg-gray-100 rounded-lg"
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
                          className="h-52 min-w-36 bg-gray-100 rounded-lg"
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
                          className="h-52 min-w-36 bg-gray-100 rounded-lg"
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
                          className="h-52 min-w-36 bg-gray-100 rounded-lg"
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
                    <div className="flex justify-between items-center pb-2">
                      <motion.h2 className="font-sans">
                        Popular this week
                      </motion.h2>
                      <a
                        className="text-sm underline text-[#2A2725]"
                        href="/artefacts"
                      >
                        View all
                      </a>
                    </div>

                    <motion.div className="flex gap-4 overflow-x-auto">
                      <div>
                        <motion.img
                          className="h-52 min-w-36 bg-gray-100 rounded-lg"
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
                          className="h-52 min-w-36 bg-gray-100 rounded-lg"
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
                          className="h-52 min-w-36 bg-gray-100 rounded-lg"
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
                          className="h-52 min-w-36 bg-gray-100 rounded-lg"
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

                <footer className="w-full mt-4 flex items-center justify-start px-4 py-3 bg-slate-300">
                  <span className="text-default-600">
                    University of Pretoria &copy;
                  </span>
                </footer>
              </motion.div>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>
      <ul className="w-full flex flex-row gap-4">
        {cards.map((card, index) => (
          <motion.div
            key={`card-${card.title}-${id}`}
            className="flex flex-col md:flex-row p-2 justify-between items-center hover:bg-neutral-50 dark:hover:bg-neutral-800 rounded-xl cursor-pointer mb-4"
            layoutId={`card-${card.title}-${id}`}
            onClick={() => setActive(card)}
          >
            <div className="flex gap-2 flex-col md:flex-row items-center">
              <motion.div layoutId={`image-${card.title}-${id}`}>
                <Image
                  alt={card.title}
                  className="h-36 w-48 md:h-14 md:w-14 rounded-lg object-cover object-top border-3 border-[#A37A3E]"
                  height={80}
                  src={
                    'https://res.cloudinary.com/demo/image/upload/v1652345767/docs/demo_image2.jpg'
                  }
                  width={80}
                />
              </motion.div>
              <div className="bg-[#6F4100] border-2 border-[#A37A3E] w-fit items-center justify-center flex flex-col font-garamond text-white py-1 px-3">
                <motion.h3
                  className="font-medium font-sans dark:text-neutral-200 text-center md:text-left"
                  layoutId={`title-${card.title}-${id}`}
                >
                  Ethereal Embrace
                </motion.h3>
                <motion.p
                  className=" dark:text-neutral-400 text-center md:text-left"
                  layoutId={`description-${card.description}-${id}`}
                >
                  Leona Veyron
                </motion.p>
              </div>
            </div>
            {/* <motion.button
              className="px-4 py-2 text-sm rounded-full font-bold bg-gray-100 hover:bg-green-500 hover:text-white text-black mt-4 md:mt-0"
              layoutId={`button-${card.title}-${id}`}
            >
              {card.ctaText}
            </motion.button> */}
          </motion.div>
        ))}
      </ul>
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

const cards = [
  {
    description: 'Lana Del Rey',
    title: 'Summertime Sadness',
    src: '/assets/car.glb',
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
  },
];
