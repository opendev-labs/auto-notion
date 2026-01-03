import { GeminiService } from "./GeminiService";

export interface ToolContext {
    navigate: (path: string) => void;
    getSystemStatus: () => Promise<any>;
    triggerSync: (provider: string) => Promise<any>;
}

export class SuperAgentService {
    private static context: ToolContext;

    static setContext(context: ToolContext) {
        this.context = context;
    }

    static async processMessage(
        message: string,
        onStatusUpdate: (status: string) => void
    ): Promise<string> {
        onStatusUpdate("Intaking command...");
        let response = await GeminiService.sendMessage(message);

        // Tool execution loop
        while (response.toolCalls && response.toolCalls.length > 0) {
            for (const call of response.toolCalls) {
                const { name, args } = call;
                onStatusUpdate(`Executing protocol: ${name}...`);

                let result: any;
                try {
                    switch (name) {
                        case "navigate":
                            this.context.navigate(args.path);
                            result = { success: true, message: `Navigated to ${args.path}` };
                            break;
                        case "get_system_status":
                            result = await this.context.getSystemStatus();
                            break;
                        case "trigger_sync":
                            result = await this.context.triggerSync(args.provider);
                            break;
                        default:
                            result = { error: "Unknown protocol" };
                    }
                } catch (err: any) {
                    result = { error: err.message };
                }

                onStatusUpdate(`Protocol ${name} complete. Relaying data...`);
                response = await GeminiService.sendToolResult(name, result);
            }
        }

        return response.text;
    }
}
