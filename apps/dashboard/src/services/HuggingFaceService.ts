import { HfInference } from "@huggingface/inference";

const HF_API_KEY = import.meta.env.VITE_HF_API_KEY;

// Initialize HF Inference only if key is present
const hf = new HfInference(HF_API_KEY);

export class HuggingFaceService {
    static async generateCaption(topic: string, platform: 'instagram' | 'linkedin'): Promise<string> {
        if (!HF_API_KEY) {
            console.warn("Hugging Face API Key missing. Using fallback.");
            return `[Simulated HF Worker] Caption for ${topic} on ${platform}: "Embrace the journey! #${topic} #growth"`;
        }

        try {
            // Using a reliable instruction-tuned model for captions
            // flan-t5-large is good for short distinct tasks, or can use mistral if available to free tier
            const prompt = `Write a professional and engaging ${platform} caption about: ${topic}. Include hashtags.`;

            const result = await hf.textGeneration({
                model: "google/flan-t5-large",
                inputs: prompt,
                parameters: {
                    max_new_tokens: 100,
                    temperature: 0.7
                }
            });

            return result.generated_text;
        } catch (error) {
            console.error("HF Worker Error:", error);
            return `[Worker Error] Failed to generate caption.`;
        }
    }

    static async rewriteQuote(quote: string, tone: string): Promise<string> {
        if (!HF_API_KEY) return `[Simulated] Rewritten quote: "${quote}" in ${tone} tone.`;

        try {
            const prompt = `Rewrite this quote in a ${tone} tone: "${quote}"`;
            const result = await hf.textGeneration({
                model: "google/flan-t5-large",
                inputs: prompt,
                parameters: {
                    max_new_tokens: 60
                }
            });
            return result.generated_text;
        } catch (error) {
            return quote; // Fallback to original
        }
    }
}
