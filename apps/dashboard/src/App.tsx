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
const ContentLibrary = lazy(() => import('./modules/ContentLibrary'));
const Logs = lazy(() => import('./modules/Logs'));
const SettingsModule = lazy(() => import('./modules/Settings'));
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
  const [integrationMode, setIntegrationMode] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [n8nConnected, setN8nConnected] = useState<boolean | null>(null);

  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
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

  // Removed ProtectedLayout as it's been integrated into the Route

  return (
    <Suspense fallback={<LoadingFallback />}>
      <Routes>
        <Route path="/auth" element={!user ? <Login onLoginSuccess={() => { }} /> : <Navigate to="/" />} />
        <Route path="/signin" element={!user ? <Login onLoginSuccess={() => { }} /> : <Navigate to="/" />} />

        {/* Compliance Pages (Public) */}
        <Route path="/privacy" element={<div className="min-h-screen bg-black p-8"><PrivacyPolicy /></div>} />
        <Route path="/terms" element={<div className="min-h-screen bg-black p-8"><TermsOfService /></div>} />
        <Route path="/refund-policy" element={<div className="min-h-screen bg-black p-8"><RefundPolicy /></div>} />
        <Route path="/data-deletion" element={<div className="min-h-screen bg-black p-8"><DataDeletion /></div>} />

        {/* Protected Dashboard Routes */}
        <Route path="/dashboard" element={
          <RequireAuth user={user}>
            <div className="flex h-screen overflow-hidden selection:bg-white selection:text-black bg-black">
              <Sidebar
                collapsed={sidebarCollapsed}
                setCollapsed={setSidebarCollapsed}
              />
              <main className="flex-1 overflow-y-auto p-3 md:p-8 pb-24 lg:pb-8 relative">
                <div className="max-w-7xl mx-auto relative z-10 mt-4">
                  <DashboardLayout
                    integrationMode={integrationMode}
                    n8nConnected={n8nConnected}
                    isHub={true}
                  />
                  <Dashboard />
                </div>
              </main>
              {!sidebarCollapsed && <MobileBottomNav
                integrationMode={integrationMode}
                setIntegrationMode={setIntegrationMode}
              />}
            </div>
          </RequireAuth>
        } />

        {/* Individual Module Pages (No Sidebar) */}
        <Route path="/super-agents" element={
          <RequireAuth user={user}>
            <div className="h-screen w-screen bg-black overflow-hidden">
              <AICommandCenter n8nConnected={n8nConnected} />
            </div>
          </RequireAuth>
        } />

        {[
          { path: '/automation', component: AutomationPortal, title: 'Automation Engine' },
          { path: '/ig-connections', component: IGPortal, title: 'Instagram Nodes' },
          { path: '/content', component: ContentLibrary, title: 'Content Library' },
          { path: '/cosmic', component: CosmicPlanner, title: 'Scheduler' },
          { path: '/integrations', component: IntegrationPortal, title: 'Integration Portal' },
          { path: '/logs', component: Logs, title: 'Logs & History' },
          { path: '/settings', component: SettingsModule, title: 'System Settings' },
          { path: '/subscription', component: SubscriptionPage, title: 'Institutional Plan' },
        ].map(({ path, component: Component, title }) => (
          <Route key={path} path={path} element={
            <RequireAuth user={user}>
              <div className="min-h-screen bg-black text-white selection:bg-white selection:text-black p-4 md:p-8">
                <div className="max-w-7xl mx-auto">
                  <div className="flex items-center justify-between mb-8 border-b border-white/5 pb-6">
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => window.location.href = '/dashboard'}
                        className="p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition-all text-white/60 hover:text-white"
                      >
                        <Activity size={20} className="rotate-180" />
                      </button>
                      <div>
                        <h2 className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em]">Institutional Engine</h2>
                        <h1 className="text-xl font-bold tracking-tight">{title}</h1>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className={`px-3 py-1 rounded-md text-[9px] font-bold tracking-widest bg-white/5 border border-white/10 text-white/40`}>
                        NODE ACTIVE
                      </div>
                      <button
                        onClick={() => signOut(auth).then(() => window.location.href = '/auth')}
                        className="p-2 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20"
                      >
                        <LogOut size={16} />
                      </button>
                    </div>
                  </div>
                  <Component n8nConnected={n8nConnected} isActive={true} />
                </div>
              </div>
            </RequireAuth>
          } />
        ))}

        {/* Default Redirect */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </Suspense>
  );
}

// Internal Component to manage local tab state until full route migration
const DashboardLayout = ({ integrationMode, n8nConnected, isHub }: any) => {
  const location = useLocation();
  const path = location.pathname.split('/').pop() || 'dashboard';

  const getTitle = (p: string) => {
    switch (p) {
      case 'dashboard': return 'Mission Control';
      case 'automation': return 'Automation Engine';
      case 'ig-connections': return 'Instagram Nodes';
      case 'content': return 'Content Library';
      case 'agents': return 'AI Command Center';
      case 'cosmic': return 'Scheduler';
      case 'integrations': return 'Integration Portal';
      case 'logs': return 'Logs & History';
      case 'settings': return 'System Settings';
      case 'subscription': return 'Institutional Plan';
      default: return p.replace('-', ' ');
    }
  };

  return (
    <>
      <header className="mb-8 md:mb-12 flex flex-col md:flex-row md:items-end justify-between gap-4 border-b-0.5 border-white/5 pb-6 md:pb-8">
        <div>
          <h2 className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em] mb-1">
            Institutional Oversight & Mission Control
          </h2>
          <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight capitalize">
            {getTitle(path)}
          </h1>
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

      {!isHub && (
        integrationMode ? (
          <Suspense fallback={<LoadingFallback text="Loading Integration Portal..." />}>
            <IntegrationPortal isActive={integrationMode} />
          </Suspense>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 10, filter: 'blur(10px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -10, filter: 'blur(10px)' }}
              transition={{ duration: 0.4, ease: "easeOut" as any }}
            >
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="automation" element={<AutomationPortal />} />
                <Route path="ig-connections" element={<IGPortal />} />
                <Route path="content" element={<ContentLibrary />} />
                <Route path="agents" element={<AICommandCenter />} />
                <Route path="cosmic" element={<CosmicPlanner />} />
                <Route path="integrations" element={<IntegrationPortal isActive={true} />} />
                <Route path="logs" element={<Logs />} />
                <Route path="settings" element={<SettingsModule />} />
                <Route path="subscription" element={<SubscriptionPage />} />
                <Route path="*" element={<Navigate to="/dashboard" replace />} />
              </Routes>
            </motion.div>
          </AnimatePresence>
        )
      )}
    </>
  );
}

export default App;
