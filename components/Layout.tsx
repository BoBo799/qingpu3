
import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Eye, 
  ShieldCheck, 
  BarChart3, 
  Users, 
  Settings, 
  Bell, 
  Search, 
  Menu,
  ChevronDown,
  ChevronRight,
  User,
  LogOut,
  Globe
} from 'lucide-react';

interface LayoutProps {
  children: React.Node;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeTab, setActiveTab }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  const navItems = [
    { id: 'dashboard', label: '首页', icon: LayoutDashboard },
    { id: 'monitoring', label: '全景监控', icon: Eye },
    { id: 'rules', label: '规则中心', icon: ShieldCheck },
    { id: 'performance', label: '数字化绩效', icon: BarChart3 },
    { id: 'users', label: '组织权限', icon: Users },
    { id: 'settings', label: '系统设置', icon: Settings },
  ];

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <aside className={`${isSidebarOpen ? 'w-64' : 'w-20'} bg-white border-r border-slate-200 flex flex-col transition-all duration-300 z-30 shadow-sm`}>
        <div className="h-16 flex items-center justify-center border-b border-slate-100 sg-nav-bg">
          <div className="text-white font-bold text-lg flex items-center gap-2">
            <Globe size={24} />
            {isSidebarOpen && <span className="truncate">智能质检管理</span>}
          </div>
        </div>

        <nav className="flex-1 py-4 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-6 py-4 transition-all duration-200 border-l-4 ${
                  isActive 
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-500 font-bold' 
                  : 'text-slate-500 border-transparent hover:bg-slate-50 hover:text-emerald-600'
                }`}
              >
                <Icon size={20} />
                {isSidebarOpen && <span className="text-sm">{item.label}</span>}
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-slate-100">
          <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50 cursor-pointer transition-colors group">
            <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 font-bold text-xs">管理员</div>
            {isSidebarOpen && (
              <div className="flex-1 overflow-hidden">
                <p className="text-xs font-bold text-slate-800 truncate">张三 (青浦运检)</p>
                <p className="text-[10px] text-slate-400 truncate">退出系统</p>
              </div>
            )}
            {isSidebarOpen && <LogOut size={14} className="text-slate-300 group-hover:text-red-400" />}
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header Section (Branding) */}
        <div className="sg-gradient-header border-b border-slate-200 flex flex-col">
          {/* Upper Bar: Utility Links */}
          <div className="px-8 py-2 flex justify-between items-center text-[11px] text-slate-500 border-b border-slate-200/50 bg-white/30">
            <div className="flex items-center gap-4">
              <span>欢迎来到智能协同质检管理后台</span>
              <div className="flex items-center gap-1 cursor-pointer hover:text-emerald-600 transition-colors">
                <span className="font-medium text-emerald-600">上海青浦</span>
                <ChevronDown size={10} />
              </div>
            </div>
            <div className="flex items-center gap-4 divide-x divide-slate-200">
              <div className="flex items-center gap-4 px-4">
                <span className="cursor-pointer hover:text-emerald-600">我的待办</span>
                <span className="cursor-pointer hover:text-emerald-600">帮助中心</span>
                <span className="cursor-pointer hover:text-emerald-600">English</span>
              </div>
              <div className="flex items-center gap-2 pl-4">
                <Bell size={14} className="text-slate-400" />
                <span className="cursor-pointer hover:text-emerald-600">系统通知</span>
              </div>
            </div>
          </div>

          {/* Branding & Search Bar Area */}
          <div className="px-8 py-6 flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-emerald-600 rounded-full shadow-lg shadow-emerald-200">
                  <Globe className="text-white" size={28} />
                </div>
                <div className="flex flex-col">
                  <h1 className="text-xl font-black text-slate-800 tracking-tight">国家电网 · 智能质检管理系统</h1>
                  <p className="text-xs text-slate-500 font-medium tracking-[2px] uppercase">State Grid - Intelligent Inspection</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2 max-w-lg w-full">
              <div className="flex border-2 border-emerald-500 rounded-lg overflow-hidden bg-white shadow-sm">
                <div className="flex items-center px-4 text-slate-400">
                  <Search size={18} />
                </div>
                <input 
                  type="text" 
                  placeholder="搜索资产编号、工单、规则库内容..." 
                  className="flex-1 py-2 text-sm outline-none bg-transparent"
                />
                <button className="sg-bg-teal text-white px-8 py-2 text-sm font-bold hover:bg-emerald-700 transition-all">
                  搜索
                </button>
              </div>
              <div className="flex items-center gap-4 text-[10px] text-slate-400 px-2">
                <span>热门检索:</span>
                <span className="hover:text-emerald-600 cursor-pointer">进博会保电</span>
                <span className="hover:text-emerald-600 cursor-pointer">安全围栏</span>
                <span className="hover:text-emerald-600 cursor-pointer">PMS 3.0接入</span>
              </div>
            </div>
          </div>
        </div>

        {/* Content Container */}
        <main className="flex-1 overflow-y-auto p-8 relative">
          <div className="max-w-7xl mx-auto">
             {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
