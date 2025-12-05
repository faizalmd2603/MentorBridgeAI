
import React, { useState, useEffect, useRef } from 'react';
import { TYPING_SENTENCES, TRANSLATIONS } from '../constants';
import { Language, TypingResult } from '../types';
import { getTypingFeedback } from '../services/geminiService';

interface TypingCoachProps {
  lang: Language;
}

const TypingCoach: React.FC<TypingCoachProps> = ({ lang }) => {
  const [text, setText] = useState('');
  const [input, setInput] = useState('');
  const [startTime, setStartTime] = useState<number | null>(null);
  const [isFinished, setIsFinished] = useState(false);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(0);
  const [feedback, setFeedback] = useState<string>('');
  const [loadingFeedback, setLoadingFeedback] = useState(false);
  const [history, setHistory] = useState<TypingResult[]>([]);
  const t = TRANSLATIONS[lang];

  useEffect(() => {
    startNewTest();
    const saved = localStorage.getItem('mentorbridge_typing_history');
    if (saved) {
      setHistory(JSON.parse(saved));
    }
  }, []);

  const startNewTest = () => {
    const randomIndex = Math.floor(Math.random() * TYPING_SENTENCES.length);
    setText(TYPING_SENTENCES[randomIndex]);
    setInput('');
    setStartTime(null);
    setIsFinished(false);
    setWpm(0);
    setAccuracy(0);
    setFeedback('');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    
    if (startTime === null) {
      setStartTime(Date.now());
    }

    setInput(val);

    if (val.length === text.length) {
      finishTest(val);
    }
  };

  const finishTest = async (finalInput: string) => {
    setIsFinished(true);
    const endTime = Date.now();
    const durationMinutes = (endTime - (startTime || endTime)) / 60000;
    
    // WPM: (characters / 5) / minutes
    const calculatedWpm = Math.round((finalInput.length / 5) / (durationMinutes || 0.01));
    
    // Accuracy
    let correctChars = 0;
    for (let i = 0; i < finalInput.length; i++) {
      if (finalInput[i] === text[i]) correctChars++;
    }
    const calculatedAccuracy = Math.round((correctChars / text.length) * 100);

    setWpm(calculatedWpm);
    setAccuracy(calculatedAccuracy);

    // Save history
    const newResult: TypingResult = { wpm: calculatedWpm, accuracy: calculatedAccuracy, date: new Date().toLocaleDateString() };
    const newHistory = [newResult, ...history].slice(0, 5); // Keep last 5
    setHistory(newHistory);
    localStorage.setItem('mentorbridge_typing_history', JSON.stringify(newHistory));

    // Get AI Feedback
    setLoadingFeedback(true);
    const statsMsg = `I just completed a typing test. WPM: ${calculatedWpm}, Accuracy: ${calculatedAccuracy}%. Text was: "${text}".`;
    const aiFeedback = await getTypingFeedback(statsMsg, lang);
    setFeedback(aiFeedback);
    setLoadingFeedback(false);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8 text-center">
        <h2 className="text-2xl font-bold text-slate-800 mb-6">{t.typing}</h2>
        
        {!isFinished ? (
          <div className="space-y-6">
            <div className="p-6 bg-slate-900 rounded-lg text-lg font-medium text-slate-400 leading-relaxed select-none font-mono text-left">
              {text.split('').map((char, index) => {
                let color = 'text-slate-400';
                if (index < input.length) {
                  color = input[index] === char ? 'text-teal-400' : 'text-red-400 bg-red-900/50';
                }
                return <span key={index} className={color}>{char}</span>;
              })}
            </div>
            <input
              type="text"
              value={input}
              onChange={handleChange}
              className="w-full p-4 border-2 border-slate-700 bg-slate-800 text-white rounded-lg focus:border-teal-500 focus:outline-none text-lg font-mono placeholder-slate-500"
              placeholder="Start typing the text above..."
              autoFocus
            />
          </div>
        ) : (
          <div className="space-y-6 animate-fade-in">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-teal-50 p-6 rounded-lg border border-teal-100">
                <p className="text-sm text-teal-600 uppercase font-bold tracking-wider">Speed</p>
                <p className="text-4xl font-bold text-teal-800">{wpm} <span className="text-lg font-normal">WPM</span></p>
              </div>
              <div className="bg-orange-50 p-6 rounded-lg border border-orange-100">
                <p className="text-sm text-orange-600 uppercase font-bold tracking-wider">Accuracy</p>
                <p className="text-4xl font-bold text-orange-800">{accuracy}%</p>
              </div>
            </div>

            <div className="bg-slate-50 p-6 rounded-lg text-left">
              <h3 className="font-bold text-slate-700 mb-2">Mentor Feedback:</h3>
              {loadingFeedback ? (
                <div className="animate-pulse h-4 bg-slate-300 rounded w-3/4"></div>
              ) : (
                <p className="text-slate-600">{feedback}</p>
              )}
            </div>

            <button 
              onClick={startNewTest}
              className="px-8 py-3 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-lg transition-colors"
            >
              Try Another Quote
            </button>
          </div>
        )}
      </div>

      {history.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h3 className="text-lg font-semibold mb-4 text-slate-700">Recent History</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {history.map((res, idx) => (
              <div key={idx} className="p-3 bg-slate-50 rounded border border-slate-100 flex justify-between items-center text-sm">
                <span className="text-slate-500">{res.date}</span>
                <span className="font-medium text-slate-800">{res.wpm} WPM / {res.accuracy}%</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TypingCoach;
