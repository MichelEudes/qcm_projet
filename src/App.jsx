import React, { useState } from 'react';
import StartScreen from './components/StartScreen.jsx';
import Quiz from './components/Quiz.jsx';
import questionsData from './data/questions.json';

export default function App() {
  const [started, setStarted] = useState(false);
  const [numberOfQuestions, setNumberOfQuestions] = useState(5);

  const startQuiz = (count) => {
    setNumberOfQuestions(count);
    setStarted(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      {!started ? (
        <StartScreen totalQuestions={questionsData.length} onStart={startQuiz} />
      ) : (
        <Quiz questions={questionsData.slice(0, numberOfQuestions)} onFinish={() => setStarted(false)} />
      )}
    </div>
  );
}
