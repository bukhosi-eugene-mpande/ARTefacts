'use client';

import type { Avatar } from '@/app/actions/avatars/avatars.types';
import type { User } from '@/app/actions/user/user.types';

import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useTheme } from 'next-themes';
import { PencilIcon } from '@heroicons/react/24/outline';
import { MoonIcon, SunIcon } from '@heroicons/react/24/solid';
import {
  Spinner,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from '@heroui/react';
import Link from 'next/link';

import {
  getUserDetails,
  updateAvatar,
  deleteUser,
  editName,
} from '@/app/actions/user/user';
import { getAllAvatars } from '@/app/actions/avatars/avatars';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'default' | 'link';
};

const Button: React.FC<ButtonProps> = ({
  className = '',
  variant = 'default',
  children,
  ...props
}) => {
  const base = 'inline-flex items-center justify-center font-medium';
  const variants: Record<'default' | 'link', string> = {
    default: 'bg-[#231209] text-white',
    link: 'bg-transparent underline',
  };

  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};

type CardProps = {
  className?: string;
  children: React.ReactNode;
};

const Card: React.FC<CardProps> = ({ className = '', children }) => (
  <div className={`rounded-lg p-4 shadow ${className}`}>{children}</div>
);

const CardContent: React.FC<CardProps> = ({ className = '', children }) => (
  <div className={`p-4 ${className}`}>{children}</div>
);

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const [textSize, setTextSize] = useState(16);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);
  const [isNameChangeModalOpen, setIsNameChangeModalOpen] = useState(false);
  const [isSavingName, setIsSavingName] = useState(false);

  const [tempName, setTempName] = useState('');

  const [avatars, setAvatars] = useState<Avatar[]>([]);
  const [currentAvatar, setCurrentAvatar] = useState<Avatar>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const accessToken = localStorage.getItem('accessToken') as string;

        if (!accessToken) {
          throw new Error('No access token found in localStorage');
        }

        const [userData, avatarsData] = await Promise.all([
          getUserDetails(accessToken),
          getAllAvatars(),
        ]);

        const userAvatar = avatarsData.find((av) => av.url === userData.avatar);

        setCurrentAvatar(userAvatar);
        setUser(userData);
        setTempName(userData.name || userData.username);
        setAvatars(avatarsData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSaveChanges = async () => {
    setIsSavingName(true);
    try {
      const accessToken = localStorage.getItem('accessToken') as string;
      const success = await editName(accessToken, tempName);

      if (success) {
        // Refresh user data
        const updatedUser = await getUserDetails(accessToken);

        setUser(updatedUser);
        setIsNameChangeModalOpen(false);
      } else {
        throw new Error('Failed to update name');
      }
    } catch (err) {
      console.error('Name update error:', err);
    } finally {
      setIsSavingName(false);
    }
  };

  const handleAvatarChange = async (avatar: Avatar | undefined) => {
    if (!avatar) return;
    try {
      setLoading(true);
      const accessToken = localStorage.getItem('accessToken') as string;
      const updatedUser = await updateAvatar(accessToken, avatar.key);

      setUser(updatedUser);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update avatar');
    } finally {
      setLoading(false);
      if (selectedAvatar) {
        setCurrentAvatar(selectedAvatar);
      }
      setIsModalOpen(false);
    }
  };

  const handleDeleteAccount = async () => {
    setIsDeleting(true);
    try {
      const accessToken = localStorage.getItem('accessToken') as string;

      if (!accessToken) throw new Error('No access token found');

      const isDeleteSuccessful = await deleteUser(accessToken);

      if (isDeleteSuccessful) {
        localStorage.clear();
        setIsDeleteModalOpen(false);
        router.push('/pages/home');
      } else {
        throw new Error('Deletion failed');
      }
    } catch (err) {
      console.error('Account deletion error:', err);
    } finally {
      setIsDeleting(false);
    }
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState(currentAvatar);

  const handleSaveAvatar = () => {
    if (selectedAvatar) {
      setCurrentAvatar(selectedAvatar);
    }
    setIsModalOpen(false);
  };

  return (
    <div
      className={`text-[#231209]} pt-16 flex h-[91vh] w-full flex-col justify-center transition-colors duration-500 bg-[#231209] dark:text-[#e3c8a0]`}
      style={{ fontSize: `${textSize}px` }}
    >

      <div className="container mx-auto flex-grow">
        {user ? (
          <div className="flex flex-col">
            <div className="mt-2 flex flex-col items-center justify-center">
              <div
                className={`text-[#231209]} flex h-60 w-60 items-center justify-center rounded-full bg-[#e5c8a4] dark:bg-[#231209] dark:text-[#e3c8a0]`}
              >
                {loading ? (
                  <Spinner color="warning" />
                ) : (
                  <Image
                    alt={
                      user?.avatar?.split('/').pop()?.replace('.svg', '') ||
                      'Avatar'
                    }
                    className="h-48 w-48 rounded-full"
                    height={100}
                    src={
                      user?.avatar ||
                      'https://ohsobserver.com/wp-content/uploads/2022/12/Guest-user.png'
                    }
                    width={100}
                  />
                )}
              </div>
            </div>
            <Button
              className={`mt-2 font-arial font-semibold text-[#e3c8a0]`}
              variant="link"
              onClick={() => setIsModalOpen(true)}
            >
              Change Avatar
            </Button>

            <Modal
              isOpen={isModalOpen}
              placement="center"
              onClose={() => setIsModalOpen(false)}
              className="bg-[#e5c8a4]"
            >
              <ModalContent>
                <ModalHeader>Choose Your Avatar</ModalHeader>
                <ModalBody>
                  <div className="grid grid-cols-3 gap-4">
                    {avatars.map((avatar) => (
                      <div
                        key={avatar.key}
                        aria-checked={selectedAvatar?.key === avatar.key}
                        className={`cursor-pointer rounded-full p-1 ${selectedAvatar?.key === avatar.key
                            ? 'border-4 border-[#9F8763]'
                            : 'border-2 border-transparent'
                          }`}
                        role="radio"
                        tabIndex={0}
                        onClick={() => setSelectedAvatar(avatar)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            setSelectedAvatar(avatar);
                          }
                        }}
                      >
                        <Image
                          alt={
                            avatar.key.split('/').pop()?.replace('.svg', '') ||
                            'Avatar'
                          }
                          className="rounded-full object-cover"
                          height={100}
                          src={avatar.url}
                          width={100}
                        />
                      </div>
                    ))}
                  </div>
                </ModalBody>
                <ModalFooter className="flex flex-row justify-center">
                  <Button
                    className="h-11 w-14 self-center rounded-md bg-[#d8a730] px-3 text-lg text-white hover:bg-[#b08a2e] hover:shadow-md"
                    onClick={() => handleAvatarChange(selectedAvatar)}
                  >
                    Save
                  </Button>
                </ModalFooter>
              </ModalContent>
            </Modal>

            <Modal
              isOpen={isNameChangeModalOpen}
              placement="center"
              onClose={() => setIsNameChangeModalOpen(false)}
            >
              <ModalContent className="rounded-lg bg-[#E3C8A0] text-[#231209] dark:bg-[#231209] dark:text-[#e3c8a0]">
                <ModalHeader>
                  <h2 className="w-full text-center font-['Bebas_Neue',Helvetica] text-3xl text-[#d8a730]">
                    Confirm Name Change
                  </h2>
                </ModalHeader>
                <ModalBody>
                  <p className="text-center text-base font-medium">
                    Are you sure you want to change your name to &quot;
                    {tempName}&quot;?
                  </p>
                </ModalBody>
                <ModalFooter className="flex justify-center gap-4">
                  <Button
                    className="rounded-full bg-[#c2c1c1b9] px-5 py-2 font-['Bebas_Neue',Helvetica] text-lg text-[#231209] hover:bg-[#9f8763] dark:bg-[#4b3f37] dark:text-[#e3c8a0] dark:hover:bg-[#5b5046]"
                    onClick={() => setIsNameChangeModalOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    className="flex items-center justify-center gap-2 rounded-full bg-[#d8a730] px-5 py-2 font-['Bebas_Neue',Helvetica] text-lg text-[#231209] hover:bg-[#b08a2e] hover:shadow-md"
                    disabled={isSavingName}
                    onClick={handleSaveChanges}
                  >
                    {isSavingName ? (
                      <>
                        <Spinner color="default" size="sm" />
                        Saving...
                      </>
                    ) : (
                      'Confirm Change'
                    )}
                  </Button>
                </ModalFooter>
              </ModalContent>
            </Modal>

            <Card
              className={`text-[#231209]} mx-auto mt-6 h-fit lg:w-[25%] md:w-[25%] border-none bg-[#e5c8a4] pb-4`}
            >
              <CardContent className="p-0">
                <div className="h-auto w-full">
                  <div
                    className={`text-[#231209] relative top-0 mb-2 bg-[#E3C8A0] text-2xl text-[24px] dark:bg-[#231209] dark:text-[#e3c8a0]`}
                  >
                    NAME
                  </div>
                  <div className="w-7/8 flex items-center gap-4 rounded-[40px] border-[3px] border-solid border-[#231209] bg-[#9f8763b8] dark:border-[#e3c8a0]">
                    <input
                      className="h-full font-arial w-full rounded-[40px] border-none bg-transparent p-2 outline-none"
                      value={tempName}
                      onChange={(e) => setTempName(e.target.value)}
                    />
                    <div className='className="m-1 font-garamond" flex items-center justify-center rounded-full bg-[#d8a730] p-3'>
                      <PencilIcon className="h-4 w-4" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        ) : (
          <Card className="mx-auto w-[90%] border-none bg-[#E3C8A0] p-0 text-[#231209] dark:bg-[#231209] dark:text-[#e3c8a0]">
            <CardContent className="flex flex-col items-center p-6">
              <div className="text-center font-['Bebas_Neue',Helvetica] text-4xl text-[#d8a730]">
                GUEST USER
              </div>
              <div className="mt-6 flex flex-col gap-4 sm:flex-row">
                <a
                  className="rounded-md bg-[#d8a730] px-6 py-2 text-[#231209] transition hover:bg-[#b08a2e] hover:text-white hover:shadow-md dark:bg-[#e3c8a0] dark:text-[#231209] dark:hover:bg-[#d8a730] dark:hover:text-[#231209]"
                  href="/auth/login"
                >
                  Login
                </a>
                <a
                  className="rounded-md border-2 border-[#d8a730] px-6 py-2 text-[##231209] transition hover:bg-[#d8a730] hover:text-[#231209] hover:shadow-md"
                  href="/auth/signup"
                >
                  Sign Up
                </a>
              </div>
            </CardContent>
          </Card>
        )}

        {/* <Card className="mx-auto mt-6 w-[90%] border-none bg-[#E3C8A0] text-[#231209] dark:bg-[#231209] dark:text-[#e3c8a0]">
          <CardContent className="p-0">
            <div className="mt-2 text-center font-['Bebas_Neue',Helvetica] text-4xl text-[#d8a730]">
              Settings
            </div>
            <div className="mt-4 flex flex-row items-center justify-center gap-x-4">
              <div className="font-['Bebas_Neue',Helvetica] text-2xl text-[#231209] dark:text-[#e3c8a0]">
                Theme mode
              </div>
              <button
                aria-checked
                aria-label="Toggle dark mode"
                className="flex h-10 w-[83px] items-center rounded-[16px] bg-[#c2c1c1b9] px-1 shadow transition-colors duration-300 dark:bg-[#4b3f37]"
                role="switch"
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              >
                <div className="ml-0 flex h-[29px] w-[29px] items-center justify-center rounded-full bg-[#251a13] transition-all duration-300 dark:ml-[44px] dark:bg-[#d8a730]">
                  {theme === 'light' ? (
                    <SunIcon className="h-[17px] w-[17px] text-white" />
                  ) : (
                    <MoonIcon className="h-[17px] w-[17px] text-white" />
                  )}
                </div>
              </button>
            </div>
          </CardContent>
        </Card> */}

        <Modal
          isOpen={isDeleteModalOpen}
          placement="center"
          onClose={() => setIsDeleteModalOpen(false)}
        >
          <ModalContent className="rounded-lg bg-[#E3C8A0] text-[#231209] dark:bg-[#231209] dark:text-[#e3c8a0]">
            <ModalHeader>
              <h2 className="w-full text-center font-['Bebas_Neue',Helvetica] text-3xl text-red-700 dark:text-red-400">
                Confirm Deletion
              </h2>
            </ModalHeader>
            <ModalBody>
              <p className="text-center text-base font-medium">
                Are you sure you want to delete your account?
                <br />
                <span className="text-sm font-normal">
                  This action cannot be undone.
                </span>
              </p>
            </ModalBody>
            <ModalFooter className="flex justify-center gap-4">
              <Button
                className="rounded-full bg-[#c2c1c1b9] px-5 py-2 font-['Bebas_Neue',Helvetica] text-lg text-[#231209] hover:bg-[#9f8763] dark:bg-[#4b3f37] dark:text-[#e3c8a0] dark:hover:bg-[#5b5046]"
                disabled={isDeleting}
                onClick={() => setIsDeleteModalOpen(false)}
              >
                Cancel
              </Button>
              <Button
                className="rounded-full bg-red-600 px-5 py-2 font-['Bebas_Neue',Helvetica] text-lg text-white hover:bg-red-700 dark:bg-[#d63f3f] dark:hover:bg-red-600"
                disabled={isDeleting}
                onClick={handleDeleteAccount}
              >
                {isDeleting ? (
                  <Spinner color="default" size="sm" />
                ) : (
                  'Confirm Delete'
                )}
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>

        {user && (
          <div className="flex flex-col items-center gap-4 p-6">
            <Button
              className="h-[50px] w-[226px] rounded-full bg-[#d8a730] font-['Bebas_Neue',Helvetica] text-xl text-[#e3c8a0] transition-all duration-300 hover:bg-[#3a2e23] hover:shadow-lg dark:bg-[#e3c8a0] dark:text-[#231209] dark:hover:bg-[#d8b577]"
              onClick={() => setIsNameChangeModalOpen(true)}
            >
              Save changes
            </Button>
            <Button
              className="flex h-[50px] w-[226px] items-center justify-center rounded-full bg-red-600 px-5 py-2 font-['Bebas_Neue',Helvetica] text-lg text-white hover:bg-red-700 dark:bg-[#d63f3f] dark:hover:bg-red-600"
              disabled={isDeleting}
              onClick={() => setIsDeleteModalOpen(true)}
            >
              {isDeleting ? <Spinner color="default" size="sm" /> : 'Delete'}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
