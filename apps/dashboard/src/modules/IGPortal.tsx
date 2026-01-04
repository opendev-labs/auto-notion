import { useState } from 'react';
import { motion } from 'framer-motion';
import { Instagram, Plus, MoreVertical, Search, CheckCircle2, ArrowRight, Loader2 } from 'lucide-react';
import { linkWithPopup } from 'firebase/auth';
import { facebookProvider, auth } from '../services/firebase';
import { NanoBanana } from '../services/nanobanana';
import { Sparkles, Copy } from 'lucide-react';

const IGPortal = () => {
    const [connecting, setConnecting] = useState(false);
    const [accounts, setAccounts] = useState([
        { name: '@MythicWisdom', category: 'Mythology', status: 'Connected', followers: '12.4k' },
        { name: '@DharmaDotes', category: 'Dharma', status: 'Connected', followers: '8.1k' },
        { name: '@KarmaKronicles', category: 'Karma', status: 'Syncing', followers: '15.2k' },
    ]);

    const handleConnect = async () => {
        if (!auth.currentUser) return;
        setConnecting(true);
        try {
            // Attempt to link the Facebook account to the existing authenticated user
            const result = await linkWithPopup(auth.currentUser, facebookProvider);
            // const credential = FacebookAuthProvider.credentialFromResult(result);
            // const accessToken = credential.accessToken;
            console.log("Instagram account linked successfully", result);
            // In a real app, we would now fetch the pages/IG accounts using the accessToken
            // and add them to the list. For now, we simulate success.
            setAccounts(prev => [...prev, { name: '@NewConnection', category: 'Uncategorized', status: 'Connected', followers: '0' }]);
        } catch (error: any) {
            console.error("Error linking Instagram:", error);
            if (error.code === 'auth/credential-already-in-use') {
                // The Facebook account is already linked to another user or this user.
                alert("This Facebook account is already associated with a user. Try signing in with it directly.");
            } else {
                alert("Failed to connect Instagram: " + error.message);
            }
        } finally {
            setConnecting(false);
        }
    };

    return (
        <div className="space-y-12">
            <div className="flex flex-col md:flex-row justify-between gap-6 items-center">
                <div className="relative w-full md:w-[480px]">
                    <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-white/30" size={18} />
                    <input
                        type="text"
                        placeholder="Search connected accounts..."
                        className="w-full bg-white/[0.03] border-0.5 border-white/10 rounded-2xl py-4 pl-14 pr-6 text-white placeholder:text-white/20 focus:bg-white/[0.05] focus:border-white/20 outline-none transition-all duration-500 font-medium"
                    />
                </div>
                <button
                    onClick={handleConnect}
                    disabled={connecting}
                    className="btn-primary flex items-center gap-3 px-8 group whitespace-nowrap disabled:opacity-50"
                >
                    {connecting ? <Loader2 className="animate-spin" size={18} /> : <Plus size={18} />}
                    {connecting ? 'Connecting...' : 'Connect New Account'}
                    {!connecting && <ArrowRight size={16} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500" />}
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {accounts.map((acc, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1, duration: 0.6, ease: "easeOut" as any }}
                        className="glass p-6 md:p-8 rounded-[2rem] md:rounded-[2.5rem] border-white/5 relative overflow-hidden group hover:border-white/20"
                    >
                        <div className="flex justify-between items-start mb-8 transition-transform duration-700 group-hover:-translate-y-1">
                            <div className="w-16 h-16 bg-white text-black rounded-3xl flex items-center justify-center shadow-2xl transition-all duration-700 group-hover:scale-110 group-hover:shadow-[0_0_30px_rgba(255,255,255,0.1)]">
                                <Instagram size={32} strokeWidth={2.5} />
                            </div>
                            <button className="text-white/20 hover:text-white transition-colors p-2">
                                <MoreVertical size={20} />
                            </button>
                        </div>

                        <div className="space-y-1 mb-8">
                            <h4 className="font-bold text-xl text-white flex items-center gap-2 tracking-tight">
                                {acc.name}
                                <CheckCircle2 size={18} className="text-white" fill="white" />
                            </h4>
                            <p className="text-white/40 text-sm font-bold tracking-widest uppercase">Instagram Automation Node</p>
                        </div>

                        <div className="space-y-4 mb-8">
                            <div className="flex justify-between items-center px-4 py-3 rounded-2xl bg-white/5 border border-white/10">
                                <span className="text-[10px] font-bold text-white/30 uppercase tracking-widest">Active Automations</span>
                                <span className="text-sm font-bold text-white">3</span>
                            </div>
                            <button className="w-full py-4 rounded-2xl bg-white text-black font-bold text-xs tracking-widest uppercase hover:bg-zen-sage transition-all">
                                View Automations
                            </button>
                        </div>

                        <div className="flex justify-between items-end pt-8 border-t-0.5 border-white/10">
                            <div>
                                <p className="text-[10px] font-bold uppercase text-white/30 tracking-[0.2em] mb-1">Followers</p>
                                <p className="font-bold text-2xl tracking-tighter text-white">{acc.followers}</p>
                            </div>
                            <div className={`px-4 py-1.5 rounded-full text-[10px] font-extrabold uppercase tracking-widest border-0.5 ${acc.status === 'Connected'
                                ? 'bg-white/5 border-white/10 text-white'
                                : 'bg-white/[0.02] border-white/5 text-white/40'
                                }`}>
                                {acc.status}
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* AI Content Studio Section */}
            <div className="pt-12 border-t border-white/5">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h3 className="text-xl font-bold text-white mb-2">Nano-Banana Studio</h3>
                        <p className="text-white/40 text-sm">AI-powered content generation for your nodes</p>
                    </div>
                    <div className="px-3 py-1 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-500 text-[10px] font-bold uppercase tracking-widest">
                        Beta v0.9
                    </div>
                </div>

                <AIContentGenerator />
            </div>
        </div>
    );
};

// Sub-component for Generator to keep main clean

const AIContentGenerator = () => {
    const [topic, setTopic] = useState('');
    const [result, setResult] = useState('');
    const [loading, setLoading] = useState(false);

    const handleGenerate = async () => {
        if (!topic) return;
        setLoading(true);
        try {
            const content = await NanoBanana.generateCaption(topic);
            setResult(content);
        } catch (err: any) {
            setResult("Error generating content: " + err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="glass p-6 md:p-8 rounded-[2rem] border-white/5 space-y-6">
            <div className="flex gap-4">
                <input
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    placeholder="Enter a topic for your next post (e.g. 'Monday Motivation for entrepreneurs')"
                    className="flex-1 bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:border-white/30 outline-none transition-all"
                />
                <button
                    onClick={handleGenerate}
                    disabled={loading || !topic}
                    className="btn-primary px-6 py-3 rounded-xl flex items-center gap-2 disabled:opacity-50"
                >
                    {loading ? <Loader2 className="animate-spin" size={18} /> : <Sparkles size={18} />}
                    <span>Generate</span>
                </button>
            </div>

            {result && (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-black/40 border border-white/10 rounded-xl p-6 relative group"
                >
                    <button
                        onClick={() => navigator.clipboard.writeText(result)}
                        className="absolute right-4 top-4 p-2 text-white/20 hover:text-white transition-colors"
                        title="Copy to clipboard"
                    >
                        <Copy size={16} />
                    </button>
                    <pre className="whitespace-pre-wrap font-sans text-white/80 text-sm leading-relaxed">
                        {result}
                    </pre>
                </motion.div>
            )}
        </div>
    );
};

export default IGPortal;

