"use client";

import React, { useState } from "react";
import { PencilIcon, UserIcon } from "@heroicons/react/24/outline";
import { MoonIcon, SunIcon} from "@heroicons/react/24/solid";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "default" | "link";
};

const Button: React.FC<ButtonProps> = ({ className = "", variant = "default", children, ...props }) => {
  const base = "inline-flex items-center justify-center font-medium";
  const variants: Record<"default" | "link", string> = {
    default: "bg-[#231209] text-white",
    link: "bg-transparent underline",
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

const Card: React.FC<CardProps> = ({ className = "", children }) => (
  <div className={`rounded-lg shadow p-4 ${className}`}>{children}</div>
);

const CardContent: React.FC<CardProps> = ({ className = "", children }) => (
  <div className={`p-4 ${className}`}>{children}</div>
);

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const Input: React.FC<InputProps> = ({ className = "", ...props }) => (
  <input className={`px-4 py-2 border rounded text-black ${className}`} {...props} />
);

type SeparatorProps = {
  className?: string;
};

const Separator: React.FC<SeparatorProps> = ({ className = "" }) => (
  <div className={`bg-gray-400 h-[4px] rounded-full ${className}`} />
);

export default function ProfilePage() {
  const [textSize, setTextSize] = useState(16); // Default text size
  const [isEditingName, setIsEditingName] = useState(false);

  const [name, setName] = useState("Your Name");

  const [tempName, setTempName] = useState(name); // temporary value while editing

  const handleSaveChanges = () => {
    setName(tempName);           // commit the new name
    setIsEditingName(false);     // exit editing mode
    // Optionally show a toast or alert here
  };

  const [darkMode, setDarkMode] = useState(false);

  return (
    <div
      className={`w-full min-h-screen space-y-8 flex flex-col justify-center mt-8 pt-8 transition-colors duration-500 
        ${darkMode ? "bg-[#271F17] text-[#e3c8a0]" : "bg-[#e3c8a0] text-[#231209]"}`}
      style={{ fontSize: `${textSize}px` }}
    >

      <div className="w-[339px] h-[138px] mx-auto mt-20 pt-16 relative">
        <img src="/assets/logo-gold.png" alt="Artefacts logo" className="object-contain mx-auto" />
      </div>

      {/* Logo and Profile Components */}
      <div className="container relative mx-auto flex-grow">
        <div className="relative flex flex-col items-center justify-center mt-2">
          <div className="relative">
            <img className="w-[294px] h-[294px] object-cover" alt="Ellipse" src="/profilebg.png" />
            <div className={`absolute w-60 h-60 top-[27px] left-[27px] rounded-full flex items-center justify-center ${darkMode ? "bg-[#231209] text-[#e3c8a0]" : "bg-[#cecec1] text-[#231209]"}`}>
            <UserIcon className={`w-[190px] h-auto ${darkMode ? "text-[#e3c8a0]" : "text-[#231209]"}`} />
            </div>
          </div>
          <Button variant="link" 
          className={`mt-2 font-['Inter',Helvetica] font-semibold text-[#231209] text-[15px] ${darkMode ? "text-[#e3c8a0]" : "text-[#231209]"}`}>
            Edit Image
          </Button>
        </div>

        <Card 
        className={`w-[90%] h-[15%] mx-auto mt-6 border-none pb-4 ${darkMode ? "bg-[#231209] text-[#e3c8a0]" : "bg-[#cecec1] text-[#231209]"}`}>
          <CardContent className="p-0">
            <div className="absolute left-2% w-[80%] h-auto mx-auto">
              <div 
              className={`relative top-0 font-['Inter',Helvetica] font-semibold text-xl ${darkMode ? "bg-[#231209] text-[#e3c8a0]" : "bg-[#cecec1] text-[#231209]"}`}>
                NAME
              </div>
              <div className="relative w-[95%] h-[49px] top-[23px] rounded-[40px] border-[3px] border-solid border-[#231209] flex items-center">
              <Input
                className={`w-full h-[45px] rounded-[40px] bg-transparent 
                  ${darkMode ? 'bg-[#231209] text-[#e3c8a0]' : 'bg-[#cecec1] text-[#231209]'}`}
                value={isEditingName ? tempName : name}
                onChange={(e) => setTempName(e.target.value)}
                readOnly={!isEditingName}
              />


                <button
                  type="button"
                  onClick={() => {
                    if (!isEditingName) {
                      setTempName(name); // preload existing name
                      setIsEditingName(true);
                    }
                  }}
                  className="absolute right-[8px] w-[34px] h-[33px] bg-[#d8a730] rounded-full flex items-center justify-center"
                >
                  <PencilIcon className="w-4 h-4" />
                </button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className={`w-[90%] mx-auto mt-6 border-none ${darkMode ? 'bg-[#231209] text-[#e3c8a0]' : 'bg-[#cecec1] text-[#231209]'}`}>
        <CardContent className="p-0">
          <div className="text-center font-['Bebas_Neue',Helvetica] text-[#d8a730] text-4xl mt-2">
            Settings
          </div>

          {/* Theme Toggle */}
          <div className="flex items-center flex-col mt-4">
            <div className={`font-['Bebas_Neue',Helvetica] text-2xl p-4 ${darkMode ? 'text-[#e3c8a0]' : 'text-[#231209]'}`}>
              Theme mode
            </div>

            <div
              onClick={() => setDarkMode(!darkMode)}
              className={`w-[83px] h-10 rounded-[16px] shadow flex items-center px-1 cursor-pointer transition-colors duration-300 
              ${darkMode ? 'bg-[#4b3f37]' : 'bg-[#504c47]'}`}
            >
              <div
                className={`w-[29px] h-[29px] rounded-full flex items-center justify-center transition-all duration-300 
                ${darkMode ? "ml-[44px] bg-[#d8a730]" : "ml-0 bg-[#251a13]"}`}
              >
                {darkMode ? (
                  <SunIcon className="w-[17px] h-[17px] text-white" />
                ) : (
                  <MoonIcon className="w-[17px] h-[17px] text-white" />
                )}
              </div>
            </div>
          </div>

          {/* Text Size Slider */}
          <div className="p-4">
            <div className={`font-['Bebas_Neue',Helvetica] text-2xl mb-2 text-center ${darkMode ? 'text-[#e3c8a0]' : 'text-[#231209]'}`}>
              Text Size
            </div>

            <div className="relative w-[189px] h-5 mt-2 mx-auto">
              <div className="absolute w-full h-[9px] bg-[#504c47] rounded-full top-1.5 left-0" />
              <input
                type="range"
                min="12"
                max="36"
                value={textSize}
                onChange={(e) => setTextSize(Number(e.target.value))}
                className="absolute w-full h-5 appearance-none bg-transparent z-10"
                style={{ WebkitAppearance: "none" }}
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

            <p className={`mt-6 text-center ${darkMode ? 'text-[#e3c8a0]' : 'text-[#231209]'}`}>
              This is some sample text to show the current size.
            </p>
          </div>
        </CardContent>
      </Card>

      <div
        className={`flex flex-col items-center gap-4 p-6 ${
          darkMode ? "bg-[#271F17] text-[#231209]" : "bg-[#e3c8a0] text-[#e3c8a0]"
        }`}
      >
        <Button
          onClick={handleSaveChanges}
          className={`w-[226px] h-[50px] rounded-[14px] font-['Bebas_Neue',Helvetica] text-[32px] ${
            darkMode ? "bg-[#e3c8a0] text-[#231209]" : "bg-[#271F17] text-[#e3c8a0]"
          }`}
        >
          Save changes
        </Button>

        <Button
          className={`w-[226px] h-[50px] bg-[#4e0000] rounded-[14px] text-[#d8a730] font-['Bebas_Neue',Helvetica] text-[32px]`}
        >
          DELETE ACCOUNT
        </Button>
      </div>

      </div>
    </div>
  );
}
