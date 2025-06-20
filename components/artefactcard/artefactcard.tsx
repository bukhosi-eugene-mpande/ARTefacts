/* eslint-disable @next/next/no-img-element */
import React, { useId } from 'react';
import { motion } from 'motion/react';
import { useRouter } from 'next/navigation';

import { Artefact } from '@/app/actions/artefacts/artefacts.types';
export default function Artefactcard(data: Artefact) {
  const id = useId();
  const router = useRouter();

  const handleClick = () => {
    router.push(`/artefacts/${data.ID}`);
  };

  return (
    <motion.div
      key={`card-${data.ArtworkTitle}-${id}`}
      className="mb-4 flex w-full cursor-pointer flex-col items-center justify-between rounded-xl hover:bg-neutral-50 dark:hover:bg-neutral-800"
      layoutId={`card-${data.ArtworkTitle}-${id}`}
      onClick={handleClick}
    >
      <div className="flex h-full w-full flex-col items-center rounded-xl bg-white shadow-2xl">
        <motion.div
          className="h-64 w-full overflow-hidden"
          layoutId={`image-${data.ArtworkTitle}-${id}`}
        >
          <img
            alt={data.ArtworkTitle}
            className="object-fit h-full w-full rounded-xl border-2 border-[#caaf9e]"
            src={data.ImageUrl}
          />
        </motion.div>
        <div className="flex min-h-[120px] w-full flex-col items-center justify-center rounded-xl bg-[#463226] px-3 py-4 font-garamond text-white">
          {' '}
          {/* Minimum height for text content */}
          <motion.h3
            className="line-clamp-2 text-center font-sans text-[28px] font-medium dark:text-neutral-200" /* Limit to 2 lines */
            layoutId={`title-${data.ArtworkTitle}-${id}`}
          >
            {data.ArtworkTitle}
          </motion.h3>
          <motion.p
            className="line-clamp-1 text-center dark:text-neutral-400" /* Limit to 1 line */
            layoutId={`description-${data.ArtistName}-${id}`}
          >
            {data.ArtistName}
          </motion.p>
        </div>
      </div>
    </motion.div>
  );
}
