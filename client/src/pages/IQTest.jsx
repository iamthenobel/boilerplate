import React, { useState, useEffect, useRef } from 'react';

// 20 of the world's hardest and trickiest IQ questions
const QUESTIONS = [
  {
    question: 'What comes next in the sequence: 2, 4, 8, 16, ?',
    options: ['18', '20', '24', '32'],
    answer: 3,
  },
  {
    question: 'Which shape is different from the others?',
    options: ['Circle', 'Square', 'Triangle', 'Rectangle'],
    answer: 2,
  },
  {
    question: 'If all Bloops are Razzies and all Razzies are Lazzies, are all Bloops definitely Lazzies?',
    options: ['Yes', 'No', 'Maybe', 'Cannot tell'],
    answer: 0,
  },
  {
    question: 'Which number is the odd one out: 11, 13, 15, 17, 19?',
    options: ['11', '15', '17', '19'],
    answer: 1,
  },
  {
    question: 'What is the next letter in the series: A, C, F, J, O, ?',
    options: ['Q', 'S', 'U', 'V'],
    answer: 2,
  },
  {
    question: 'A bat and a ball cost $1.10 in total. The bat costs $1.00 more than the ball. How much does the ball cost?',
    options: ['$0.05', '$0.10', '$0.15', '$0.50'],
    answer: 0,
  },
  {
    question: 'If it takes 5 machines 5 minutes to make 5 widgets, how long would it take 100 machines to make 100 widgets?',
    options: ['5 minutes', '100 minutes', '20 minutes', '1 minute'],
    answer: 0,
  },
  {
    question: 'In a lake, there is a patch of lily pads. Every day, the patch doubles in size. If it takes 48 days for the patch to cover the entire lake, how long would it take to cover half the lake?',
    options: ['24 days', '47 days', '40 days', '12 days'],
    answer: 1,
  },
  {
    question: 'Which weighs more: a pound of feathers or a pound of bricks?',
    options: ['Feathers', 'Bricks', 'Neither', 'Both'],
    answer: 2,
  },
  {
    question: 'If you rearrange the letters "CIFAIPC" you would have the name of a(n):',
    options: ['City', 'Animal', 'Ocean', 'Country'],
    answer: 3, // Pacific
  },
  {
    question: 'Mary’s father has five daughters: Nana, Nene, Nini, Nono. What is the fifth daughter’s name?',
    options: ['Nunu', 'Nana', 'Mary', 'Nene'],
    answer: 2,
  },
  {
    question: 'Which three numbers have the same answer whether they’re added or multiplied?',
    options: ['1, 2, 3', '2, 3, 4', '3, 4, 5', '1, 3, 5'],
    answer: 0,
  },
  {
    question: 'A farmer has 17 sheep and all but 9 die. How many are left?',
    options: ['8', '9', '17', '0'],
    answer: 1,
  },
  {
    question: 'What is always coming, but never arrives?',
    options: ['Tomorrow', 'Train', 'Sun', 'Rain'],
    answer: 0,
  },
  {
    question: 'Which word is spelled incorrectly in every dictionary?',
    options: ['Incorrectly', 'Dictionary', 'Misspelled', 'None'],
    answer: 0,
  },
  {
    question: 'If you have only one match and enter a dark room containing an oil lamp, some kindling wood, and a newspaper, which would you light first?',
    options: ['Lamp', 'Newspaper', 'Match', 'Wood'],
    answer: 2,
  },
  {
    question: 'What can be broken, but is never held?',
    options: ['Promise', 'Glass', 'Heart', 'Silence'],
    answer: 0,
  },
  {
    question: 'What begins with T, ends with T, and has T in it?',
    options: ['Tent', 'Teapot', 'Tat', 'Tart'],
    answer: 1,
  },
  {
    question: 'If you divide 30 by half and add ten, what do you get?',
    options: ['25', '70', '40', '50'],
    answer: 1,
  },
  {
    question: 'Which is heavier: a ton of gold or a ton of silver?',
    options: ['Gold', 'Silver', 'Neither', 'Both'],
    answer: 2,
  },
  {
    question: 'If you have me, you want to share me. If you share me, you don’t have me. What am I?',
    options: ['Secret', 'Money', 'Love', 'Time'],
    answer: 0,
  },
];


