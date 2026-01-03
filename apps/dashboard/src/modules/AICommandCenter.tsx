import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Zap,
    Plus,
    History,
    ChevronLeft,
    ChevronRight,
    Command,
    Sparkles,
    User,
    Bot,
    MoreHorizontal,
    Paperclip,
    ArrowUp
} from 'lucide-react';

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

interface AICommandCenterProps {
    n8nConnected?: boolean | null;
    isActive?: boolean;
}

const AICommandCenter: React.FC<AICommandCenterProps> = ({ n8nConnected }) => {
    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            role: 'assistant',
            content: "Greetings, Operator. I am the Architect Node. I've initialized the mission control environment. How shall we automate your Notion and Instagram ecosystem today?",
            timestamp: new Date()
        }
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTo({
                top: scrollRef.current.scrollHeight,
                behavior: 'smooth'
            });
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

        // Simulate AI Response with a more "architectural" tone
        setTimeout(() => {
            const assistantMsg: Message = {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                content: "Analyzing request parameters... Synthesis complete. Based on your current deployment, I recommend a multi-step automation: trigger on new Instagram comments containing 'access', verify follower status via Meta API, and sync the profile to your Notion 'Leads' vault with a high-priority tag.",
                timestamp: new Date(),
                suggestedAction: {
                    label: "Deploy High-Priority Sync",
                    type: "automation",
                    preview: {
                        trigger: "Keyword Trigger ('access')",
                        steps: ["Follower Validation", "Notion CRM Ingest", "Priority Tagging", "Auto-Ack DM"]
                    }
                }
            };
            setMessages(prev => [...prev, assistantMsg]);
            setIsTyping(false);
        }, 1800);
    };

    return (
        <div className="flex h-[calc(100vh-12rem)] max-h-[800px] bg-black/40 rounded-3xl border border-white/5 overflow-hidden backdrop-blur-3xl shadow-2xl animate-in fade-in zoom-in-95 duration-700">
            {/* 1. Sidebar - Institutional Navigation */}
            <motion.div
                initial={false}
                animate={{ width: sidebarCollapsed ? '4rem' : '18rem' }}
                className="relative bg-black/40 border-r border-white/5 flex flex-col transition-all duration-300 ease-out hidden md:flex"
            >
                <div className="p-4 flex items-center justify-between">
                    {!sidebarCollapsed && (
                        <h2 className="text-[10px] font-black text-white/30 uppercase tracking-[0.3em] font-mono">Sessions</h2>
                    )}
                    <button
                        onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                        className="p-1.5 rounded-lg hover:bg-white/5 text-white/40 hover:text-white transition-colors ml-auto"
                    >
                        {sidebarCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto px-4 py-2 space-y-4 scrollbar-hide">
                    {!sidebarCollapsed && (
                        <button
                            onClick={() => setMessages([{ id: '1', role: 'assistant', content: "New session initialized. Awaiting commands...", timestamp: new Date() }])}
                            className="w-full py-2.5 px-4 bg-white/5 border border-white/10 rounded-xl text-[10px] font-bold uppercase tracking-widest text-white/60 hover:bg-white/10 hover:text-white transition-all flex items-center gap-2 group"
                        >
                            <Plus size={14} className="group-hover:rotate-90 transition-transform duration-300" />
                            New Architect Thread
                        </button>
                    )}

                    <div className="space-y-1">
                        {[
                            { title: "Meta Logic Audit", id: 1 },
                            { title: "Notion Sync Node", id: 2 },
                            { title: "Lead Inflow v4", id: 3 },
                        ].map((s) => (
                            <button key={s.id} className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-left hover:bg-white/5 transition-all group">
                                <div className="w-2 h-2 rounded-full bg-white/10 group-hover:bg-white/30 transition-colors" />
                                {!sidebarCollapsed && (
                                    <span className="text-[11px] font-medium text-white/40 group-hover:text-white truncate">{s.title}</span>
                                )}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="p-4 border-t border-white/5">
                    <div className={`flex items-center gap-3 ${sidebarCollapsed ? 'justify-center' : 'px-2'}`}>
                        <div className="relative">
                            <div className={`w-2 h-2 rounded-full animate-ping absolute inset-0 opacity-40 ${n8nConnected ? 'bg-purple-500' : 'bg-green-500'}`} />
                            <div className={`w-2 h-2 rounded-full relative z-10 shadow-lg ${n8nConnected ? 'bg-purple-500 shadow-purple-500/40' : 'bg-green-500 shadow-green-500/40'}`} />
                        </div>
                        {!sidebarCollapsed && (
                            <span className="text-[9px] font-black text-white/20 uppercase tracking-[0.2em]">
                                {n8nConnected ? 'N8N CORE ONLINE' : 'Logic Stream Active'}
                            </span>
                        )}
                    </div>
                </div>
            </motion.div>

            {/* 2. Chat Environment */}
            <div className="flex-1 flex flex-col relative bg-gradient-to-b from-transparent to-black/40">
                {/* Status Header */}
                <div className="h-14 border-b border-white/5 flex items-center justify-between px-6 bg-black/20 backdrop-blur-md">
                    <div className="flex items-center gap-3">
                        <div className="p-1.5 bg-white/5 rounded-lg border border-white/10">
                            <Bot size={14} className="text-white/40" />
                        </div>
                        <div>
                            <h3 className="text-xs font-bold text-white tracking-tight">Architect Node</h3>
                            <p className="text-[8px] font-black text-white/20 uppercase tracking-[0.2em]">Institutional-Elite-System</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full">
                            <Sparkles size={10} className="text-purple-400" />
                            <span className="text-[8px] font-black text-white/40 uppercase tracking-widest leading-none">Intelligence Optimized</span>
                        </div>
                        <button className="text-white/20 hover:text-white transition-colors">
                            <MoreHorizontal size={16} />
                        </button>
                    </div>
                </div>

                {/* Messages Hub */}
                <div
                    ref={scrollRef}
                    className="flex-1 overflow-y-auto px-4 md:px-0 py-8 scrollbar-hide selection:bg-white selection:text-black"
                >
                    <div className="max-w-3xl mx-auto space-y-10">
                        <AnimatePresence mode="popLayout">
                            {messages.map((msg) => (
                                <motion.div
                                    key={msg.id}
                                    initial={{ opacity: 0, y: 20, scale: 0.98 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                                    className={`flex gap-6 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
                                >
                                    <div className={`shrink-0 w-8 h-8 rounded-xl flex items-center justify-center border shadow-xl transition-all duration-500 ${msg.role === 'user'
                                        ? 'bg-white border-white text-black'
                                        : 'bg-black border-white/10 md:border-white/20 text-white'
                                        }`}>
                                        {msg.role === 'user' ? <User size={14} /> : <Bot size={14} />}
                                    </div>

                                    <div className={`flex flex-col gap-2 max-w-[85%] ${msg.role === 'user' ? 'items-end' : ''}`}>
                                        <div className={`px-5 py-4 rounded-2xl text-[13px] leading-relaxed transition-all duration-500 ${msg.role === 'user'
                                            ? 'bg-white/10 border border-white/20 text-white font-medium backdrop-blur-sm'
                                            : 'bg-[#0a0a0a] border border-white/5 text-white/80 shadow-inner'
                                            }`}>
                                            <p className="whitespace-pre-wrap">{msg.content}</p>
                                        </div>

                                        {msg.suggestedAction && (
                                            <motion.div
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: 0.3 }}
                                                className="mt-4 p-6 rounded-2xl bg-black border border-white/5 space-y-6 shadow-2xl relative group overflow-hidden"
                                            >
                                                <div className="absolute inset-0 bg-white/[0.02] opacity-0 group-hover:opacity-100 transition-opacity" />
                                                <div className="flex items-center gap-3 text-[10px] font-black text-white/30 uppercase tracking-[0.2em] relative">
                                                    <div className="p-2 bg-white/5 rounded-xl border border-white/10 text-white/40">
                                                        <Zap size={12} className="group-hover:text-amber-400 transition-colors" />
                                                    </div>
                                                    Logic Execution Framework
                                                </div>

                                                <div className="grid grid-cols-2 gap-4 relative">
                                                    {msg.suggestedAction.preview?.steps?.map((step: string, i: number) => (
                                                        <div key={i} className="flex items-center gap-3 p-3 bg-white/[0.03] border border-white/5 rounded-xl">
                                                            <div className="w-5 h-5 rounded-md bg-white/5 flex items-center justify-center text-[9px] font-black text-white/40">
                                                                {i + 1}
                                                            </div>
                                                            <span className="text-[10px] font-bold text-white/60 truncate">{step}</span>
                                                        </div>
                                                    ))}
                                                </div>

                                                <button className="w-full py-3.5 bg-white text-black rounded-xl font-black text-[10px] uppercase tracking-[0.2em] transform transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(255,255,255,0.1)] active:scale-95 relative overflow-hidden group/btn">
                                                    <span className="relative z-10">{msg.suggestedAction.label}</span>
                                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000" />
                                                </button>
                                            </motion.div>
                                        )}

                                        <span className="text-[8px] font-black text-white/10 uppercase tracking-widest mt-1">
                                            {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </span>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>

                        {isTyping && (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-6">
                                <div className="shrink-0 w-8 h-8 rounded-xl bg-black border border-white/5 flex items-center justify-center">
                                    <Bot size={14} className="text-white/20 animate-pulse" />
                                </div>
                                <div className="flex items-center gap-1.5 px-4 py-3 bg-white/[0.02] border border-white/5 rounded-2xl">
                                    <div className="w-1 h-1 bg-white/40 rounded-full animate-bounce [animation-delay:-0.3s]" />
                                    <div className="w-1 h-1 bg-white/40 rounded-full animate-bounce [animation-delay:-0.15s]" />
                                    <div className="w-1 h-1 bg-white/40 rounded-full animate-bounce" />
                                </div>
                            </motion.div>
                        )}
                    </div>
                </div>

                {/* Command Input Terminal */}
                <div className="p-6 md:p-10 bg-gradient-to-t from-black to-transparent">
                    <div className="max-w-3xl mx-auto">
                        <div className="relative group">
                            {/* Input Glow */}
                            <div className="absolute inset-x-4 -top-10 h-20 bg-white/5 blur-3xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-1000 pointer-events-none" />

                            <div className="relative flex items-end gap-2 p-2 bg-white/5 border border-white/10 rounded-2xl focus-within:border-white/20 transition-all shadow-2xl backdrop-blur-xl">
                                <button className="p-3 text-white/20 hover:text-white transition-all hover:bg-white/5 rounded-xl">
                                    <Paperclip size={18} />
                                </button>

                                <textarea
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter' && !e.shiftKey) {
                                            e.preventDefault();
                                            handleSend();
                                        }
                                    }}
                                    rows={1}
                                    placeholder="Execute architectural command..."
                                    className="flex-1 bg-transparent border-none focus:ring-0 text-white placeholder:text-white/10 py-3 text-sm resize-none max-h-40 overflow-y-auto font-medium"
                                />

                                <button
                                    onClick={handleSend}
                                    disabled={!input.trim() || isTyping}
                                    className={`p-3 rounded-xl transition-all duration-500 scale-90 group-hover:scale-100 ${input.trim()
                                        ? 'bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.2)]'
                                        : 'bg-white/5 text-white/10'
                                        }`}
                                >
                                    <ArrowUp size={18} />
                                </button>
                            </div>

                            <div className="mt-4 flex items-center justify-between px-2">
                                <div className="flex gap-4">
                                    <button className="flex items-center gap-1.5 text-[9px] font-black text-white/20 uppercase tracking-widest hover:text-white/40 transition-colors">
                                        <Command size={10} />
                                        <span>Library</span>
                                    </button>
                                    <button className="flex items-center gap-1.5 text-[9px] font-black text-white/20 uppercase tracking-widest hover:text-white/40 transition-colors">
                                        <History size={10} />
                                        <span>Models</span>
                                    </button>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <div className="w-1 h-1 bg-white/20 rounded-full" />
                                    <span className="text-[9px] font-black text-white/10 uppercase tracking-widest">Secure Input Node</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AICommandCenter;
