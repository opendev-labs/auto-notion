
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { googleProvider, facebookProvider, githubProvider, signInWithProvider } from '../services/firebase';
import { Github, Facebook, Quote, CheckCircle2, Shield, Lock, ArrowRight, Loader2 } from 'lucide-react';

export default function Login({ onLoginSuccess }: { onLoginSuccess: () => void }) {
    console.log("Login component rendering...");
    const [isLoading, setIsLoading] = useState(false);
    const [loadingProvider, setLoadingProvider] = useState<string | null>(null);
    const [error, setError] = useState('');

    const handleLogin = async (provider: any, providerName: string) => {
        setIsLoading(true);
        setLoadingProvider(providerName);
        setError('');
        try {
            await signInWithProvider(provider);
            onLoginSuccess();
        } catch (err: any) {
            console.error(err);
            setError(`Failed to sign in with ${providerName}. Please try again.`);
        } finally {
            setIsLoading(false);
            setLoadingProvider(null);
        }
    };

    return (
        <div className="flex min-h-screen bg-[#050505] text-white font-sans selection:bg-institutional-indigo/30 selection:text-white overflow-hidden">

            {/* Left Column: Visual & Proof */}
            <div className="hidden lg:flex w-[45%] relative overflow-hidden bg-[#0A0A0A] border-r border-white/[0.03] flex-col justify-between p-16">

                {/* Background Grid & Glows */}
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-50" />
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-institutional-indigo/10 via-transparent to-transparent opacity-50" />
                <div className="absolute -bottom-[20%] -right-[10%] w-[600px] h-[600px] bg-institutional-indigo/10 rounded-full blur-[120px]" />

                <div className="relative z-10">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-center gap-3 text-2xl font-bold tracking-tight"
                    >
                        <div className="w-9 h-9 rounded-xl flex items-center justify-center backdrop-blur-xl overflow-hidden">
                            <img src="/logo.svg" alt="Auto-Notion" className="w-full h-full object-contain" />
                        </div>
                        <span className="bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60">
                            Auto-Notion
                        </span>
                    </motion.div>
                </div>

                <div className="relative z-10 space-y-12 max-w-lg">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="space-y-6"
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold tracking-widest text-institutional-indigo uppercase">
                            <Shield size={12} />
                            Institutional Grade
                        </div>
                        <div className="space-y-4">
                            <Quote className="w-8 h-8 text-institutional-indigo/40" />
                            <p className="text-3xl font-medium leading-[1.4] text-white/90">
                                "The level of precision in content orchestration is <span className="text-white italic">unmatched</span>. It's not just automation; it's intelligence."
                            </p>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full border border-white/10 p-0.5">
                                <div className="w-full h-full rounded-full bg-gradient-to-br from-institutional-indigo to-purple-500 overflow-hidden">
                                    {/* User image placeholder or avatar */}
                                </div>
                            </div>
                            <div>
                                <div className="font-bold text-lg">Marcus Aurelius Dev</div>
                                <div className="text-sm text-white/40">Infrastructure Lead, Hyperion Systems</div>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="pt-12 border-t border-white/5 grid grid-cols-1 gap-6"
                    >
                        <div className="flex items-center gap-4 group">
                            <div className="w-8 h-8 rounded-lg bg-green-500/10 flex items-center justify-center text-green-500 group-hover:scale-110 transition-transform">
                                <CheckCircle2 size={16} />
                            </div>
                            <span className="text-sm text-white/60 font-medium">Meta Graph API v21.0 Certified</span>
                        </div>
                        <div className="flex items-center gap-4 group">
                            <div className="w-8 h-8 rounded-lg bg-institutional-indigo/10 flex items-center justify-center text-institutional-indigo group-hover:scale-110 transition-transform">
                                <Lock size={16} />
                            </div>
                            <span className="text-sm text-white/60 font-medium">SOC2 Type II Compliant Architecture</span>
                        </div>
                    </motion.div>
                </div>

                <div className="relative z-10 flex gap-2">
                    {[0, 1, 2].map(i => (
                        <div key={i} className={`h-1.5 rounded-full transition-all duration-500 ${i === 0 ? 'w-8 bg-institutional-indigo' : 'w-1.5 bg-white/10'}`} />
                    ))}
                </div>
            </div>

            {/* Right Column: Auth Form */}
            <div className="w-full lg:w-[55%] flex items-center justify-center p-8 lg:p-24 relative">

                {/* Mobile Background Elements */}
                <div className="lg:hidden absolute inset-0 -z-10 bg-[#050505] overflow-hidden">
                    <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-institutional-indigo/5 rounded-full blur-[80px]" />
                </div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="w-full max-w-md space-y-10"
                >
                    <div className="space-y-6">
                        <div className="w-10 h-10 rounded-2xl flex items-center justify-center backdrop-blur-xl overflow-hidden">
                            <img src="/logo.svg" alt="Auto-Notion" className="w-full h-full object-contain" />
                        </div>
                        <div className="space-y-3">
                            <h1 className="text-4xl font-bold tracking-tight text-white">
                                Access Control
                            </h1>
                            <p className="text-white/40 text-lg">
                                Authenticate to begin agentic session
                            </p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <AnimatePresence mode="wait">
                            {error && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="p-4 bg-red-500/5 border border-red-500/20 text-red-400 text-sm rounded-xl flex items-center gap-3"
                                >
                                    <Shield size={16} className="shrink-0" />
                                    {error}
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <div className="grid gap-3">
                            <button
                                disabled={isLoading}
                                onClick={() => handleLogin(githubProvider, 'GitHub')}
                                className="group relative w-full h-14 flex items-center justify-between px-6 bg-white text-black rounded-2xl font-bold text-sm hover:bg-white/90 active:scale-[0.98] transition-all disabled:opacity-50 disabled:active:scale-100"
                            >
                                <div className="flex items-center gap-4">
                                    {loadingProvider === 'GitHub' ? <Loader2 className="animate-spin" size={20} /> : <Github size={20} />}
                                    <span>Continue with GitHub</span>
                                </div>
                                <ArrowRight size={18} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                            </button>

                            <button
                                disabled={isLoading}
                                onClick={() => handleLogin(googleProvider, 'Google')}
                                className="group relative w-full h-14 flex items-center justify-between px-6 bg-transparent border border-white/10 text-white rounded-2xl font-bold text-sm hover:bg-white/[0.03] active:scale-[0.98] transition-all disabled:opacity-50"
                            >
                                <div className="flex items-center gap-4">
                                    {loadingProvider === 'Google' ? <Loader2 className="animate-spin" size={20} /> : (
                                        <svg className="w-5 h-5 font-bold" viewBox="0 0 24 24">
                                            <path fill="currentColor" d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .533 5.333.533 12S5.867 24 12.48 24c3.44 0 6.013-1.133 8.053-3.24 2.08-2.16 2.72-5.333 2.72-8.08 0-.813-.093-1.587-.2-2.28h-10.57z" />
                                        </svg>
                                    )}
                                    <span>Continue with Google</span>
                                </div>
                                <ArrowRight size={18} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                            </button>

                            <button
                                disabled={isLoading}
                                onClick={() => handleLogin(facebookProvider, 'Facebook')}
                                className="group relative w-full h-14 flex items-center justify-between px-6 bg-[#1877F2]/10 border border-[#1877F2]/20 text-[#1877F2] rounded-2xl font-bold text-sm hover:bg-[#1877F2]/20 active:scale-[0.98] transition-all disabled:opacity-50"
                            >
                                <div className="flex items-center gap-4">
                                    {loadingProvider === 'Facebook' ? <Loader2 className="animate-spin" size={20} /> : <Facebook size={20} />}
                                    <span>Continue with Facebook</span>
                                </div>
                                <ArrowRight size={18} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                            </button>
                        </div>
                    </div>

                    <div className="pt-8 space-y-6">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t border-white/[0.05]" />
                            </div>
                        </div>

                        <p className="text-center text-[11px] text-white/30 leading-relaxed max-w-[280px] mx-auto font-medium tracking-wide">
                            Security Protocols Apply. By continuing, you accept our{' '}
                            <a href="/terms" className="text-white/60 hover:text-institutional-indigo underline underline-offset-4 decoration-white/10 transition-colors">Terms of Service</a>{' '}
                            and{' '}
                            <a href="/privacy" className="text-white/60 hover:text-institutional-indigo underline underline-offset-4 decoration-white/10 transition-colors">Privacy Policy</a>.
                        </p>
                    </div>
                </motion.div>

                {/* Fixed Footer Element for Premium Feel */}
                <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-6 text-[10px] font-bold tracking-[0.2em] text-white/10 uppercase">
                    <span>Protocol v4.0.1</span>
                    <span className="w-1 h-1 bg-white/10 rounded-full" />
                    <span>Secure Agent Layer</span>
                    <span className="w-1 h-1 bg-white/10 rounded-full" />
                    <span>OpenDev-Labs Agentic</span>
                </div>
            </div>
        </div>
    );
}
