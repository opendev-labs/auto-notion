
import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize Gemini
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY || ''; // Ensure this is set in .env
const genAI = new GoogleGenerativeAI(API_KEY);

const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" }); // Use efficient model

export const NanoBanana = {
    /**
     * Generate an Instagram caption based on a topic or image description
     */
    generateCaption: async (topic: string, tone: 'professional' | 'fun' | 'mystic' = 'mystic') => {
        try {
            const prompt = `Write a short, engaging Instagram caption about "${topic}". 
            Tone: ${tone}. 
            Include 3-5 relevant hashtags. 
            Format: Caption first, then hashtags on new lines.`;

            const result = await model.generateContent(prompt);
            const response = await result.response;
            return response.text();
        } catch (error) {
            console.error("NanoBanana Error:", error);
            throw new Error("Failed to generate caption");
        }
    },

    /**
     * Generate ideas for Instagram Reels
     */
    generateReelIdeas: async (niche: string) => {
        try {
            const prompt = `Give me 3 viral Instagram Reel ideas for the niche: "${niche}". 
            For each idea, provide:
            1. Hook (0-3s)
            2. Core Content
            3. Call to Action/Twist`;

            const result = await model.generateContent(prompt);
            return (await result.response).text();
        } catch (error) {
            console.error("NanoBanana Error:", error);
            throw error;
        }
    },

    /**
     * Generate a DM reply suggestion
     */
    generateDMReply: async (incomingMessage: string, context: string) => {
        try {
            const prompt = `Draft a polite and engaging reply to this DM: "${incomingMessage}". 
            Context/Goal: ${context}. 
            Keep it under 2 sentences.`;
            const result = await model.generateContent(prompt);
            return (await result.response).text();
        } catch (error) {
            console.error("NanoBanana Error:", error);
            throw error;
        }
    }
};
