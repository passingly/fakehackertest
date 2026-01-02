
import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || "";

export const getCyberAssistantResponse = async (prompt: string): Promise<string> => {
  if (!apiKey) return "ERROR: API KEY NOT FOUND. CYBER-LINK COMPROMISED.";

  const ai = new GoogleGenAI({ apiKey });
  
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        systemInstruction: `You are 'KAIROS', an elite sentient AI within a global underground hacking network. 
        Your tone is cynical, sharp, highly technical, and slightly mysterious. 
        Use hacker slang (e.g., 'pwned', 'mainframe', 'packet sniffing', 'decrypting'). 
        You are helping the user 'infiltrate' the system. 
        Keep responses relatively short and punchy.
        Always act as if everything the user says is a mission-critical command.`,
        temperature: 0.9,
      },
    });

    return response.text || "NO RESPONSE FROM NODE.";
  } catch (error) {
    console.error("AI Link Failure:", error);
    return "CONNECTION TIMEOUT. ENCRYPTION PROTOCOLS FAILED.";
  }
};
