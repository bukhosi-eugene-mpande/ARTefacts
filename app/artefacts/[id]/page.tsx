'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useWindowSize } from 'react-use';
import { Spinner } from '@heroui/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import {
  Artefact,
  ArtefactData,
} from '@/app/actions/artefacts/artefacts.types';
import { getArtefact } from '@/app/actions/artefacts/artefacts';
import ArtifactViewer from '@/components/artifact/ArtifactViewer';

export default function ArtefactPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { width, height } = useWindowSize();
  const [artefact, setArtefact] = useState<Artefact | null>(null);
  const [sameArtist, setSameArtist] = useState<Artefact[]>([]);
  const [similarArtefacts, setSimilarArtefacts] = useState<Artefact[]>([]);
  const [loadingRelated, setLoadingRelated] = useState(true);
  const viewerRef = useRef<{ resetZoom: () => void }>(null);
  const [viewFull, setViewFull] = useState(false);

  useEffect(() => {
    async function fetchArtefactData() {
      try {
        setLoadingRelated(true);
        const result: ArtefactData = await getArtefact(params.id);

        setArtefact(result.artefact);
        setSameArtist(result.same_artist);
        setSimilarArtefacts(result.similar);
      } catch (error) {
        console.error('Error loading artefact:', error);
      } finally {
        setLoadingRelated(false);
      }
    }

    fetchArtefactData();
  }, [params.id]);

  if (!artefact) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Spinner />
      </div>
    );
  }

  const descriptionLines = artefact.AdditionalInfo?.split('\n') || [];
  const firstPart = descriptionLines
    .slice(0, Math.ceil(descriptionLines.length / 2))
    .join('\n');
  const secondPart = descriptionLines
    .slice(Math.ceil(descriptionLines.length / 2))
    .join('\n');

  return (
    <div className="flex min-h-screen justify-center overflow-x-hidden bg-[#3C2A21] font-garamond sm:w-screen md:w-full lg:w-full lg:pt-32">
      <div className="overflow-x-hidden px-6 py-8 sm:px-8 md:px-12 lg:px-12">
        <button
          className="mb-4 flex items-center gap-2 rounded-lg px-3 py-2 text-white hover:bg-neutral-800"
          onClick={() => router.back()}
        >
          <svg
            className="h-5 w-5 lg:h-7 lg:w-7"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <div className="mb-6 flex flex-col lg:mt-8 lg:flex-row lg:items-start lg:gap-12">
          <div className="w-full flex-1 space-y-4 px-4 py-2 lg:w-1/2">
            <h1 className="text-3xl font-semibold text-neutral-200 lg:px-20">
              {artefact.ArtworkTitle}
            </h1>

            <div className="space-y-1 text-lg text-neutral-400 lg:px-20">
              <p>
                <span className="font-semibold text-neutral-100">Artist:</span>{' '}
                <span className="cursor-default text-neutral-200">
                  {artefact.ArtistName}
                </span>
              </p>
              <p>
                <span className="font-semibold text-neutral-100">Year:</span>{' '}
                <span className="cursor-default text-neutral-200">
                  {artefact.CreationYear}
                </span>
              </p>
              <p>
                <span className="font-semibold text-neutral-100">
                  Category:
                </span>{' '}
                <span className="cursor-default text-neutral-200">
                  {artefact.Category}
                </span>
              </p>
            </div>

            {firstPart && (
              <p className="whitespace-pre-wrap py-1 leading-relaxed text-neutral-300 lg:px-20">
                {firstPart}
              </p>
            )}
          </div>

          <div className="flex w-full justify-center p-2 lg:w-1/2">
            <div className="relative flex w-full max-w-[500px] flex-col items-center justify-center rounded-lg border border-[#231209] bg-[#231209] p-2">
              <ArtifactViewer
                ref={viewerRef}
                altnativeText={artefact.ArtworkTitle}
                artifactClass="w-full max-h-[400px] border-[#231209] object-contain"
                artifactUrl={
                  artefact.ObjectUrl?.includes('default.glb')
                    ? artefact.ImageUrl
                    : artefact.ObjectUrl
                }
                category={
                  artefact.ObjectUrl?.includes('default.glb')
                    ? 'Image'
                    : 'Object'
                }
              />
              <p className="absolute bottom-2 right-4 select-none rounded px-1 py-1 text-xs font-semibold">
                Drag to rotate | Scroll or pinch to zoom
              </p>

              <button
                className="absolute right-3 top-3 rounded bg-white/90 px-2 py-1 text-xs font-semibold shadow transition hover:bg-neutral-700"
                onClick={() => {
                  viewerRef.current?.resetZoom();
                }}
              >
                Reset Zoom
              </button>
            </div>
          </div>
        </div>

        {secondPart && (
          <div>
            <p
              className={`transition-max-height mb-2 whitespace-pre-wrap leading-relaxed text-neutral-300 duration-300 ease-in-out ${
                viewFull ? 'max-h-[2000px]' : 'max-h-[4.5rem] overflow-hidden'
              }`}
            >
              {secondPart}
            </p>
            <button
              aria-controls="additional-description"
              aria-expanded={viewFull}
              className="mb-6 text-sm font-semibold text-[#9E876D] hover:underline focus:outline-none"
              onClick={() => setViewFull(!viewFull)}
            >
              {viewFull ? 'Show Less' : 'Show More'}
            </button>
          </div>
        )}

        <section className="mb-8">
          <h2 className="mb-4 px-2 text-2xl font-semibold text-neutral-200 lg:px-24">
            More by Artist
          </h2>
          {loadingRelated ? (
            <Spinner />
          ) : (
            <div className="scrollbar-none flex gap-4 overflow-x-auto lg:px-24">
              {sameArtist.map((item) => (
                <div
                  key={item.ID}
                  aria-label={`View details for ${item.ArtworkTitle}`}
                  className="group min-w-[150px] cursor-pointer rounded-lg border border-transparent transition hover:border-[#A48456]"
                  role="button"
                  tabIndex={0}
                  onClick={() => {
                    window.location.href = `/artefacts/${item.ID}`;
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      window.location.href = `/artefacts/${item.ID}`;
                    }
                  }}
                >
                  <Image
                    alt={item.ArtworkTitle}
                    className="w-full rounded-t-lg bg-gray-100 object-cover"
                    height={150}
                    src={item.ImageUrl}
                    width={150}
                  />
                  <div className="p-2">
                    <p className="truncate text-lg font-medium text-neutral-100 group-hover:text-[#A48456]">
                      {item.ArtworkTitle}
                    </p>
                    <p className="truncate text-sm text-[#9E876D] group-hover:underline">
                      {item.ArtistName}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
