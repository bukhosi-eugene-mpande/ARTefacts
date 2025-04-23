'use client';
import type { Avatar } from '@/app/actions/avatars/avatars.types';

import { useEffect, useState } from 'react';
import Image from 'next/image';

import { getAllAvatars } from '@/app/actions/avatars/avatars';

export default function ProductPage() {
  const [avatars, setAvatars] = useState<Avatar[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAvatars = async () => {
      try {
        const data = await getAllAvatars();

        setAvatars(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchAvatars();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <section className="relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
          {avatars.map((avatar) => (
            <div key={avatar.key} className="flex items-center gap-4">
              <Image
                alt={
                  avatar.key.split('/').pop()?.replace('.svg', '') || 'Avatar'
                }
                className="h-16 w-16"
                height={100}
                src={avatar.url}
                width={100}
              />
              <span>{avatar.key.split('/').pop()?.replace('.svg', '')}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
