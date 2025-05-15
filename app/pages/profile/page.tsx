'use client';

import type { Avatar } from '@/app/actions/avatars/avatars.types';
import type { User } from '@/app/actions/user/user.types';

import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import { PencilIcon } from '@heroicons/react/24/outline';
import { MoonIcon, SunIcon } from '@heroicons/react/24/solid';
import {
  Slider,
  Spinner,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from '@heroui/react';
import Link from 'next/link';

import { getUserDetails, updateAvatar } from '@/app/actions/user/user';
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
  const [textSize, setTextSize] = useState(16); // Default text size
  const [isEditingName, setIsEditingName] = useState(false);

  const [name, setName] = useState('Your Name');

  const [tempName, setTempName] = useState(name); // temporary value while editing

  const [avatars, setAvatars] = useState<Avatar[]>([]);
  const [currentAvatar, setCurrentAvatar] = useState<Avatar>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

        const userAvatar = avatarsData.find((av) => av.url === userData.avatar);

        setCurrentAvatar(userAvatar);

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

  const handleSaveChanges = () => {
    setName(tempName); // commit the new name
    setIsEditingName(false); // exit editing mode
    // Optionally show a toast or alert here
  };

  const handleAvatarChange = async (avatar: Avatar | undefined) => {
    if (!avatar) {
      return;
    }
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

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState(currentAvatar);

  const handleSaveAvatar = () => {
    if (selectedAvatar) {
      setCurrentAvatar(selectedAvatar);
    }
    setIsModalOpen(false);
  };

  const [darkMode, setDarkMode] = useState(false);

  return (
    <div
      className={`flex min-h-screen w-full flex-col justify-center space-y-8 transition-colors duration-500 ${darkMode ? 'bg-[#271F17] text-[#e3c8a0]' : 'bg-[#9F8763] text-[#231209]'}`}
      style={{ fontSize: `${textSize}px` }}
    >
      <div className="relative mx-auto h-[138px] w-[339px] pt-6">
        <Link href="/pages/home">
          <img
            alt="Artefacts logo"
            className="mx-auto object-contain"
            src="/assets/logo-gold.png"
          />
        </Link>
      </div>

      {/* Logo and Profile Components */}
      <div className="container mx-auto flex-grow">
        {user ? (
          <div className="flex flex-col">
            <div className="mt-2 flex flex-col items-center justify-center">
              <div
                className={`flex h-60 w-60 items-center justify-center rounded-full ${darkMode ? 'bg-[#231209] text-[#e3c8a0]' : 'bg-[#E3C8A0] text-[#231209]'}`}
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
              className={`mt-2 font-garamond font-semibold ${darkMode ? 'text-[#e3c8a0]' : 'text-[#231209]'}`}
              variant="link"
              onClick={() => setIsModalOpen(true)}
            >
              Change Avatar
            </Button>

            <Modal
              isOpen={isModalOpen}
              placement="center"
              onClose={() => setIsModalOpen(false)}
            >
              <ModalContent>
                <ModalHeader>Choose Your Avatar</ModalHeader>

                <ModalBody>
                  <div className="grid grid-cols-3 gap-4">
                    {avatars.map((avatar) => (
                      <div
                        key={avatar.key}
                        aria-checked={selectedAvatar?.key === avatar.key}
                        className={`cursor-pointer rounded-full p-1 ${
                          selectedAvatar?.key === avatar.key
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
                    className="h-11 w-14 self-center rounded-md bg-[#9F8763] px-3 text-lg text-white hover:bg-orange-600"
                    onClick={() => handleAvatarChange(selectedAvatar)}
                  >
                    Save
                  </Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
            <Card
              className={`mx-auto mt-6 h-fit w-[90%] border-none pb-4 ${darkMode ? 'bg-[#231209] text-[#e3c8a0]' : 'bg-[#E3C8A0] text-[#231209]'}`}
            >
              <CardContent className="p-0">
                <div className="h-auto w-full">
                  <div
                    className={`relative top-0 text-[24px] text-xl font-semibold ${darkMode ? 'bg-[#231209] text-[#e3c8a0]' : 'bg-[#E3C8A0] text-[#231209]'}`}
                  >
                    NAME
                  </div>
                  <div className="w-7/8 flex items-center gap-4 rounded-[40px] border-[3px] border-solid border-[#231209]">
                    <input
                      className={`h-full w-full rounded-[40px] border-none bg-transparent p-2 outline-none`}
                      color="default"
                      readOnly={!isEditingName}
                      value={isEditingName ? tempName : user?.username}
                      onChange={(e) => setTempName(e.target.value)}
                    />

                    <button
                      className="m-1 flex items-center justify-center rounded-full bg-[#d8a730] p-3 font-garamond"
                      type="button"
                      onClick={() => {
                        if (!isEditingName) {
                          setTempName(user?.username); // preload existing name
                          setIsEditingName(true);
                        }
                      }}
                    >
                      <PencilIcon className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        ) : (
          <Card
            className={`mx-auto w-[90%] border-none p-0 ${darkMode ? 'bg-[#231209] text-[#e3c8a0]' : 'bg-[#E3C8A0] text-[#231209]'}`}
          >
            <CardContent className="flex flex-col items-center p-0">
              <div className="text-center font-['Bebas_Neue',Helvetica] text-4xl text-[#d8a730]">
                GUEST USER
              </div>
              <p>
                Don&apos;t have an account?{' '}
                <a className="underline" href="/auth/signup">
                  Sign Up
                </a>
              </p>
            </CardContent>
          </Card>
        )}

        <Card
          className={`mx-auto mt-6 w-[90%] border-none ${darkMode ? 'bg-[#231209] text-[#e3c8a0]' : 'bg-[#E3C8A0] text-[#231209]'}`}
        >
          <CardContent className="p-0">
            <div className="mt-2 text-center font-['Bebas_Neue',Helvetica] text-4xl text-[#d8a730]">
              Settings
            </div>

            {/* Theme Toggle */}
            <div className="mt-4 flex flex-row items-center">
              <div
                className={`p-4 font-['Bebas_Neue',Helvetica] text-2xl ${darkMode ? 'text-[#e3c8a0]' : 'text-[#231209]'}`}
              >
                Theme mode
              </div>

              <button
                aria-checked={darkMode}
                aria-label="Toggle dark mode"
                className={`flex h-10 w-[83px] items-center rounded-[16px] px-1 shadow transition-colors duration-300 ${darkMode ? 'bg-[#4b3f37]' : 'bg-[#504c47]'}`}
                role="switch"
                onClick={() => setDarkMode(!darkMode)}
              >
                <div
                  className={`flex h-[29px] w-[29px] items-center justify-center rounded-full transition-all duration-300 ${darkMode ? 'ml-[44px] bg-[#d8a730]' : 'ml-0 bg-[#251a13]'}`}
                >
                  {darkMode ? (
                    <SunIcon className="h-[17px] w-[17px] text-white" />
                  ) : (
                    <MoonIcon className="h-[17px] w-[17px] text-white" />
                  )}
                </div>
              </button>
            </div>

            {/* Text Size Slider */}
            <div className="flex flex-row">
              <div
                className={`mb-2 text-center font-['Bebas_Neue',Helvetica] text-2xl ${darkMode ? 'text-[#e3c8a0]' : 'text-[#231209]'}`}
              >
                Text Size
              </div>

              <div className="relative mx-auto mt-2 h-5 w-[189px]">
                <Slider
                  className="max-w-md"
                  color="warning"
                  defaultValue={18}
                  maxValue={36}
                  minValue={12}
                  showSteps={true}
                  size="md"
                  step={6}
                  value={textSize}
                  onChange={(e) => setTextSize(Number(e))}
                />
              </div>
            </div>
            <p
              className={`mt-6 text-center font-garamond ${darkMode ? 'text-[#e3c8a0]' : 'text-[#231209]'}`}
            >
              This is some sample text to show the current size.
            </p>
          </CardContent>
        </Card>

        {user && (
          <div className={`flex flex-col items-center gap-4 p-6`}>
            <Button
              className={`h-[50px] w-[226px] rounded-full font-['Bebas_Neue',Helvetica] text-[24px] ${
                darkMode
                  ? 'bg-[#e3c8a0] text-[#231209]'
                  : 'bg-[#271F17] text-[#e3c8a0]'
              }`}
              onClick={handleSaveChanges}
            >
              Save changes
            </Button>

            <Button
              className={`h-[50px] w-[226px] rounded-full bg-[#4e0000] font-['Bebas_Neue',Helvetica] text-[24px] text-[#d8a730]`}
            >
              DELETE ACCOUNT
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
