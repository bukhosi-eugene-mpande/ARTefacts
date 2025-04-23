'use client';

import React, { useState } from 'react';
import { PencilIcon, UserIcon } from '@heroicons/react/24/outline';
import { MoonIcon, SunIcon } from '@heroicons/react/24/solid';

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

const Input: React.FC<InputProps> = ({ className = '', ...props }) => (
  <input
    className={`rounded border px-4 py-2 text-black ${className}`}
    {...props}
  />
);

type SeparatorProps = {
  className?: string;
};

const Separator: React.FC<SeparatorProps> = ({ className = '' }) => (
  <div className={`h-[4px] rounded-full bg-gray-400 ${className}`} />
);

export default function ProfilePage() {
  const [textSize, setTextSize] = useState(16); // Default text size
  const [isEditingName, setIsEditingName] = useState(false);

  const [name, setName] = useState('Your Name');

  const [tempName, setTempName] = useState(name); // temporary value while editing

  const handleSaveChanges = () => {
    setName(tempName); // commit the new name
    setIsEditingName(false); // exit editing mode
    // Optionally show a toast or alert here
  };

  const [darkMode, setDarkMode] = useState(false);

  return (
    <div
      className={`flex min-h-screen w-full flex-col justify-center space-y-8 transition-colors duration-500 ${darkMode ? 'bg-[#271F17] text-[#e3c8a0]' : 'bg-[#e3c8a0] text-[#231209]'}`}
      style={{ fontSize: `${textSize}px` }}
    >
      <div className="relative mx-auto pt-6 h-[138px] w-[339px]">
        <img
          alt="Artefacts logo"
          className="mx-auto object-contain"
          src="/assets/logo-gold.png"
        />
      </div>

      {/* Logo and Profile Components */}
      <div className="container relative mx-auto flex-grow">
        <div className="relative mt-2 flex flex-col items-center justify-center">
          <div className="relative">
            <img
              alt="Ellipse"
              className="h-[294px] w-[294px] object-cover"
              src="/profilebg.png"
            />
            <div
              className={`absolute left-[27px] top-[27px] flex h-60 w-60 items-center justify-center rounded-full ${darkMode ? 'bg-[#231209] text-[#e3c8a0]' : 'bg-[#cecec1] text-[#231209]'}`}
            >
              <UserIcon
                className={`h-auto w-[190px] ${darkMode ? 'text-[#e3c8a0]' : 'text-[#231209]'}`}
              />
            </div>
          </div>
          <Button
            className={`mt-2 font-['Inter',Helvetica] text-[15px] font-semibold text-[#231209] ${darkMode ? 'text-[#e3c8a0]' : 'text-[#231209]'}`}
            variant="link"
          >
            Edit Image
          </Button>
        </div>

        <Card
          className={`mx-auto mt-6 h-[15%] w-[90%] border-none pb-4 ${darkMode ? 'bg-[#231209] text-[#e3c8a0]' : 'bg-[#cecec1] text-[#231209]'}`}
        >
          <CardContent className="p-0">
            <div className="left-2% absolute mx-auto h-auto w-[80%]">
              <div
                className={`relative top-0 font-['Inter',Helvetica] text-xl font-semibold ${darkMode ? 'bg-[#231209] text-[#e3c8a0]' : 'bg-[#cecec1] text-[#231209]'}`}
              >
                NAME
              </div>
              <div className="relative top-[23px] flex h-[49px] w-[95%] items-center rounded-[40px] border-[3px] border-solid border-[#231209]">
                <Input
                  className={`h-[45px] w-full rounded-[40px] bg-transparent ${darkMode ? 'bg-[#231209] text-[#e3c8a0]' : 'bg-[#cecec1] text-[#231209]'}`}
                  readOnly={!isEditingName}
                  value={isEditingName ? tempName : name}
                  onChange={(e) => setTempName(e.target.value)}
                />

                <button
                  className="absolute right-[8px] flex h-[33px] w-[34px] items-center justify-center rounded-full bg-[#d8a730]"
                  type="button"
                  onClick={() => {
                    if (!isEditingName) {
                      setTempName(name); // preload existing name
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

        <Card
          className={`mx-auto mt-6 w-[90%] border-none ${darkMode ? 'bg-[#231209] text-[#e3c8a0]' : 'bg-[#cecec1] text-[#231209]'}`}
        >
          <CardContent className="p-0">
            <div className="mt-2 text-center font-['Bebas_Neue',Helvetica] text-4xl text-[#d8a730]">
              Settings
            </div>

            {/* Theme Toggle */}
            <div className="mt-4 flex flex-col items-center">
              <div
                className={`p-4 font-['Bebas_Neue',Helvetica] text-2xl ${darkMode ? 'text-[#e3c8a0]' : 'text-[#231209]'}`}
              >
                Theme mode
              </div>

              <div
                className={`flex h-10 w-[83px] cursor-pointer items-center rounded-[16px] px-1 shadow transition-colors duration-300 ${darkMode ? 'bg-[#4b3f37]' : 'bg-[#504c47]'}`}
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
              </div>
            </div>

            {/* Text Size Slider */}
            <div className="p-4">
              <div
                className={`mb-2 text-center font-['Bebas_Neue',Helvetica] text-2xl ${darkMode ? 'text-[#e3c8a0]' : 'text-[#231209]'}`}
              >
                Text Size
              </div>

              <div className="relative mx-auto mt-2 h-5 w-[189px]">
                <div className="absolute left-0 top-1.5 h-[9px] w-full rounded-full bg-[#504c47]" />
                <input
                  className="absolute z-10 h-5 w-full appearance-none bg-transparent"
                  max="36"
                  min="12"
                  style={{ WebkitAppearance: 'none' }}
                  type="range"
                  value={textSize}
                  onChange={(e) => setTextSize(Number(e.target.value))}
                />
                <style jsx>{`
                  input[type='range']::-webkit-slider-thumb {
                    -webkit-appearance: none;
                    appearance: none;
                    height: 20px;
                    width: 20px;
                    border-radius: 10px;
                    background: #251a13;
                    cursor: pointer;
                    margin-top: -6px;
                    position: relative;
                    z-index: 10;
                  }

                  input[type='range']::-moz-range-thumb {
                    height: 20px;
                    width: 20px;
                    border-radius: 10px;
                    background: #251a13;
                    cursor: pointer;
                  }
                `}</style>
              </div>

              <p
                className={`mt-6 text-center ${darkMode ? 'text-[#e3c8a0]' : 'text-[#231209]'}`}
              >
                This is some sample text to show the current size.
              </p>
            </div>
          </CardContent>
        </Card>

        <div
          className={`flex flex-col items-center gap-4 p-6 ${darkMode
            ? 'bg-[#271F17] text-[#231209]'
            : 'bg-[#e3c8a0] text-[#e3c8a0]'
            }`}
        >
          <Button
            className={`h-[50px] w-[226px] rounded-[14px] font-['Bebas_Neue',Helvetica] text-[32px] ${darkMode
              ? 'bg-[#e3c8a0] text-[#231209]'
              : 'bg-[#271F17] text-[#e3c8a0]'
              }`}
            onClick={handleSaveChanges}
          >
            Save changes
          </Button>

          <Button
            className={`h-[50px] w-[226px] rounded-[14px] bg-[#4e0000] font-['Bebas_Neue',Helvetica] text-[32px] text-[#d8a730]`}
          >
            DELETE ACCOUNT
          </Button>
        </div>
      </div>
    </div>
  );
}
