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
      className="group mb-4 flex w-full cursor-pointer flex-col items-center justify-between rounded-xl bg-[#e5c8a4] p-8 transition-colors duration-300 hover:bg-[#DDA15E] dark:hover:bg-neutral-800"
      layoutId={`card-${data.ArtworkTitle}-${id}`}
      onClick={handleClick}
    >
      <div className="flex h-full w-full flex-col items-center gap-4 transition-all duration-300 group-hover:scale-[1.01]">
        <motion.div
          className="h-64 w-full overflow-hidden"
          layoutId={`image-${data.ArtworkTitle}-${id}`}
        >
          <img
            alt={data.ArtworkTitle}
            className="h-full w-full rounded-xl border-2 border-[#caaf9e] bg-white object-contain transition-transform duration-300 group-hover:scale-[1.03]"
            src={data.ImageUrl}
          />
        </motion.div>

        <div className="flex w-full flex-col items-center justify-center rounded-xl bg-[#463226] px-3 py-4 font-garamond text-white transition-colors duration-300 group-hover:bg-[#5b3d2f]">
          <motion.h3
            className="line-clamp-2 text-center font-sans text-[28px] font-medium transition-colors duration-300"
            layoutId={`title-${data.ArtworkTitle}-${id}`}
          >
            {data.ArtworkTitle}
          </motion.h3>
          <motion.p
            className="line-clamp-1 text-center transition-colors duration-300"
            layoutId={`description-${data.ArtistName}-${id}`}
          >
            {data.ArtistName}
          </motion.p>
        </div>
      </div>
    </motion.div>
  );
}
