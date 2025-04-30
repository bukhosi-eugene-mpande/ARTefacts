'use client';
import type { User } from '@/app/actions/user/user.types';
import type { Avatar } from '@/app/actions/avatars/avatars.types';

import { useEffect, useState } from 'react';
import Image from 'next/image';

import { getUserDetails, updateAvatar } from '@/app/actions/user/user';
import { getAllAvatars } from '@/app/actions/avatars/avatars';

export default function ProductPage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [avatars, setAvatars] = useState<Avatar[]>([]);
  const [showAvatarSelection, setShowAvatarSelection] = useState(false);
  const defaultAvatar =
    'https://artefact-1.s3.af-south-1.amazonaws.com/avatars/dog-avatar.svg';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const accessToken =
          typeof window !== 'undefined'
            ? (localStorage.getItem('accessToken') as string)
            : null;

        if (!accessToken) {
          throw new Error('No access token found in localStorage');
        }

        const [userData, avatarsData] = await Promise.all([
          getUserDetails(accessToken),
          getAllAvatars(),
        ]);

        setUser(userData);
        setAvatars(avatarsData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleAvatarChange = async (key: string) => {
    try {
      setLoading(true);
      const accessToken = localStorage.getItem('accessToken') as string;
      const updatedUser = await updateAvatar(accessToken, key);

      setUser(updatedUser);
      setShowAvatarSelection(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update avatar');
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, key?: string) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      if (key) {
        handleAvatarChange(key);
      } else {
        setShowAvatarSelection(!showAvatarSelection);
      }
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <section className="relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
          <div className="flex flex-col items-center transition-shadow duration-200 hover:shadow-lg">
            <button
              aria-label="Change avatar"
              className="relative mb-4 flex justify-center rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              tabIndex={0}
              onClick={() => setShowAvatarSelection(!showAvatarSelection)}
              onKeyDown={handleKeyDown}
            >
              <Image
                alt={user?.username ?? 'user picture'}
                className="h-48 w-48 rounded object-cover"
                height={400}
                src={user?.avatar ?? defaultAvatar}
                width={350}
              />
              <div className="absolute bottom-0 right-0 rounded-full bg-blue-500 p-2 text-xs text-white">
                Change
              </div>
            </button>

            {showAvatarSelection && (
              <div
                aria-label="Avatar selection"
                className="grid grid-cols-3 gap-4 rounded-lg bg-white p-4 shadow-lg"
                role="menu"
              >
                {avatars.map((avatar) => (
                  <button
                    key={avatar.key}
                    aria-label={`Select avatar ${avatar.key}`}
                    className="cursor-pointer rounded-full transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                    role="menuitem"
                    tabIndex={0}
                    onClick={() => handleAvatarChange(avatar.key)}
                    onKeyDown={(e) => handleKeyDown(e, avatar.key)}
                  >
                    <Image
                      alt={`Avatar option ${avatar.key}`}
                      className="rounded-full"
                      height={80}
                      src={avatar.url}
                      width={80}
                    />
                  </button>
                ))}
              </div>
            )}

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
