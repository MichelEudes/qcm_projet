// src/components/Result.jsx
import React from 'react';

export default function Result({ score, total, questions, userAnswers, onRestart }) {
    return (
        <div className="bg-white p-8 rounded-lg shadow-md max-w-4xl mx-auto w-full">
            <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
                Résultats du Quiz
            </h1>

            <p className="text-xl mb-4 text-center">
                Votre score : {score} / {total}
            </p>

            <div className="space-y-6">
                {questions.map((q, idx) => {
                    const userAnswerIndex = userAnswers[idx];
                    const userAnswerText = q.options[userAnswerIndex];
                    const correctAnswerText = q.answer;
                    const correctAnswerIndex = q.options.indexOf(correctAnswerText);
                    const isCorrect = userAnswerText === correctAnswerText;

                    return (
                        <div
                            key={idx}
                            className={`p-4 rounded-lg border ${isCorrect ? 'border-green-500 bg-green-50' : 'border-red-500 bg-red-50'
                                }`}
                        >
                            <h2 className="font-semibold mb-2">
                                Question {idx + 1}: {q.question}
                            </h2>
                            <p>
                                <span className="font-semibold">Votre réponse :</span>
                                {userAnswerIndex !== undefined && userAnswerIndex !== null
                                    ? ` (${userAnswerIndex + 1}) ${userAnswerText}`
                                    : ' Aucune réponse'}
                            </p>
                            <p>
                                <span className="font-semibold">Bonne réponse :</span> ({correctAnswerIndex + 1}) {correctAnswerText}
                            </p>
                        </div>
                    );
                })}
            </div>

            <div className="mt-8 text-center">
                <button
                    onClick={onRestart}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg shadow"
                >
                    Rejouer
                </button>
            </div>
        </div>
    );
}
