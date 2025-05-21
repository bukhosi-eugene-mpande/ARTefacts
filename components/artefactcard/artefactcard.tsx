/* eslint-disable @next/next/no-img-element */
import React, { useId, useState } from 'react';
import { motion } from 'motion/react';

import { Artefact } from '@/app/actions/artefacts/artefacts.types';

import ExpandableCard from '../artefactInfo/artefactInfo';

export default function Artefactcard(data: Artefact) {
  const id = useId();
  const [showCard, setShowCard] = useState(false);
  

  return (
    <>
      <motion.div
        key={`card-${data.ArtworkTitle}-${id}`}
        className="mb-4 flex w-full cursor-pointer flex-col p-8 items-center justify-between rounded-xl bg-[#e5c8a4]"
        layoutId={`card-${data.ArtworkTitle}-${id}`}
        onClick={() => setShowCard(true)}
      >
        <div className="flex h-full w-full flex-col bg-[#e5c8a4] gap-4 items-center rounded-xl">
          <motion.div
            className="h-64 w-full overflow-hidden"
            layoutId={`image-${data.ArtworkTitle}-${id}`}
          >
            <img
              alt={data.ArtworkTitle}
              className="h-full w-full rounded-xl border-2 bg-white border-[#caaf9e] object-fit"
              src={data.ImageUrl}
            />
          </motion.div>
          <div className="flex w-full flex-col items-center justify-center rounded-xl bg-[#463226] px-3 py-4 font-garamond text-white">
            {' '}
            {/* Minimum height for text content */}
            <motion.h3
              className="line-clamp-2 text-center font-sans text-[28px] font-medium dark:text-neutral-200" /* Limit to 2 lines */
              layoutId={`title-${data.ArtworkTitle}-${id}`}
            >
              {data.ArtworkTitle}
            </motion.h3>
            <motion.p
              className="line-clamp-1 text-center text-lg dark:text-neutral-400" /* Limit to 1 line */
              layoutId={`description-${data.ArtistName}-${id}`}
            >
              {data.ArtistName}
            </motion.p>
          </div>
        </div>
      </motion.div>
      {showCard && (
        <>
          <ExpandableCard
            confetti={false}
            data={data}
            onClose={() => {
              setShowCard(false);
            }}
          />
        </>
      )}
    </>
  );
}
