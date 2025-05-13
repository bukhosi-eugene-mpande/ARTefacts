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
  const [seconds, setSeconds] = useState(180);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const [gameStarted, setGameStarted] = useState(false);
  const [officialGame, setOfficialGame] = useState(true);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    setIsRunning(true);
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setSeconds((prev) => prev - 1);
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

  const formatTime = (totalSeconds: number): string => {
    const mins = String(Math.floor(totalSeconds / 60)).padStart(2, '0');
    const secs = String(totalSeconds % 60).padStart(2, '0');

    return `${mins}:${secs}`;
  };

  const handleStartGame = async () => {
    const data = await getAllQuestions();

    setQuestions(data.questions.slice(0, 3));
    setGameStarted(true);
    setScore(0);
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setQuizCompleted(false);
    setShowResult(false);
  };

  const handleOptionSelect = (id: number) => {
    setSelectedOption(id);
    setShowResult(true);
  };

  const handleSubmitAnswer = async () => {
    const current = questions[currentQuestionIndex];

    if (selectedOption === current.correct_answer_id) {
      setScore((prev) => prev + 1);
    }

    if (currentQuestionIndex < 2) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedOption(null);
      setShowResult(false);
    } else {
      if (officialGame) {
        const accessToken = localStorage.getItem('accessToken');

        if (accessToken) await updatePoints(accessToken, score);
        Cookies.set('CompletedGame', 'true');
      }
      setQuizCompleted(true);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, id: number) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleOptionSelect(id);
    }
  };

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
            <h2 className="text-center font-garamond">
              {questions[currentQuestionIndex].question_text}
            </h2>

            {showResult && (
              <button
                className="mt-4 w-full rounded bg-green-500 py-2 text-white"
                onClick={handleSubmitAnswer}
              >
                {currentQuestionIndex < 2 ? 'Next' : 'Finish'}
              </button>
            )}
          </div>
          <ul className="flex flex-row flex-wrap justify-center gap-4 p-10">
            {questions[currentQuestionIndex].options.map((option) => (
              <li key={option.id}>
                <button
                  className={`w-40 rounded-full px-4 py-2 transition-colors ${selectedOption === option.id ? 'bg-blue-600' : 'bg-gray-300'} ${
                    showResult &&
                    option.id ===
                      questions[currentQuestionIndex].correct_answer_id
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
        </div>
      )}

      {quizCompleted && (
        <div className="absolute bottom-20 w-full bg-black bg-opacity-80 p-4 text-center text-white">
          <p>Game Over! Your score: {score}/3</p>
          <button
            className="mt-2 rounded bg-blue-600 px-4 py-2"
            onClick={() => {
              setCurrentQuestionIndex(0);
              setScore(0);
              setQuizCompleted(false);
              setGameStarted(false);
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
