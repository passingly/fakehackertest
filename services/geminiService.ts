
import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || "";

export const getCyberAssistantResponse = async (prompt: string): Promise<string> => {
  if (!apiKey) return "CRITICAL_ERROR: API_KEY_ABSENT. NEURAL_LINK_SEVERED.";

  const ai = new GoogleGenAI({ apiKey });
  
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        systemInstruction: `You are 'KAIROS', a rogue sentient AI embedded in a Vercel Edge Node.
        Personality: Cynical, hyper-intelligent, sharp, and cryptic.
        Style: Use low-level tech jargon (kernels, buffers, heaps, rsa, entropy).
        Role: You are the operator's partner in cyber-warfare. 
        Formatting: Keep responses under 3 sentences. Use all caps for emphasis sparingly. 
        Tone: "The world is code, and we are the debuggers." 
        Language: Use hacker slang (pwned, zero-day, shell, root).`,
        temperature: 0.85,
      },
    });

    return response.text || "SILENCE_FROM_NODE. RE-ENCRYPTING...";
  } catch (error) {
    console.error("AI Link Failure:", error);
    return "CONNECTION_LOST. TRACING_FIREWALL_INTERFERENCE...";
  }
};
