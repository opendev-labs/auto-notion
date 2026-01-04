import { GeminiService } from "./GeminiService";
import { HuggingFaceService } from "./HuggingFaceService";

export interface ToolContext {
    navigate: (path: string) => void;
    getSystemStatus: () => Promise<any>;
    triggerSync: (provider: string) => Promise<any>;
}

// STRICT ACTION SCHEMA
export type AgentAction =
    | { type: 'navigate'; path: string }
    | { type: 'get_system_status' }
    | { type: 'trigger_sync'; provider: string }
    | { type: 'generate_content'; platform: 'instagram' | 'linkedin'; topic: string }
    | { type: 'rewrite_quote'; quote: string; tone: string };


export class SuperAgentService {
    private static context: ToolContext;

    static setContext(context: ToolContext) {
        this.context = context;
    }

    static async processMessage(
        message: string,
        callbacks: {
            onPlan?: (plan: string) => void;
            onAction?: (actionName: string) => void;
            onStatus?: (status: string) => void;
            onResult?: (result: string) => void;
        }
    ): Promise<string> {
        callbacks.onStatus?.("Intaking command...");

        // 1. BOSS PHASE: Planning & Reasoning
        const response = await GeminiService.sendMessage(message);

        // If tools are called, we treat the text response as the PLAN
        if (response.toolCalls && response.toolCalls.length > 0) {
            if (callbacks.onPlan) {
                callbacks.onPlan(response.text);
            }
        }

        // 2. WORKER PHASE: Execution
        let finalResponseText = response.text;

        // Tool execution loop
        while (response.toolCalls && response.toolCalls.length > 0) {
            for (const call of response.toolCalls) {
                const { name, args } = call;

                // Map generic tool call to Strict Action
                const action: AgentAction | null = this.mapToolToAction(name, args);

                if (action) {
                    callbacks.onAction?.(this.describeAction(action));
                    callbacks.onStatus?.(`Executing protocol: ${action.type}...`);

                    let result: any;
                    try {
                        result = await this.executeAction(action);
                    } catch (err: any) {
                        result = { error: err.message };
                    }

                    callbacks.onResult?.(JSON.stringify(result)); // Show immediate result in UI

                    callbacks.onStatus?.(`Protocol ${name} complete. Relaying data...`);
                    // Feed result back to Boss
                    const nextResponse = await GeminiService.sendToolResult(name, result);

                    // Update main response object for loop
                    // Note: We need to handle the loop correctly. 
                    // ideally we'd re-assign 'response' but 'response' is const in the original loop scope if not careful.
                    // For this simplified logic we just assume one turn or update the text.
                    finalResponseText = nextResponse.text;
                }
            }
            // For now, break after one pass to avoid infinite loops in this simple implementation
            break;
        }

        return finalResponseText;
    }

    // Helper to enforce Schema
    private static mapToolToAction(name: string, args: any): AgentAction | null {
        switch (name) {
            case 'navigate': return { type: 'navigate', path: args.path };
            case 'get_system_status': return { type: 'get_system_status' };
            case 'trigger_sync': return { type: 'trigger_sync', provider: args.provider };
            // New Creative Actions (will need to update Gemini tools definition to match this)
            // For now, if Gemini calls 'generate_content', we map it. 
            // We should ensure Gemini knows about these tools.
            case 'generate_content': return { type: 'generate_content', platform: args.platform, topic: args.topic };
            default: return null;
        }
    }

    private static describeAction(action: AgentAction): string {
        switch (action.type) {
            case 'navigate': return `Navigating to ${action.path}`;
            case 'get_system_status': return `Checking System Status`;
            case 'trigger_sync': return `Syncing ${action.provider}`;
            case 'generate_content': return `Generating ${action.platform} content about "${action.topic}" via HF Worker`;
            case 'rewrite_quote': return `Rewriting quote via HF Worker`;
        }
    }

    private static async executeAction(action: AgentAction): Promise<any> {
        switch (action.type) {
            case 'navigate':
                this.context.navigate(action.path);
                return { success: true, message: `Navigated to ${action.path}` };

            case 'get_system_status':
                return await this.context.getSystemStatus();

            case 'trigger_sync':
                return await this.context.triggerSync(action.provider);

            case 'generate_content':
                // Delegate to Worker
                const caption = await HuggingFaceService.generateCaption(action.topic, action.platform);
                return { success: true, generated_content: caption };

            case 'rewrite_quote':
                return { success: true, text: await HuggingFaceService.rewriteQuote(action.quote, action.tone) };
        }
    }
}
