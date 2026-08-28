import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { DeviceFrame } from './components/layout/DeviceFrame';
import { Header } from './components/layout/Header';
import { NavigationBar } from './components/layout/NavigationBar';

import { ActiveDropCard } from './components/drop/ActiveDropCard';
import { ProductGrid } from './components/products/ProductGrid';
import { ChatHub } from './components/chinafriend/ChatHub';
import { OrderTracker } from './components/orders/OrderTracker';
import { ReferralHub } from './components/rewards/ReferralHub';
import { ProfileTab } from './components/profile/ProfileTab';
import { AdminDashboard } from './components/admin/AdminDashboard';

import { CartDrawer } from './components/cart/CartDrawer';
import { ProductDetailModal } from './components/products/ProductDetailModal';
import { CustomSourcingModal } from './components/products/CustomSourcingModal';
import { SearchOverlay } from './components/search/SearchOverlay';
import { IosInstallPrompt } from './components/layout/IosInstallPrompt';

const MainContent: React.FC = () => {
  const { activeTab } = useApp();

  return (
    <>
      {/* Scrollable content area */}
      <div className="flex-1 overflow-y-auto scrollbar-none">
        {activeTab === 'home' && <ActiveDropCard />}

        {activeTab === 'products' && (
          <div className="animate-fadeIn"><ProductGrid /></div>
        )}

        {activeTab === 'chinafriend' && (
          <div className="animate-fadeIn flex flex-col h-full">
            <ChatHub />
          </div>
        )}

        {activeTab === 'orders' && (
          <div className="animate-fadeIn"><OrderTracker /></div>
        )}

        {activeTab === 'rewards' && (
          <div className="animate-fadeIn"><ReferralHub /></div>
        )}

        {activeTab === 'profile' && (
          <div className="animate-fadeIn"><ProfileTab /></div>
        )}

        {activeTab === 'admin' && <AdminDashboard />}
      </div>

      {/* Navigation always at bottom */}
      <NavigationBar />

      {/* Global Modals & Drawers */}
      <CartDrawer />
      <ProductDetailModal />
      <CustomSourcingModal />
      <SearchOverlay />
      <IosInstallPrompt />
    </>
  );
};

export function App() {
  return (
    <AppProvider>
      <DeviceFrame>
        <Header />
        <MainContent />
      </DeviceFrame>
    </AppProvider>
  );
}

export default App;
