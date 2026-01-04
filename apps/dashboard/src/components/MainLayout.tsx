import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import MobileBottomNav from './MobileBottomNav';

interface MainLayoutProps {
    integrationMode?: boolean;
    setIntegrationMode?: (mode: boolean) => void;
    children?: React.ReactNode;
}

export default function MainLayout({ integrationMode, setIntegrationMode, children }: MainLayoutProps) {
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

    return (
        <div className="flex h-screen overflow-hidden selection:bg-white selection:text-black bg-black">
            <Sidebar
                collapsed={sidebarCollapsed}
                setCollapsed={setSidebarCollapsed}
            />
            <main className="flex-1 overflow-y-auto p-3 md:p-8 pb-24 lg:pb-8 relative">
                <div className="max-w-7xl mx-auto relative z-10 mt-4">
                    {children || <Outlet />}
                </div>
            </main>
            {!sidebarCollapsed && setIntegrationMode && <MobileBottomNav
                integrationMode={integrationMode || false}
                setIntegrationMode={setIntegrationMode}
            />}
        </div>
    );
}
