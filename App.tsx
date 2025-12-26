
import React, { useState } from 'react';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Monitoring from './pages/Monitoring';
import Rules from './pages/Rules';
import Performance from './pages/Performance';
import UsersPage from './pages/Users';
import SettingsPage from './pages/Settings';
import { MOCK_ORDERS, MOCK_RULES } from './constants';
import { InspectionOrder, Rule, OrderStatus } from './types';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [orders, setOrders] = useState<InspectionOrder[]>(MOCK_ORDERS);
  const [rules, setRules] = useState<Rule[]>(MOCK_RULES);

  const handleUpdateOrder = (id: string, newStatus: OrderStatus) => {
    setOrders(prev => prev.map(o => o.id === id ? { ...o, status: newStatus } : o));
  };

  const handleToggleRule = (id: string) => {
    setRules(prev => prev.map(r => r.id === id ? { ...r, isActive: !r.isActive } : r));
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return <Dashboard orders={orders} />;
      case 'monitoring': return <Monitoring orders={orders} onUpdateOrder={handleUpdateOrder} />;
      case 'rules': return <Rules rules={rules} onToggleRule={handleToggleRule} />;
      case 'performance': return <Performance />;
      case 'users': return <UsersPage />;
      case 'settings': return <SettingsPage />;
      default: return <Dashboard orders={orders} />;
    }
  };

  return (
    <Layout activeTab={activeTab} setActiveTab={setActiveTab}>
      {renderContent()}
    </Layout>
  );
};

export default App;
