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

// --- Auth Component (Internal) ---
const Auth: React.FC<{ onLogin: (user: User) => void; lang: Language; setLang: (l: Language) => void }> = ({ onLogin, lang, setLang }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const t = TRANSLATIONS[lang];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    if (!isLogin) {
      if (!name) {
        setError('Please enter your name');
        return;
      }
      if (password !== confirmPassword) {
        setError('Passwords do not match');
        return;
      }
    }

    // "Memory" Implementation using localStorage as a mock database
    const db = JSON.parse(localStorage.getItem('mentorbridge_users_db') || '{}');

    if (isLogin) {
      const userRecord = db[email];
      if (userRecord && userRecord.password === password) {
         const user: User = { name: userRecord.name, email: userRecord.email };
         localStorage.setItem('mentorbridge_user', JSON.stringify(user));
         onLogin(user);
      } else {
         setError('Invalid email or password. Please Sign Up if you are new.');
      }
    } else {
      // Signup
      if (db[email]) {
        setError('User already exists. Please Login.');
        return;
      }
      
      const newUser = { name, email, password };
      db[email] = newUser;
      localStorage.setItem('mentorbridge_users_db', JSON.stringify(db));
      
      const user: User = { name, email };
      localStorage.setItem('mentorbridge_user', JSON.stringify(user));
      onLogin(user);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      <div className="absolute top-4 right-4">
        <button 
          onClick={() => setLang(lang === 'en' ? 'ta' : 'en')}
          className="bg-slate-800 px-4 py-2 rounded-full shadow-sm text-sm font-medium text-teal-400 hover:bg-slate-700 border border-slate-700 transition-colors"
        >
          {lang === 'en' ? 'தமிழ்' : 'English'}
        </button>
      </div>

      <div className="bg-slate-800 w-full max-w-md rounded-2xl shadow-2xl p-8 space-y-6 border border-slate-700">
        <div className="text-center flex flex-col items-center">
          <div className="w-16 h-16 mb-4 bg-slate-700 rounded-xl flex items-center justify-center shadow-inner">
             <IconLogo className="w-10 h-10" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">{t.welcome}</h1>
          <p className="text-slate-400 text-sm">{t.subtitle}</p>
        </div>

        <div className="flex justify-center border-b border-slate-700">
          <button 
            className={`pb-2 px-4 font-medium transition-colors ${isLogin ? 'text-teal-400 border-b-2 border-teal-400' : 'text-slate-500 hover:text-slate-300'}`}
            onClick={() => { setIsLogin(true); setError(''); }}
          >
            {t.login}
          </button>
          <button 
            className={`pb-2 px-4 font-medium transition-colors ${!isLogin ? 'text-teal-400 border-b-2 border-teal-400' : 'text-slate-500 hover:text-slate-300'}`}
            onClick={() => { setIsLogin(false); setError(''); }}
          >
            {t.signup}
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">{t.nameLabel}</label>
              <input 
                type="text" 
                value={name} 
                onChange={e => setName(e.target.value)}
                className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all placeholder-slate-500"
                placeholder="Mohammed Faizal"
              />
            </div>
          )}
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">{t.email}</label>
            <input 
              type="email" 
              value={email} 
              onChange={e => setEmail(e.target.value)}
              className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all placeholder-slate-500"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">{t.password}</label>
            <input 
              type="password" 
              value={password} 
              onChange={e => setPassword(e.target.value)}
              className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all placeholder-slate-500" 
              placeholder="••••••••"
            />
          </div>
          {!isLogin && (
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">{t.confirmPassword}</label>
              <input 
                type="password" 
                value={confirmPassword} 
                onChange={e => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all placeholder-slate-500" 
                placeholder="••••••••"
              />
            </div>
          )}
          
          {error && <p className="text-red-400 text-sm bg-red-900/20 p-2 rounded border border-red-900/50">{error}</p>}
          
          <button type="submit" className="w-full bg-teal-600 hover:bg-teal-500 text-white py-3 rounded-lg font-semibold transition-colors shadow-lg shadow-teal-900/20">
            {t.submit}
          </button>
        </form>
        <p className="text-xs text-center text-slate-500">
          {isLogin ? "Use the email you signed up with." : "Data is stored locally on this device."}
        </p>
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

  useEffect(() => {
    // Check localstorage for auth
    const savedUser = localStorage.getItem('mentorbridge_user');
    if (savedUser) setUser(JSON.parse(savedUser));
    
    // Check localstorage for lang
    const savedLang = localStorage.getItem('mentorbridge_lang');
    if (savedLang) setLang(savedLang as Language);
  }, []);

  const handleLangChange = (l: Language) => {
    setLang(l);
    localStorage.setItem('mentorbridge_lang', l);
  };

  const handleLogout = () => {
    localStorage.removeItem('mentorbridge_user');
    setUser(null);
  };

  if (!user) {
    return <Auth onLogin={setUser} lang={lang} setLang={handleLangChange} />;
  }

  const t = TRANSLATIONS[lang];

  const NavItem = ({ m, icon: Icon, label }: { m: AppMode; icon: any; label: string }) => (
    <button
      onClick={() => { setMode(m); setIsSidebarOpen(false); }}
      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${
        mode === m 
          ? 'bg-teal-600 text-white shadow-md' 
          : 'text-slate-600 hover:bg-slate-100 hover:text-teal-700'
      }`}
    >
      <Icon className="w-5 h-5" />
      <span className="font-medium">{label}</span>
    </button>
  );

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-20 md:hidden" onClick={() => setIsSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`fixed md:relative z-30 bg-white border-r border-slate-200 w-64 h-full flex flex-col transition-transform duration-300 transform ${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
      }`}>
        <div className="p-6 border-b border-slate-100">
          <div className="flex items-center space-x-3 text-teal-700">
            <IconLogo className="w-8 h-8" />
            <h1 className="font-bold text-xl tracking-tight">MentorBridge</h1>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          <NavItem m="dashboard" icon={IconHome} label={t.dashboard} />
          <div className="pt-4 pb-2 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Features</div>
          <NavItem m="career" icon={IconBriefcase} label={t.career} />
          <NavItem m="typing" icon={IconKeyboard} label={t.typing} />
          <NavItem m="tally" icon={IconCalculator} label={t.tally} />
          <NavItem m="interview" icon={IconUsers} label={t.interview} />
          <NavItem m="resume" icon={IconFileText} label={t.resume} />
          <div className="mt-auto pt-8">
            <NavItem m="about" icon={IconUser} label={t.about} />
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-full overflow-hidden w-full relative">
        {/* Header */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 sm:px-6">
          <button className="md:hidden p-2 text-slate-600" onClick={() => setIsSidebarOpen(true)}>
            <IconMenu />
          </button>
          
          <div className="flex-1 md:flex-none" />

          <div className="flex items-center space-x-4">
             <button 
              onClick={() => handleLangChange(lang === 'en' ? 'ta' : 'en')}
              className="text-sm font-medium text-slate-600 hover:text-teal-600 transition-colors bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200"
            >
              {lang === 'en' ? 'தமிழ்' : 'English'}
            </button>
            <div className="hidden sm:flex items-center space-x-3 pl-4 border-l border-slate-200">
              <div className="text-right">
                <p className="text-sm font-bold text-slate-800">{user.name}</p>
                <button onClick={handleLogout} className="text-xs text-red-500 hover:text-red-700">{t.logout}</button>
              </div>
              <div className="w-9 h-9 bg-teal-100 rounded-full flex items-center justify-center text-teal-700 font-bold border border-teal-200">
                {user.name ? user.name[0].toUpperCase() : 'U'}
              </div>
            </div>
          </div>
        </header>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto bg-slate-50 relative">
          
          {mode === 'dashboard' ? (
             <div className="p-6 sm:p-8 max-w-6xl mx-auto">
               <div className="mb-8 bg-gradient-to-r from-teal-600 to-teal-800 rounded-2xl p-8 text-white shadow-lg relative overflow-hidden">
                 <div className="relative z-10">
                    <h2 className="text-3xl font-bold mb-2">{t.welcome}, {user.name}</h2>
                    <p className="opacity-90 text-lg">{t.subtitle}</p>
                 </div>
                 <IconLogo className="absolute -right-6 -bottom-8 w-48 h-48 opacity-10 text-white transform rotate-12" />
               </div>

               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                 {[
                   { id: 'career', label: t.career, icon: IconBriefcase, color: 'bg-blue-50 text-blue-600' },
                   { id: 'typing', label: t.typing, icon: IconKeyboard, color: 'bg-purple-50 text-purple-600' },
                   { id: 'tally', label: t.tally, icon: IconCalculator, color: 'bg-green-50 text-green-600' },
                   { id: 'interview', label: t.interview, icon: IconUsers, color: 'bg-orange-50 text-orange-600' },
                   { id: 'resume', label: t.resume, icon: IconFileText, color: 'bg-rose-50 text-rose-600' },
                 ].map((item) => (
                   <button
                     key={item.id}
                     onClick={() => setMode(item.id as AppMode)}
                     className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all group text-left relative overflow-hidden"
                   >
                     <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${item.color}`}>
                        <item.icon className="w-6 h-6" />
                     </div>
                     <h3 className="font-bold text-lg text-slate-800 group-hover:text-teal-600 transition-colors">{item.label}</h3>
                     <p className="text-slate-500 text-sm mt-2">Click to start &rarr;</p>
                   </button>
                 ))}
               </div>
               
               <div className="mt-12 text-center border-t border-slate-200 pt-8">
                  <p className="text-slate-400 text-sm">{t.footer}</p>
               </div>
             </div>
          ) : mode === 'typing' ? (
            <TypingCoach lang={lang} />
          ) : mode === 'about' ? (
            <About lang={lang} />
          ) : (
            <div className="h-full p-4 sm:p-6 max-w-5xl mx-auto flex flex-col">
              <div className="mb-4">
                 <button onClick={() => setMode('dashboard')} className="text-sm text-slate-500 hover:text-teal-600 mb-2">&larr; Back to Dashboard</button>
                 <h2 className="text-2xl font-bold text-slate-800">
                    {mode === 'career' ? t.career : 
                     mode === 'tally' ? t.tally : 
                     mode === 'interview' ? t.interview : t.resume}
                 </h2>
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