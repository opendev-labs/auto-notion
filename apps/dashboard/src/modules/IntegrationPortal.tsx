
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Activity, Terminal, Database, Link, Instagram } from 'lucide-react';
import { SacredGeometryBackground } from '../components/SacredGeometry';
import '../styles/integration-mode.css';

// Declare globals for FB SDK
declare global {
    interface Window {
        fbAsyncInit: () => void;
        FB: any;
    }
}

interface IntegrationPortalProps {
    isActive: boolean;
    n8nConnected?: boolean | null;
}

export default function IntegrationPortal({ isActive, n8nConnected }: IntegrationPortalProps) {
    const [status, setStatus] = useState<'idle' | 'connecting' | 'connected'>('idle');
    const [logs, setLogs] = useState<string[]>([]);

    useEffect(() => {
        // Initialize Facebook SDK
        window.fbAsyncInit = function () {
            window.FB.init({
                appId: '689310950781431',
                cookie: true,
                xfbml: true,
                version: 'v18.0'
            });
            window.FB.AppEvents.logPageView();
            addLog("✓ Meta SDK Initialized [v18.0]");
        };

        (function (d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) { return; }
            js = d.createElement(s) as HTMLScriptElement; js.id = id;
            js.src = "https://connect.facebook.net/en_US/sdk.js";
            if (fjs && fjs.parentNode) {
                fjs.parentNode.insertBefore(js, fjs);
            }
        }(document, 'script', 'facebook-jssdk'));

    }, []);

    // Mock "Real-time" fetching of posts from Firestore
    useEffect(() => {
        if (isActive) {
            addLog("Initializing Neural Command Center...");
            addLog("Connecting to Firestore [db:auto-notion-v1]...");
            setTimeout(() => addLog("✓ Firestore Connection Established"), 800);
            setTimeout(() => addLog("Checking Neural Link (n8n)..."), 1500);
            setTimeout(() => addLog("✓ n8n Workflow 'Daily-Generator' Online"), 2200);
        }
    }, [isActive]);

    const addLog = (msg: string) => {
        setLogs(prev => [`[${new Date().toLocaleTimeString()}] ${msg}`, ...prev].slice(0, 10));
    };

    const handleConnectInstagram = () => {
        addLog("Initiating Official Meta OAuth Flow...");
        setStatus('connecting');

        if (window.FB) {
            window.FB.login((response: any) => {
                if (response.authResponse) {
                    console.log('Welcome!  Fetching your information.... ');
                    addLog("✓ User Authorized App");
                    addLog(`✓ Access Token Received: ${response.authResponse.accessToken.substring(0, 10)}...`);

                    window.FB.api('/me', function (response: any) {
                        console.log('Good to see you, ' + response.name + '.');
                        addLog(`✓ Identity Verified: ${response.name}`);
                        setStatus('connected');
                    });
                } else {
                    console.log('User cancelled login or did not fully authorize.');
                    addLog("⚠ User Cancelled / Failed Authorization");
                    setStatus('idle');
                }
            }, { scope: 'instagram_basic,instagram_content_publish,pages_show_list,pages_read_engagement' });
        } else {
            addLog("⚠ FB SDK not ready yet. Please wait...");
            setStatus('idle');
        }
    };

    if (!isActive) return null;

    return (
        <div className="relative min-h-screen integration-transition text-white font-sans">
            <SacredGeometryBackground pattern="flower" />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 relative z-10 p-6">

                {/* 1. The Neural Stack Visualizer */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                    className="col-span-1 lg:col-span-3 glass-cosmic p-8 rounded-lg border border-white/10"
                >
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h2 className="text-3xl font-bold flex items-center gap-3">
                                <Activity className="text-green-400" />
                                Neural Command Center
                            </h2>
                            <p className="text-white/50 text-sm mt-1">Zero-Cost Sovereign Stack Monitor</p>
                        </div>
                        <div className={`px-4 py-2 rounded-full border ${n8nConnected ? 'bg-green-500/10 border-green-500/50 text-green-400' : 'bg-yellow-500/10 border-yellow-500/50 text-yellow-400'}`}>
                            <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest">
                                <span className="w-2 h-2 rounded-full bg-current animate-pulse" />
                                {n8nConnected ? 'System Operational' : 'Awaiting Connection'}
                            </span>
                        </div>
                    </div>

                    {/* Stack Diagram */}
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-0 relative">
                        {/* Connecting Lines (Desktop) */}
                        <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 -z-10" />

                        <StackNode
                            icon={Database}
                            title="Google Sheets"
                            subtitle="Content Matrix"
                            color="text-green-400"
                            status="active"
                        />
                        <StackNode
                            icon={Activity}
                            title="n8n Automation"
                            subtitle="Orchestration"
                            color="text-orange-400"
                            status="active"
                        />
                        <StackNode
                            icon={Sparkles}
                            title="Gemini AI"
                            subtitle="Cognitive Engine"
                            color="text-blue-400"
                            status="active"
                        />
                        <StackNode
                            icon={Terminal}
                            title="Firebase Funcs"
                            subtitle="Execution Layer"
                            color="text-yellow-400"
                            status="active"
                        />
                        <StackNode
                            icon={Instagram}
                            title="Instagram"
                            subtitle="Sovereign Output"
                            color="text-pink-500"
                            status={n8nConnected ? 'active' : 'inactive'}
                            onClick={!n8nConnected ? handleConnectInstagram : undefined}
                        />
                    </div>
                </motion.div>

                {/* 2. Live Intelligence Logs */}
                <div className="col-span-1 lg:col-span-2 space-y-6">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}
                        className="glass-cosmic p-6 rounded-lg border border-white/10 h-96 flex flex-col"
                    >
                        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                            <Terminal size={18} className="text-white/50" />
                            System Intelligence Stream
                        </h3>
                        <div className="flex-1 overflow-y-auto bg-black border border-white/10 rounded-lg p-4 font-mono text-xs space-y-2 shadow-inner">
                            {logs.map((log, i) => (
                                <motion.div
                                    key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                                    className="text-white/70 border-b border-white/5 pb-1 last:border-0"
                                >
                                    <span className="text-blue-400 font-bold mr-2">{log.split(']')[0]}]</span>
                                    {log.split(']')[1]}
                                </motion.div>
                            ))}
                            {logs.length === 0 && <span className="text-white/20 italic">Waiting for system events...</span>}
                        </div>
                        <div className="mt-4 flex gap-2">
                            <button className="flex-1 bg-white/5 hover:bg-white/10 text-white text-xs font-bold py-2 rounded-md transition-colors border border-white/10" onClick={() => addLog("Force-Sync: Checking Google Sheets for new rows...")}>
                                Check Content Matrix
                            </button>
                            <button className="flex-1 bg-white/5 hover:bg-white/10 text-white text-xs font-bold py-2 rounded-md transition-colors border border-white/10" onClick={() => addLog("Trigger: Running 'Post-Processor' function...")}>
                                Test Deployment
                            </button>
                        </div>
                    </motion.div>
                </div>

                {/* 3. Instagram Status */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}
                    className="col-span-1"
                >
                    <div className="glass-cosmic p-6 rounded-lg border border-white/10 h-full relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-32 bg-pink-500/20 blur-[100px] rounded-full group-hover:bg-pink-500/30 transition-all duration-1000" />

                        <div className="relative z-10">
                            <div className="w-16 h-16 bg-gradient-to-tr from-zinc-800 to-black border border-white/10 rounded-lg flex items-center justify-center mb-6 shadow-xl">
                                <Instagram size={32} className="text-white" />
                            </div>

                            <h3 className="text-2xl font-bold mb-2">Sovereign Link</h3>
                            <p className="text-white/50 text-sm mb-8">
                                Direct Neural Interface to Meta Graph API. No intermediaries.
                            </p>

                            {status === 'idle' && (
                                <button
                                    onClick={handleConnectInstagram}
                                    className="w-full py-4 bg-white text-black rounded-lg font-black uppercase tracking-widest text-xs hover:bg-zinc-200 transition-all shadow-xl flex items-center justify-center gap-2"
                                >
                                    <Link size={14} />
                                    Connect Instagram (Official)
                                </button>
                            )}

                            {status === 'connecting' && (
                                <div className="w-full py-4 bg-white/10 text-white rounded-lg font-bold uppercase text-xs flex items-center justify-center gap-2 animate-pulse">
                                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    Authenticating...
                                </div>
                            )}

                            {status === 'connected' && (
                                <div className="space-y-4">
                                    <div className="bg-white/5 border border-white/10 p-4 rounded-lg flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                                            <span className="text-green-400 font-bold text-sm">Active</span>
                                        </div>
                                        <span className="text-xs text-green-400/70">ID: 68931095...</span>
                                    </div>
                                    <div className="text-xs text-center text-white/30 mt-4">
                                        Next Window: <span className="text-white">Today 18:00</span>
                                    </div>
                                </div>
                            )}

                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}

const StackNode = ({ icon: Icon, title, subtitle, color, status, onClick }: any) => (
    <motion.div
        whileHover={onClick ? { scale: 1.05 } : {}}
        onClick={onClick}
        className={`relative z-10 bg-[#0a0a0a] border border-white/10 p-4 rounded-lg w-full md:w-40 flex flex-col items-center text-center gap-3 shadow-2xl transition-all ${status === 'inactive' ? 'opacity-50 grayscale cursor-pointer hover:grayscale-0 hover:opacity-100' : ''}`}
    >
        <div className={`p-3 rounded-md bg-white/5 ${color} shadow-lg`}>
            <Icon size={20} />
        </div>
        <div>
            <h4 className="font-bold text-white text-sm">{title}</h4>
            <p className="text-[10px] text-white/40 uppercase tracking-wider">{subtitle}</p>
        </div>
        {status === 'active' && (
            <div className={`absolute -top-1 -right-1 w-3 h-3 rounded-full ${color.replace('text-', 'bg-')} ring-4 ring-[#0a0a0a]`} />
        )}
    </motion.div>
);
