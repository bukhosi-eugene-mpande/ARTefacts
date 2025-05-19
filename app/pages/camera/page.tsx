'use client';

import type {
  CombinedQuestion,
  Mcq,
  Blank,
  Riddle,
} from '@/app/actions/questions/questions.types';

import { useEffect, useRef, useState } from 'react';
import * as tmImage from '@teachablemachine/image';
import Image from 'next/image';
import { StarIcon } from '@heroicons/react/24/solid';
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Spinner,
} from '@heroui/react';
import { Select, SelectItem } from '@heroui/select';

import { getAllQuestions } from '@/app/actions/questions/questions';
import { updatePoints } from '@/app/actions/points/points';
import Logo from '@/public/assets/logo-gold.png';
import HowToPlayModal from '@/components/HowToPlayModal';
import { getArtefact } from '@/app/actions/artefacts/artefacts';
import { Artefact } from '@/app/actions/artefacts/artefacts.types';
import ExpandableCard from '@/components/artefactInfo';

export default function CameraLayout() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [model, setModel] = useState<tmImage.CustomMobileNet | null>(null);

  const [seconds, setSeconds] = useState(180);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const [gameStarted, setGameStarted] = useState(false);
  const [officialGame, setOfficialGame] = useState(true);

  const [questions, setQuestions] = useState<CombinedQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  // MCQ selected option id
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  const [questionTimedOut, setQuestionTimedOut] = useState(false);

  // Fill-in-the-blank answers
  const [blankAnswers, setBlankAnswers] = useState<{ [key: string]: string }>(
    {}
  );

  const [Artefactinfo, setArtefactInfo] = useState<Artefact>({} as Artefact);

  // Riddle scan status: 'pending', 'success', 'fail'
  type ScanStatus = 'pending' | 'ready' | 'success' | 'fail';
  const [riddleScanStatus, setRiddleScanStatus] =
    useState<ScanStatus>('pending');

  // Detected artefact className string
  const [detectedArtefact, setDetectedArtefact] = useState<string | null>(null);
  const [gameMode, setGameMode] = useState<boolean>(true);

  const [artefactName, setArtefactName] = useState<string | null>(null);
  const [loadingArtefactInfo, setLoadingArtefactInfo] = useState(false);

  // Score
  const [score, setScore] = useState(0);

  const [quizCompleted, setQuizCompleted] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);

  const [countdownSeconds, setCountdownSeconds] = useState(180);
  const [showCountdown, setShowCountdown] = useState(false);

  const [showTutorial, setShowTutorial] = useState(false);

  const [showHintModal, setShowHintModal] = useState(false);
  const [hintUsed, setHintUsed] = useState(false);
  const [answerSubmitted, setAnswerSubmitted] = useState(false);

  const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean | null>(null);

  // Control scanning loop for riddles
  const scanningRef = useRef(false);

  useEffect(() => {
    const isGame = localStorage.getItem('gameMode') === 'true';

    setGameMode(isGame);
  }, []);

  // Timer effect for MCQ and Blank questions only (stop timer on riddles since scanning controls game end)
  useEffect(() => {
    if (gameStarted && isRunning && questions.length > 0) {
      intervalRef.current = setInterval(() => {
        setSeconds((prev) => {
          const newSec = prev - 1;

          if (newSec <= 0) {
            clearInterval(intervalRef.current!);
            setIsRunning(false);
            setQuestionTimedOut(true); // prevent inputs and show "Next"
            setAnswerSubmitted(true);
            setShowResult(true); // show the next/finish button
          }

          return newSec;
        });
      }, 1000);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [gameStarted, isRunning, currentQuestionIndex, questions]);

  useEffect(() => {
    if (!detectedArtefact) {
      setArtefactName(null);

      return;
    }

    const fetchArtefactName = async () => {
      setLoadingArtefactInfo(true);

      try {
        const id = detectedArtefact;

        console.log('Detected artefact ID:', id);
        const info = await getArtefact(id);

        setArtefactName(info.artefact.ArtworkTitle || 'Unknown Artefact');
      } catch (error) {
        console.error('Error fetching artefact info:', error);
        setArtefactName('Unknown Artefact');
      } finally {
        setLoadingArtefactInfo(false);
      }
    };

    fetchArtefactName();
  }, [detectedArtefact]);

  // Check if user has completed official game before
  useEffect(() => {
    const hasPlayed = localStorage.getItem('CompletedGame') === 'true';

    setOfficialGame(!hasPlayed);
  }, []);

  // Init camera
  useEffect(() => {
    const initCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'environment' },
          audio: false,
        });

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
        }
      } catch (error) {
        console.error('Error accessing the camera:', error);
      }
    };

    initCamera();
  }, []);

  // Load ML model
  useEffect(() => {
    const loadModel = async () => {
      const modelURL = '/model/model.json';
      const metadataURL = '/model/metadata.json';
      const loadedModel = await tmImage.load(modelURL, metadataURL);

      setModel(loadedModel);
    };

    loadModel();
  }, []);

  useEffect(() => {
    if (model && videoRef.current && scanningRef.current === false) {
      if (gameMode === false) {
        scanningRef.current = true;
        continuousScan(); // <-- start scanning
      }
    }
  }, [model, gameMode]);

  // Format timer as MM:SS
  const formatTime = (totalSeconds: number): string => {
    const mins = String(Math.floor(totalSeconds / 60)).padStart(2, '0');
    const secs = String(totalSeconds % 60).padStart(2, '0');

    return `${mins}:${secs}`;
  };

  // Start game: fetch questions and reset state
  const handleStartGame = async () => {
    const data = await getAllQuestions();

    console.log('Fetched questions:', data);

    // Take one question from each type, if available
    const mcqQuestion = data.mcqs.length > 0 ? data.mcqs[0] : null;
    const blankQuestion = data.blanks.length > 0 ? data.blanks[0] : null;
    const riddleQuestion = data.riddles.length > 0 ? data.riddles[0] : null;

    const combinedQuestions: CombinedQuestion[] = [];

    if (mcqQuestion) combinedQuestions.push({ ...mcqQuestion, type: 'mcq' });
    if (blankQuestion)
      combinedQuestions.push({ ...blankQuestion, type: 'blank' });
    if (riddleQuestion)
      combinedQuestions.push({ ...riddleQuestion, type: 'riddle' });

    setQuestions(combinedQuestions);
    setIsRunning(true);
    setGameStarted(true);
    setScore(0);
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setBlankAnswers({});
    setRiddleScanStatus('pending');
    setDetectedArtefact(null);
    setQuizCompleted(false);
    setShowResult(false);
    setSeconds(180);
    setShowWelcome(false);
    setShowTutorial(false);
  };

  const handleShowTutorial = () => {
    setShowTutorial(true);
    setShowWelcome(false);
  };

  // Handle MCQ option select
  const handleOptionSelect = (id: number) => {
    setSelectedOption(id);
    setShowResult(true);
  };

  // Handle blank input change
  const handleBlankChange = (
    field: 'answerOne' | 'answerTwo',
    value: string
  ) => {
    setBlankAnswers((prev) => ({ ...prev, [field]: value }));
    // Show submit button if both filled
    if (
      value.trim() &&
      (field === 'answerOne'
        ? blankAnswers['answerTwo']?.trim()
        : blankAnswers['answerOne']?.trim())
    ) {
      setShowResult(true);
    } else {
      setShowResult(false);
    }
  };

  // Continuous scanning for riddles
  const continuousScan = async () => {
    if (!model || !videoRef.current || scanningRef.current === false) {
      console.log('Scanning stopped');

      return;
    }
    console.log('Scanning...');
    const prediction = await model.predict(videoRef.current);

    const bestPrediction = prediction.reduce(
      (best, current) =>
        current.probability > best.probability ? current : best,
      { className: '', probability: 0 }
    );

    if (bestPrediction.probability >= 0.9) {
      setDetectedArtefact(bestPrediction.className);
      console.log('detected artefact:', bestPrediction.className);
      scanningRef.current = false; // pause scanning to show info

      if (gameMode) {
        setRiddleScanStatus('ready'); // new status
      } else {
        const data = await getArtefact(bestPrediction.className);

        setArtefactInfo(data.artefact);
      }
    } else {
      setRiddleScanStatus('pending');
    }


    // Always request next scan if scanning is still enabled
    if (scanningRef.current) {
      requestAnimationFrame(continuousScan);
    }
  };

  // Start/stop scanning based on current question and game state
  useEffect(() => {
    if (
      gameStarted &&
      questions.length > 0 &&
      questions[currentQuestionIndex]?.type === 'riddle'
    ) {
      scanningRef.current = true;
      continuousScan();
    } else {
      scanningRef.current = false;
    }
  }, [gameStarted, currentQuestionIndex, questions]);

  // Submit answer for MCQ and Blank (riddle auto handled by scanning)
  const handleSubmit = () => {
    if (questions.length === 0) return;

    const current = questions[currentQuestionIndex];
    let isCorrect = false;

    if (current.type === 'mcq') {
      const mcq = current as Mcq;

      isCorrect = selectedOption === mcq.correctOptionId;
    } else if (current.type === 'blank') {
      const blank = current as Blank;
      const isAnswerOneCorrect =
        (blankAnswers['answerOne'] || '').toLowerCase().trim() ===
        blank.answerOne.toLowerCase().trim();
      const isAnswerTwoCorrect =
        (blankAnswers['answerTwo'] || '').toLowerCase().trim() ===
        blank.answerTwo.toLowerCase().trim();

      isCorrect = isAnswerOneCorrect && isAnswerTwoCorrect;
    }

    if (isCorrect) {
      setScore((prev) => prev + (hintUsed ? 1 : 2));
    }

    setIsAnswerCorrect(isCorrect); // ✅ this stores it
    setAnswerSubmitted(true);
    setIsRunning(false);
    setHintUsed(false); // reset
  };

  const handleNextQuestion = () => {
    const nextIndex = currentQuestionIndex + 1;

    if (nextIndex < questions.length) {
      setCurrentQuestionIndex(nextIndex);
      setSelectedOption(null);
      setBlankAnswers({});
      setRiddleScanStatus('pending');
      setDetectedArtefact(null);
      setQuestionTimedOut(false);
      setAnswerSubmitted(false);
      setShowResult(false);
      setIsAnswerCorrect(null);
      setSeconds(180);
      setIsRunning(true);
    } else {
      handleGameEnd();
    }
  };

  const handleGameEnd = () => {
    if (officialGame) {
      const accessToken = localStorage.getItem('accessToken');

      if (accessToken) updatePoints(accessToken, score);
      localStorage.setItem('CompletedGame', 'true');
    }
    setQuizCompleted(true);
    setAnswerSubmitted(false);
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setGameStarted(false);
    setIsRunning(false);
    setSeconds(180);
  };

  // Keyboard accessibility for MCQ buttons
  const handleKeyDown = (e: React.KeyboardEvent, id: number) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleOptionSelect(id);
    }
  };

  // Shortcut to current question
  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div
      className="flex flex-col items-center justify-center"
      style={{
        position: 'relative',
        width: '100vw',
        height: '95vh',
        overflow: 'hidden',
        backgroundColor: 'black',
      }}
    >
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
      />

      {gameMode ? (
        <>
          <div className="flex flex-col gap-2">
            <Image
              alt="Top right logo"
              height={40}
              src="/Logo-512.png"
              style={{
                position: 'absolute',
                top: '2%',
                right: '4%',
                zIndex: 20,
                objectFit: 'cover',
                borderRadius: '50%',
              }}
              width={40}
            />
            <div className="absolute right-4 top-14 text-4xl text-white">
              {formatTime(seconds)}
            </div>
            <div className="absolute right-4 top-24 flex flex-row items-center justify-center">
              <StarIcon className="h-10 w-10 text-yellow-500" />
              <p className="text-4xl text-white">:{score}</p>
            </div>
          </div>

          {!gameStarted && showWelcome && !quizCompleted && (
            <>
              <div
                className="text-center text-2xl text-white"
                style={{
                  width: '80%',
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  zIndex: 20,
                  backgroundColor: 'rgba(0, 0, 0, 0.5)',
                  padding: '2rem',
                  borderRadius: '15px',
                }}
              >
                Welcome to
                <br />
                <Image alt="Logo" src={Logo} />
                Treasure Hunt
              </div>
              <div className="absolute bottom-48 left-28 flex flex-row gap-8">
                <button
                  aria-label="Start the game"
                  className="items-center justify-center"
                  style={{
                    transform: 'translateX(-50%)',
                    zIndex: 20,
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    padding: '1rem',
                    borderRadius: '15px',
                    opacity: 0,
                    animation: 'fadeIn 1s ease-in-out 1s forwards',
                    cursor: 'pointer',
                    color: 'white',
                    width: '140px',
                    height: '75px',
                    fontSize: '20px',
                  }}
                  onClick={handleStartGame}
                >
                  Start
                </button>

                <button
                  aria-label="Show how to play instructions"
                  style={{
                    transform: 'translateX(-50%)',
                    zIndex: 20,
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    padding: '1rem',
                    borderRadius: '15px',
                    opacity: 0,
                    animation: 'fadeIn 1s ease-in-out 1s forwards',
                    cursor: 'pointer',
                    color: 'white',
                    width: '140px',
                    height: '75px',
                    fontSize: '20px',
                  }}
                  onClick={handleShowTutorial}
                >
                  How to play
                </button>
              </div>
            </>
          )}

          {gameStarted && !quizCompleted && currentQuestion && (
            <div className="absolute bottom-52 flex flex-col items-center justify-center px-8">
              <div className="flex w-4/5 flex-col items-center justify-center rounded-xl bg-gray-400 bg-opacity-50 p-10">
                <h1 className="text-4xl text-gray-800">
                  Question {currentQuestionIndex + 1}
                </h1>

                {/* MCQ */}
                {currentQuestion.type === 'mcq' && (
                  <>
                    <h2 className="text-center font-garamond">
                      {(currentQuestion as Mcq).question}
                    </h2>
                    <ul className="flex flex-row flex-wrap justify-center gap-4 p-10">
                      {(currentQuestion as Mcq).options.map((option) => (
                        <li key={option.id}>
                          <button
                            className={`w-40 rounded-full px-4 py-2 transition-colors ${selectedOption === option.id
                              ? 'bg-blue-600'
                              : 'bg-gray-300'
                              }`}
                            disabled={showResult || questionTimedOut}
                            onClick={() => handleOptionSelect(option.id)}
                            onKeyDown={(e) => handleKeyDown(e, option.id)}
                          >
                            {option.text}
                          </button>
                        </li>
                      ))}
                    </ul>
                    {questionTimedOut && (
                      <p className="mt-2 text-sm text-red-400">
                        Time's up! You can no longer answer.
                      </p>
                    )}
                  </>
                )}

                {/* Blank */}
                {currentQuestion.type === 'blank' && (
                  <>
                    <h2 className="text-center font-garamond">
                      {(currentQuestion as Blank).question}
                    </h2>
                    <div className="mt-4 w-full max-w-xs space-y-2">
                      {/* <input
                    className="w-full rounded border px-3 py-2 text-black"
                    disabled={questionTimedOut}
                    placeholder="Answer One"
                    type="text"
                    value={blankAnswers['answerOne'] || ''}
                    onChange={(e) =>
                      handleBlankChange('answerOne', e.target.value)
                    }
                  /> */}
                      <Select
                        className="max-w-xs"
                        disabled={questionTimedOut}
                        items={(currentQuestion as Blank).options}
                        label="Blank one:"
                        placeholder="Select an answer"
                        value={blankAnswers['answerOne'] || ''}
                        onChange={(event) => {
                          handleBlankChange(
                            'answerOne',
                            String(
                              (currentQuestion as Blank).options.find(
                                (e) => event.target.value === String(e.id)
                              )?.text
                            )
                          );
                        }}
                      >
                        {(option) => <SelectItem>{option.text}</SelectItem>}
                      </Select>
                      <Select
                        className="max-w-xs"
                        disabled={questionTimedOut}
                        items={(currentQuestion as Blank).options}
                        label="Blank two:"
                        placeholder="Select an answer"
                        value={blankAnswers['answerTwo'] || ''}
                        onChange={(event) => {
                          handleBlankChange(
                            'answerTwo',
                            String(
                              (currentQuestion as Blank).options.find(
                                (e) => event.target.value === String(e.id)
                              )?.text
                            )
                          );
                        }}
                      >
                        {(option) => <SelectItem>{option.text}...</SelectItem>}
                      </Select>
                      {/* <input
                    className="w-full rounded border px-3 py-2 text-black"
                    disabled={questionTimedOut}
                    placeholder="Answer Two"
                    type="text"
                    value={blankAnswers['answerTwo'] || ''}
                    onChange={(e) =>
                      handleBlankChange('answerTwo', e.target.value)
                    }
                  /> */}
                    </div>
                    {questionTimedOut && (
                      <p className="mt-2 text-sm text-red-400">
                        Time's up! You can no longer answer.
                      </p>
                    )}
                  </>
                )}

                {showCountdown && (
                  <div
                    className="absolute flex items-center justify-center"
                    style={{
                      top: 0,
                      left: 0,
                      width: '100vw',
                      height: 'screen',
                      backgroundColor: 'rgba(0, 0, 0, 0.8)',
                      zIndex: 100,
                    }}
                  >
                    <h1 className="animate-pulse text-6xl font-bold text-white">
                      {countdownSeconds}
                    </h1>
                  </div>
                )}

                {/* Riddle */}
                {currentQuestion.type === 'riddle' && (
                  <>
                    <p className="text-center font-garamond">
                      {(currentQuestion as Riddle).riddle}
                    </p>
                    {hintUsed && gameStarted && (
                      <p>Hint: {(currentQuestion as Riddle).hint}</p>
                    )}

                    {riddleScanStatus === 'pending' && !questionTimedOut && (
                      <p className="mt-2 text-center text-yellow-300">
                        Scanning for artefact...
                      </p>
                    )}

                    {riddleScanStatus === 'ready' &&
                      !questionTimedOut &&
                      !answerSubmitted && (
                        <>
                          <div className="mt-2 text-center text-white">
                            Detected artefact:{' '}
                            {loadingArtefactInfo ? (
                              <Spinner size="lg" />
                            ) : (
                              <strong>
                                {artefactName || detectedArtefact}
                              </strong>
                            )}
                          </div>
                          <div className="mt-4 flex gap-4">
                            <button
                              className="rounded bg-green-500 px-4 py-2 text-white"
                              onClick={() => {
                                const current = questions[
                                  currentQuestionIndex
                                ] as Riddle;

                                if (
                                  detectedArtefact ===
                                  String(current.artefactId)
                                ) {
                                  setRiddleScanStatus('success');
                                  setIsAnswerCorrect(true);
                                  setAnswerSubmitted(true);
                                  setIsRunning(false);
                                  setScore((prev) => {
                                    if (hintUsed) {
                                      return prev + 1;
                                    } else {
                                      return prev + 2;
                                    }
                                  });
                                } else {
                                  setRiddleScanStatus('fail');
                                  setIsAnswerCorrect(false);
                                  setAnswerSubmitted(true);
                                  setIsRunning(false);
                                }
                                setShowResult(true);
                              }}
                            >
                              Submit Artefact
                            </button>
                            <button
                              className="rounded bg-yellow-500 px-4 py-2 text-white"
                              onClick={() => {
                                setRiddleScanStatus('pending');
                                setDetectedArtefact(null);
                                scanningRef.current = true;
                                continuousScan(); // restart scanning
                              }}
                            >
                              Scan Again
                            </button>
                          </div>
                        </>
                      )}

                    {/* {(riddleScanStatus === 'success' ||
                  riddleScanStatus === 'fail') &&
                  !questionTimedOut && (
                    <p
                      className={`mt-4 text-center ${riddleScanStatus === 'success'
                          ? 'text-green-400'
                          : 'text-red-400'
                        }`}
                    >
                      {riddleScanStatus === 'success'
                        ? 'Correct artefact!'
                        : 'Incorrect artefact'}
                    </p>
                  )} */}
                    <p
                      className={`mt-2 text-center ${riddleScanStatus === 'success'
                        ? 'text-green-400'
                        : riddleScanStatus === 'fail'
                          ? 'text-red-400'
                          : 'text-yellow-300'
                        }`}
                    >
                      {riddleScanStatus === 'pending' &&
                        !questionTimedOut &&
                        'Waiting for correct artefact...'}
                      {/* {riddleScanStatus === 'success' && !questionTimedOut && (
                    <>
                      Correct artefact detected: {detectedArtefact}
                      <br />
                      Correct artefact ID:{' '}
                      {(currentQuestion as Riddle).artefactId}
                    </>
                  )} */}
                      {/* {riddleScanStatus === 'fail' && !questionTimedOut && (
                    <>
                      Detected artefact: {detectedArtefact || 'Unknown'}{' '}
                      (artefactName || detectedArtefact)
                    </>
                  )} */}
                    </p>
                    {questionTimedOut && (
                      <p className="mt-2 text-sm text-red-400">
                        Time's up! You can no longer answer.
                      </p>
                    )}
                  </>
                )}

                {!answerSubmitted &&
                  !questionTimedOut &&
                  currentQuestionIndex !== 2 && (
                    <button
                      className="mt-4 w-full rounded bg-blue-600 py-2 text-white"
                      onClick={handleSubmit}
                    >
                      Submit Answer
                    </button>
                  )}

                {answerSubmitted && (
                  <>
                    <button
                      className="mt-2 w-full rounded bg-green-600 py-2 text-white"
                      onClick={handleNextQuestion}
                    >
                      {currentQuestionIndex < questions.length - 1
                        ? 'Next'
                        : 'Finish'}
                    </button>
                  </>
                )}

                {answerSubmitted && isAnswerCorrect !== null && (
                  <p
                    className={`mt-4 text-center ${isAnswerCorrect ? 'text-green-400' : 'text-red-400'}`}
                  >
                    {isAnswerCorrect
                      ? '✅ Correct!'
                      : `❌ Incorrect :(`}
                  </p>
                )}

                {/* Show submit/next button for MCQ and Blank only */}
                {/* {showResult && currentQuestion.type !== 'riddle' && (
              <button
                className="mt-4 w-full rounded bg-green-500 py-2 text-white"
                onClick={handleSubmitAnswer}
              >
                {currentQuestionIndex < questions.length - 1
                  ? 'Next'
                  : 'Finish'}
              </button>
            )} */}
              </div>
            </div>
          )}

          {quizCompleted && (
            <div className="absolute bottom-52 w-full bg-yellow-800 bg-opacity-80 p-4 text-center text-white">
              <p>Game Over! Your score: {score}/6</p>
              <button
                className="mt-2 rounded bg-blue-600 px-4 py-2"
                onClick={() => {
                  setCurrentQuestionIndex(0);
                  setScore(0);
                  setQuizCompleted(false);
                  setGameStarted(false);
                  setShowWelcome(true);
                  setSeconds(180);
                  setIsRunning(false);
                  setQuestionTimedOut(false);
                  setDetectedArtefact(null);
                  setShowResult(false);
                  setHintUsed(false);
                }}
              >
                Play Again (Practice)
              </button>
            </div>
          )}
          <Modal isOpen={showHintModal} onOpenChange={setShowHintModal}>
            <ModalContent>
              <ModalHeader>Use a Hint?</ModalHeader>
              <ModalBody className="flex flex-wrap text-wrap">
                Are you sure you want to see the hint? If you choose yes, please
                note that a correct answer will
                <span> only count for 1 point</span> instead of 2.
              </ModalBody>
              <ModalFooter>
                <button
                  className="rounded bg-gray-400 px-4 py-2 text-white"
                  onClick={() => setShowHintModal(false)}
                >
                  Cancel
                </button>
                <button
                  className="rounded bg-green-600 px-4 py-2 text-white"
                  onClick={() => {
                    setHintUsed(true);
                    setShowHintModal(false);
                    // You can optionally show hint content here or trigger a hint popup
                  }}
                >
                  Yes, show hint
                </button>
              </ModalFooter>
            </ModalContent>
          </Modal>
          {currentQuestionIndex === 2 &&
            !questionTimedOut &&
            !answerSubmitted && !hintUsed && (
              <button
                className="absolute bottom-8 left-8 z-50 rounded bg-gray-600 px-4 py-2 text-white"
                onClick={() => setShowHintModal(true)}
              >
                Hint
              </button>
            )}

          <HowToPlayModal
            gameStarted={gameStarted}
            setShowTutorial={setShowTutorial}
            setShowWelcome={setShowWelcome}
            showTutorial={showTutorial}
          />

          <style jsx>{`
            @keyframes fadeIn {
              from {
                opacity: 0;
              }
              to {
                opacity: 1;
              }
            }
          `}</style>
        </>
      ) : (
        <>
          {/* Render only your scanning UI */}
          {detectedArtefact && (
            <ExpandableCard
              confetti={false}
              data={Artefactinfo}
              onClose={() => {
                console.log('Closed');
                setDetectedArtefact(null);
                setArtefactInfo({} as Artefact);
                scanningRef.current = true;
                continuousScan();
              }}
            />
          )}
        </>
      )}
    </div>
  );
}
