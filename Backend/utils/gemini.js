import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const ai = new GoogleGenAI({
  apiKey: process.env.GEN_API_KEY
});

// Store conversation history per thread
const conversationHistory = new Map();

const geminiResponse = async (message, threadId) => {
    try {
        // Get or initialize history for this thread
        let history = conversationHistory.get(threadId) || [];
        
        // Add the new user message to history
        history.push({
            role: "user",
            parts: [{ text: message }]
        });

        console.log(`Sending ${history.length} messages to Gemini`);

        const response = await ai.models.generateContent({
            model: "gemini-2.0-flash",
            contents: history,
        });

        const reply = response.text;
        
        // Add the model's response to history
        history.push({
            role: "model", 
            parts: [{ text: reply }]
        });

        // Limit history to prevent token overflow (keep last 20 messages)
        if (history.length > 20) {
            history = history.slice(-20);
        }

        conversationHistory.set(threadId, history);
        
        return reply;

    } catch (error) {
        console.error("Error calling Gemini:", error);
        
        // Fallback to basic call without history
        try {
            const response = await ai.models.generateContent({
                model: "gemini-2.0-flash",
                contents: message, // Just send the string directly
            });
            return response.text;
        } catch (fallbackError) {
            console.error("Fallback also failed:", fallbackError);
            return "I'm having trouble processing your request. Please try again.";
        }
    }
}

// Clear history when switching threads or creating new chat
export const clearChatHistory = (threadId) => {
    conversationHistory.delete(threadId);
    console.log(`Cleared history for thread: ${threadId}`);
}

export default geminiResponse;