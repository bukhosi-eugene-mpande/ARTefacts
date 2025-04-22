'use client';
import type { Artefact } from '@/app/actions/artefacts/artefacts.types';

import { useEffect, useState } from 'react';
import Image from 'next/image';

import { getAllArtefacts } from '@/app/actions/artefacts/artefacts';

export default function ProductPage() {
  const [artefacts, setArtefacts] = useState<Artefact[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArtefacts = async () => {
      try {
        const data = await getAllArtefacts();

        setArtefacts(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchArtefacts();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <section className="relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
          {artefacts.map((artefact) => (
            <div key={artefact.ID} className="flex flex-col items-center">
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
          ))}
        </div>
      </div>
    </section>
  );
}
