import React, { useState, useEffect } from 'react';
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
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-8 sm:p-10 text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-teal-400 to-teal-600"></div>
        
        {!isFinished ? (
          <div className="space-y-8">
            <div className="p-8 bg-slate-900 rounded-2xl text-lg sm:text-2xl font-medium text-slate-500 leading-relaxed select-none font-mono text-left shadow-inner border border-slate-800">
              {text.split('').map((char, index) => {
                let color = 'text-slate-600';
                if (index < input.length) {
                  color = input[index] === char ? 'text-teal-400 text-shadow-glow' : 'text-red-400 bg-red-900/30 rounded';
                }
                return <span key={index} className={`${color} transition-colors duration-100`}>{char}</span>;
              })}
            </div>
            <div className="relative">
                <input
                type="text"
                value={input}
                onChange={handleChange}
                className="w-full p-5 bg-slate-100 border-2 border-slate-200 text-slate-900 rounded-xl focus:border-teal-500 focus:bg-white focus:outline-none text-xl font-mono placeholder-slate-400 transition-all shadow-sm focus:shadow-md"
                placeholder="Start typing the text above..."
                autoFocus
                />
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-xs font-bold text-slate-400 uppercase tracking-widest">
                    Timer Active
                </div>
            </div>
          </div>
        ) : (
          <div className="space-y-8 animate-[fadeIn_0.5s_ease-out]">
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-teal-50 p-8 rounded-2xl border border-teal-100 transform hover:scale-105 transition-transform duration-300">
                <p className="text-xs text-teal-600 uppercase font-bold tracking-widest mb-2">Speed</p>
                <p className="text-5xl font-extrabold text-teal-700">{wpm} <span className="text-xl font-medium text-teal-600">WPM</span></p>
              </div>
              <div className="bg-orange-50 p-8 rounded-2xl border border-orange-100 transform hover:scale-105 transition-transform duration-300">
                <p className="text-xs text-orange-600 uppercase font-bold tracking-widest mb-2">Accuracy</p>
                <p className="text-5xl font-extrabold text-orange-700">{accuracy}<span className="text-2xl">%</span></p>
              </div>
            </div>

            <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100 text-left shadow-sm">
              <h3 className="font-bold text-slate-800 mb-3 flex items-center">
                 <span className="w-2 h-2 bg-teal-500 rounded-full mr-2"></span>
                 Mentor Feedback
              </h3>
              {loadingFeedback ? (
                <div className="space-y-2 animate-pulse">
                    <div className="h-4 bg-slate-200 rounded w-3/4"></div>
                    <div className="h-4 bg-slate-200 rounded w-1/2"></div>
                </div>
              ) : (
                <p className="text-slate-600 leading-relaxed">{feedback}</p>
              )}
            </div>

            <button 
              onClick={startNewTest}
              className="px-10 py-4 bg-gradient-to-r from-teal-600 to-teal-500 hover:from-teal-500 hover:to-teal-400 text-white font-bold rounded-xl transition-all transform hover:scale-105 shadow-lg shadow-teal-500/30"
            >
              Try Another Quote
            </button>
          </div>
        )}
      </div>

      {history.length > 0 && (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
          <h3 className="text-lg font-bold mb-4 text-slate-800 px-2">Recent History</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {history.map((res, idx) => (
              <div key={idx} className="p-4 bg-slate-50 rounded-xl border border-slate-100 flex justify-between items-center group hover:border-teal-200 transition-colors">
                <span className="text-xs text-slate-400 font-medium">{res.date}</span>
                <span className="font-bold text-slate-700 group-hover:text-teal-600 transition-colors">{res.wpm} WPM <span className="text-slate-300 mx-1">/</span> {res.accuracy}%</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TypingCoach;