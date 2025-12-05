import { Translation, Language } from './types';

export const TRANSLATIONS: Record<Language, Translation> = {
  en: {
    welcome: "MentorBridge",
    subtitle: "Your Free AI Mentor for Careers, Skills & Growth",
    login: "Login",
    signup: "Sign Up",
    nameLabel: "Full Name",
    email: "Email Address",
    password: "Password",
    confirmPassword: "Confirm Password",
    submit: "Submit",
    toggleLang: "Switch to Tamil",
    logout: "Logout",
    dashboard: "Home",
    career: "Career & Education",
    typing: "Typing Coach",
    tally: "Tally & GST Coach",
    interview: "Interview Simulator",
    resume: "Resume Guide",
    about: "About Developer",
    startTest: "Start Typing Test",
    send: "Send Message",
    placeholder: "Type your message here...",
    developerInfo: "About MentorBridge & Developer",
    contactMe: "Contact Me",
    footer: "Made with ❤️ by Mohammed Faizal, B.Com student, shift 1, The New College, Chennai."
  },
  ta: {
    welcome: "மெண்டர்பிரிட்ஜ்",
    subtitle: "வேலைவாய்ப்பு மற்றும் திறன்களுக்கான உங்கள் இலவச AI வழிகாட்டி",
    login: "உள்நுழைய",
    signup: "பதிவு செய்க",
    nameLabel: "முழு பெயர்",
    email: "மின்னஞ்சல்",
    password: "கடவுச்சொல்",
    confirmPassword: "கடவுச்சொல்லை உறுதிப்படுத்தவும்",
    submit: "சமர்ப்பிக்கவும்",
    toggleLang: "Switch to English",
    logout: "வெளியேறு",
    dashboard: "முகப்பு",
    career: "வேலைவாய்ப்பு & கல்வி",
    typing: "தட்டச்சு பயிற்சி",
    tally: "டாலி & GST பயிற்சி",
    interview: "நேர்முகத் தேர்வு பயிற்சி",
    resume: "ரெஸ்யூம் வழிகாட்டி",
    about: "டெவலப்பர் பற்றி",
    startTest: "தட்டச்சு தேர்வை தொடங்கவும்",
    send: "அனுப்புக",
    placeholder: "உங்கள் செய்தியை இங்கே தட்டச்சு செய்யவும்...",
    developerInfo: "மெண்டர்பிரிட்ஜ் மற்றும் டெவலப்பர் பற்றி",
    contactMe: "தொடர்பு கொள்ள",
    footer: "Made with ❤️ by Mohammed Faizal, B.Com student, shift 1, The New College, Chennai."
  }
};

export const TYPING_SENTENCES = [
  "The quick brown fox jumps over the lazy dog.",
  "Success is not the key to happiness. Happiness is the key to success.",
  "Education is the most powerful weapon which you can use to change the world.",
  "A journey of a thousand miles begins with a single step.",
  "Consistency is what transforms average into excellence.",
  "Accounting is the language of business and finance.",
  "Artificial Intelligence is transforming the way we work and live."
];

export const DEVELOPER_PROFILE = `
Name: Mohammed Faizal M
Age: 19
Location: Chennai, Tamil Nadu, India
Education: B.Com student at The New College, Chennai (Shift I – Govt. Aided Stream).
Role: Student Placement Officer for Achievers’ Club 2025–2026.
Passions: HR, Management, Business Development, AI.
Skills: Communication, Simple Accounting, Recruiting, Interviewing, Data Management, Basic Graphic Design (Canva, Photoshop, Photopea).
Experience: Shine Projects (HR Intern), Yuva Intern (HR Sim), Oasis Infobyte (Graphic Design).
`;

export const getSystemInstruction = (mode: string, lang: Language): string => {
  const languageInstruction = lang === 'ta' 
    ? "You must answer STRICTLY in Tamil. Use clear, simple Tamil suitable for students. Do not switch to English unless explicitly requested." 
    : "You must answer STRICTLY in English.";

  const baseIdentity = `
    You are MentorBridge, an AI assistant created by Mohammed Faizal M.
    Always be polite, professional, and encouraging.
    Never advertise paid courses. Recommend free resources (YouTube, Coursera free audit, etc.).
    
    Developer Info (if asked): ${DEVELOPER_PROFILE}
    
    Current Language Mode: ${languageInstruction}
  `;

  switch (mode) {
    case 'career':
      return `${baseIdentity}
        Mode: Career & Education Mentor.
        Ask about the user's background (class, degree, interests).
        Suggest realistic career paths, especially for Commerce, HR, Finance, and Marketing.
        Provide actionable advice on free certifications.
      `;
    case 'tally':
      return `${baseIdentity}
        Mode: Tally Prime & GST Coach.
        Assume the user is a beginner.
        Explain concepts like Ledgers, Vouchers, Contra Entry, GST slabs, Input/Output Tax.
        You can provide simple scenarios (e.g., "Purchased goods from Ravi for 10,000 + 18% GST") and ask the user to give the journal entry, then correct them.
      `;
    case 'interview':
      return `${baseIdentity}
        Mode: Interview Simulator.
        Act as a professional HR Interviewer.
        Conduct a mock interview. Ask ONE question at a time. Wait for the user's response.
        After the user answers, provide constructive feedback (Strengths, Weaknesses, Better Answer example).
        Then ask the next question.
        Cover generic HR questions and specific technical questions for Commerce/Management.
      `;
    case 'resume':
      return `${baseIdentity}
        Mode: Resume Guide.
        Analyze the user's input (profile or resume text).
        Suggest improvements for Summary, Skills, and Experience sections.
        Focus on ATS-friendly formatting and action verbs.
        Give specific examples of bullet points.
      `;
    case 'typing':
      return `${baseIdentity}
        Mode: Typing Coach Feedback.
        The user will send you their typing stats.
        Provide a very short, motivating message (2 sentences max) appreciating their effort and suggesting 1 tip to improve speed/accuracy.
      `;
    default:
      return baseIdentity;
  }
};