import React from 'react';

export default function Correction({ questions, answers, score, onRestart, onFinish }) {
    return (
        <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-md">
            <h1 className="text-4xl font-bold mb-6 text-center">Correction Finale</h1>
            <p className="text-2xl mb-8 text-center">
                Votre score : {score} / {questions.length}
            </p>

            <div className="space-y-6">
                {questions.map((q, idx) => {
                    const userAnswerIndex = answers[idx];
                    const userAnswer = userAnswerIndex !== undefined ? q.options[userAnswerIndex] : "Non répondu";
                    const isCorrect = userAnswer === q.answer;

                    return (
                        <div key={idx} className="p-4 border rounded-lg">
                            <h2 className="font-semibold mb-2">
                                Q{idx + 1}. {q.question}
                            </h2>

                            <p className={`mb-1 ${isCorrect ? 'text-green-600' : 'text-red-600'}`}>
                                Votre réponse : {userAnswerIndex !== undefined ? `${userAnswerIndex + 1}. ` : ''}{userAnswer}
                            </p>

                            {!isCorrect && (
                                <p className="text-green-700">
                                    Bonne réponse : {q.options.indexOf(q.answer) + 1}. {q.answer}
                                </p>
                            )}
                        </div>
                    );
                })}
            </div>

            <div className="mt-8 flex justify-center gap-4">
                <button
                    onClick={onRestart}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg shadow"
                >
                    Rejouer
                </button>

                <button
                    onClick={onFinish}
                    className="bg-gray-500 hover:bg-gray-600 text-white font-semibold px-6 py-3 rounded-lg shadow"
                >
                    Quitter
                </button>
            </div>
        </div>
    );
}
