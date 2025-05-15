'use client';

import type { Question } from '@/app/actions/questions/questions.types';

import { useEffect, useRef, useState } from 'react';
import * as tmImage from '@teachablemachine/image';
import Image from 'next/image';
import { StarIcon } from '@heroicons/react/24/solid';
import Cookies from 'js-cookie';

import { getAllQuestions } from '@/app/actions/questions/questions';
import { updatePoints } from '@/app/actions/points/points';

export default function CameraLayout() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [model, setModel] = useState<tmImage.CustomMobileNet | null>(null);
  const [seconds, setSeconds] = useState(10);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const [gameStarted, setGameStarted] = useState(false);
  const [officialGame, setOfficialGame] = useState(true);

  // Questions will hold mixed types, we add type property to each question
  const [questions, setQuestions] = useState<
    Array<
      | (Question & { type: 'mcq' })
      | (Question & { type: 'blank' })
      | (Question & { type: 'riddle' })
    >
  >([]);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  // MCQ selected option
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  // Fill in the blank answers
  const [blankAnswers, setBlankAnswers] = useState<{ [key: string]: string }>(
    {}
  );

  // Riddle scanning status
  const [riddleScanStatus, setRiddleScanStatus] = useState<
    'pending' | 'success' | 'fail'
  >('pending');

  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setSeconds((prev) => {
          const newSec = prev - 1;

          if (newSec <= 0) {
            setIsRunning(false);
            if (intervalRef.current) clearInterval(intervalRef.current);
            setSeconds(10);
            setGameStarted(false);
            setQuizCompleted(true);
            setShowResult(true);
            if (officialGame) {
              const accessToken = localStorage.getItem('accessToken');

              if (accessToken) {
                (async () => {
                  await updatePoints(accessToken, score);
                })();
              }
              Cookies.set('CompletedGame', 'true');
            }
          }

          return newSec;
        });
      }, 1000);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning]);

  useEffect(() => {
    const hasPlayed = Cookies.get('CompletedGame') === 'true';

    setOfficialGame(!hasPlayed);
  }, []);

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

  useEffect(() => {
    const loadModel = async () => {
      const modelURL = '/model/model.json';
      const metadataURL = '/model/metadata.json';
      const loadedModel = await tmImage.load(modelURL, metadataURL);

      setModel(loadedModel);
    };

    loadModel();
  }, []);

  const formatTime = (totalSeconds: number): string => {
    const mins = String(Math.floor(totalSeconds / 60)).padStart(2, '0');
    const secs = String(totalSeconds % 60).padStart(2, '0');

    return `${mins}:${secs}`;
  };

  const handleStartGame = async () => {
    const data = await getAllQuestions();

    // Add type info from your API structure:
    // Assume you get mcqs, blanks, riddles arrays in data
    // For example purpose, combine 3 questions as you requested:
    const combinedQuestions = [
      ...data.mcqs.map((q) => ({ ...q, type: 'mcq' })),
      ...data.blanks.map((q) => ({ ...q, type: 'blank' })),
      ...data.riddles.map((q) => ({ ...q, type: 'riddle' })),
    ];

    // Only take first 3 (1 of each kind)
    setQuestions(combinedQuestions.slice(0, 3));

    setIsRunning(true);
    setGameStarted(true);
    setScore(0);
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setBlankAnswers({});
    setRiddleScanStatus('pending');
    setQuizCompleted(false);
    setShowResult(false);
  };

  // Handlers for MCQ option select
  const handleOptionSelect = (id: number) => {
    setSelectedOption(id);
    setShowResult(true);
  };

  // Handlers for blank input change
  const handleBlankChange = (field: string, value: string) => {
    setBlankAnswers((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Handler for riddle scan result from model prediction
  const handleRiddleScan = async () => {
    if (!model || !videoRef.current) return;

    const prediction = await model.predict(videoRef.current);

    const bestPrediction = prediction.reduce(
      (best, current) =>
        current.probability > best.probability ? current : best,
      { className: '', probability: 0 }
    );

    const currentQuestion = questions[currentQuestionIndex];

    if (
      bestPrediction.probability >= 0.9 &&
      bestPrediction.className === String(currentQuestion.artefactId)
    ) {
      setRiddleScanStatus('success');
      setScore((prev) => prev + 1);
      setShowResult(true);
    } else {
      setRiddleScanStatus('fail');
    }
  };

  // Submit answer for all question types
  const handleSubmitAnswer = () => {
    const current = questions[currentQuestionIndex];

    if (current.type === 'mcq') {
      if (selectedOption === current.correctOptionId) {
        setScore((prev) => prev + 1);
      }
    } else if (current.type === 'blank') {
      // Check all answers
      // Assume current.answerOne, current.answerTwo etc.
      let allCorrect = true;

      ['answerOne', 'answerTwo'].forEach((field) => {
        const correct = current[field]?.toLowerCase().trim();
        const given = (blankAnswers[field] || '').toLowerCase().trim();

        if (correct !== given) allCorrect = false;
      });
      if (allCorrect) {
        setScore((prev) => prev + 1);
      }
    } else if (current.type === 'riddle') {
      // For riddle, user must scan to get success
      if (riddleScanStatus === 'success') {
        // score already added on success scan
      } else {
        alert('You must scan the correct artefact to proceed!');

        return; // Don't proceed yet
      }
    }

    // Move to next question or end game
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedOption(null);
      setBlankAnswers({});
      setRiddleScanStatus('pending');
      setShowResult(false);
    } else {
      // End game
      if (officialGame) {
        const accessToken = localStorage.getItem('accessToken');

        if (accessToken) updatePoints(accessToken, score);
        Cookies.set('CompletedGame', 'true');
      }
      setQuizCompleted(true);
      setGameStarted(false);
      setIsRunning(false);
      setSeconds(10);
    }
  };

  // Keyboard accessibility for MCQ buttons
  const handleKeyDown = (e: React.KeyboardEvent, id: number) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleOptionSelect(id);
    }
  };

  return (
    <div
      className="flex flex-col items-center justify-center"
      style={{
        position: 'relative',
        width: '100vw',
        height: '100vh',
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
        <div className="absolute right-4 top-14 text-white">
          {formatTime(seconds)}
        </div>
        <div className="absolute right-4 top-20 flex flex-row items-center justify-center">
          <StarIcon className="h-10 w-10 text-yellow-500" />
          <p className="text-xl text-white">:{score}</p>
        </div>
      </div>

      {!gameStarted && !quizCompleted && (
        <div className="absolute inset-0 z-30 flex items-center justify-center">
          <button
            className="rounded-lg bg-blue-600 px-6 py-3 text-xl text-white"
            onClick={handleStartGame}
          >
            Start Game
          </button>
        </div>
      )}

      {gameStarted && !quizCompleted && questions.length > 0 && (
        <div className="absolute bottom-52 flex flex-col items-center justify-center px-8">
          <div className="flex w-4/5 flex-col items-center justify-center rounded-xl bg-gray-400 bg-opacity-50 p-10">
            <h1 className="text-4xl text-gray-800">
              Question {currentQuestionIndex + 1}
            </h1>

            {/* Render question text */}
            {questions[currentQuestionIndex].type === 'mcq' && (
              <>
                <h2 className="text-center font-garamond">
                  {questions[currentQuestionIndex].question}
                </h2>
                <ul className="flex flex-row flex-wrap justify-center gap-4 p-10">
                  {questions[currentQuestionIndex].options.map((option) => (
                    <li key={option.id}>
                      <button
                        className={`w-40 rounded-full px-4 py-2 transition-colors ${
                          selectedOption === option.id
                            ? 'bg-blue-600'
                            : 'bg-gray-300'
                        } ${
                          showResult &&
                          option.id ===
                            questions[currentQuestionIndex].correctOptionId
                            ? 'border border-green-400 bg-green-800'
                            : ''
                        }`}
                        disabled={showResult}
                        onClick={() => handleOptionSelect(option.id)}
                        onKeyDown={(e) => handleKeyDown(e, option.id)}
                      >
                        {option.option_text}
                      </button>
                    </li>
                  ))}
                </ul>
              </>
            )}

            {questions[currentQuestionIndex].type === 'blank' && (
              <>
                <h2 className="text-center font-garamond">
                  {questions[currentQuestionIndex].question}
                </h2>
                <div className="mt-4 space-y-2">
                  <input
                    className="rounded border px-3 py-2 text-black"
                    disabled={showResult}
                    placeholder="Answer One"
                    type="text"
                    value={blankAnswers['answerOne'] || ''}
                    onChange={(e) =>
                      handleBlankChange('answerOne', e.target.value)
                    }
                  />
                  <input
                    className="rounded border px-3 py-2 text-black"
                    disabled={showResult}
                    placeholder="Answer Two"
                    type="text"
                    value={blankAnswers['answerTwo'] || ''}
                    onChange={(e) =>
                      handleBlankChange('answerTwo', e.target.value)
                    }
                  />
                </div>
              </>
            )}

            {questions[currentQuestionIndex].type === 'riddle' && (
              <>
                <h2 className="text-center font-garamond">
                  {questions[currentQuestionIndex].riddle}
                </h2>
                <p className="mt-2 text-center text-white">
                  Scan the artefact with the camera to answer.
                </p>
                <p
                  className={`mt-2 text-center ${
                    riddleScanStatus === 'success'
                      ? 'text-green-400'
                      : riddleScanStatus === 'fail'
                        ? 'text-red-400'
                        : 'text-yellow-300'
                  }`}
                >
                  {riddleScanStatus === 'pending'
                    ? 'Waiting for correct artefact...'
                    : riddleScanStatus === 'success'
                      ? 'Correct artefact detected!'
                      : 'Incorrect artefact, try again.'}
                </p>
                <button
                  className="mt-4 rounded bg-blue-600 px-6 py-2 text-white"
                  disabled={riddleScanStatus === 'success'}
                  onClick={handleRiddleScan}
                >
                  Scan Artefact
                </button>
              </>
            )}

            {showResult && (
              <button
                className="mt-4 w-full rounded bg-green-500 py-2 text-white"
                onClick={handleSubmitAnswer}
              >
                {currentQuestionIndex < questions.length - 1
                  ? 'Next'
                  : 'Finish'}
              </button>
            )}
          </div>
        </div>
      )}

      {quizCompleted && (
        <div className="absolute bottom-20 w-full bg-black bg-opacity-80 p-4 text-center text-white">
          <p>
            Game Over! Your score: {score}/{questions.length}
          </p>
          <button
            className="mt-2 rounded bg-blue-600 px-4 py-2"
            onClick={() => {
              setCurrentQuestionIndex(0);
              setScore(0);
              setQuizCompleted(false);
              setGameStarted(false);
              setSeconds(10);
              setIsRunning(false);
              Cookies.remove('CompletedGame');
            }}
          >
            Play Again (Practice)
          </button>
        </div>
      )}
    </div>
  );
}
