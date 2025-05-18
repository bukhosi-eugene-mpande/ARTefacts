'use client';

import type { Avatar } from '@/app/actions/avatars/avatars.types';
import type { User } from '@/app/actions/user/user.types';

import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
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

  const { theme, setTheme } = useTheme();

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

  return (
    <div
      className={`text-[#231209]} flex min-h-screen w-full flex-col justify-center space-y-8 bg-[#9F8763] transition-colors duration-500 dark:bg-[#271F17] dark:text-[#e3c8a0]`}
      style={{ fontSize: `${textSize}px` }}
    >
      <div className="relative mx-auto h-[138px] w-[339px] pt-6">
        <Link href="/pages/home">
          <Image
            alt="Artefacts logo"
            className="mx-auto object-contain"
            src="/assets/logo-gold.png"
            width={200} // set an appropriate width
            height={100} // set an appropriate height
          />
        </Link>
      </div>

      {/* Logo and Profile Components */}
      <div className="container mx-auto flex-grow">
        {user ? (
          <div className="flex flex-col">
            <div className="mt-2 flex flex-col items-center justify-center">
              <div
                className={`text-[#231209]} flex h-60 w-60 items-center justify-center rounded-full bg-[#E3C8A0] dark:bg-[#231209] dark:text-[#e3c8a0]`}
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
              className={`text-[#231209]} mt-2 font-garamond font-semibold dark:text-[#e3c8a0]`}
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
              className={`text-[#231209]} mx-auto mt-6 h-fit w-[90%] border-none bg-[#E3C8A0] pb-4 dark:bg-[#231209] dark:text-[#e3c8a0]`}
            >
              <CardContent className="p-0">
                <div className="h-auto w-full">
                  <div
                    className={`text-[#231209]} relative top-0 mb-2 bg-[#E3C8A0] text-2xl text-[24px] dark:bg-[#231209] dark:text-[#e3c8a0]`}
                  >
                    NAME
                  </div>
                  <div className="w-7/8 flex items-center gap-4 rounded-[40px] border-[3px] border-solid border-[#231209] bg-[#9f8763b8] dark:border-[#e3c8a0]">
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
            className={`text-[#231209]} mx-auto w-[90%] border-none bg-[#E3C8A0] p-0 dark:bg-[#231209] dark:text-[#e3c8a0]`}
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
          className={`text-[#231209]} mx-auto mt-6 w-[90%] border-none bg-[#E3C8A0] dark:bg-[#231209] dark:text-[#e3c8a0]`}
        >
          <CardContent className="p-0">
            <div className="mt-2 text-center font-['Bebas_Neue',Helvetica] text-4xl text-[#d8a730]">
              Settings
            </div>

            {/* Theme Toggle */}
            <div className="mt-4 flex flex-row items-center">
              <div
                className={`text-[#231209]} font-['Bebas_Neue',Helvetica] text-2xl dark:text-[#e3c8a0]`}
              >
                Theme mode
              </div>

              <button
                // aria-checked={darkMode}
                aria-label="Toggle dark mode"
                className={`bg-warning} ml-8 flex h-10 w-[83px] items-center rounded-[16px] bg-[#c2c1c1b9] px-1 shadow transition-colors duration-300 dark:bg-[#4b3f37]`}
                role="switch"
                aria-checked
                // onClick={() => setDarkMode(!darkMode)}
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              >
                <div
                  className={`bg-[#251a13]} ml-0 flex h-[29px] w-[29px] items-center justify-center rounded-full transition-all duration-300 dark:ml-[44px] dark:bg-[#d8a730]`}
                >
                  {theme === 'light' ? (
                    <SunIcon className="h-[17px] w-[17px] text-white" />
                  ) : (
                    <MoonIcon className="h-[17px] w-[17px] text-white" />
                  )}
                </div>
              </button>
            </div>

            {/* Text Size Slider */}
            <div className="mt-4 flex flex-col items-center">
              <div
                className={`text-[#231209]} mb-2 mt-1 text-center font-['Bebas_Neue',Helvetica] text-2xl dark:text-[#e3c8a0]`}
              >
                Text Size
              </div>

              <div className="w-full px-4">
                {' '}
                {/* Added padding for better spacing */}
                <Slider
                  aria-label="Text size slider"
                  className="w-full"
                  color="warning"
                  maxValue={36}
                  minValue={12}
                  showSteps={true}
                  step={1}
                  value={textSize}
                  onChange={(value) => setTextSize(value as number)}
                />
              </div>
            </div>
            <p
              className={`text-[#231209]} mt-6 text-center font-garamond dark:text-[#e3c8a0]`}
            >
              This is some sample text to show the current size.
            </p>
          </CardContent>
        </Card>

        {user && (
          <div className={`flex flex-col items-center gap-4 p-6`}>
            <Button
              className={`text-[#e3c8a0]} h-[50px] w-[226px] rounded-full bg-[#271F17] font-['Bebas_Neue',Helvetica] text-xl dark:bg-[#e3c8a0] dark:text-[#231209]`}
              onClick={handleSaveChanges}
            >
              Save changes
            </Button>

            <Button
              className={`h-[50px] w-[226px] rounded-full bg-red-600 font-['Bebas_Neue',Helvetica] text-xl text-[#d8a730] dark:bg-[#d63f3f]`}
            >
              Delete account
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
