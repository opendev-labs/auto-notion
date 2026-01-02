import { useState, useEffect, lazy, Suspense } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Sidebar from './components/Sidebar';
import MobileBottomNav from './components/MobileBottomNav';
import LoadingFallback from './components/LoadingFallback';
import './styles/integration-mode.css';

// Lazy load heavy components for code splitting
const Dashboard = lazy(() => import('./modules/Dashboard'));
const IGPortal = lazy(() => import('./modules/IGPortal'));
const IntegrationPortal = lazy(() => import('./modules/IntegrationPortal'));
const AutomationPortal = lazy(() => import('./modules/AutomationPortal'));
const AICommandCenter = lazy(() => import('./modules/AICommandCenter'));
const CosmicPlanner = lazy(() => import('./modules/CosmicPlanner'));
const PrivacyPolicy = lazy(() => import('./modules/Compliance').then(m => ({ default: m.PrivacyPolicy })));
const TermsOfService = lazy(() => import('./modules/Compliance').then(m => ({ default: m.TermsOfService })));
const DataDeletion = lazy(() => import('./modules/Compliance').then(m => ({ default: m.DataDeletion })));
const RefundPolicy = lazy(() => import('./modules/Compliance').then(m => ({ default: m.RefundPolicy })));
import { SubscriptionPage } from './modules/SubscriptionPage';
import Login from './components/Login';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from './services/firebase';
import { LogOut, Activity } from 'lucide-react';

const RequireAuth = ({ children, user }: { children: any, user: any }) => {
  return user ? children : <Navigate to="/auth" replace />;
};

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [integrationMode, setIntegrationMode] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [n8nConnected, setN8nConnected] = useState<boolean | null>(null);

  const location = useLocation();
  console.log("App current path:", location.pathname);

  useEffect(() => {
    console.log("App mounted, listening for auth changes...");
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log("Auth state change:", currentUser ? "User logged in" : "No user");
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // Check n8n connectivity
  useEffect(() => {
    const checkN8n = async () => {
      try {
        // In a real scenario, this would hit a local proxy or the n8n API directly if CORS allows
        // For now, we'll simulate the check based on a common local n8n port
        const response = await fetch('http://localhost:5678/healthz').catch(() => null);
        setN8nConnected(response ? response.status === 200 : false);
      } catch (err) {
        setN8nConnected(false);
      }
    };

    checkN8n();
    const interval = setInterval(checkN8n, 10000); // Check every 10s
    return () => clearInterval(interval);
  }, []);

  if (loading) return <LoadingFallback text="Authenticating..." />;

  // Layout Wrapper to keep Sidebar context if needed
  const ProtectedLayout = () => (
    <div className={`flex h-screen overflow-hidden selection:bg-white selection:text-black integration-transition ${integrationMode ? 'bg-black' : 'bg-black'}`}>
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        integrationMode={integrationMode}
        setIntegrationMode={setIntegrationMode}
      />
      <main className="flex-1 overflow-y-auto p-3 md:p-8 pb-24 lg:pb-8 relative">
        <div className="max-w-7xl mx-auto relative z-10 mt-4">
          <DashboardContent
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            integrationMode={integrationMode}
            n8nConnected={n8nConnected}
          />
        </div>
      </main>
      <MobileBottomNav
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        integrationMode={integrationMode}
        setIntegrationMode={setIntegrationMode}
      />
    </div>
  );

  return (
    <Suspense fallback={<LoadingFallback />}>
      <Routes>
        <Route path="/auth" element={!user ? <Login onLoginSuccess={() => { }} /> : <Navigate to="/dashboard" />} />
        <Route path="/signin" element={!user ? <Login onLoginSuccess={() => { }} /> : <Navigate to="/dashboard" />} />

        {/* Compliance Pages (Public) */}
        <Route path="/privacy" element={<div className="min-h-screen bg-black p-8"><PrivacyPolicy /></div>} />
        <Route path="/terms" element={<div className="min-h-screen bg-black p-8"><TermsOfService /></div>} />
        <Route path="/refund-policy" element={<div className="min-h-screen bg-black p-8"><RefundPolicy /></div>} />
        <Route path="/data-deletion" element={<div className="min-h-screen bg-black p-8"><DataDeletion /></div>} />

        {/* Protected Dashboard Routes */}
        <Route path="/dashboard/*" element={
          <RequireAuth user={user}>
            <ProtectedLayout />
          </RequireAuth>
        } />

        {/* Default Redirect */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </Suspense>
  );
}

// Internal Component to manage local tab state until full route migration
const DashboardContent = ({ activeTab, setActiveTab, integrationMode, n8nConnected }: any) => {

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return <Dashboard onNavigate={setActiveTab} />;
      case 'automation': return <AutomationPortal />;
      case 'ig-connections': return <IGPortal />;
      case 'content': return <div className="p-20 text-center"><h2 className="text-white text-2xl font-bold uppercase tracking-widest">Content Library</h2><p className="text-white/40 font-bold uppercase tracking-[0.2em] text-[10px] mt-4">Synchronizing with Notion Institutional Database...</p></div>;
      case 'agents': return <AICommandCenter />;
      case 'cosmic': return <CosmicPlanner />;
      case 'integrations': return <IntegrationPortal isActive={true} />;
      case 'subscription': return <SubscriptionPage />;
      default: return <Dashboard />;
    }
  };

  return (
    <>
      <header className="mb-8 md:mb-12 flex flex-col md:flex-row md:items-end justify-between gap-4 border-b-0.5 border-white/5 pb-6 md:pb-8">
        <div>
          <h1 className="text-2xl md:text-4xl font-bold text-white tracking-tight capitalize">
            {activeTab.replace('-', ' ')}
          </h1>
          <p className="text-zen-sage mt-2 text-xs md:text-sm font-medium tracking-wide">
            Institutional Oversight & Mission Control
          </p>
        </div>
        <div className="flex items-center gap-4 md:gap-6">
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-xl bg-white/5 border-0.5 border-white/10 text-[10px] font-bold tracking-widest text-white/60">
            <span className="w-1.5 h-1.5 bg-green-500 rounded-full shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
            SYSTEM LIVE
          </div>

          <div className={`flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-xl border-0.5 text-[10px] font-bold tracking-widest transition-all ${n8nConnected
            ? 'bg-purple-500/10 border-purple-500/20 text-purple-400'
            : 'bg-white/5 border-white/10 text-white/40'
            }`}>
            <Activity size={12} className={n8nConnected ? 'animate-pulse' : ''} />
            N8N {n8nConnected ? 'ONLINE' : 'OFFLINE'}
          </div>

          <button
            onClick={() => signOut(auth).then(() => window.location.href = '/auth')}
            className="p-2 md:p-2.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 transition-all group"
            title="Sign Out"
          >
            <LogOut size={18} className="group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </header>

      {integrationMode ? (
        <Suspense fallback={<LoadingFallback text="Loading Integration Portal..." />}>
          <IntegrationPortal isActive={integrationMode} />
        </Suspense>
      ) : (
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -10, filter: 'blur(10px)' }}
            transition={{ duration: 0.4, ease: "easeOut" as any }}
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      )}
    </>
  );
}

export default App;
