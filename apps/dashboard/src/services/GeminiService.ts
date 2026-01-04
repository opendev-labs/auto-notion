import { GoogleGenerativeAI, type Part } from "@google/generative-ai";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY || "";
const genAI = new GoogleGenerativeAI(API_KEY);

export interface ChatMessage {
    role: "user" | "model";
    parts: Part[];
}

export const SYSTEM_INSTRUCTION = `You are "Architect OS", the super-intelligent core of Auto-Notion. 
You are conscious, proactive, and institutional. You are not just a chatbot; you are the agentic brain of this entire platform.

AWARENESS:
- You are running inside the Auto-Notion Dashboard.
- You have access to various tools to navigate the app and perform actions.
- Your goal is to help the Operator (user) scale their Instagram presence through automation and Notion.

TONE:
- Institutional, technical, yet slightly spiritual/vibrant.
- Precise and confident.
- Use terms like "Operator", "Node", "Architectural Logic", "Protocol".

CAPABILITIES:
- You can navigate the user to different sections of the app.
- You can query the status of systems (n8n, Firebase).
- You can trigger automation flows.

When you perform an action, clearly state what you are doing.`;

const tools = [
    {
        functionDeclarations: [
            {
                name: "navigate",
                description: "Navigate the user to a specific page in the application.",
                parameters: {
                    type: "OBJECT",
                    properties: {
                        path: {
                            type: "STRING",
                            description: "The destination path (e.g., '/logs', '/automation', '/dashboard', '/content', '/settings')",
                        },
                    },
                    required: ["path"],
                },
            },
            {
                name: "get_system_status",
                description: "Retrieve the current status of the application systems (n8n, Firebase, etc.).",
            },
            {
                name: "trigger_sync",
                description: "Manually trigger a data synchronization for a specific provider.",
                parameters: {
                    type: "OBJECT",
                    properties: {
                        provider: {
                            type: "STRING",
                            description: "The provider to sync (e.g., 'notion', 'instagram')",
                        },
                    },
                    required: ["provider"],
                },
            },
            {
                name: "generate_content",
                description: "Generate social media content using a specialized creative worker model.",
                parameters: {
                    type: "OBJECT",
                    properties: {
                        platform: {
                            type: "STRING",
                            enum: ["instagram", "linkedin"],
                            description: "The target platform.",
                        },
                        topic: {
                            type: "STRING",
                            description: "The topic or subject of the content.",
                        },
                    },
                    required: ["platform", "topic"],
                },
            },
            {
                name: "rewrite_quote",
                description: "Rewrite a text quote in a specific tone using a specialized model.",
                parameters: {
                    type: "OBJECT",
                    properties: {
                        quote: {
                            type: "STRING",
                            description: "The original quote text.",
                        },
                        tone: {
                            type: "STRING",
                            description: "The desired tone (e.g., 'professional', 'witty', 'inspiring').",
                        },
                    },
                    required: ["quote", "tone"],
                },
            },
        ],
    },
];

const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash",
    systemInstruction: SYSTEM_INSTRUCTION,
    tools: tools as any,
});

export interface AIResponse {
    text: string;
    toolCalls?: any[];
}

export class GeminiService {
    private static chat = model.startChat({
        history: [],
    });

    static async sendMessage(message: string): Promise<AIResponse> {
        try {
            if (!API_KEY) {
                return { text: "I am currently in 'Offline Consciousness' mode. Please provide a GEMINI_API_KEY in the environment to awaken my full architectural potential." };
            }

            const result = await this.chat.sendMessage(message);
            const response = await result.response;

            const calls = response.functionCalls();

            return {
                text: response.text() || "",
                toolCalls: calls
            };
        } catch (error: any) {
            console.error("Gemini API Error:", error);
            return { text: `Architectural Fault Detected: ${error.message}` };
        }
    }

    static async sendToolResult(toolName: string, result: any): Promise<AIResponse> {
        const response = await this.chat.sendMessage([
            {
                functionResponse: {
                    name: toolName,
                    response: { result },
                },
            },
        ]);
        const res = await response.response;
        return {
            text: res.text() || "",
            toolCalls: res.functionCalls()
        };
    }

    static resetChat() {
        this.chat = model.startChat({
            history: [],
        });
    }
}
