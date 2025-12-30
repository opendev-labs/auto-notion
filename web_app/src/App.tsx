import { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './modules/Dashboard';
import IGPortal from './modules/IGPortal';
import AgentManager from './modules/AgentManager';
import CosmicPlanner from './modules/CosmicPlanner';
import { PrivacyPolicy, TermsOfService, DataDeletion } from './modules/Compliance';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return <Dashboard />;
      case 'ig-connections': return <IGPortal />;
      case 'agents': return <AgentManager />;
      case 'cosmic': return <CosmicPlanner />;
      case 'privacy': return <PrivacyPolicy />;
      case 'terms': return <TermsOfService />;
      case 'deletion': return <DataDeletion />;
      default: return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="flex-1 overflow-y-auto p-8 relative">
        {/* Background Accent */}
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-institutional-blue/5 blur-[120px] pointer-events-none rounded-full" />

        <div className="max-w-7xl mx-auto relative z-10">
          <header className="mb-10 flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-zen-slate capitalize">{activeTab.replace('-', ' ')}</h1>
              <p className="text-zen-sage mt-1">Institutional Oversight & Mission Control</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="glass px-4 py-2 rounded-full text-xs font-semibold flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                SYSTEM LIVE
              </div>
            </div>
          </header>

          <div className="transition-all duration-500 ease-in-out">
            {renderContent()}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
