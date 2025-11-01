import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const ai = new GoogleGenAI({
  apiKey: process.env.GEN_API_KEY
});

// Store conversation history per thread (shared across all models)
const conversationHistory = new Map();

const geminiResponse = async (message, threadId, modelName = "gemini-2.0-flash-lite") => {
    try {
        // Get or initialize history for this thread (shared across models)
        let history = conversationHistory.get(threadId) || [];
        
        // Add the new user message to history
        history.push({
            role: "user",
            parts: [{ text: message }]
        });

        console.log(`Sending ${history.length} messages to ${modelName}`);

        const response = await ai.models.generateContent({
            model: modelName,
            contents: history,
        });

        const reply = response.text;
        
        // Add the model's response to history
        history.push({
            role: "model", 
            parts: [{ text: reply }]
        });

        // Limit history to prevent token overflow
        if (history.length > 20) {
            history = history.slice(-20);
        }

        conversationHistory.set(threadId, history);
        
        return reply;

    } catch (error) {
        console.error(`Error calling ${modelName}:`, error);
        return `I'm having trouble with ${modelName} or it may be too old. Please try another model or try again.`;
    }
}

export const clearChatHistory = (threadId) => {
    conversationHistory.delete(threadId);
    console.log(`Cleared history for thread: ${threadId}`);
}

export default geminiResponse;