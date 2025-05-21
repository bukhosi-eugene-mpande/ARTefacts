import React from 'react';

type WelcomeCardProps = {
  userName: string;
  onStartChallenge?: () => void;
};

const WelcomeCard: React.FC<WelcomeCardProps> = ({
  userName,
  onStartChallenge,
}) => {
  return (
    <div className="welcome-card w-full max-w-2xl transform rounded-2xl bg-[#DDA15E] p-8 text-center shadow-[0_25px_60px_rgba(0,0,0,0.45)] transition-all duration-300 hover:shadow-[0_35px_70px_rgba(0,0,0,0.6)] md:p-10">
      <h2 className="mb-6 text-2xl font-bold text-[#3C2A21] md:text-4xl lg:text-5xl">
        WELCOME {userName.toUpperCase()}
      </h2>
      <p className="mb-4 text-base text-[#3C2A21] md:text-lg lg:text-xl">
        Your museum adventure awaits!
      </p>
      <p className="mb-6 text-base text-[#3C2A21] md:text-lg lg:text-xl">
        Venture deep into the museum&apos;s mysteries, each question a step
        closer to unlocking secrets lost in time.
      </p>
      <p className="mb-8 text-lg font-bold text-[#3C2A21] md:text-xl lg:text-2xl">
        Are you ready for a challenge?
      </p>
      <button
        onClick={onStartChallenge}
        className="transform rounded-full bg-[#BC6D25] px-8 py-3 text-lg font-semibold text-white shadow-lg transition-all duration-300 hover:scale-[1.01] hover:bg-[#A65D1E] hover:shadow-xl md:text-xl"
      >
        Start Challenge
      </button>
    </div>
  );
};

export default WelcomeCard;
