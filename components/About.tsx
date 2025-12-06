import React, { useState } from 'react';
import { Language } from '../types';
import { IconUser, IconLogo } from './Icons';

interface AboutProps {
  lang: Language;
}

const About: React.FC<AboutProps> = ({ lang }) => {
  // We try to use the image path provided by the user. 
  // If the image fails to load (not present in project), we fallback to the IconUser.
  const [imgError, setImgError] = useState(false);
  const developerImageSrc = "/face.jpg"; 

  return (
    <div className="max-w-5xl mx-auto p-4 pb-12 space-y-8 animate-[fadeIn_0.5s_ease-out]">
      
      {/* Hero Profile Card - Dark Theme Professional */}
      <div className="relative bg-slate-900 rounded-3xl overflow-hidden shadow-2xl group border border-slate-800">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-teal-900/40 animate-gradient-xy"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500/10 rounded-full blur-[80px] -mr-20 -mt-20"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-orange-500/10 rounded-full blur-[60px] -ml-20 -mb-20"></div>
        
        <div className="relative z-10 flex flex-col md:flex-row items-center p-8 md:p-12 gap-10">
            
            {/* Image Container with Glow */}
            <div className="relative flex-shrink-0 group-hover:scale-105 transition-transform duration-500">
                <div className="absolute -inset-1 bg-gradient-to-r from-teal-500 to-orange-500 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-500"></div>
                <div className="relative w-48 h-48 md:w-56 md:h-56 rounded-full overflow-hidden border-4 border-slate-900 bg-slate-800 flex items-center justify-center shadow-2xl">
                    {!imgError ? (
                        <img 
                            src={developerImageSrc} 
                            alt="Mohammed Faizal M" 
                            className="w-full h-full object-cover"
                            onError={() => setImgError(true)}
                        />
                    ) : (
                        <IconUser className="w-24 h-24 text-slate-500" />
                    )}
                </div>
                <div className="absolute bottom-4 right-4 w-6 h-6 bg-teal-500 border-4 border-slate-900 rounded-full"></div>
            </div>

            {/* Profile Info */}
            <div className="text-center md:text-left flex-1">
                <div className="flex flex-col md:flex-row items-center md:items-start justify-between mb-4">
                    <div>
                        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-2 tracking-tight">
                            Mohammed Faizal M
                        </h1>
                        <p className="text-xl text-teal-400 font-medium tracking-wide">
                            B.Com Student & HR Enthusiast
                        </p>
                    </div>
                    <div className="mt-4 md:mt-0">
                        <span className="inline-flex items-center px-4 py-2 rounded-full bg-teal-500/20 text-teal-300 text-xs font-bold uppercase tracking-wider border border-teal-500/30 shadow-lg shadow-teal-500/10">
                            <span className="w-2 h-2 bg-teal-400 rounded-full mr-2 animate-pulse"></span>
                            Open to Work
                        </span>
                    </div>
                </div>

                <p className="text-slate-300 leading-relaxed text-lg max-w-2xl mx-auto md:mx-0 font-light mb-8">
                   {lang === 'en' 
                     ? "Passionate about Human Resources, Management, Business Development, and Artificial Intelligence. Creating innovative tools like MentorBridge to bridge the gap between academic learning and professional success."
                     : "மனித வள மேலாண்மை, வணிக மேம்பாடு மற்றும் செயற்கை நுண்ணறிவில் ஆர்வம் கொண்டவர். கல்வி மற்றும் தொழில் வெற்றிக்கு இடையே உள்ள இடைவெளியைக் குறைக்க MentorBridge போன்ற கருவிகளை உருவாக்குகிறார்."
                   }
                </p>

                {/* Social Actions */}
                <div className="flex flex-wrap justify-center md:justify-start gap-4">
                    <a href="https://wa.me/916383969289" target="_blank" rel="noopener noreferrer" className="px-6 py-3 bg-green-600 hover:bg-green-500 text-white rounded-xl font-bold transition-all transform hover:-translate-y-1 hover:shadow-lg hover:shadow-green-600/30 flex items-center">
                        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.592 2.654-.698c1.005.549 1.938.835 3.097.835 3.182 0 5.768-2.587 5.769-5.766.001-3.181-2.584-5.768-5.76-5.768zm0 10.334c-1.071 0-1.921-.29-2.75-.81l-.348-.216-1.57.412.42-1.529-.215-.341c-.6-.948-.916-1.802-.916-2.903.001-2.722 2.215-4.936 4.938-4.936 2.721 0 4.937 2.215 4.937 4.936 0 2.721-2.215 4.936-4.938 4.936z"/></svg>
                        WhatsApp
                    </a>
                    <a href="https://www.linkedin.com/in/mohammed-faizal-m-b3242b311/" target="_blank" rel="noopener noreferrer" className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold transition-all transform hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-600/30 flex items-center">
                        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                        LinkedIn
                    </a>
                    <a href="mailto:faizalmd10101@gmail.com" className="px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-xl font-bold transition-all transform hover:-translate-y-1 hover:shadow-lg flex items-center">
                         Email Me
                    </a>
                </div>
            </div>
        </div>
      </div>

      {/* Skills & Experience Grid */}
      <div className="grid md:grid-cols-2 gap-6">
         <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
             <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center">
                <span className="w-10 h-10 bg-teal-100 text-teal-600 rounded-lg flex items-center justify-center mr-3">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                </span>
                Core Skills
             </h3>
             <div className="flex flex-wrap gap-2">
                {['Communication', 'HR Management', 'Accounting', 'Recruiting', 'Interviewing', 'Data Management', 'AI Prompting', 'Canva', 'Photoshop'].map(skill => (
                    <span key={skill} className="px-4 py-2 bg-slate-50 hover:bg-teal-50 text-slate-600 hover:text-teal-700 font-semibold rounded-lg border border-slate-100 hover:border-teal-200 transition-all cursor-default">
                        {skill}
                    </span>
                ))}
             </div>
         </div>

         <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
             <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center">
                <span className="w-10 h-10 bg-orange-100 text-orange-600 rounded-lg flex items-center justify-center mr-3">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                </span>
                Experience
             </h3>
             <ul className="space-y-4">
                 <li className="flex items-start">
                     <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                     <div>
                         <p className="font-bold text-slate-800">Shine Projects</p>
                         <p className="text-sm text-slate-500">HR Intern (Virtual)</p>
                     </div>
                 </li>
                 <li className="flex items-start">
                     <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                     <div>
                         <p className="font-bold text-slate-800">Yuva Intern</p>
                         <p className="text-sm text-slate-500">HR Assistance Job Simulation</p>
                     </div>
                 </li>
                 <li className="flex items-start">
                     <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                     <div>
                         <p className="font-bold text-slate-800">Oasis Infobyte</p>
                         <p className="text-sm text-slate-500">Graphic Design Intern</p>
                     </div>
                 </li>
             </ul>
         </div>
      </div>

      {/* App Info Card */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-3xl p-8 text-white relative overflow-hidden shadow-xl border border-slate-700">
         <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl -mr-10 -mt-10"></div>
         <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
             <div className="flex items-center gap-4">
                <div className="p-3 bg-white/10 rounded-2xl backdrop-blur-sm">
                    <IconLogo className="w-8 h-8" />
                </div>
                <div>
                    <h2 className="text-xl font-bold">MentorBridge</h2>
                    <p className="text-slate-400 text-sm">Version 1.0.0 • Free Release</p>
                </div>
             </div>
             <p className="text-center md:text-right text-slate-400 text-sm max-w-md">
                 Built with React, Gemini AI, and a passion for student success. <br/>
                 Made in Chennai, India.
             </p>
         </div>
      </div>
    </div>
  );
};

export default About;