export default function IQTest() {
  const [started, setStarted] = useState(false);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes for the quiz
  const timerRef = useRef();

  useEffect(() => {
    if (started && !showResult) {
      timerRef.current = setInterval(() => {
        setTimeLeft(t => {
          if (t <= 1) {
            clearInterval(timerRef.current);
            setShowResult(true);
            return 0;
          }
          return t - 1;
        });
      }, 1000);
      return () => clearInterval(timerRef.current);
    }
    return () => {};
  }, [started, showResult]);

  const handleStart = () => {
    setStarted(true);
    setCurrent(0);
    setAnswers([]);
    setShowResult(false);
    setTimeLeft(300);
  };

  const handleAnswer = idx => {
    setAnswers(prev => {
      const next = [...prev];
      next[current] = idx;
      return next;
    });
    if (current < QUESTIONS.length - 1) {
      setCurrent(current + 1);
    } else {
      setShowResult(true);
    }
  };

  const handleRestart = () => {
    setStarted(false);
    setCurrent(0);
    setAnswers([]);
    setShowResult(false);
    setTimeLeft(300);
  };

  // Calculate IQ based on result percentile (relative to 20 questions, mean=10, stddev~3)
  const correct = answers.filter((a, i) => a === QUESTIONS[i].answer).length;
  // Standard IQ formula: IQ = 100 + 15 * (z-score), z = (score - mean) / stddev
  const mean = 10; // average score
  const stddev = 3; // estimated stddev for 20 questions
  const z = (correct - mean) / stddev;
  const iq = Math.round(100 + 15 * z);

  // Format timer mm:ss
  const formatTime = t => `${String(Math.floor(t / 60)).padStart(2, '0')}:${String(t % 60).padStart(2, '0')}`;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center  px-4 py-8">
      <div className="w-full max-w-xl bg-white/90 dark:bg-gray-800/90 rounded-2xl shadow-xl p-8 border border-gray-100 dark:border-gray-700 flex flex-col items-center">
        {!started && !showResult && (
          <>
            <h1 className="text-3xl font-extrabold mb-2 text-indigo-700 dark:text-indigo-300">IQ Test</h1>
            <p className="text-gray-600 dark:text-gray-300 mb-6 text-lg text-center">Test your intelligence with 20 interactive questions. Your IQ will be calculated and shown at the end. You have 5 minutes to complete the quiz. Click below to begin!</p>
            <button onClick={handleStart} className="px-6 py-3 rounded-lg bg-indigo-600 text-white font-semibold shadow hover:bg-indigo-700 transition text-base">Begin Quiz</button>
          </>
        )}

        {started && !showResult && (
          <div className="w-full">
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <div className="text-xs text-gray-500 dark:text-gray-400">Question {current + 1} of {QUESTIONS.length}</div>
                <div className={`text-xs font-bold ${timeLeft < 30 ? 'text-red-500' : 'text-gray-500'} dark:text-gray-400`}>
                  ⏰ {formatTime(timeLeft)}
                </div>
              </div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">{QUESTIONS[current].question}</h2>
              <div className="grid gap-3">
                {QUESTIONS[current].options.map((opt, idx) => {
                  const isSelected = answers[current] === idx;
                  return (
                    <button
                      key={idx}
                      onClick={() => handleAnswer(idx)}
                      className={`w-full px-4 py-3 rounded-lg border font-medium shadow transition text-left
                        ${isSelected
                          ? 'border-2 border-indigo-600 bg-indigo-50 dark:border-indigo-400 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-200'
                          : 'border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 hover:bg-indigo-50 dark:hover:bg-gray-800'}
                      `}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>
            </div>
            <div className="flex flex-wrap gap-2 justify-between mt-4">
              <button
                className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 text-sm font-semibold shadow hover:bg-gray-300 dark:hover:bg-gray-800 transition"
                onClick={() => setCurrent(c => Math.max(0, c - 1))}
                disabled={current === 0}
              >
                Previous
              </button>
              <button
                className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 text-sm font-semibold shadow hover:bg-gray-300 dark:hover:bg-gray-800 transition"
                onClick={() => setCurrent(c => Math.min(QUESTIONS.length - 1, c + 1))}
                disabled={current === QUESTIONS.length - 1}
              >
                Next
              </button>
              <button
                className="px-4 py-2 rounded-lg bg-red-500 text-white text-sm font-semibold shadow hover:bg-red-600 transition ml-auto"
                onClick={handleRestart}
                type="button"
              >
                Cancel Quiz
              </button>
            </div>
          </div>
        )}

        {showResult && (
          <div className="w-full flex flex-col items-center">
            <h2 className="text-2xl font-bold text-indigo-700 dark:text-indigo-300 mb-2">Your IQ Result</h2>
            <div className="text-5xl font-extrabold text-green-600 dark:text-green-300 mb-4">{iq}</div>
            <p className="text-gray-600 dark:text-gray-300 mb-6 text-lg text-center">You answered {correct} out of {QUESTIONS.length} questions correctly.</p>
            <button onClick={handleRestart} className="px-6 py-3 rounded-lg bg-indigo-600 text-white font-semibold shadow hover:bg-indigo-700 transition text-base">Retake Quiz</button>
          </div>
        )}
      </div>
    </div>
  );
}
