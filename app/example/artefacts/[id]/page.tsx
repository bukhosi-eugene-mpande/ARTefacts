'use client';

import type {
  Artefact,
  ArtefactData,
} from '@/app/actions/artefacts/artefacts.types';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Image from 'next/image';

import { getArtefact } from '@/app/actions/artefacts/artefacts';

export default function ProductPage() {
  const params = useParams();
  const id = params.id as string;

  const [artefactData, setArtefactData] = useState<ArtefactData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setError('No artefact ID provided');
      setLoading(false);

      return;
    }

    const fetchArtefact = async () => {
      setLoading(true);
      try {
        const data = await getArtefact(id);

        console.log('Artefact data:', data);

        setArtefactData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchArtefact();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const { artefact, same_artist, similar } = artefactData!;

  const renderArtefactCard = (item: Artefact) => (
    <div key={item.ID} className="flex flex-col items-center">
      <div className="mb-4 flex justify-center">
        <Image
          alt={item.ArtworkTitle}
          className="h-48 w-48 rounded object-cover"
          height={400}
          src={item.ImageUrl}
          width={350}
        />
      </div>
      <div className="space-y-2 text-left">
        <div>
          <strong>Artist:</strong> {item.ArtistName}
        </div>
        <div>
          <strong>Lifespan:</strong> {item.ArtistLifespan}
        </div>
        <div>
          <strong>Catalog #:</strong> {item.CatalogNumber}
        </div>
        <div>
          <strong>Title:</strong> {item.ArtworkTitle}
        </div>
        <div>
          <strong>Category:</strong> {item.Category}
        </div>
        <div>
          <strong>Year:</strong> {item.CreationYear}
        </div>
        <div>
          <strong>Medium:</strong> {item.MediumFoundry}
        </div>
        <div>
          <strong>Info:</strong> {item.AdditionalInfo}
        </div>
      </div>
    </div>
  );

  return (
    <section className="relative">
      <div className="mx-auto max-w-7xl space-y-12 px-4 sm:px-6 lg:px-8">
        {/* Main Artefact */}
        <div>
          <h2 className="mb-4 text-2xl font-bold">Selected Artefact</h2>
          {renderArtefactCard(artefact)}
        </div>

        {/* Same Artist */}
        {same_artist.length > 0 && (
          <div>
            <h2 className="mb-4 text-2xl font-bold">
              More by {artefact.ArtistName}
            </h2>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {same_artist.map(renderArtefactCard)}
            </div>
          </div>
        )}

        {/* Similar Artefacts */}
        {similar.length > 0 && (
          <div>
            <h2 className="mb-4 text-2xl font-bold">Similar Artefacts</h2>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {similar.map(renderArtefactCard)}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
