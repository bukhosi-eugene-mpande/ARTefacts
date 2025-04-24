import React, { useId, useState } from 'react';
import { motion } from 'motion/react';

import { Artefact } from '@/app/actions/artefacts/artefacts.types';

import { ExpandableCard } from '../artefactInfo/artefactInfo';

export default function Artefactcard(data: Artefact) {
  const id = useId();
  const [showCard, setShowCard] = useState(false);

  return (
    <>
      <motion.div
        key={`card-${data.ArtworkTitle}-${id}`}
        className="mb-4 flex w-full cursor-pointer flex-col items-center justify-between rounded-xl p-2 hover:bg-neutral-50 dark:hover:bg-neutral-800 md:flex-row"
        layoutId={`card-${card.title}-${id}`}
        onClick={() => setShowCard(true)}
      >
        <div className="flex flex-col items-center gap-2 rounded-xl md:flex-row bg-white p-4 shadow-2xl">
          <motion.div layoutId={`image-${card.title}-${id}`}>
            <img
              alt={data.ArtworkTitle}
              className="min-w-80 rounded-xl object-cover object-top md:h-14 md:w-14 border border-2 border-[#caaf9e]"
              src={data.ImageUrl}
            />
          </motion.div>
          <div className="flex w-fit flex-col items-center justify-center rounded-xl min-w-64 bg-[#463226] px-3 py-4 font-garamond text-white">
            <motion.h3
              className="text-center text-[28px] font-sans font-medium dark:text-neutral-200 md:text-left"
              layoutId={`title-${card.title}-${id}`}
            >
              {data.ArtworkTitle}
            </motion.h3>
            <motion.p
              className="text-center dark:text-neutral-400 md:text-left"
              layoutId={`description-${card.description}-${id}`}
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

const card = {
  description: 'Lana Del Rey',
  title: 'Summertime Sadness',
  src: '/assets/lego_spiderman.glb',
  ctaText: 'Play',
  ctaLink: 'https://ui.aceternity.com/templates',
  content: () => {
    return (
      <p>
        Ethereal Embrace is a breathtaking, 3-meter-tall bronze and glass
        sculpture that depicts two intertwined, elongated figures seemingly
        dissolving into swirling wisps of light. The figures, partially
        transparent due to embedded glass elements, appear weightless, as though
        caught in a moment of transformation between the physical and the
        ethereal. The sculpture is set on a black marble base, which features
        subtle, glowing inlays that shift in intensity based on ambient light.
        Inspired by the fleeting nature of human connection, Veyron crafted this
        piece to symbolize the way relationships, memories, and emotions exist
        in a liminal space between presence and absence.
      </p>
    );
  },
};
