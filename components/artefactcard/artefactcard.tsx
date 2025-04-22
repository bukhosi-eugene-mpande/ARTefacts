import React, { useId } from 'react';
import Image from 'next/image';
import { motion } from 'motion/react';

export default function Artefactcard() {
  const id = useId();

  return (
    <motion.div
      key={`card-${card.title}-${id}`}
      className="mb-4 flex cursor-pointer flex-col items-center justify-between rounded-xl p-2 hover:bg-neutral-50 dark:hover:bg-neutral-800 md:flex-row"
      layoutId={`card-${card.title}-${id}`}
    >
      <div className="flex flex-col items-center gap-2 md:flex-row">
        <motion.div layoutId={`image-${card.title}-${id}`}>
          <Image
            alt={card.title}
            className="h-36 w-48 rounded-lg border-3 border-[#A37A3E] object-cover object-top md:h-14 md:w-14"
            height={80}
            src={
              'https://res.cloudinary.com/demo/image/upload/v1652345767/docs/demo_image2.jpg'
            }
            width={80}
          />
        </motion.div>
        <div className="flex w-fit flex-col items-center justify-center border-2 border-[#A37A3E] bg-[#6F4100] px-3 py-1 font-garamond text-white">
          <motion.h3
            className="text-center font-sans font-medium dark:text-neutral-200 md:text-left"
            layoutId={`title-${card.title}-${id}`}
          >
            Ethereal Embrace
          </motion.h3>
          <motion.p
            className="text-center dark:text-neutral-400 md:text-left"
            layoutId={`description-${card.description}-${id}`}
          >
            Leona Veyron
          </motion.p>
        </div>
      </div>
    </motion.div>
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
