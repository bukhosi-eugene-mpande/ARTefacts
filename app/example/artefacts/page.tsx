'use client';

import type {
  Artefact,
  ArtefactsData,
} from '@/app/actions/artefacts/artefacts.types';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { getAllArtefacts } from '@/app/actions/artefacts/artefacts';

export default function ProductPage() {
  const [artefacts, setArtefacts] = useState<Artefact[]>([]);
  const [artefactsData, setArtefactsData] = useState<ArtefactsData | null>(
    null
  );
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const ITEMS_PER_PAGE = 10;

  useEffect(() => {
    const fetchArtefacts = async () => {
      setLoading(true);
      try {
        const data = await getAllArtefacts(page, ITEMS_PER_PAGE);

        setArtefactsData(data);
        setArtefacts(data.artefacts);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchArtefacts();
  }, [page]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <section className="relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
          {artefacts.map((artefact) => (
            <Link key={artefact.ID} href={`/example/artefacts/${artefact.ID}`}>
              <div className="flex cursor-pointer flex-col items-center transition-shadow duration-200 hover:shadow-lg">
                <div className="mb-4 flex justify-center">
                  <Image
                    alt={artefact.ArtworkTitle}
                    className="h-48 w-48 rounded object-cover"
                    height={400}
                    src={artefact.ImageUrl}
                    width={350}
                  />
                </div>
                <div className="space-y-2 text-left">
                  <div>
                    <strong>Artist:</strong> {artefact.ArtistName}
                  </div>
                  <div>
                    <strong>Lifespan:</strong> {artefact.ArtistLifespan}
                  </div>
                  <div>
                    <strong>Catalog #:</strong> {artefact.CatalogNumber}
                  </div>
                  <div>
                    <strong>Title:</strong> {artefact.ArtworkTitle}
                  </div>
                  <div>
                    <strong>Category:</strong> {artefact.Category}
                  </div>
                  <div>
                    <strong>Year:</strong> {artefact.CreationYear}
                  </div>
                  <div>
                    <strong>Medium:</strong> {artefact.MediumFoundry}
                  </div>
                  <div>
                    <strong>Info:</strong> {artefact.AdditionalInfo}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-10 flex justify-center gap-4">
          <button
            className="rounded bg-gray-300 px-4 py-2 hover:bg-gray-400 disabled:opacity-50"
            disabled={page === 1}
            onClick={() => setPage((prev) => Math.max(1, prev - 1))}
          >
            Previous
          </button>
          <span className="self-center">Page {page}</span>
          <button
            className="rounded bg-gray-300 px-4 py-2 hover:bg-gray-400 disabled:opacity-50"
            disabled={page === artefactsData?.pagination.total_pages}
            onClick={() => setPage((prev) => prev + 1)}
          >
            Next
          </button>
        </div>
      </div>
    </section>
  );
}
