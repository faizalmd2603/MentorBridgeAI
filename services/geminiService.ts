import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";
import { getSystemInstruction } from "../constants";
import { Language } from "../types";

let chatSession: Chat | null = null;
let currentMode: string | null = null;
let currentLang: Language | null = null;

export const getGeminiResponse = async (
  message: string, 
  mode: string, 
  lang: Language
): Promise<string> => {
  try {
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
      return "Error: API Key is missing. Please check your configuration.";
    }

    // Initialize or reset chat if mode or language changes
    if (!chatSession || currentMode !== mode || currentLang !== lang) {
      const ai = new GoogleGenAI({ apiKey });
      chatSession = ai.chats.create({
        model: 'gemini-2.5-flash',
        config: {
          systemInstruction: getSystemInstruction(mode, lang),
          temperature: 0.7,
        }
      });
      currentMode = mode;
      currentLang = lang;
    }

    const result: GenerateContentResponse = await chatSession.sendMessage({
      message: message
    });

    return result.text || "I'm sorry, I couldn't generate a response.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I encountered a connection error. Please try again.";
  }
};

export const getTypingFeedback = async (stats: string, lang: Language): Promise<string> => {
    // Stateless call for typing feedback
    const apiKey = process.env.API_KEY;
    if (!apiKey) return "Great job!";
    
    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: stats,
        config: {
            systemInstruction: getSystemInstruction('typing', lang)
        }
    });
    return response.text || "Good effort!";
};
