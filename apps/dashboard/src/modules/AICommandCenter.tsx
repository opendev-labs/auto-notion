import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Zap, Database, Plus } from 'lucide-react';

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
        <div className="flex h-[calc(100vh-10rem)] gap-4 animate-in fade-in slide-in-from-bottom-2 duration-500">
            {/* 1. History Sidebar */}
            <div className="w-64 glass-dark rounded-lg border border-white/10 flex flex-col p-4 hidden md:flex">
                <button
                    onClick={() => setMessages([{ id: '1', role: 'assistant', content: "New session initialized. How can I help you today?", timestamp: new Date() }])}
                    className="w-full py-3 bg-white/5 border border-white/10 rounded-md text-[10px] font-black uppercase tracking-[0.2em] text-white/60 hover:bg-white/10 hover:text-white transition-all mb-6 flex items-center justify-center gap-2"
                >
                    <Plus size={14} /> New Architect Session
                </button>

                <div className="flex-1 overflow-y-auto space-y-2 scrollbar-hide">
                    <h4 className="text-[9px] font-black text-white/20 uppercase tracking-widest mb-3 ml-2">Recent Intervals</h4>
                    {[
                        "Lead Sync Logic v2",
                        "Instagram Auth Fix",
                        "Notion CRM Mapping",
                        "Sentiment Analysis Refactor",
                        "Lunar Cycle Gating"
                    ].map((session, i) => (
                        <button key={i} className={`w-full text-left px-4 py-3 rounded-md text-[11px] font-medium truncate transition-all ${i === 0 ? 'bg-white/10 text-white border border-white/10 shadow-lg' : 'text-white/40 hover:bg-white/5 hover:text-white'}`}>
                            {session}
                        </button>
                    ))}
                </div>

                <div className="pt-4 border-t border-white/5 mt-4">
                    <div className="p-4 rounded-md bg-white/5 border border-white/10 space-y-3">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                            <span className="text-[10px] font-black text-white/60 uppercase tracking-widest">Logic Stream Live</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* 2. Main Chat Engine */}
            <div className="flex-1 flex flex-col glass-dark rounded-lg border border-white/10 overflow-hidden relative">
                {/* Header / Model Selector */}
                <div className="p-4 border-b border-white/10 flex items-center justify-between bg-black/40 backdrop-blur-md z-10">
                    <div className="flex items-center gap-2">
                        <span className="text-[10px] font-black uppercase tracking-widest text-white/20">Active Intelligence:</span>
                        <select className="bg-transparent text-white font-black text-[10px] uppercase tracking-widest outline-none cursor-pointer hover:text-white/80">
                            <option className="bg-[#050505]">GPT-4o (Automation Expert)</option>
                            <option className="bg-[#050505]">Claude 3.5 (Logic Architect)</option>
                            <option className="bg-[#050505]">Gemini 1.5 Pro (Mission Control)</option>
                        </select>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1.5 px-3 py-1 bg-white/5 border border-white/10 rounded-md">
                            <Zap size={10} className="text-white/40" />
                            <span className="text-[9px] font-black text-white/40 uppercase tracking-[0.2em]">0.4ms Latency</span>
                        </div>
                    </div>
                </div>

                {/* Messages Stream */}
                <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 md:p-12 space-y-12 scrollbar-hide bg-gradient-to-b from-transparent to-black/20">
                    <div className="max-w-3xl mx-auto w-full space-y-12 pb-12">
                        <AnimatePresence>
                            {messages.map((msg) => (
                                <motion.div
                                    key={msg.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="flex flex-col gap-4"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className={`w-6 h-6 rounded-sm flex items-center justify-center text-[10px] font-black border ${msg.role === 'user' ? 'bg-white text-black border-white' : 'bg-black text-white border-white/20'}`}>
                                            {msg.role === 'user' ? 'U' : 'A'}
                                        </div>
                                        <span className="text-[10px] font-black text-white/20 uppercase tracking-widest">
                                            {msg.role === 'user' ? 'Operator' : 'Architect Node'}
                                        </span>
                                    </div>

                                    <div className={`p-6 rounded-lg leading-relaxed text-sm ${msg.role === 'user'
                                        ? 'bg-white text-black font-semibold shadow-2xl border border-white'
                                        : 'bg-[#0a0a0a] border border-white/10 text-white/80 shadow-inner'
                                        }`}>
                                        <p className="whitespace-pre-wrap">{msg.content}</p>

                                        {msg.suggestedAction && msg.suggestedAction.preview && (
                                            <div className="mt-8 p-6 rounded-md bg-black border border-white/10 space-y-6">
                                                <div className="flex items-center gap-3 text-[10px] font-black text-white/30 uppercase tracking-[0.2em]">
                                                    <div className="p-1.5 bg-white/5 rounded border border-white/10 text-white/40">
                                                        <Zap size={12} />
                                                    </div>
                                                    Proposed Logic Graph
                                                </div>
                                                <div className="flex flex-wrap items-center gap-3 bg-white/5 p-4 rounded-md border border-white/5">
                                                    <div className="flex gap-4 mb-2 w-full">
                                                        <InstagramIcon />
                                                        <NotionIcon />
                                                    </div>
                                                    {msg.suggestedAction.preview?.steps?.map((step: string, i: number) => (
                                                        <React.Fragment key={i}>
                                                            <div className="px-3 py-1.5 bg-black border border-white/10 rounded text-[10px] font-bold text-white shadow-lg">
                                                                {step}
                                                            </div>
                                                            {i < (msg.suggestedAction?.preview?.steps?.length || 0) - 1 && <div className="w-4 h-px bg-white/10" />}
                                                        </React.Fragment>
                                                    ))}
                                                </div>
                                                <button className="w-full py-4 bg-white text-black rounded-md font-black text-[10px] uppercase tracking-[0.2em] hover:bg-zinc-200 transition-all shadow-xl active:scale-95">
                                                    {msg.suggestedAction.label}
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                        {isTyping && (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-4">
                                <div className="w-6 h-6 rounded-sm bg-black border border-white/20 flex items-center justify-center">
                                    <div className="w-1 h-1 bg-white/40 rounded-full animate-pulse" />
                                </div>
                                <span className="text-[10px] font-black text-white/20 uppercase tracking-widest animate-pulse">Architect is calculating logic...</span>
                            </motion.div>
                        )}
                    </div>
                </div>

                {/* Input Terminal */}
                <div className="p-6 md:p-10 border-t border-white/10 bg-[#050505]">
                    <div className="max-w-3xl mx-auto relative group">
                        <div className="absolute inset-0 bg-white/5 blur-xl group-focus-within:bg-white/10 transition-all duration-700 opacity-20" />
                        <div className="relative">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                                placeholder="ISSUE COMMAND TO ARCHITECT..."
                                className="w-full bg-black border border-white/20 rounded-lg py-5 pl-8 pr-20 text-white placeholder:text-white/10 outline-none focus:border-white/50 transition-all font-bold text-xs tracking-widest uppercase shadow-2xl"
                            />
                            <button
                                onClick={handleSend}
                                className="absolute right-3 top-1/2 -translate-y-1/2 p-4 bg-white text-black rounded-md hover:bg-zinc-200 transition-all shadow-xl active:scale-90"
                            >
                                <Send size={16} />
                            </button>
                        </div>
                        <div className="mt-3 flex justify-between px-2">
                            <p className="text-[9px] font-bold text-white/10 tracking-[0.2em] uppercase">SYSTEM READY</p>
                            <p className="text-[9px] font-bold text-white/10 tracking-[0.2em] uppercase">AES-256 ENCRYPTED</p>
                        </div>
                    </div>
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
