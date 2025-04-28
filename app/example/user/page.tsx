'use client';
import type { User } from '@/app/actions/user/user.types';

import { useEffect, useState } from 'react';
import Image from 'next/image';

import { getUserDetails } from '@/app/actions/user/user';

export default function ProductPage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const defaultAvatar =
    'https://artefact-1.s3.af-south-1.amazonaws.com/avatars/dog-avatar.svg';

  useEffect(() => {
    const fetchAvatars = async () => {
      try {
        const accessToken =
          typeof window !== 'undefined'
            ? (localStorage.getItem('accessToken') as string)
            : null;

        if (!accessToken) {
          throw new Error('No access token found in localStorage');
        }

        const data = await getUserDetails(accessToken);

        setUser(data);
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
          <div className="flex cursor-pointer flex-col items-center transition-shadow duration-200 hover:shadow-lg">
            <div className="mb-4 flex justify-center">
              <Image
                alt={user?.username ?? 'user picture'}
                className="h-48 w-48 rounded object-cover"
                height={400}
                src={user?.avatar ?? defaultAvatar}
                width={350}
              />
            </div>
            <div className="space-y-2 text-left">
              <div>
                <strong>ID:</strong> {user?.id}
              </div>
              <div>
                <strong>Name:</strong> {user?.name}
              </div>
              <div>
                <strong>Username:</strong> {user?.username}
              </div>
              <div>
                <strong>Email:</strong> {user?.email}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
