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
    footer: "Made with ❤️ by Mohammed Faizal, B.Com student, shift 1, The New College, Chennai.",
    errorFillFields: "Please fill in all fields",
    errorUserNotFound: "Account not found. Please Sign Up.",
    errorIncorrectPassword: "Incorrect password.",
    errorUserExists: "User already exists. Please Login.",
    errorPasswordMismatch: "Passwords do not match",
    termsTitle: "Community Guidelines & Usage Rules",
    termsAccept: "I Understand & Accept",
    termsList: [
      "AI Verification: This app uses Artificial Intelligence. While helpful, always verify career and financial advice with official sources.",
      "Respectful Communication: Use professional and respectful language when interacting with the AI agents.",
      "Data Privacy: Your chat history and progress are stored locally on this device. We prioritize your privacy.",
      "Free Education: This platform is free for students and professionals. Do not use it for illegal activities."
    ],
    loginHelpTitle: "How to Login",
    loginHelpText: "Since this is a demo app: \n1. Sign Up with any email/name. \n2. No email verification required. \n3. Passwords are case-sensitive. \n4. 'Remember Me' is active by default."
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
    footer: "Made with ❤️ by Mohammed Faizal, B.Com student, shift 1, The New College, Chennai.",
    errorFillFields: "தயவுசெய்து அனைத்து விவரங்களையும் நிரப்பவும்",
    errorUserNotFound: "கணக்கு காணப்படவில்லை. தயவுசெய்து பதிவு செய்யவும்.",
    errorIncorrectPassword: "தவறான கடவுச்சொல்.",
    errorUserExists: "பயனர் ஏற்கனவே உள்ளார். தயவுசெய்து உள்நுழையவும்.",
    errorPasswordMismatch: "கடவுச்சொற்கள் பொருந்தவில்லை",
    termsTitle: "சமூக வழிகாட்டுதல்கள் & விதிகள்",
    termsAccept: "நான் படித்து ஏற்றுக்கொள்கிறேன்",
    termsList: [
      "AI சரிபார்ப்பு: இந்த செயலி AI தொழில்நுட்பத்தைப் பயன்படுத்துகிறது. முக்கியமான தகவல்களை அதிகாரப்பூர்வ மூலங்களுடன் சரிபார்க்கவும்.",
      "மரியாதையான தொடர்பு: AI உடன் பேசும்போது கண்ணியமான மொழியைப் பயன்படுத்தவும்.",
      "தரவு பாதுகாப்பு: உங்கள் தகவல்கள் இந்த சாதனத்தில் மட்டுமே சேமிக்கப்படும்.",
      "இலவச கல்வி: இது மாணவர்களுக்கான இலவச தளம். தவறான பயன்பாட்டிற்கு அனுமதியில்லை."
    ],
    loginHelpTitle: "உள்நுழைவது எப்படி?",
    loginHelpText: "இது ஒரு மாதிரி செயலி என்பதால்: \n1. எந்த மின்னஞ்சலையும் பயன்படுத்தி பதிவு செய்யலாம். \n2. மின்னஞ்சல் சரிபார்ப்பு தேவையில்லை. \n3. கடவுச்சொல் நினைவில் கொள்ளப்படும்."
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