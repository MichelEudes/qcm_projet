import React, { useState } from 'react';
import quizImage from '../assets/quiz.png'; // ⬅️ importer l'image


export default function StartScreen({ totalQuestions, onStart }) {
    const [questionCount, setQuestionCount] = useState(5);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const value = e.target.value;
        if (value === '') {
            setQuestionCount('');
            setError('');
            return;
        }
        const num = Number(value);
        if (isNaN(num) || num < 1 || num > totalQuestions) {
            setError(`Veuillez saisir un nombre entre 1 et ${totalQuestions}`);
        } else {
            setError('');
            setQuestionCount(num);
        }
    };

    const handleStart = () => {
        if (!questionCount || questionCount < 1 || questionCount > totalQuestions) {
            setError(`Veuillez saisir un nombre valide entre 1 et ${totalQuestions}`);
            return;
        }
        onStart(questionCount);
    };

    return (
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md mx-auto text-center">
            <div className="space-y-4 text-center">
                <img
                    src={quizImage}
                    alt="Illustration quiz"
                    className="mx-auto w-86 h-86 object-contain"
                />
            </div>
            {/* <h1 className="text-2xl font-bold mb-6 text-gray-800">Takaa Quiz</h1> */}

            <div className="mb-6">
                <label className="block mb-2 text-gray-600 font-medium" htmlFor="questionCount">
                    Choisissez le nombre de questions :
                </label>
                <input
                    id="questionCount"
                    type="number"
                    min={1}
                    max={totalQuestions}
                    value={questionCount}
                    onChange={handleChange}
                    className={`w-full p-3 rounded-md border ${error ? 'border-red-500' : 'border-gray-300'
                        } bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    placeholder={`Entrez un nombre entre 1 et ${totalQuestions}`}
                />
                {error && (
                    <p className="mt-2 text-sm text-red-600">{error}</p>
                )}
            </div>

            <button
                onClick={handleStart}
                disabled={!!error || questionCount === ''}
                className={`w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg shadow
          ${!!error || questionCount === '' ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
                Commencer le Quiz
            </button>
        </div>
    );
}
