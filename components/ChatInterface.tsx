import React, { useState, useRef, useEffect } from 'react';
import { getGeminiResponse } from '../services/geminiService';
import { ChatMessage, Language } from '../types';
import { IconSend, IconImage, IconTrash, IconLogo } from './Icons';
import { TRANSLATIONS } from '../constants';

interface ChatInterfaceProps {
  mode: string;
  lang: Language;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ mode, lang }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const t = TRANSLATIONS[lang];

  // Reset chat when mode changes
  useEffect(() => {
    setMessages([{
      id: 'welcome',
      role: 'model',
      text: lang === 'en' 
        ? `Hello! I am ready to help you with ${mode.replace('-', ' ')}. How can I assist you today?`
        : `வணக்கம்! நான் உங்களுக்கு உதவ தயாராக உள்ளேன்.`,
      timestamp: new Date()
    }]);
    setInput('');
    setSelectedImage(null);
  }, [mode, lang]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSend = async () => {
    if ((!input.trim() && !selectedImage) || isLoading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: input,
      image: selectedImage || undefined,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setSelectedImage(null);
    setIsLoading(true);

    const responseText = await getGeminiResponse(userMsg.text, mode, lang, userMsg.image);

    const aiMsg: ChatMessage = {
      id: (Date.now() + 1).toString(),
      role: 'model',
      text: responseText,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, aiMsg]);
    setIsLoading(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-180px)] bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden relative">
      <div className="absolute inset-0 bg-slate-50/30 pointer-events-none"></div>
      
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 relative z-10 custom-scrollbar">
        {messages.map((msg, idx) => (
          <div 
            key={msg.id} 
            className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'} animate-[fadeIn_0.3s_ease-out]`}
          >
            <div className={`flex items-end gap-2 max-w-[85%] sm:max-w-[75%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                {msg.role === 'model' && (
                    <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center text-teal-600 border border-teal-200 flex-shrink-0">
                        <IconLogo className="w-5 h-5" />
                    </div>
                )}
                <div 
                  className={`rounded-2xl px-5 py-3.5 text-sm sm:text-base leading-relaxed whitespace-pre-wrap shadow-sm ${
                    msg.role === 'user' 
                      ? 'bg-slate-800 text-white rounded-br-none' 
                      : 'bg-white text-slate-700 border border-slate-100 rounded-bl-none'
                  }`}
                >
                  {msg.image && (
                    <img 
                      src={msg.image} 
                      alt="User uploaded" 
                      className="mb-3 max-w-full rounded-lg max-h-60 border border-white/20"
                    />
                  )}
                  {msg.text}
                </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start items-center gap-2">
             <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center text-teal-600 border border-teal-200 flex-shrink-0">
                <IconLogo className="w-5 h-5" />
             </div>
             <div className="bg-white border border-slate-100 rounded-2xl rounded-bl-none px-5 py-4 flex items-center space-x-2 shadow-sm">
                <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
             </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white border-t border-slate-100 relative z-10">
        {selectedImage && (
          <div className="mb-2 relative inline-block animate-[fadeIn_0.2s]">
            <img src={selectedImage} alt="Preview" className="h-16 w-auto rounded-lg border border-slate-200 shadow-sm" />
            <button 
              onClick={() => setSelectedImage(null)}
              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 shadow-sm transition-colors"
            >
              <IconTrash className="w-3 h-3" />
            </button>
          </div>
        )}
        <div className="flex items-center space-x-2 bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 focus-within:ring-2 focus-within:ring-teal-500/50 focus-within:border-teal-500 transition-all shadow-inner">
          <input 
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            className="hidden"
          />
          <button 
            onClick={() => fileInputRef.current?.click()}
            className="text-slate-400 hover:text-teal-600 transition-colors p-1.5 hover:bg-white rounded-lg"
            title="Upload Image"
          >
            <IconImage className="w-5 h-5" />
          </button>
          <input 
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder={t.placeholder}
            className="flex-1 bg-transparent focus:outline-none text-slate-700 placeholder-slate-400"
            disabled={isLoading}
          />
          <button 
            onClick={handleSend}
            disabled={isLoading || (!input.trim() && !selectedImage)}
            className={`p-2 rounded-xl transition-all duration-300 ${
              (input.trim() || selectedImage) 
                ? 'bg-teal-600 text-white shadow-lg shadow-teal-600/20 hover:bg-teal-700 transform hover:scale-105 active:scale-95' 
                : 'bg-slate-200 text-slate-400 cursor-not-allowed'
            }`}
          >
            <IconSend className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;