export type Language = 'en' | 'ta';

export type AppMode = 'dashboard' | 'career' | 'typing' | 'tally' | 'interview' | 'resume' | 'about';

export interface User {
  name: string;
  email: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export interface TypingResult {
  wpm: number;
  accuracy: number;
  date: string;
}

export interface Translation {
  welcome: string;
  subtitle: string;
  login: string;
  signup: string;
  nameLabel: string;
  email: string;
  password: string;
  confirmPassword: string;
  submit: string;
  toggleLang: string;
  logout: string;
  dashboard: string;
  career: string;
  typing: string;
  tally: string;
  interview: string;
  resume: string;
  about: string;
  startTest: string;
  send: string;
  placeholder: string;
  developerInfo: string;
  contactMe: string;
  footer: string;
}