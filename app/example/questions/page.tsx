'use client';
import type { Question } from '@/app/actions/questions/questions.types';

import { useEffect, useState } from 'react';

import { getAllQuestions } from '@/app/actions/questions/questions';
import { updatePoints } from '@/app/actions/points/points';

export default function QuizPage() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const data = await getAllQuestions();

        setQuestions(data.questions);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  const handleOptionSelect = (optionId: number) => {
    setSelectedOption(optionId);
  };

  const submitScore = async () => {
    try {
      const accessToken = localStorage.getItem('accessToken'); // from Cognito

      if (!accessToken) {
        console.error('No access token found');

        return;
      }

      const res = await updatePoints(accessToken, score);

      console.log('Score submitted successfully:', res);
    } catch (err: any) {
      console.error('Error submitting score:', err.message || err);
    }
  };
  const handleKeyDown = (e: React.KeyboardEvent, optionId: number) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleOptionSelect(optionId);
    }
  };

  const handleNextQuestion = async () => {
    if (selectedOption !== null) {
      // Check if answer is correct
      const currentQuestion = questions[currentQuestionIndex];

      if (selectedOption === currentQuestion.correct_answer_id) {
        setScore(score + 1);
      }

      // Move to next question or end quiz
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedOption(null);
        setShowResult(false);
      } else {
        await submitScore();
        setQuizCompleted(true);
      }
    }
  };

  const handleShowResult = () => {
    if (selectedOption !== null) {
      setShowResult(true);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setScore(0);
    setShowResult(false);
    setQuizCompleted(false);
  };

  if (loading)
    return (
      <div className="flex h-screen items-center justify-center">
        Loading questions...
      </div>
    );
  if (error)
    return (
      <div className="flex h-screen items-center justify-center text-red-500">
        Error: {error}
      </div>
    );
  if (questions.length === 0)
    return (
      <div className="flex h-screen items-center justify-center">
        No questions available
      </div>
    );

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <section className="min-h-screen bg-gray-50 py-12">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        {!quizCompleted ? (
          <div className="rounded-lg bg-white p-6 shadow-md md:p-8">
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-gray-800">Quiz Time!</h1>
              <p className="mt-2 text-gray-600">
                Question {currentQuestionIndex + 1} of {questions.length}
              </p>
              <p className="text-sm text-gray-600">
                Current Score: <span className="font-semibold">{score}</span>
              </p>
            </div>

            <div className="mb-8">
              <h2 className="mb-4 text-xl font-semibold text-gray-800">
                {currentQuestion.question_text}
              </h2>

              <ul className="space-y-3">
                {currentQuestion.options.map((option) => (
                  <li key={option.id}>
                    <button
                      aria-pressed={selectedOption === option.id}
                      className={`w-full rounded-lg border p-4 text-left transition-colors ${
                        selectedOption === option.id
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:bg-gray-50'
                      } ${
                        showResult &&
                        option.id === currentQuestion.correct_answer_id
                          ? 'border-green-500 bg-green-50'
                          : ''
                      }`}
                      disabled={showResult}
                      tabIndex={0}
                      type="button"
                      onClick={() =>
                        !showResult && handleOptionSelect(option.id)
                      }
                      onKeyDown={(e) =>
                        !showResult && handleKeyDown(e, option.id)
                      }
                    >
                      <div className="flex items-center">
                        <span className="font-medium">
                          {option.option_text}
                        </span>
                      </div>
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex items-center justify-between">
              {showResult ? (
                <div className="text-sm font-medium">
                  {selectedOption === currentQuestion.correct_answer_id ? (
                    <span className="text-green-600">Correct! Well done.</span>
                  ) : (
                    <span className="text-red-600">
                      Incorrect. The right answer is highlighted.
                    </span>
                  )}
                </div>
              ) : (
                <div />
              )}

              <div className="flex space-x-3">
                {!showResult ? (
                  <button
                    className={`rounded-md px-4 py-2 ${
                      selectedOption === null
                        ? 'cursor-not-allowed bg-gray-300'
                        : 'bg-blue-600 text-white hover:bg-blue-700'
                    }`}
                    disabled={selectedOption === null}
                    type="button"
                    onClick={handleShowResult}
                  >
                    Check Answer
                  </button>
                ) : (
                  <button
                    className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                    type="button"
                    onClick={handleNextQuestion}
                  >
                    {currentQuestionIndex < questions.length - 1
                      ? 'Next Question'
                      : 'Finish Quiz'}
                  </button>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="rounded-lg bg-white p-6 text-center shadow-md md:p-8">
            <h1 className="mb-4 text-2xl font-bold text-gray-800">
              Quiz Completed!
            </h1>
            <p className="mb-6 text-xl">
              Your score: <span className="font-bold">{score}</span> out of{' '}
              {questions.length}
            </p>
            <p className="mb-8 text-gray-600">
              {score === questions.length
                ? 'Perfect! You got all questions right!'
                : score >= questions.length / 2
                  ? 'Good job! Keep learning.'
                  : 'Keep practicing to improve your knowledge.'}
            </p>
            <button
              className="rounded-md bg-blue-600 px-6 py-3 text-white hover:bg-blue-700"
              type="button"
              onClick={restartQuiz}
            >
              Try Again
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
