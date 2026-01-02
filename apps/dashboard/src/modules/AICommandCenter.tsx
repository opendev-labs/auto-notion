import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Zap, Database, MessageSquare } from 'lucide-react';

interface Message {
    id: string;
    role: 'user' | 'assistant';
    content: string;
    timestamp: Date;
    suggestedAction?: {
        label: string;
        type: 'automation' | 'integration' | 'config';
        preview?: any;
    };
}

const AICommandCenter: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            role: 'assistant',
            content: "Welcome to the AI Command Center. I'm your automation architect. How can I help you optimize your Instagram and Notion workflows today?",
            timestamp: new Date()
        }
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isTyping]);

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMsg: Message = {
            id: Date.now().toString(),
            role: 'user',
            content: input,
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setIsTyping(true);

        // Simulate AI Response
        setTimeout(() => {
            const assistantMsg: Message = {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                content: "I've analyzed your request. Based on your current setup, I recommend creating a new automation that routes Instagram comments to your Notion 'Leads' database and triggers a personalized DM reply.",
                timestamp: new Date(),
                suggestedAction: {
                    label: "Deploy Lead-Sync Automation",
                    type: "automation",
                    preview: {
                        trigger: "New Comment",
                        steps: ["Sentiment Analysis", "Notion CRM Sync", "DM Reply"]
                    }
                }
            };
            setMessages(prev => [...prev, assistantMsg]);
            setIsTyping(false);
        }, 1500);
    };

    return (
        <div className="flex h-[calc(100vh-12rem)] md:h-[calc(100vh-14rem)] gap-6 overflow-hidden">
            {/* Chat Panel */}
            <div className="flex-1 glass-dark rounded-[2.5rem] border-0.5 border-white/5 flex flex-col relative overflow-hidden">
                <div className="p-6 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded-xl bg-white text-black">
                            <MessageSquare size={18} />
                        </div>
                        <div>
                            <h3 className="text-sm font-bold text-white uppercase tracking-widest">AI Command Center</h3>
                            <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest">Automation Architect v1.0</p>
                        </div>
                    </div>
                </div>

                <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6 scrollbar-hide">
                    <AnimatePresence>
                        {messages.map((msg) => (
                            <motion.div
                                key={msg.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                            >
                                <div className={`max-w-[80%] p-5 rounded-3xl ${msg.role === 'user'
                                    ? 'bg-white text-black font-medium'
                                    : 'glass border border-white/5 text-white leading-relaxed'
                                    }`}>
                                    <p className="text-sm">{msg.content}</p>

                                    {msg.suggestedAction && msg.suggestedAction.preview && (
                                        <div className="mt-6 p-4 rounded-2xl bg-white/5 border border-white/10 space-y-4">
                                            <div className="flex items-center gap-2 text-[10px] font-black text-white/40 uppercase tracking-[0.2em]">
                                                <Zap size={12} /> Suggested Automation
                                            </div>
                                            <div className="flex flex-wrap gap-2">
                                                {msg.suggestedAction.preview?.steps?.map((step: string, i: number) => (
                                                    <div key={i} className="flex items-center gap-2">
                                                        <span className="text-[10px] font-bold text-white px-3 py-1 bg-white/10 rounded-lg">{step}</span>
                                                        {i < (msg.suggestedAction?.preview?.steps?.length || 0) - 1 && <div className="w-2 h-0.5 bg-white/10" />}
                                                    </div>
                                                ))}
                                            </div>
                                            <button className="w-full py-3 bg-white text-black rounded-xl font-bold text-[10px] uppercase tracking-widest hover:bg-zen-sage transition-all">
                                                {msg.suggestedAction.label}
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                    {isTyping && (
                        <div className="flex justify-start">
                            <div className="glass border border-white/5 p-4 rounded-3xl flex gap-1">
                                <div className="w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce" />
                                <div className="w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce [animation-delay:0.2s]" />
                                <div className="w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce [animation-delay:0.4s]" />
                            </div>
                        </div>
                    )}
                </div>

                <div className="p-6 bg-white/[0.02] border-t border-white/5">
                    <div className="relative">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                            placeholder="Type a command (e.g., 'Sync comments to Notion')..."
                            className="w-full bg-black/40 border-0.5 border-white/10 rounded-2xl py-4 pl-6 pr-16 text-white placeholder:text-white/20 outline-none focus:border-white/40 transition-all font-medium"
                        />
                        <button
                            onClick={handleSend}
                            className="absolute right-2 top-1/2 -translate-y-1/2 p-3 bg-white text-black rounded-xl hover:bg-zen-sage transition-all shadow-xl"
                        >
                            <Send size={18} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Context/Preview Sidebar (Optional for larger screens) */}
            <div className="hidden lg:flex w-80 flex-col gap-6">
                <div className="glass-dark rounded-[2.5rem] border-0.5 border-white/5 p-8 flex-1">
                    <h4 className="text-[10px] font-black text-white/40 uppercase tracking-widest mb-6">Automation Preview</h4>
                    <div className="space-y-6">
                        <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                            <p className="text-[10px] font-bold text-white/30 uppercase mb-2">Active Framework</p>
                            <p className="text-sm font-bold text-white">n8n Execution Engine</p>
                        </div>
                        <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                            <p className="text-[10px] font-bold text-white/30 uppercase mb-2">Connected APIs</p>
                            <div className="flex gap-2">
                                <InstagramIcon />
                                <NotionIcon />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="glass-dark rounded-[2.5rem] border-0.5 border-white/5 p-8">
                    <h4 className="text-[10px] font-black text-white/40 uppercase tracking-widest mb-4">Command Tips</h4>
                    <ul className="text-[10px] text-white/60 font-bold space-y-3 list-disc pl-4 italic">
                        <li>"Schedule a post for tonight"</li>
                        <li>"Sync latest Instagram metrics"</li>
                        <li>"Analyze sentiment of comments"</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

const InstagramIcon = () => (
    <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-white/60 border border-white/10">
        <Zap size={14} />
    </div>
);

const NotionIcon = () => (
    <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-white/60 border border-white/10">
        <Database size={14} />
    </div>
);

export default AICommandCenter;
