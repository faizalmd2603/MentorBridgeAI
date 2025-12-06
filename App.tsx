import React, { useState, useEffect } from 'react';
import { TRANSLATIONS } from './constants';
import { User, Language, AppMode } from './types';
import { 
  IconHome, IconBriefcase, IconKeyboard, 
  IconCalculator, IconUsers, IconFileText, 
  IconUser, IconMenu, IconX, IconLogo 
} from './components/Icons';
import TypingCoach from './components/TypingCoach';
import ChatInterface from './components/ChatInterface';
import About from './components/About';

// --- Cinematic Welcome Screen ---
const WelcomeIntro: React.FC<{ name: string; onComplete: () => void; lang: Language }> = ({ name, onComplete, lang }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 4500); 
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 bg-slate-900 flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-teal-900 to-slate-900 animate-gradient-xy opacity-80" />
      <div className="relative z-10 text-center px-6">
        <div className="mb-6 opacity-0 animate-[fadeIn_1s_ease-out_0.5s_forwards]">
          <IconLogo className="w-24 h-24 mx-auto drop-shadow-[0_0_15px_rgba(20,184,166,0.5)]" />
        </div>
        <h1 className="text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-teal-200 via-white to-teal-200 mb-4 reveal-text" style={{ animationDelay: '1s' }}>
          {lang === 'en' ? 'Welcome,' : 'வணக்கம்,'} {name}
        </h1>
        <p className="text-xl md:text-2xl text-teal-400 font-light tracking-wider opacity-0 animate-[fadeInUp_1s_ease-out_2s_forwards]">
          {lang === 'en' ? 'Your Journey Begins Now' : 'உங்கள் பயணம் இப்போது தொடங்குகிறது'}
        </p>
        <div className="mt-12 flex justify-center space-x-2 opacity-0 animate-[fadeIn_0.5s_ease-out_3s_forwards]">
          <div className="w-2 h-2 bg-teal-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
          <div className="w-2 h-2 bg-teal-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
          <div className="w-2 h-2 bg-teal-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
        </div>
      </div>
    </div>
  );
};

// --- Terms and Conditions Screen ---
const TermsScreen: React.FC<{ onAccept: () => void; lang: Language }> = ({ onAccept, lang }) => {
  const t = TRANSLATIONS[lang];
  return (
    <div className="fixed inset-0 z-40 bg-slate-900 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 animate-gradient-xy"></div>
      
      <div className="glass-card max-w-2xl w-full p-8 rounded-3xl relative z-10 shadow-2xl animate-[fadeInUp_0.6s_ease-out]">
        <div className="text-center mb-8">
           <div className="w-16 h-16 bg-teal-500/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-teal-500/20">
              <IconFileText className="w-8 h-8 text-teal-400" />
           </div>
           <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">{t.termsTitle}</h2>
           <div className="h-1 w-20 bg-teal-500 mx-auto rounded-full"></div>
        </div>

        <div className="space-y-4 mb-8">
           {t.termsList.map((term, idx) => (
             <div key={idx} className="flex items-start bg-slate-800/50 p-4 rounded-xl border border-slate-700">
                <div className="w-6 h-6 bg-teal-500/20 rounded-full flex items-center justify-center text-teal-400 font-bold text-xs mt-0.5 flex-shrink-0 mr-3 border border-teal-500/30">
                  {idx + 1}
                </div>
                <p className="text-slate-300 text-sm leading-relaxed">{term}</p>
             </div>
           ))}
        </div>

        <button 
          onClick={onAccept}
          className="w-full py-4 bg-gradient-to-r from-teal-600 to-teal-500 hover:from-teal-500 hover:to-teal-400 text-white rounded-xl font-bold text-lg tracking-wide shadow-lg shadow-teal-500/25 transition-all transform hover:scale-[1.02] active:scale-95 flex items-center justify-center group"
        >
          {t.termsAccept}
          <span className="ml-2 group-hover:translate-x-1 transition-transform">&rarr;</span>
        </button>
      </div>
    </div>
  );
};

