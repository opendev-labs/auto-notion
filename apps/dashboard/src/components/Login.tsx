
import { useState } from 'react';
import { googleProvider, facebookProvider, githubProvider, signInWithProvider } from '../services/firebase';
import { Github, Facebook, Quote, CheckCircle2 } from 'lucide-react';

export default function Login({ onLoginSuccess }: { onLoginSuccess: () => void }) {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleLogin = async (provider: any, providerName: string) => {
        setIsLoading(true);
        setError('');
        try {
            await signInWithProvider(provider);
            onLoginSuccess();
        } catch (err: any) {
            console.error(err);
            setError(`Failed to sign in with ${providerName}.`);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen bg-black text-white font-sans selection:bg-institutional-indigo selection:text-white">

            {/* Left Column: Brand & Social Proof (Saasfly Style) */}
            <div className="hidden lg:flex w-1/2 relative overflow-hidden bg-zen-slate border-r border-white/5 flex-col justify-between p-12">

                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-20">
                    <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                        <path d="M0 100 C 20 0 50 0 100 100 Z" fill="url(#grad1)" />
                        <defs>
                            <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" style={{ stopColor: "#6366f1", stopOpacity: 1 }} />
                                <stop offset="100%" style={{ stopColor: "#a855f7", stopOpacity: 1 }} />
                            </linearGradient>
                        </defs>
                    </svg>
                </div>

                <div className="relative z-10">
                    <div className="flex items-center gap-3 text-2xl font-bold tracking-tight">
                        <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                            <span className="text-xl">🌌</span>
                        </div>
                        Auto-Notion
                    </div>
                </div>

                <div className="relative z-10 space-y-8 max-w-lg">
                    <div className="space-y-6">
                        <Quote className="w-8 h-8 text-white/40" />
                        <p className="text-2xl font-medium leading-relaxed">
                            "Auto-Notion has completely transformed how we manage our institutional social presence. The drift calibration is unmatched."
                        </p>
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-indigo-500" />
                            <div>
                                <div className="font-bold">Sarah Chen</div>
                                <div className="text-sm text-white/50">Director of Operations, Orbital Ventures</div>
                            </div>
                        </div>
                    </div>

                    <div className="pt-8 border-t border-white/5 space-y-4">
                        <div className="flex items-center gap-3 text-sm text-white/60">
                            <CheckCircle2 className="w-4 h-4 text-green-500" />
                            Zero-Cost Infrastructure (Firebase + n8n)
                        </div>
                        <div className="flex items-center gap-3 text-sm text-white/60">
                            <CheckCircle2 className="w-4 h-4 text-green-500" />
                            Official Meta Graph API Integration
                        </div>
                        <div className="flex items-center gap-3 text-sm text-white/60">
                            <CheckCircle2 className="w-4 h-4 text-green-500" />
                            Gemini-Powered Neural Content Engine
                        </div>
                    </div>

                    <div className="flex gap-2">
                        {[1, 2, 3].map(i => (
                            <div key={i} className={`w-2 h-2 rounded-full ${i === 1 ? 'bg-white' : 'bg-white/20'}`} />
                        ))}
                    </div>
                </div>
            </div>

            {/* Right Column: Auth Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-12 relative">
                <div className="w-full max-w-md space-y-8">
                    <div className="text-center space-y-2">
                        <h1 className="text-3xl font-bold tracking-tight">Create an account</h1>
                        <p className="text-white/50 text-sm">Enter your email below to create your account</p>
                    </div>

                    <div className="space-y-4">
                        {error && (
                            <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-400 text-xs rounded-lg text-center">
                                {error}
                            </div>
                        )}

                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t border-white/10" />
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-black px-2 text-white/40">Continue with</span>
                            </div>
                        </div>

                        <button
                            disabled={isLoading}
                            onClick={() => handleLogin(githubProvider, 'GitHub')}
                            className="w-full h-11 flex items-center justify-center gap-3 bg-white text-black rounded-md font-medium text-sm hover:bg-white/90 transition-all disabled:opacity-50"
                        >
                            <Github size={18} />
                            GitHub
                        </button>

                        <button
                            disabled={isLoading}
                            onClick={() => handleLogin(googleProvider, 'Google')}
                            className="w-full h-11 flex items-center justify-center gap-3 bg-transparent border border-white/20 text-white rounded-md font-medium text-sm hover:bg-white/5 transition-all disabled:opacity-50"
                        >
                            <svg className="w-4 h-4" viewBox="0 0 24 24">
                                <path fill="currentColor" d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .533 5.333.533 12S5.867 24 12.48 24c3.44 0 6.013-1.133 8.053-3.24 2.08-2.16 2.72-5.333 2.72-8.08 0-.813-.093-1.587-.2-2.28h-10.57z" />
                            </svg>
                            Google
                        </button>

                        <button
                            disabled={isLoading}
                            onClick={() => handleLogin(facebookProvider, 'Facebook')}
                            className="w-full h-11 flex items-center justify-center gap-3 bg-[#1877F2] text-white rounded-md font-medium text-sm hover:bg-[#1864D9] transition-all disabled:opacity-50"
                        >
                            <Facebook size={18} />
                            Facebook
                        </button>
                    </div>

                    <p className="px-8 text-center text-xs text-white/40 leading-relaxed">
                        By clicking continue, you agree to our{' '}
                        <a href="/terms" className="underline underline-offset-4 hover:text-white">Terms of Service</a>{' '}
                        and{' '}
                        <a href="/privacy" className="underline underline-offset-4 hover:text-white">Privacy Policy</a>.
                    </p>
                </div>
            </div>
        </div>
    );
}
