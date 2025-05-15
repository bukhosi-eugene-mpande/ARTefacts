import { useState } from 'react';
import { FaChevronLeft, FaChevronRight, FaTimes } from 'react-icons/fa';

interface HowToPlayModalProps {
  showTutorial: boolean;
  setShowTutorial: (value: boolean) => void;
  setShowWelcome: (value: boolean) => void;
  gameStarted: boolean;
}

export default function HowToPlayModal({
  showTutorial,
  setShowTutorial,
  setShowWelcome,
  gameStarted,
}: HowToPlayModalProps) {
  const tutorialSteps = [
    'You will be presented with one question to answer at a time. It may be a multiple choice question or you may need to use your camera to identify an artefact. Read the question carefully.',
    'For multiple choice questions: Identify the correct artefact around you first, then tap the correct answer.',
    "For AR questions: Identify the artefact around you first, then tap the 'Identify artefact' button and point your camera to the artefact you believe is the correct answer, until feedback is given.",
    'Gain ⭐ by identifying the correct artefact as fast as you can!',
  ];

  const [currentStep, setCurrentStep] = useState(0);

  const nextStep = () => {
    if (currentStep < tutorialSteps.length - 1) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  return (
    showTutorial && (
      <div
        className="text-center text-white"
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
      >
        {/* Close button */}
        <button
          aria-label="Close tutorial"
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
            background: 'transparent',
          }}
          onClick={() => {
            setShowTutorial(false);
            if (!gameStarted) {
              setShowWelcome(true);
            }
          }}
        >
          <FaTimes color="white" size={18} />
        </button>

        {/* Title */}
        <h1 className="mb-4 text-2xl font-bold">How to play</h1>

        {/* Step content */}
        <p className="mb-6 font-garamond text-sm">
          {tutorialSteps[currentStep]}
        </p>

        {/* Navigation chevrons */}
        <div className="flex items-center justify-between px-4">
          {/* Left button */}
          <button
            aria-label="Previous step"
            disabled={currentStep <= 0}
            style={{
              background: 'transparent',
              border: 'none',
              cursor: currentStep > 0 ? 'pointer' : 'not-allowed',
            }}
            onClick={prevStep}
          >
            <FaChevronLeft
              color={currentStep > 0 ? 'white' : 'gray'}
              size={14}
            />
          </button>

          {/* Progress dots */}
          <div className="mb-4 flex justify-center space-x-2">
            {tutorialSteps.map((_, i) => (
              <span
                key={i}
                className={`h-2 w-2 rounded-full ${i === currentStep ? 'bg-white' : 'bg-gray-400'}`}
              />
            ))}
          </div>

          {/* Right button */}
          <button
            aria-label="Next step"
            disabled={currentStep >= tutorialSteps.length - 1}
            style={{
              background: 'transparent',
              border: 'none',
              cursor:
                currentStep < tutorialSteps.length - 1
                  ? 'pointer'
                  : 'not-allowed',
            }}
            onClick={nextStep}
          >
            <FaChevronRight
              color={currentStep < tutorialSteps.length - 1 ? 'white' : 'gray'}
              size={14}
            />
          </button>
        </div>
      </div>
    )
  );
}