// --- Modern Auth Component ---
const Auth: React.FC<{ onLogin: (user: User) => void; lang: Language; setLang: (l: Language) => void }> = ({ onLogin, lang, setLang }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [showHelp, setShowHelp] = useState(true);
  const t = TRANSLATIONS[lang];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError(t.errorFillFields);
      return;
    }

    if (!isLogin) {
      if (!name) {
        setError(t.errorFillFields);
        return;
      }
      if (password !== confirmPassword) {
        setError(t.errorPasswordMismatch);
        return;
      }
    }

    const db = JSON.parse(localStorage.getItem('mentorbridge_users_db') || '{}');
    const normalizedEmail = email.toLowerCase().trim();

    if (isLogin) {
      const userRecord = db[normalizedEmail];
      if (userRecord) {
        if (userRecord.password === password) {
          const user: User = { name: userRecord.name, email: userRecord.email };
          localStorage.setItem('mentorbridge_user', JSON.stringify(user));
          onLogin(user);
        } else {
          setError(t.errorIncorrectPassword);
        }
      } else {
         setError(t.errorUserNotFound);
      }
    } else {
      if (db[normalizedEmail]) {
        setError(t.errorUserExists);
        return;
      }
      
      const newUser = { name, email: normalizedEmail, password };
      db[normalizedEmail] = newUser;
      localStorage.setItem('mentorbridge_users_db', JSON.stringify(db));
      
      const user: User = { name, email: normalizedEmail };
      localStorage.setItem('mentorbridge_user', JSON.stringify(user));
      onLogin(user);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-[#0f2e2e] to-slate-900 animate-gradient-xy"></div>
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-teal-600/20 rounded-full blur-[100px] float"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-orange-500/10 rounded-full blur-[100px] float" style={{ animationDelay: '-2s' }}></div>

      <div className="absolute top-6 right-6 z-20">
        <button 
          onClick={() => setLang(lang === 'en' ? 'ta' : 'en')}
          className="glass px-4 py-2 rounded-full text-sm font-semibold text-teal-300 hover:bg-white/10 transition-all border border-white/10 hover:border-teal-400"
        >
          {lang === 'en' ? 'தமிழ்' : 'English'}
        </button>
      </div>

      {/* Login Help Floating Box */}
      <div className={`fixed top-24 right-4 md:right-10 max-w-xs z-30 transition-all duration-500 ${showHelp ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10 pointer-events-none'}`}>
        <div className="glass p-4 rounded-2xl border border-teal-500/30 shadow-lg relative">
            <button onClick={() => setShowHelp(false)} className="absolute top-2 right-2 text-slate-400 hover:text-white"><IconX className="w-4 h-4"/></button>
            <div className="flex items-center gap-2 mb-2 text-teal-300 font-bold text-sm">
                <IconUser className="w-4 h-4" />
                {t.loginHelpTitle}
            </div>
            <p className="text-slate-300 text-xs whitespace-pre-line leading-relaxed">{t.loginHelpText}</p>
        </div>
      </div>

      <div className="w-full max-w-md relative z-10 perspective-1000">
        <div className="glass p-8 rounded-3xl shadow-2xl border border-white/10 backdrop-blur-xl transition-all duration-500 hover:shadow-teal-900/50 hover:border-teal-500/30">
          <div className="text-center flex flex-col items-center mb-8">
            <div className="w-20 h-20 mb-4 bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl flex items-center justify-center shadow-lg border border-white/5 transform transition-transform hover:scale-110 duration-300">
               <IconLogo className="w-12 h-12" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">{t.welcome}</h1>
            <p className="text-slate-400 text-sm">{t.subtitle}</p>
          </div>

          <div className="flex justify-center mb-8 bg-slate-800/50 p-1 rounded-xl">
            <button 
              className={`flex-1 py-2 rounded-lg font-medium transition-all duration-300 ${isLogin ? 'bg-teal-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
              onClick={() => { setIsLogin(true); setError(''); }}
            >
              {t.login}
            </button>
            <button 
              className={`flex-1 py-2 rounded-lg font-medium transition-all duration-300 ${!isLogin ? 'bg-teal-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
              onClick={() => { setIsLogin(false); setError(''); }}
            >
              {t.signup}
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {!isLogin && (
              <div className="group">
                <label className="block text-xs font-bold text-teal-400 uppercase mb-1 ml-1 group-focus-within:text-teal-300 transition-colors">{t.nameLabel}</label>
                <input 
                  type="text" 
                  value={name} 
                  onChange={e => setName(e.target.value)}
                  className="w-full px-5 py-3 bg-slate-900/50 border border-slate-600 rounded-xl text-white focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all placeholder-slate-600 hover:bg-slate-900/70"
                  placeholder="Ex: Mohammed Faizal"
                />
              </div>
            )}
            <div className="group">
              <label className="block text-xs font-bold text-teal-400 uppercase mb-1 ml-1 group-focus-within:text-teal-300 transition-colors">{t.email}</label>
              <input 
                type="email" 
                value={email} 
                onChange={e => setEmail(e.target.value)}
                className="w-full px-5 py-3 bg-slate-900/50 border border-slate-600 rounded-xl text-white focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all placeholder-slate-600 hover:bg-slate-900/70"
                placeholder="you@example.com"
              />
            </div>
            <div className="group">
              <label className="block text-xs font-bold text-teal-400 uppercase mb-1 ml-1 group-focus-within:text-teal-300 transition-colors">{t.password}</label>
              <input 
                type="password" 
                value={password} 
                onChange={e => setPassword(e.target.value)}
                className="w-full px-5 py-3 bg-slate-900/50 border border-slate-600 rounded-xl text-white focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all placeholder-slate-600 hover:bg-slate-900/70" 
                placeholder="••••••••"
              />
            </div>
            {!isLogin && (
              <div className="group">
                <label className="block text-xs font-bold text-teal-400 uppercase mb-1 ml-1 group-focus-within:text-teal-300 transition-colors">{t.confirmPassword}</label>
                <input 
                  type="password" 
                  value={confirmPassword} 
                  onChange={e => setConfirmPassword(e.target.value)}
                  className="w-full px-5 py-3 bg-slate-900/50 border border-slate-600 rounded-xl text-white focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all placeholder-slate-600 hover:bg-slate-900/70" 
                  placeholder="••••••••"
                />
              </div>
            )}
            
            {error && <div className="text-red-300 text-sm bg-red-900/40 p-3 rounded-xl border border-red-500/30 flex items-center animate-pulse"><IconX className="w-4 h-4 mr-2" /> {error}</div>}
            
            <button type="submit" className="w-full bg-gradient-to-r from-teal-600 to-teal-500 hover:from-teal-500 hover:to-teal-400 text-white py-4 rounded-xl font-bold tracking-wide transition-all transform hover:scale-[1.02] hover:shadow-lg hover:shadow-teal-500/25 active:scale-95">
              {isLogin ? t.login : t.signup}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

// --- Main App ---
function App() {
  const [user, setUser] = useState<User | null>(null);
  const [lang, setLang] = useState<Language>('en');
  const [mode, setMode] = useState<AppMode>('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [appState, setAppState] = useState<'intro' | 'terms' | 'dashboard'>('dashboard');

  useEffect(() => {
    const savedUser = localStorage.getItem('mentorbridge_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    const savedLang = localStorage.getItem('mentorbridge_lang');
    if (savedLang) setLang(savedLang as Language);
  }, []);

  const handleLogin = (u: User) => {
    setUser(u);
    setAppState('intro'); // Start intro sequence on fresh login
  };

  const handleLangChange = (l: Language) => {
    setLang(l);
    localStorage.setItem('mentorbridge_lang', l);
  };

  const handleLogout = () => {
    localStorage.removeItem('mentorbridge_user');
    setUser(null);
    setMode('dashboard');
    setAppState('dashboard');
  };

  // If user is not logged in
  if (!user) {
    return <Auth onLogin={handleLogin} lang={lang} setLang={handleLangChange} />;
  }

  // Cinematic Intro Sequence
  if (appState === 'intro') {
    return <WelcomeIntro name={user.name} lang={lang} onComplete={() => setAppState('terms')} />;
  }

  // Terms and Conditions Sequence
  if (appState === 'terms') {
    return <TermsScreen lang={lang} onAccept={() => setAppState('dashboard')} />;
  }

  const t = TRANSLATIONS[lang];

  const NavItem = ({ m, icon: Icon, label }: { m: AppMode; icon: any; label: string }) => (
    <button
      onClick={() => { setMode(m); setIsSidebarOpen(false); }}
      className={`w-full flex items-center space-x-3 px-4 py-3.5 rounded-xl transition-all duration-300 group ${
        mode === m 
          ? 'bg-gradient-to-r from-teal-600 to-teal-500 text-white shadow-lg shadow-teal-500/30' 
          : 'text-slate-500 hover:bg-slate-50 hover:text-teal-600'
      }`}
    >
      <Icon className={`w-5 h-5 transition-transform duration-300 ${mode === m ? 'scale-110' : 'group-hover:scale-110 group-hover:rotate-3'}`} />
      <span className="font-semibold">{label}</span>
      {mode === m && <div className="ml-auto w-1.5 h-1.5 bg-white rounded-full animate-pulse" />}
    </button>
  );

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-sans">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-30 md:hidden transition-opacity" onClick={() => setIsSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`fixed md:relative z-40 bg-white border-r border-slate-200/60 w-72 h-full flex flex-col transition-transform duration-300 ease-spring transform ${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
      }`}>
        <div className="p-8 pb-4">
          <div className="flex items-center space-x-3 text-teal-800">
            <div className="p-2 bg-teal-50 rounded-xl">
               <IconLogo className="w-8 h-8" />
            </div>
            <div>
              <h1 className="font-extrabold text-xl tracking-tight leading-none">MentorBridge</h1>
              <span className="text-[10px] uppercase font-bold text-teal-500 tracking-widest">AI Platform</span>
            </div>
          </div>
        </div>

        <nav className="flex-1 px-4 py-4 space-y-2 overflow-y-auto custom-scrollbar">
          <NavItem m="dashboard" icon={IconHome} label={t.dashboard} />
          
          <div className="pt-6 pb-2 px-4 flex items-center space-x-2">
            <div className="h-px bg-slate-200 flex-1"></div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Workspace</span>
            <div className="h-px bg-slate-200 flex-1"></div>
          </div>
          
          <NavItem m="career" icon={IconBriefcase} label={t.career} />
          <NavItem m="typing" icon={IconKeyboard} label={t.typing} />
          <NavItem m="tally" icon={IconCalculator} label={t.tally} />
          <NavItem m="interview" icon={IconUsers} label={t.interview} />
          <NavItem m="resume" icon={IconFileText} label={t.resume} />
          
          <div className="mt-auto pt-6 border-t border-slate-100">
            <NavItem m="about" icon={IconUser} label={t.about} />
          </div>
        </nav>
        
        <div className="p-4">
            <div className="bg-slate-900 rounded-xl p-4 text-white relative overflow-hidden group cursor-pointer hover:shadow-lg transition-all" onClick={() => window.open('https://github.com', '_blank')}>
                <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10 transition-transform group-hover:scale-150 duration-500"></div>
                <p className="text-xs font-bold text-slate-400 mb-1">Developer</p>
                <p className="font-bold text-sm">Mohammed Faizal</p>
            </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-full overflow-hidden w-full relative bg-slate-50/50">
        {/* Header */}
        <header className="h-20 bg-white/80 backdrop-blur-md border-b border-slate-200/60 flex items-center justify-between px-6 sm:px-8 z-20 sticky top-0">
          <button className="md:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors" onClick={() => setIsSidebarOpen(true)}>
            <IconMenu />
          </button>
          
          <div className="flex-1 md:flex-none" />

          <div className="flex items-center space-x-6">
             <button 
              onClick={() => handleLangChange(lang === 'en' ? 'ta' : 'en')}
              className="text-xs font-bold uppercase tracking-wide text-slate-500 hover:text-teal-600 transition-all bg-white hover:bg-teal-50 px-4 py-2 rounded-full border border-slate-200 hover:border-teal-200 shadow-sm"
            >
              {lang === 'en' ? 'தமிழ்' : 'English'}
            </button>
            <div className="hidden sm:flex items-center space-x-3 pl-6 border-l border-slate-200 h-8">
              <div className="text-right">
                <p className="text-sm font-bold text-slate-800 leading-none mb-1">{user.name}</p>
                <button onClick={handleLogout} className="text-[10px] font-bold uppercase text-slate-400 hover:text-red-500 transition-colors tracking-wide block ml-auto">
                    {t.logout}
                </button>
              </div>
              <div className="w-10 h-10 bg-gradient-to-br from-teal-400 to-teal-600 rounded-xl flex items-center justify-center text-white font-bold shadow-md shadow-teal-500/20 transform hover:scale-105 transition-transform duration-300">
                {user.name ? user.name[0].toUpperCase() : 'U'}
              </div>
            </div>
          </div>
        </header>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto custom-scrollbar relative">
          
          {mode === 'dashboard' ? (
             <div className="p-6 sm:p-10 max-w-7xl mx-auto space-y-10 animate-[fadeIn_0.5s_ease-out]">
               
               {/* Hero Card */}
               <div className="relative bg-slate-900 rounded-3xl p-8 sm:p-12 text-white shadow-2xl overflow-hidden group">
                 <div className="absolute inset-0 bg-gradient-to-r from-teal-900 via-slate-900 to-slate-900 animate-gradient-xy opacity-80"></div>
                 <div className="absolute right-0 top-0 w-96 h-96 bg-teal-500/20 rounded-full blur-[80px] -mr-20 -mt-20 group-hover:bg-teal-500/30 transition-all duration-700"></div>
                 
                 <div className="relative z-10 max-w-2xl">
                    <span className="inline-block px-3 py-1 rounded-full bg-teal-500/20 border border-teal-500/30 text-teal-300 text-xs font-bold uppercase tracking-wider mb-4">
                        Free Access
                    </span>
                    <h2 className="text-3xl sm:text-5xl font-extrabold mb-4 leading-tight">
                        {t.welcome}, <br/>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-200 to-white">{user.name}</span>
                    </h2>
                    <p className="text-slate-300 text-lg sm:text-xl font-light mb-8 max-w-lg leading-relaxed">{t.subtitle}</p>
                    <button 
                        onClick={() => setMode('career')} 
                        className="bg-white text-teal-900 px-8 py-3 rounded-xl font-bold hover:bg-teal-50 transition-all transform hover:scale-105 hover:shadow-lg active:scale-95 flex items-center"
                    >
                        Get Started <span className="ml-2 text-xl">&rarr;</span>
                    </button>
                 </div>
                 <IconLogo className="absolute -right-10 -bottom-10 w-64 h-64 text-teal-800/20 transform rotate-12 group-hover:rotate-6 transition-transform duration-700 ease-out" />
               </div>

               {/* Grid Cards */}
               <div>
                 <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center">
                    <span className="w-1 h-6 bg-teal-500 rounded-full mr-3"></span>
                    Available Agents
                 </h3>
                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                   {[
                     { id: 'career', label: t.career, icon: IconBriefcase, color: 'text-blue-600', bg: 'bg-blue-50', gradient: 'hover:from-blue-50 hover:to-blue-100' },
                     { id: 'typing', label: t.typing, icon: IconKeyboard, color: 'text-purple-600', bg: 'bg-purple-50', gradient: 'hover:from-purple-50 hover:to-purple-100' },
                     { id: 'tally', label: t.tally, icon: IconCalculator, color: 'text-green-600', bg: 'bg-green-50', gradient: 'hover:from-green-50 hover:to-green-100' },
                     { id: 'interview', label: t.interview, icon: IconUsers, color: 'text-orange-600', bg: 'bg-orange-50', gradient: 'hover:from-orange-50 hover:to-orange-100' },
                     { id: 'resume', label: t.resume, icon: IconFileText, color: 'text-rose-600', bg: 'bg-rose-50', gradient: 'hover:from-rose-50 hover:to-rose-100' },
                   ].map((item) => (
                     <button
                       key={item.id}
                       onClick={() => setMode(item.id as AppMode)}
                       className={`group relative bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-300 text-left overflow-hidden bg-gradient-to-br ${item.gradient} transform hover:-translate-y-2`}
                     >
                       <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity transform group-hover:scale-110 duration-500">
                          <item.icon className={`w-24 h-24 ${item.color}`} />
                       </div>
                       
                       <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${item.bg} ${item.color} shadow-inner group-hover:scale-110 transition-transform duration-300`}>
                          <item.icon className="w-7 h-7" />
                       </div>
                       <h3 className="font-bold text-xl text-slate-800 group-hover:text-slate-900 mb-1">{item.label}</h3>
                       <p className="text-slate-400 text-sm font-medium group-hover:text-slate-600 transition-colors">AI Powered Agent</p>
                       
                       <div className="mt-6 flex items-center text-sm font-bold text-teal-600 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                          Launch Tool <span className="ml-1">&rarr;</span>
                       </div>
                     </button>
                   ))}
                 </div>
               </div>
               
               <div className="mt-12 text-center border-t border-slate-200 pt-8 pb-4">
                  <p className="text-slate-400 text-xs font-medium tracking-wide">{t.footer}</p>
               </div>
             </div>
          ) : mode === 'typing' ? (
            <div className="animate-[fadeIn_0.3s_ease-out] p-4">
                <div className="max-w-4xl mx-auto mb-6 flex items-center">
                    <button onClick={() => setMode('dashboard')} className="p-2 hover:bg-white rounded-full transition-colors mr-4 text-slate-500 hover:text-teal-600 shadow-sm border border-transparent hover:border-slate-200">
                        <span className="text-xl">&larr;</span>
                    </button>
                    <h2 className="text-2xl font-bold text-slate-800">{t.typing}</h2>
                </div>
                <TypingCoach lang={lang} />
            </div>
          ) : mode === 'about' ? (
            <div className="animate-[fadeIn_0.3s_ease-out]">
                <div className="max-w-5xl mx-auto p-4 mb-2 flex items-center">
                    <button onClick={() => setMode('dashboard')} className="p-2 hover:bg-white rounded-full transition-colors mr-4 text-slate-500 hover:text-teal-600 shadow-sm border border-transparent hover:border-slate-200">
                         <span className="text-xl">&larr;</span>
                    </button>
                    <h2 className="text-2xl font-bold text-slate-800">Profile</h2>
                </div>
                <About lang={lang} />
            </div>
          ) : (
            <div className="h-full p-4 sm:p-6 max-w-5xl mx-auto flex flex-col animate-[fadeIn_0.3s_ease-out]">
              <div className="mb-6 flex items-center">
                 <button onClick={() => setMode('dashboard')} className="p-2 hover:bg-white rounded-full transition-colors mr-4 text-slate-500 hover:text-teal-600 shadow-sm border border-transparent hover:border-slate-200">
                    <span className="text-xl">&larr;</span>
                 </button>
                 <div>
                    <h2 className="text-2xl font-bold text-slate-800">
                        {mode === 'career' ? t.career : 
                        mode === 'tally' ? t.tally : 
                        mode === 'interview' ? t.interview : t.resume}
                    </h2>
                    <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">AI Conversation</p>
                 </div>
              </div>
              <ChatInterface mode={mode} lang={lang} />
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;