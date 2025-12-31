import { useState, useEffect, lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Sidebar from './components/Sidebar';
import MobileBottomNav from './components/MobileBottomNav';
import LoadingFallback from './components/LoadingFallback';
import './styles/integration-mode.css';

// Lazy load heavy components for code splitting
const Dashboard = lazy(() => import('./modules/Dashboard'));
const IGPortal = lazy(() => import('./modules/IGPortal'));
const AgentManager = lazy(() => import('./modules/AgentManager'));
const CosmicPlanner = lazy(() => import('./modules/CosmicPlanner'));
const IntegrationPortal = lazy(() => import('./modules/IntegrationPortal'));
const PrivacyPolicy = lazy(() => import('./modules/Compliance').then(m => ({ default: m.PrivacyPolicy })));
const TermsOfService = lazy(() => import('./modules/Compliance').then(m => ({ default: m.TermsOfService })));
const DataDeletion = lazy(() => import('./modules/Compliance').then(m => ({ default: m.DataDeletion })));
const RefundPolicy = lazy(() => import('./modules/Compliance').then(m => ({ default: m.RefundPolicy })));
import Login from './components/Login';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './services/firebase';

const RequireAuth = ({ children, user }: { children: any, user: any }) => {
  return user ? children : <Navigate to="/auth" replace />;
};

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [integrationMode, setIntegrationMode] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
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
          {/* Header is here in original code, skipping for brevity in routes unless Dashboard needs it */}
          {/* Actually reusing original render logic within Dashboard route concept */}
          <DashboardContent
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            integrationMode={integrationMode}
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
const DashboardContent = ({ activeTab, setActiveTab, integrationMode }: any) => {

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return <Dashboard onNavigate={setActiveTab} />;
      case 'ig-connections': return <IGPortal />;
      case 'agents': return <AgentManager />;
      case 'cosmic': return <CosmicPlanner />;
      // Compliance tabs inside dashboard removed in favor of public pages, or can keep as legacy
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
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-xl bg-white/5 border-0.5 border-white/10 text-[10px] font-bold tracking-widest text-white/60">
            <span className="w-1.5 h-1.5 bg-green-500 rounded-full shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
            SYSTEM LIVE
          </div>
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
