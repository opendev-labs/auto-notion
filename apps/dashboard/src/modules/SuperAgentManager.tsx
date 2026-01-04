import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    History,
    ChevronLeft,
    ChevronRight,
    Sparkles,
    User,
    Paperclip,
    ArrowUp,
    Search,
    MessageSquare,
    Zap,
    Github,
    Moon,
    Grid,
    Layout,
    Terminal
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { SuperAgentService } from '../services/SuperAgentService';

interface Message {
    id: string;
    role: 'user' | 'assistant';
    content: string;
    timestamp: Date;
    type?: 'text' | 'tool_call' | 'status';
}

interface AICommandCenterProps {
    n8nConnected?: boolean | null;
}

const AutoNotionLogo = ({ className = "w-6 h-6" }) => (
    <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="100" height="100" rx="16" fill="black" />
        <path d="M50 15L85 85H70L50 45L30 85H15L50 15Z" fill="white" />
    </svg>
);

const SuperAgentManager: React.FC<AICommandCenterProps> = ({ n8nConnected }) => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [aiStatus, setAiStatus] = useState<string | null>(null);
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();

    useEffect(() => {
        SuperAgentService.setContext({
            navigate: (path: string) => navigate(path),
            getSystemStatus: async () => ({
                n8n: n8nConnected ? 'Online' : 'Offline',
                firebase: 'Connected',
                timestamp: new Date().toISOString()
            }),
            triggerSync: async (provider: string) => {
                console.log(`Triggering sync for ${provider}`);
                return { success: true, message: `Sync sequence initiated for ${provider}` };
            }
        });
    }, [navigate, n8nConnected]);

    const suggestions = [
        { label: "Analyze my IG reach", icon: <Zap size={12} className="text-yellow-400" /> },
        { label: "Sync Notion Leads", icon: <Layout size={12} className="text-blue-400" /> },
        { label: "Create Reel Script", icon: <Sparkles size={12} className="text-purple-400" /> },
        { label: "Check n8n Status", icon: <Grid size={12} className="text-green-400" /> },
        { label: "Post 3 Quotes today", icon: <MessageSquare size={12} className="text-indigo-400" /> },
        { label: "Show failed workflows", icon: <History size={12} className="text-red-400" /> },
    ];

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTo({
                top: scrollRef.current.scrollHeight,
                behavior: 'smooth'
            });
        }
    }, [messages, isTyping]);

    const handleSend = async (customInput?: string) => {
        const text = customInput || input;
        if (!text.trim()) return;

        const userMsg: Message = {
            id: Date.now().toString(),
            role: 'user',
            content: text,
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setIsTyping(true);
        setAiStatus("Initializing consciousness...");

        try {
            const response = await SuperAgentService.processMessage(text, (status) => {
                setAiStatus(status);
            });

            const assistantMsg: Message = {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                content: response,
                timestamp: new Date()
            };
            setMessages(prev => [...prev, assistantMsg]);
        } catch (error: any) {
            const errorMsg: Message = {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                content: `Protocol Failure: ${error.message}`,
                timestamp: new Date()
            };
            setMessages(prev => [...prev, errorMsg]);
        } finally {
            setIsTyping(false);
            setAiStatus(null);
        }
    };

    return (
        <div className="flex h-full w-full bg-black text-white font-sans selection:bg-white/20 overflow-hidden">
            {/* 1. Nuxt-Style Sidebar */}
            <motion.div
                initial={false}
                animate={{ width: sidebarCollapsed ? '0px' : '260px' }}
                className="relative bg-[#0a0a0a] border-r border-white/5 flex flex-col transition-all duration-300 ease-in-out z-20"
            >
                <div className="p-4 flex items-center justify-between">
                    <div className="flex items-center gap-2 px-2 py-1">
                        <AutoNotionLogo className="w-6 h-6" />
                        <span className="font-bold text-sm tracking-tight">Chat</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <button className="p-2 hover:bg-white/5 rounded-lg text-white/40"><Search size={16} /></button>
                        <button
                            onClick={() => setSidebarCollapsed(true)}
                            className="p-2 hover:bg-white/5 rounded-lg text-white/40"
                        >
                            <ChevronLeft size={16} />
                        </button>
                    </div>
                </div>

                <div className="px-4 py-2">
                    <button
                        onClick={() => setMessages([])}
                        className="w-full py-2 px-3 bg-white/5 hover:bg-white/10 border border-white/5 rounded-lg text-xs font-semibold text-white/80 transition-all flex items-center justify-center gap-2 mb-6"
                    >
                        New chat
                    </button>

                    <div className="space-y-6 overflow-y-auto max-h-[calc(100vh-200px)] scrollbar-hide">
                        <div>
                            <h3 className="text-[10px] font-bold text-white/20 uppercase tracking-widest px-2 mb-2">Today</h3>
                            <button className="w-full text-left px-3 py-2 rounded-lg text-[13px] text-white/60 hover:bg-white/5 hover:text-white truncate transition-colors">
                                Benefits of Nuxt UI
                            </button>
                            <button className="w-full text-left px-3 py-2 rounded-lg text-[13px] text-white/60 hover:bg-white/5 hover:text-white truncate transition-colors">
                                Benefits of Using This...
                            </button>
                            <button className="w-full text-left px-3 py-2 rounded-lg text-[13px] text-white/60 hover:bg-white/5 hover:text-white truncate transition-colors">
                                Benefits of Nuxt UI
                            </button>
                        </div>
                    </div>
                </div>

                <div className="mt-auto p-4 border-t border-white/5 space-y-2">
                    <div className="flex items-center gap-2 px-3 py-1">
                        <div className={`w-1.5 h-1.5 rounded-full ${n8nConnected ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]' : 'bg-white/20'}`} />
                        <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">
                            {n8nConnected ? 'System Online' : 'Local Node Active'}
                        </span>
                    </div>
                    <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/5 text-white/40 hover:text-white transition-all">
                        <Github size={18} />
                        <span className="text-[13px] font-medium">Login with GitHub</span>
                    </button>
                </div>
            </motion.div>

            {/* Sidebar Toggle (when collapsed) */}
            {sidebarCollapsed && (
                <button
                    onClick={() => setSidebarCollapsed(false)}
                    className="fixed left-4 top-4 z-30 p-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-white/40"
                >
                    <ChevronRight size={16} />
                </button>
            )}

            {/* 2. Main Chat Canvas */}
            <div className="flex-1 flex flex-col relative bg-black">
                {/* Header Info (Top Right) */}
                <div className="absolute top-4 right-6 z-10 flex items-center gap-4">
                    <button className="p-2 text-white/40 hover:text-white transition-colors"><Moon size={18} /></button>
                </div>

                {/* Content Stream */}
                <div
                    ref={scrollRef}
                    className="flex-1 overflow-y-auto px-4 py-12 scrollbar-hide"
                >
                    {messages.length === 0 ? (
                        /* Empty State: Centered Welcome */
                        <div className="h-full flex flex-col items-center justify-center max-w-2xl mx-auto text-center px-4">
                            <motion.h1
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-4xl md:text-5xl font-black text-white tracking-tight mb-12"
                            >
                                How can I help you today?
                            </motion.h1>

                            <div className="w-full space-y-8">
                                <div className="relative group">
                                    <div className="absolute inset-0 bg-white/5 blur-3xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-1000 -z-10" />
                                    <div className="bg-[#111] border border-white/10 rounded-2xl p-2 flex items-center shadow-2xl transition-all focus-within:border-white/20">
                                        <button className="p-3 text-white/30 hover:text-white transition-colors">
                                            <Paperclip size={20} />
                                        </button>
                                        <input
                                            type="text"
                                            value={input}
                                            onChange={(e) => setInput(e.target.value)}
                                            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                                            placeholder="Type your message here..."
                                            className="flex-1 bg-transparent border-none focus:ring-0 text-white placeholder:text-white/20 text-base py-3"
                                        />
                                        <div className="flex items-center gap-2 pr-2">
                                            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 border border-white/5 rounded-lg text-[11px] font-bold text-white/40 cursor-default">
                                                <AutoNotionLogo className="w-5 h-5" />
                                                AUTO-NOTION ARCHITECT
                                            </div>
                                            <button
                                                onClick={() => handleSend()}
                                                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${input ? 'bg-white text-black' : 'bg-white/10 text-white/20'}`}
                                            >
                                                <ArrowUp size={20} />
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-wrap justify-center gap-2">
                                    {suggestions.map((s, i) => (
                                        <button
                                            key={i}
                                            onClick={() => handleSend(s.label)}
                                            className="flex items-center gap-2 px-3 py-2 bg-[#111] border border-white/5 rounded-full text-[12px] font-medium text-white/60 hover:bg-white/5 hover:text-white hover:border-white/20 transition-all border-dashed"
                                        >
                                            {s.icon}
                                            {s.label}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ) : (
                        /* Active Chat Stream */
                        <div className="max-w-3xl mx-auto space-y-12">
                            <AnimatePresence mode="popLayout">
                                {messages.map((msg) => (
                                    <motion.div
                                        key={msg.id}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="space-y-4"
                                    >
                                        <div className="flex items-center gap-2 mb-2">
                                            <div className={`w-6 h-6 rounded flex items-center justify-center overflow-hidden border ${msg.role === 'user' ? 'bg-white border-white text-black' : 'bg-black border-white/20'}`}>
                                                {msg.role === 'user' ? <User size={14} /> : <AutoNotionLogo className="w-full h-full" />}
                                            </div>
                                            <span className="text-xs font-bold uppercase tracking-widest text-white/40">
                                                {msg.role === 'user' ? 'Operator' : 'Architect OS'}
                                            </span>
                                        </div>
                                        <div className="pl-8 text-[15px] leading-relaxed text-white/90 font-medium">
                                            <p className="whitespace-pre-wrap">{msg.content}</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>

                            {isTyping && (
                                <div className="flex flex-col gap-3 pl-8">
                                    <div className="flex items-center gap-2 animate-pulse">
                                        <div className="w-2 h-2 rounded-full bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.6)]" />
                                        <span className="text-[11px] font-black text-white/40 uppercase tracking-[0.2em]">Executing architectural logic...</span>
                                    </div>
                                    {aiStatus && (
                                        <motion.div
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            className="flex items-center gap-2 px-3 py-1.5 bg-white/5 border border-white/5 rounded-lg w-fit"
                                        >
                                            <Terminal size={12} className="text-purple-400" />
                                            <span className="text-[10px] font-mono text-purple-400/80">{aiStatus}</span>
                                        </motion.div>
                                    )}
                                </div>
                            )}

                            {/* Floating Bottom Input for Active Chat */}
                            <div className="fixed bottom-10 left-[260px] right-0 px-4 pointer-events-none transition-all duration-300" style={{ left: sidebarCollapsed ? '0px' : '260px' }}>
                                <div className="max-w-2xl mx-auto pointer-events-auto">
                                    <div className="relative group">
                                        <div className="bg-[#111]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-2 flex items-center shadow-2xl transition-all focus-within:border-white/30">
                                            <button className="p-3 text-white/30 hover:text-white transition-colors">
                                                <Paperclip size={20} />
                                            </button>
                                            <input
                                                type="text"
                                                value={input}
                                                onChange={(e) => setInput(e.target.value)}
                                                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                                                placeholder="Ask the Command Brain..."
                                                className="flex-1 bg-transparent border-none focus:ring-0 text-white placeholder:text-white/20 text-sm py-2"
                                            />
                                            <button
                                                onClick={() => handleSend()}
                                                className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${input ? 'bg-white text-black' : 'bg-white/10 text-white/20'}`}
                                            >
                                                <ArrowUp size={16} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SuperAgentManager;
