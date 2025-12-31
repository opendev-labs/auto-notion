
import React, { useState, useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import {
  Instagram,
  Cpu,
  Zap,
  ShieldCheck,
  Rocket,
  Check,
  ChevronRight,
  Menu,
  X,
  Globe,
  Clock,
  Layers,
  ArrowRight,
  Sparkles,
  BarChart3,
  Shield,
  MessageSquare
} from 'lucide-react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';

// --- Components ---

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-black/80 backdrop-blur-xl border-b border-white/5 py-4' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <div className="flex items-center gap-3 group cursor-pointer" onClick={() => window.location.href = '/'}>
          <div className="relative w-12 h-12 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
            <div className="absolute inset-0 bg-indigo-500/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
            <img
              src="/icons/icon-512.png"
              alt="Auto-Notion Agent"
              className="w-full h-full object-contain relative z-10 drop-shadow-[0_0_15px_rgba(99,102,241,0.5)]"
            />
          </div>
          <span className="text-2xl font-black tracking-tighter text-white">
            AUTO-NOTION
          </span>
        </div>

        <div className="hidden md:flex items-center gap-10 text-[13px] font-bold uppercase tracking-widest text-gray-400">
          <a href="#features" className="hover:text-white transition-colors">Platform</a>
          <a href="#comparison" className="hover:text-white transition-colors">Compare</a>
          <a href="#pricing" className="hover:text-white transition-colors">Institutional</a>
          <div className="flex items-center gap-4 border-l border-white/10 pl-10">
            <button onClick={() => window.location.href = '/auth'} className="hover:text-white transition-colors">
              Sign In
            </button>
            <button onClick={() => window.location.href = '/dashboard'} className="px-6 py-2.5 bg-white text-black rounded-full hover:bg-white/90 transition-all duration-300 font-bold border border-white/10">
              Dashboard
            </button>
          </div>
        </div>

        <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden absolute top-full left-0 right-0 bg-black/95 backdrop-blur-2xl border-b border-white/10 px-6 py-10"
          >
            <div className="flex flex-col gap-8 items-center">
              <div className="flex flex-col gap-6 items-center">
                <a href="#features" className="text-gray-400 text-lg font-bold uppercase tracking-widest" onClick={() => setIsOpen(false)}>Features</a>
                <a href="#comparison" className="text-gray-400 text-lg font-bold uppercase tracking-widest" onClick={() => setIsOpen(false)}>Comparison</a>
                <a href="#pricing" className="text-gray-400 text-lg font-bold uppercase tracking-widest" onClick={() => setIsOpen(false)}>Pricing</a>
              </div>
              <div className="w-full h-[1px] bg-white/5" />
              <div className="w-full flex flex-col gap-4">
                <button onClick={() => window.location.href = '/auth'} className="w-full py-4 border border-white/10 text-white rounded-full font-black uppercase tracking-widest text-xs">Sign In</button>
                <button onClick={() => window.location.href = '/dashboard'} className="w-full py-4 bg-white text-black rounded-full font-black uppercase tracking-widest text-xs">Launch Dashboard</button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);

  return (
    <section className="relative min-h-screen pt-44 pb-24 overflow-hidden flex flex-col items-center">
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-600/10 rounded-full blur-[160px] animate-pulse" />
        <div className="absolute bottom-[0%] right-[-5%] w-[40%] h-[40%] bg-purple-600/10 rounded-full blur-[140px]" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 brightness-100 contrast-150 mix-blend-overlay pointer-events-none"></div>
        {/* Subtle Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px]"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center flex flex-col justify-center min-h-[60vh] md:min-h-0">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-3 px-6 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-8 md:mb-10 mx-auto"
        >
          <span className="flex h-2 w-2 rounded-full bg-indigo-500 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
          </span>
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-400">Institutional Release v4.0</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-5xl sm:text-6xl md:text-9xl font-black text-white leading-[0.9] mb-8 md:mb-10 tracking-tighter"
        >
          AUTOMATE <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-white/20">
            EVERY INTERACTION.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-base sm:text-lg md:text-2xl text-gray-400 max-w-xl md:max-w-4xl mx-auto mb-10 md:mb-14 leading-relaxed font-medium px-4 md:px-0"
        >
          Auto-Notion deploys high-fidelity AI agents to manage your Instagram sales funnel.
          Deterministic content, cosmic response timing, and absolute brand safety.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center w-full px-4 sm:px-0"
        >
          <button
            onClick={() => window.location.href = '/auth'}
            className="w-full sm:w-auto group relative px-8 md:px-10 py-4 md:py-5 bg-white text-black rounded-full font-black uppercase tracking-widest text-xs md:text-sm transition-all hover:scale-105 active:scale-95 shadow-[0_20px_40px_-15px_rgba(255,255,255,0.2)]"
          >
            Start Free Trial
            <ArrowRight className="inline-block ml-3 w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-2 transition-transform" />
          </button>
          <button
            onClick={() => window.location.href = '/dashboard'}
            className="w-full sm:w-auto px-8 md:px-10 py-4 md:py-5 bg-white/5 border border-white/10 text-white rounded-full font-black uppercase tracking-widest text-xs md:text-sm backdrop-blur-sm transition-all hover:bg-white/10 active:scale-95"
          >
            Mission Control
          </button>
        </motion.div>

        {/* Dashboard "Floating" Preview */}
        <motion.div
          style={{ y: y1 }}
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.8, ease: "easeOut" }}
          className="mt-32 relative group"
        >
          <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 rounded-[2.5rem] blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
          <div className="relative rounded-[2rem] border border-white/10 bg-black p-4 md:p-6 overflow-hidden shadow-2xl">
            <div className="flex items-center gap-2 mb-4 px-2">
              <div className="w-3 h-3 rounded-full bg-red-500/50" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
              <div className="w-3 h-3 rounded-full bg-green-500/50" />
            </div>
            <img
              src="https://images.unsplash.com/photo-1614332284157-e6f15777df50?auto=format&fit=crop&q=80&w=1400"
              alt="Platform Dashboard"
              className="rounded-2xl w-full h-auto brightness-90 grayscale group-hover:grayscale-0 transition-all duration-1000"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const Stats = () => {
  const stats = [
    { label: "Active Nodes", value: "1,240+" },
    { label: "Messages Processed", value: "85M+" },
    { label: "Avg. Conversion Lift", value: "320%" },
    { label: "Uptime Stability", value: "99.99%" },
  ];

  return (
    <div className="py-20 border-y border-white/5 bg-black/50 backdrop-blur-sm relative z-20">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-12">
        {stats.map((stat, i) => (
          <div key={i} className="text-center group">
            <p className="text-4xl md:text-5xl font-black text-white mb-2 tracking-tighter group-hover:text-indigo-400 transition-colors">
              {stat.value}
            </p>
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

const FeaturesGrid = () => {
  const features = [
    {
      title: "Agentic Task Orchestration",
      description: "AI agents that don't just reply, but actually resolve tickets, qualify leads, and update CRM records.",
      icon: <Cpu className="w-10 h-10 text-indigo-500" />,
      tag: "CORE AI"
    },
    {
      title: "Cosmic Timing Engine",
      description: "Proprietary algorithms that analyze user dwell time to send responses at the peak moment of psychological intent.",
      icon: <Clock className="w-10 h-10 text-purple-500" />,
      tag: "ALGORITHMIC"
    },
    {
      title: "Institutional Guardrails",
      description: "Enterprise-grade AES-256 encryption. Your Meta Business permissions are isolated and cryptographically secured.",
      icon: <ShieldCheck className="w-10 h-10 text-emerald-500" />,
      tag: "SECURITY"
    },
    {
      title: "Hyper-Deterministic Flows",
      description: "Zero-drift content generation ensures that your AI agents speak in your exact brand voice, every single time.",
      icon: <Layers className="w-10 h-10 text-orange-500" />,
      tag: "CONTENT"
    },
    {
      title: "Deep Conversion Analytics",
      description: "Visual reporting that tracks ROI directly from specific comment interactions to final checkout events.",
      icon: <BarChart3 className="w-10 h-10 text-blue-500" />,
      tag: "INSIGHTS"
    },
    {
      title: "Omnichannel Bridge",
      description: "Seamlessly transition high-intent leads from Instagram DMs to WhatsApp for closed-loop institutional sales.",
      icon: <MessageSquare className="w-10 h-10 text-pink-500" />,
      tag: "INTEGRATION"
    }
  ];

  return (
    <section id="features" className="py-32 bg-black relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-10">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tighter uppercase italic">
              ENGINEERED FOR <br /> <span className="text-indigo-500">ABSOLUTE SCALE.</span>
            </h2>
            <p className="text-xl text-gray-500 leading-relaxed font-medium">
              We've replaced manual engagement with autonomous workflows.
              Deploy agents that work 24/7 without fatigue, error, or brand risk.
            </p>
          </div>
          <div className="flex gap-4">
            <div className="w-16 h-1 bg-white/10" />
            <div className="w-32 h-1 bg-indigo-600" />
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -5, borderColor: 'rgba(255,255,255,0.2)' }}
              className="p-10 rounded-[2rem] bg-white/[0.02] border border-white/5 transition-all group overflow-hidden relative"
            >
              <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:scale-150 transition-transform duration-700 pointer-events-none">
                {f.icon}
              </div>
              <div className="mb-8 p-4 rounded-2xl bg-white/5 w-fit">
                {f.icon}
              </div>
              <span className="text-[10px] font-black tracking-widest text-indigo-400 mb-4 block uppercase">
                {f.tag}
              </span>
              <h3 className="text-2xl font-black text-white mb-4 tracking-tight uppercase italic">{f.title}</h3>
              <p className="text-gray-500 leading-relaxed font-medium">{f.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Comparison = () => {
  const rows = [
    { feature: "Agentic Decision Making", notion: true, interakt: false, manychat: false },
    { feature: "Cosmic Response Timing", notion: true, interakt: false, manychat: false },
    { feature: "Deterministic AI Guardrails", notion: true, interakt: false, manychat: "Manual" },
    { feature: "Multi-Account Sync", notion: true, interakt: true, manychat: true },
    { feature: "WhatsApp Direct Bridge", notion: true, interakt: true, manychat: "Connector" },
    { feature: "AES-256 Vault Encryption", notion: true, interakt: "Standard", manychat: "Cloud" },
  ];

  return (
    <section id="comparison" className="py-32 bg-zinc-950">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-24">
          <h2 className="text-5xl font-black text-white mb-6 uppercase tracking-tighter italic">THE QUANTUM LEAP</h2>
          <p className="text-gray-500 font-medium">Why the world's highest volume creators are switching to Auto-Notion.</p>
        </div>

        <div className="relative">
          {/* Mobile Scroll Hint */}
          <div className="md:hidden flex items-center justify-center gap-2 mb-6 text-indigo-400/60 animate-pulse">
            <ArrowRight size={14} className="animate-bounce-x" />
            <span className="text-[10px] font-black uppercase tracking-widest">Swipe to explore protocol</span>
            <ArrowRight size={14} className="animate-bounce-x rotate-180" />
          </div>

          <div className="rounded-[2.5rem] border border-white/10 overflow-x-auto bg-black shadow-2xl no-scrollbar">
            <table className="w-full text-left border-collapse min-w-[700px] md:min-w-0">
              <thead>
                <tr className="bg-white/5 border-b border-white/10">
                  <th className="p-8 text-[11px] font-black uppercase tracking-[0.2em] text-gray-500">Capability</th>
                  <th className="p-8 text-center bg-indigo-600/10">
                    <span className="text-indigo-400 font-black tracking-tighter">AUTO-NOTION</span>
                  </th>
                  <th className="p-8 text-center text-gray-600 font-black tracking-tighter">INTERAKT</th>
                  <th className="p-8 text-center text-gray-600 font-black tracking-tighter">MANYCHAT</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row, i) => (
                  <tr key={i} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                    <td className="p-8 text-sm font-bold text-gray-400 uppercase tracking-wider">{row.feature}</td>
                    <td className="p-8 text-center bg-indigo-600/5">
                      {row.notion === true ? <div className="w-6 h-6 bg-indigo-500 rounded-full flex items-center justify-center mx-auto shadow-lg shadow-indigo-500/30"><Check className="w-3 h-3 text-white" strokeWidth={4} /></div> : row.notion}
                    </td>
                    <td className="p-8 text-center text-gray-700 text-sm font-bold">
                      {row.interakt === true ? "✓" : row.interakt === false ? "✗" : row.interakt}
                    </td>
                    <td className="p-8 text-center text-gray-700 text-sm font-bold">
                      {row.manychat === true ? "✓" : row.manychat === false ? "✗" : row.manychat}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

const Pricing = () => {
  const plans = [
    {
      name: "Starter Mission",
      price: "₹1,999",
      period: "/MO",
      desc: "For solo creators hitting peak momentum.",
      feats: ["Unlimited Automation", "Standard AI Models", "Cosmic Timing V1", "Email Support"],
      cta: "Ignite Engine",
      prime: false
    },
    {
      name: "Institutional Control",
      price: "₹3,999",
      period: "/MO",
      desc: "The standard for high-performance agencies.",
      feats: ["Agentic Task Orchestration", "Deterministic Content Guard", "Custom Model Tuning", "WhatsApp Native Bridge", "24/7 Priority Ops"],
      cta: "Deploy Mission",
      prime: true
    },
    {
      name: "Galactic Enterprise",
      price: "CUSTOM",
      period: "",
      desc: "Isolated clouds for global enterprises.",
      feats: ["White-label Deployment", "On-Prem Options", "SLA Guarantees", "Dedicated AI Architect", "Audit-ready Logs"],
      cta: "Contact Ops",
      prime: false
    }
  ];

  return (
    <section id="pricing" className="py-32 bg-black overflow-hidden relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-24">
          <h2 className="text-5xl font-black text-white mb-6 uppercase tracking-tighter italic">MISSION FUNDING</h2>
          <p className="text-gray-500 font-medium">Transparent pricing for non-linear growth.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((p, i) => (
            <div key={i} className={`p-1 bg-gradient-to-b ${p.prime ? 'from-indigo-500 to-purple-600' : 'from-white/10 to-transparent'} rounded-[3rem] transition-transform hover:scale-[1.02] duration-500`}>
              <div className="h-full bg-black rounded-[2.9rem] p-10 flex flex-col">
                <h3 className="text-xs font-black uppercase tracking-[0.4em] text-indigo-400 mb-8">{p.name}</h3>
                <div className="mb-4">
                  <span className="text-5xl font-black text-white tracking-tighter">{p.price}</span>
                  <span className="text-xs font-bold text-gray-500 ml-2">{p.period}</span>
                </div>
                <p className="text-gray-500 text-sm mb-10 font-medium leading-relaxed">{p.desc}</p>
                <div className="h-[1px] bg-white/5 mb-10 w-full"></div>
                <ul className="space-y-5 mb-12 flex-grow">
                  {p.feats.map((f, j) => (
                    <li key={j} className="flex items-center gap-4 text-gray-400 text-sm font-bold">
                      <Check className="w-4 h-4 text-indigo-500 shrink-0" /> {f}
                    </li>
                  ))}
                </ul>
                <button className={`w-full py-5 rounded-full font-black uppercase tracking-widest text-xs transition-all ${p.prime ? 'bg-white text-black hover:bg-indigo-500 hover:text-white shadow-xl shadow-indigo-500/20' : 'bg-white/5 text-white hover:bg-white/10 border border-white/10'}`}>
                  {p.cta}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const CTA = () => {
  return (
    <section className="py-44 relative bg-black overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-600/10 rounded-full blur-[160px]"></div>
      </div>
      <div className="max-w-5xl mx-auto px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="p-8 sm:p-16 md:p-32 rounded-[3rem] md:rounded-[4rem] bg-zinc-950 border border-white/5 relative overflow-hidden group"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-indigo-500 to-transparent"></div>
          <h2 className="text-4xl sm:text-5xl md:text-8xl font-black text-white mb-8 md:mb-10 tracking-tighter uppercase italic leading-[1.1] md:leading-none">
            THE FUTURE IS <br className="hidden sm:block" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-600">
              AUTONOMOUS.
            </span>
          </h2>
          <p className="text-base sm:text-xl text-gray-500 mb-10 md:mb-14 max-w-2xl mx-auto font-medium px-4">
            Join the 1,000+ high-growth institutions scaling their Instagram presence with Auto-Notion.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center px-4">
            <button
              onClick={() => window.location.href = '/auth'}
              className="w-full sm:w-auto px-8 md:px-14 py-5 md:py-6 bg-white text-black rounded-full font-black uppercase tracking-widest text-xs md:text-sm hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-white/10"
            >
              SIGN IN NOW
            </button>
            <button
              onClick={() => window.location.href = '/dashboard'}
              className="w-full sm:w-auto px-8 md:px-14 py-5 md:py-6 border border-white/10 text-white rounded-full font-black uppercase tracking-widest text-xs md:text-sm hover:bg-white/5 transition-all"
            >
              DASHBOARD
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-black pt-32 pb-16 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-16 mb-32">
          <div className="col-span-2">
            <div className="flex items-center gap-3 mb-8" onClick={() => window.location.href = '/'} style={{ cursor: 'pointer' }}>
              <div className="w-10 h-10 flex items-center justify-center">
                <img src="/icons/icon-512.png" alt="Logo" className="w-full h-full object-contain" />
              </div>
              <span className="text-xl font-black text-white uppercase tracking-tighter">AUTO-NOTION</span>
            </div>
            <p className="text-gray-600 text-sm max-w-xs leading-relaxed font-medium">
              The institutional layer for Instagram content automation.
              Built for precision, scale, and absolute security.
            </p>
          </div>
          <div>
            <h4 className="text-white font-black mb-8 text-[11px] uppercase tracking-[0.3em]">Module</h4>
            <ul className="space-y-5 text-sm font-bold text-gray-600">
              <li><a href="#" className="hover:text-white transition-colors uppercase">Core Engine</a></li>
              <li><a href="#" className="hover:text-white transition-colors uppercase">Analytics</a></li>
              <li><a href="#" className="hover:text-white transition-colors uppercase">Integration</a></li>
              <li><a href="#" className="hover:text-white transition-colors uppercase">Pricing</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-black mb-8 text-[11px] uppercase tracking-[0.3em]">Protocol</h4>
            <ul className="space-y-5 text-sm font-bold text-gray-600">
              <li><a href="#" className="hover:text-white transition-colors uppercase">Security</a></li>
              <li><a href="#" className="hover:text-white transition-colors uppercase">API Docs</a></li>
              <li><a href="#" className="hover:text-white transition-colors uppercase">Stability</a></li>
              <li><a href="#" className="hover:text-white transition-colors uppercase">Privacy</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-black mb-8 text-[11px] uppercase tracking-[0.3em]">Network</h4>
            <ul className="space-y-5 text-sm font-bold text-gray-600">
              <li><a href="#" className="hover:text-white transition-colors uppercase inline-flex items-center gap-2"><Instagram size={14} /> Instagram</a></li>
              <li><a href="#" className="hover:text-white transition-colors uppercase inline-flex items-center gap-2"><Globe size={14} /> Global</a></li>
            </ul>
          </div>
        </div>
        <div className="pt-16 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-10 text-gray-700 text-[10px] font-black uppercase tracking-[0.4em]">
          <p>© 2025 AUTO-NOTION MISSION CONTROL. ALL SYSTEMS OPERATIONAL.</p>
          <div className="flex gap-10">
            <a href="#" className="hover:text-white transition-colors">TERMINAL</a>
            <a href="#" className="hover:text-white transition-colors">DATA FLOW</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

const App = () => {
  useEffect(() => {
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href')!);
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth'
          });
        }
      });
    });
  }, []);

  return (
    <div className="min-h-screen bg-black text-gray-100 selection:bg-indigo-600/50 selection:text-white overflow-x-hidden">
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <FeaturesGrid />
        <Comparison />
        <Pricing />
        <CTA />
      </main>
      <Footer />
    </div>
  );
};

// --- Mounting Logic ---
const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} else {
  console.error("Root element not found.");
}
