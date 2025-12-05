import React from 'react';
import { DEVELOPER_PROFILE } from '../constants';
import { Language } from '../types';

interface AboutProps {
  lang: Language;
}

const About: React.FC<AboutProps> = ({ lang }) => {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="bg-gradient-to-r from-teal-600 to-teal-800 p-8 text-white">
          <h2 className="text-3xl font-bold mb-2">MentorBridge</h2>
          <p className="opacity-90">{lang === 'en' ? 'Empowering Careers through AI' : 'AI மூலம் வேலைவாய்ப்புகளை மேம்படுத்துதல்'}</p>
        </div>
        
        <div className="p-8 space-y-6">
          <div className="prose max-w-none text-slate-700">
             <h3 className="text-xl font-bold text-slate-900 mb-4">About the Developer</h3>
             <div className="bg-slate-50 p-6 rounded-lg border border-slate-100 whitespace-pre-line leading-7">
               {DEVELOPER_PROFILE}
             </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
            <a 
              href="https://wa.me/916383969289" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center justify-center space-x-2 bg-green-500 hover:bg-green-600 text-white py-3 px-4 rounded-lg font-medium transition-colors shadow-sm hover:shadow-md"
            >
              <span>WhatsApp</span>
            </a>
            <a 
              href="mailto:faizalmd10101@gmail.com"
              className="flex items-center justify-center space-x-2 bg-slate-700 hover:bg-slate-800 text-white py-3 px-4 rounded-lg font-medium transition-colors shadow-sm hover:shadow-md"
            >
              <span>Email Me</span>
            </a>
            <a 
              href="https://www.linkedin.com/in/mohammed-faizal-m-b3242b311/"
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center justify-center space-x-2 bg-[#0077b5] hover:bg-[#006097] text-white py-3 px-4 rounded-lg font-medium transition-colors shadow-sm hover:shadow-md"
            >
              <span>LinkedIn</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
