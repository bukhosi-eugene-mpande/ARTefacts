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
    <ul key="step-0" style={{ textAlign: 'left', paddingLeft: '1.2em' }}>
      <li>
        &#8226; You will be presented with one question to answer at a time.
      </li>
      <li>
        &#8226; It may be a <b>multiple choice question</b> or you may need to
        use your camera to <u>identify an ARTefact</u>.
      </li>
      <li>&#8226; Read the question carefully.</li>
    </ul>,
    <ul key="step-1" style={{ textAlign: 'left', paddingLeft: '1.2em' }}>
      <li>
        &#8226; For <b>multiple choice questions</b>: Identify the correct
        artefact around you first.
      </li>
      <li>Then tap the correct answer.</li>
    </ul>,
    <ul key="step-2" style={{ textAlign: 'left', paddingLeft: '1.2em' }}>
      <li>
        &#8226; For <b>AR questions</b>: Identify the artefact around you first.
      </li>
      <li>
        Then tap the <u>&apos;Identify artefact&apos;</u> button and point your
        camera to the artefact you believe is the correct answer.
      </li>
      <li>Wait until feedback is given.</li>
    </ul>,
    <ul key="step-3" style={{ textAlign: 'left', paddingLeft: '1.2em' }}>
      <li>
        &#8226; Gain <b>⭐</b> by identifying the correct artefact as fast as
        you can!
      </li>
      <li>
        &#8226; you will receive <b>2⭐</b> for each correct answer.
      </li>
    </ul>,
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
        className="text-center text-black"
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 20,
          backgroundColor: '#E3C8A0',
          padding: '2rem',
          borderRadius: '15px',
          width: '90%',
          height: '70%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
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
            color: 'gray',
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
          <FaTimes color="grey" size={18} />
        </button>

        {/* Title */}
        <h1 className="mb-4 text-4xl">How to play</h1>

        {/* Step content */}
        <p className="mb-6 font-garamond text-[20px]">
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
              color={currentStep > 0 ? 'black' : 'gray'}
              size={35}
            />
          </button>

          {/* Progress dots */}
          <div className="mb-4 flex justify-center space-x-2">
            {tutorialSteps.map((_, i) => (
              <span
                key={i}
                className={`h-2 w-2 rounded-full ${i === currentStep ? 'bg-black' : 'bg-gray-400'}`}
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
              color={currentStep < tutorialSteps.length - 1 ? 'black' : 'gray'}
              size={35}
            />
          </button>
        </div>
      </div>
    )
  );
}
