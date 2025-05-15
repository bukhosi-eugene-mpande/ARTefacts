import { useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { FaTimes } from 'react-icons/fa'; // this is the ✖ close icon

interface HowToPlayModalProps {
  showTutorial: boolean;
  setShowTutorial: (value: boolean) => void;
  setShowWelcome: (value: boolean) => void;
  gameStarted: boolean;
}

export default function HowToPlayModal({ showTutorial, setShowTutorial, setShowWelcome, gameStarted }: HowToPlayModalProps) {
  const tutorialSteps = [
    "You will be presented with one question to answer at a time. It may be a multiple choice question or you may need to use your camera to identify an artefact. Read the question carefully.",
    "For multiple choice questions: Identify the correct artefact around you first, then tap the correct answer.",
    "For AR questions: Identify the artefact around you first, then tap the 'Identify artefact' button and point your camera to the artefact you believe is the correct answer, until feedback is given.",
    "Gain ⭐ by identifying the correct artefact as fast as you can!"
  ];

  const [currentStep, setCurrentStep] = useState(0);

  const nextStep = () => {
    if (currentStep < tutorialSteps.length - 1) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  return showTutorial && (
    <div
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 20,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        padding: '2rem',
        borderRadius: '15px',
        width: '90%',
        maxWidth: '400px',
      }}
      className="text-center text-white"
    >
      {/* Close button */}
      <button
        style={{
          position: 'absolute',
          top: '5%',
          left: '85%',
          zIndex: 20,
          border: 'none',
          borderRadius: '50%',
          padding: '0.5rem 0.7rem',
          color: 'white',
          fontSize: '1.2rem',
        }}
        onClick={() => {
          setShowTutorial(false);
          if (!gameStarted) {
            setShowWelcome(true);
          }
        }}
      >
        <FaTimes size={18} color="white" />
      </button>

      {/* Title */}
      <h1 className="text-2xl font-bold mb-4">How to play</h1>

      {/* Step content */}
      <p className="font-garamond text-sm mb-6">
        {tutorialSteps[currentStep]}
      </p>



      {/* Navigation chevrons */}
      <div className="flex justify-between px-4">
        <div
          onClick={prevStep}
          style={{ cursor: currentStep > 0 ? 'pointer' : 'not-allowed' }}
        >
          <FaChevronLeft size={14} color={currentStep > 0 ? "white" : "gray"} />
        </div>

        {/* Progress Dots */}
        <div className="flex justify-center space-x-2 mb-4">
          {tutorialSteps.map((_, i) => (
            <span
              key={i}
              className={`h-2 w-2 rounded-full ${i === currentStep ? 'bg-white' : 'bg-gray-400'}`}
            ></span>
          ))}
        </div>

        <div
          onClick={nextStep}
          style={{ cursor: currentStep < tutorialSteps.length - 1 ? 'pointer' : 'not-allowed' }}
        >
          <FaChevronRight size={14} color={currentStep < tutorialSteps.length - 1 ? "white" : "gray"} />
        </div>
      </div>
    </div>
  );
}
