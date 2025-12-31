
import { useState } from 'react';
import { motion } from 'framer-motion';
import { googleProvider, facebookProvider, githubProvider, signInWithProvider } from '../services/firebase';
import { Github, Facebook } from 'lucide-react'; // Simulating Google icon with Chrome/Globe if generic not avail

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
            setError(`Failed to sign in with ${providerName}. Check console.`);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md glass p-8 rounded-3xl border border-white/10 text-center"
            >
                <div className="mb-8">
                    <div className="w-16 h-16 bg-white/10 rounded-2xl mx-auto flex items-center justify-center mb-4">
                        <span className="text-3xl">🌌</span>
                    </div>
                    <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                        Mission Control
                    </h1>
                    <p className="text-gray-400 mt-2 text-sm">Authenticate to access the Sovereign Agent.</p>
                </div>

                {error && (
                    <div className="mb-6 p-3 bg-red-500/10 border border-red-500/20 text-red-400 text-xs rounded-lg">
                        {error}
                    </div>
                )}

                <div className="space-y-4">
                    <button
                        disabled={isLoading}
                        onClick={() => handleLogin(googleProvider, 'Google')}
                        className="w-full flex items-center justify-center gap-3 py-3 px-4 bg-white text-black rounded-xl font-bold hover:bg-gray-200 transition-all disabled:opacity-50"
                    >
                        {/* Simple Google Icon Mock */}
                        <div className="w-5 h-5 rounded-full border-2 border-current flex items-center justify-center text-[10px] font-bold">G</div>
                        Continue with Google
                    </button>

                    <button
                        disabled={isLoading}
                        onClick={() => handleLogin(facebookProvider, 'Facebook')}
                        className="w-full flex items-center justify-center gap-3 py-3 px-4 bg-[#1877F2] text-white rounded-xl font-bold hover:bg-[#1864D9] transition-all disabled:opacity-50"
                    >
                        <Facebook size={20} className="fill-current" />
                        Continue with Facebook
                    </button>

                    <button
                        disabled={isLoading}
                        onClick={() => handleLogin(githubProvider, 'GitHub')}
                        className="w-full flex items-center justify-center gap-3 py-3 px-4 bg-[#24292e] border border-white/10 text-white rounded-xl font-bold hover:bg-[#2f363d] transition-all disabled:opacity-50"
                    >
                        <Github size={20} className="fill-current" />
                        Continue with GitHub
                    </button>
                </div>

                <div className="mt-8 text-xs text-gray-500">
                    By entering, you agree to the <span className="text-white underline cursor-pointer">Sovereign Protocol</span>.
                </div>
            </motion.div>
        </div>
    );
}
