import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Question({ question, options, selected, onSelect }) {
    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={question}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.5 }}
                className="bg-white p-6 rounded-lg shadow-md"
            >
                <h2 className="text-xl font-semibold mb-4">{question}</h2>
                <div className="space-y-3">
                    {options.map((option, idx) => (
                        <button
                            key={idx}
                            onClick={() => onSelect(idx)}
                            className={`block w-full text-left px-4 py-2 rounded-md border transition-colors duration-200
                ${selected === idx ? 'bg-blue-600 text-white border-blue-700' : 'bg-gray-100 border-gray-300 hover:bg-gray-200'}`}
                        >
                            {idx + 1}. {option}
                        </button>
                    ))}
                </div>
            </motion.div>
        </AnimatePresence>
    );
}
