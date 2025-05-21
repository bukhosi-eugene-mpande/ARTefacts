import React from 'react';
import { useRouter } from 'next/navigation';

type WelcomeCardProps = {
  userName: string;
};

const WelcomeCard: React.FC<WelcomeCardProps> = ({ userName }) => {
  const router = useRouter();

  const handleStartChallenge = () => {
    router.push('/pages/camera');
    localStorage.setItem('gameMode', 'true');
  };

  return (
    <div className="welcome-card w-full max-w-[95%] transform rounded-2xl font-garamond bg-[#DDA15E] p-6 px-8 text-center shadow-[0_25px_60px_rgba(0,0,0,0.45)] transition-all duration-300 hover:shadow-[0_35px_70px_rgba(0,0,0,0.6)] sm:max-w-[85%] sm:p-8 md:max-w-[75%] md:p-10 lg:max-w-4xl">
      <h2 className="mb-4 text-xl font-bold font-sans text-[#3C2A21] sm:mb-6 sm:text-3xl md:text-3xl lg:text-4xl xl:text-5xl">
        WELCOME {userName.toUpperCase()}
      </h2>
      <p className="mb-3 text-sm text-[#3C2A21] sm:mb-4 sm:text-base md:text-lg lg:text-xl">
        Your museum adventure awaits!
      </p>
      <p className="mb-4 text-sm text-[#3C2A21] sm:mb-6 sm:text-base md:text-lg lg:text-xl">
        Venture deep into the museum&apos;s mysteries, each question a step
        closer to unlocking secrets lost in time.
      </p>
      <p className="mb-6 text-base font-extrabold text-[#3C2A21] sm:mb-8 sm:text-lg md:text-xl lg:text-2xl">
        Are you ready for a challenge?
      </p>
      <button
        className="transform rounded-full bg-[#BC6D25] px-6 py-2 font-sans text-base font-semibold text-white shadow-lg transition-all duration-300 hover:bg-[#4A642D] hover:shadow-xl sm:px-8 sm:py-3 sm:text-lg md:text-xl"
        onClick={handleStartChallenge}
      >
        Start Challenge
      </button>
    </div>
  );
};

export default WelcomeCard;
