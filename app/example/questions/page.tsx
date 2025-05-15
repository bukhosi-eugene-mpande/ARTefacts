'use client';

import type { CombinedQuestion } from '@/app/actions/questions/questions.types';

import { useEffect, useState } from 'react';

import { getAllQuestions } from '@/app/actions/questions/questions';

export default function UnifiedQuizPage() {
  const [questions, setQuestions] = useState<CombinedQuestion[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const [userInput, setUserInput] = useState('');
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const data = await getAllQuestions();

        const riddles = data.riddles.map((r) => ({
          ...r,
          type: 'riddle' as const,
        }));
        const blanks = data.blanks.map((b) => ({
          ...b,
          type: 'blank' as const,
        }));
        const mcqs = data.mcqs.map((m) => ({ ...m, type: 'mcq' as const }));

        const combined = [...riddles, ...blanks, ...mcqs].sort(
          () => 0.5 - Math.random()
        );

        setQuestions(combined);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  const current = questions[currentIndex];

  const handleCheckAnswer = () => {
    let isCorrect = false;

    if (current.type === 'riddle') {
      isCorrect = parseInt(userInput) === current.artefactId;
    } else if (current.type === 'blank') {
      const [first, second] = userInput
        .split(',')
        .map((s) => s.trim().toLowerCase());

      isCorrect =
        first === current.answerOne.toLowerCase() &&
        second === current.answerTwo.toLowerCase();
    } else if (current.type === 'mcq') {
      isCorrect = selectedOption === current.correctOptionId;
    }

    if (isCorrect) setScore(score + 1);
    setShowResult(true);
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setUserInput('');
      setSelectedOption(null);
      setShowResult(false);
    } else {
      setQuizCompleted(true);
    }
  };

  const restartQuiz = () => {
    setCurrentIndex(0);
    setUserInput('');
    setSelectedOption(null);
    setScore(0);
    setShowResult(false);
    setQuizCompleted(false);
  };

  if (loading) return <div className="p-8">Loading questions...</div>;
  if (error) return <div className="p-8 text-red-500">Error: {error}</div>;
  if (questions.length === 0)
    return <div className="p-8">No questions available</div>;

  return (
    <section className="min-h-screen bg-gray-50 py-12">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        {!quizCompleted ? (
          <div className="rounded-lg bg-white p-6 shadow-md">
            <div className="mb-6">
              <h1 className="text-2xl font-bold">Quiz Time!</h1>
              <p className="mt-2 text-gray-600">
                Question {currentIndex + 1} of {questions.length}
              </p>
            </div>

            <div className="mb-8">
              {current.type === 'riddle' && (
                <>
                  <h2 className="mb-4 text-lg font-semibold">
                    {current.riddle}
                  </h2>
                  <input
                    className="w-full rounded-md border p-2"
                    disabled={showResult}
                    placeholder="Enter Artefact ID"
                    type="number"
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                  />
                </>
              )}

              {current.type === 'blank' && (
                <>
                  <h2 className="mb-4 text-lg font-semibold">
                    {current.question}
                  </h2>
                  <input
                    className="w-full rounded-md border p-2"
                    disabled={showResult}
                    placeholder="Enter both answers separated by comma"
                    type="text"
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                  />
                </>
              )}

              {current.type === 'mcq' && (
                <>
                  <h2 className="mb-4 text-lg font-semibold">
                    {current.question}
                  </h2>
                  <ul className="space-y-2">
                    {current.options.map((option) => (
                      <li key={option.id}>
                        <button
                          className={`w-full rounded-md border p-3 text-left ${
                            selectedOption === option.id ? 'bg-blue-100' : ''
                          } ${
                            showResult && option.id === current.correctOptionId
                              ? 'border-green-500'
                              : ''
                          }`}
                          onClick={() =>
                            !showResult && setSelectedOption(option.id)
                          }
                        >
                          {option.text}
                        </button>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>

            <div className="flex items-center justify-between">
              {showResult && (
                <p className="text-sm font-medium">
                  {(() => {
                    if (current.type === 'riddle')
                      return parseInt(userInput) === current.artefactId ? (
                        <span className="text-green-600">Correct!</span>
                      ) : (
                        <span className="text-red-600">
                          Incorrect. Correct answer: {current.artefactId}
                        </span>
                      );
                    if (current.type === 'blank')
                      return userInput
                        .toLowerCase()
                        .includes(current.answerOne.toLowerCase()) &&
                        userInput
                          .toLowerCase()
                          .includes(current.answerTwo.toLowerCase()) ? (
                        <span className="text-green-600">Correct!</span>
                      ) : (
                        <span className="text-red-600">
                          Incorrect. Correct answers: {current.answerOne},{' '}
                          {current.answerTwo}
                        </span>
                      );
                    if (current.type === 'mcq')
                      return selectedOption === current.correctOptionId ? (
                        <span className="text-green-600">Correct!</span>
                      ) : (
                        <span className="text-red-600">Incorrect</span>
                      );
                  })()}
                </p>
              )}

              <div className="space-x-2">
                {!showResult ? (
                  <button
                    className={`rounded px-4 py-2 ${
                      (current.type === 'mcq' && selectedOption === null) ||
                      (current.type !== 'mcq' && userInput.trim() === '')
                        ? 'cursor-not-allowed bg-gray-300'
                        : 'bg-blue-600 text-white hover:bg-blue-700'
                    }`}
                    disabled={
                      (current.type === 'mcq' && selectedOption === null) ||
                      (current.type !== 'mcq' && userInput.trim() === '')
                    }
                    onClick={handleCheckAnswer}
                  >
                    Check Answer
                  </button>
                ) : (
                  <button
                    className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                    onClick={handleNext}
                  >
                    {currentIndex < questions.length - 1 ? 'Next' : 'Finish'}
                  </button>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="rounded bg-white p-6 text-center shadow">
            <h1 className="mb-4 text-2xl font-bold">Quiz Completed!</h1>
            <p className="mb-2 text-xl">
              Your score: {score} / {questions.length}
            </p>
            <button
              className="mt-4 rounded bg-blue-600 px-6 py-3 text-white hover:bg-blue-700"
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
