import React, { useState, useEffect } from 'react';
import Question from './Question.jsx';
import Correction from './Correction.jsx';
import { motion } from 'framer-motion';

export default function Quiz({ questions, onFinish }) {
    const [current, setCurrent] = useState(0);
    const [selected, setSelected] = useState(null);
    const [score, setScore] = useState(0);
    const [showResult, setShowResult] = useState(false);
    const [answers, setAnswers] = useState([]); // Stocke les réponses choisies

    // Timer global (exemple 60s par question)
    const [timer, setTimer] = useState(questions.length * 60);

    useEffect(() => {
        if (timer === 0) {
            setShowResult(true);
            return;
        }
        if (!showResult) {
            const interval = setInterval(() => setTimer(t => t - 1), 1000);
            return () => clearInterval(interval);
        }
    }, [timer, showResult]);

    const handleSelect = (idx) => {
        setSelected(idx);
    };

    const handleValidate = () => {
        if (selected === null) return;

        // Ajoute la réponse sélectionnée
        setAnswers(prev => [...prev, selected]);

        // Met à jour le score si correct
        if (questions[current].answer === questions[current].options[selected]) {
            setScore(s => s + 1);
        }

        setSelected(null);
        if (current + 1 < questions.length) {
            setCurrent(c => c + 1);
        } else {
            setShowResult(true);
        }
    };

    const handleRestart = () => {
        setCurrent(0);
        setScore(0);
        setAnswers([]);
        setSelected(null);
        setShowResult(false);
        setTimer(questions.length * 60);
    };

    // Barre de progression
    const progressPercent = Math.floor((current / questions.length) * 100);

    if (showResult) {
        return (
            <Correction
                questions={questions}
                answers={answers}
                score={score}
                onRestart={handleRestart}
                onFinish={onFinish}
            />
        );
    }

    return (
        <div className="max-w-2xl mx-auto">
            {/* Timer */}
            <div className="mb-4 text-right text-gray-700 font-semibold">
                Temps restant : {Math.floor(timer / 60)}:{(timer % 60).toString().padStart(2, '0')}
            </div>

            {/* Barre de progression */}
            <div className="w-full bg-gray-300 rounded-full h-3 mb-6">
                <div
                    className="bg-blue-600 h-3 rounded-full transition-all duration-500"
                    style={{ width: `${progressPercent}%` }}
                    aria-label={`Progression ${progressPercent}%`}
                />
            </div>

            {/* Question */}
            <Question
                question={questions[current].question}
                options={questions[current].options}
                selected={selected}
                onSelect={handleSelect}
            />

            {/* Bouton valider */}
            <motion.button
                onClick={handleValidate}
                disabled={selected === null}
                whileHover={selected !== null ? { scale: 1.05 } : {}}
                animate={selected !== null ? { boxShadow: '0 0 8px rgba(59, 130, 246, 0.8)' } : { boxShadow: 'none' }}
                transition={{ duration: 0.3, yoyo: Infinity }}
                className={`mt-6 w-full py-3 rounded-lg font-semibold text-white ${selected !== null ? 'bg-blue-600 cursor-pointer' : 'bg-gray-400 cursor-not-allowed'
                    }`}
            >
                Valider
            </motion.button>
        </div>
    );
}
