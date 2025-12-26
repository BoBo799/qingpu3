
import React from 'react';
import { Settings, Server, Globe, Bell, ShieldCheck, Database, Save, RotateCcw } from 'lucide-react';

const SettingsPage = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-black text-slate-800 flex items-center gap-3">
             <Settings size={28} className="text-emerald-600" /> 系统底座集成配置
          </h2>
          <p className="text-slate-400 text-sm mt-1 font-medium">配置 PMS 3.0 数据总线、AI 中台接口参数及质检流水线性能阀值</p>
        </div>
        <div className="flex gap-3">
          <button className="px-6 py-2.5 rounded-lg text-sm font-bold text-slate-400 hover:bg-slate-100 transition-all flex items-center gap-2">
             <RotateCcw size={16} /> 恢复默认
          </button>
          <button className="bg-emerald-600 text-white px-6 py-2.5 rounded-lg text-sm font-black shadow-lg shadow-emerald-200 flex items-center gap-2">
             <Save size={18} /> 保存配置并全域生效
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Core Config */}
        <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
           <div className="p-6 bg-slate-50 border-b border-slate-100 flex items-center gap-3">
              <Server size={20} className="text-emerald-600" />
              <h3 className="font-black text-slate-800">基础服务与 AI 终端</h3>
           </div>
           <div className="p-8 space-y-6">
              <div className="space-y-2">
                 <label className="text-[10px] font-black text-slate-400 uppercase">PMS 3.0 数据总线地址</label>
                 <input type="text" defaultValue="https://pms3-sh.sgcc.com.cn/api/v2" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono outline-none focus:ring-2 focus:ring-emerald-500" />
              </div>
              <div className="space-y-2">
                 <label className="text-[10px] font-black text-slate-400 uppercase">智能算法中台密钥域</label>
                 <div className="flex gap-2">
                    <input type="password" value="********************************" className="flex-1 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono outline-none" readOnly />
                    <button className="px-4 py-2 border border-emerald-200 text-emerald-600 rounded-xl text-xs font-black">重新签发</button>
                 </div>
              </div>
              <div className="grid grid-cols-2 gap-4 pt-4">
                 <div className="p-4 rounded-xl border border-slate-100 bg-slate-50/30">
                    <div className="flex items-center gap-2 mb-2">
                       <Globe size={14} className="text-emerald-600" />
                       <span className="text-[10px] font-black">全球同步时区</span>
                    </div>
                    <span className="text-xs font-bold text-slate-700">UTC+08:00 (上海)</span>
                 </div>
                 <div className="p-4 rounded-xl border border-slate-100 bg-slate-50/30">
                    <div className="flex items-center gap-2 mb-2">
                       <Database size={14} className="text-emerald-600" />
                       <span className="text-[10px] font-black">证据链存储</span>
                    </div>
                    <span className="text-xs font-bold text-slate-700">分布式 OSS (华东-2)</span>
                 </div>
              </div>
           </div>
        </div>

        {/* Business Config */}
        <div className="space-y-8">
           <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-8 space-y-8">
              <h3 className="text-sm font-black text-slate-800 flex items-center gap-2 mb-2">
                 <Bell size={18} className="text-emerald-600" /> 告警与处置阈值
              </h3>
              <div className="space-y-6">
                 <div>
                    <div className="flex justify-between items-center mb-3">
                       <span className="text-xs font-bold text-slate-600">AI 判定自动拦截分数</span>
                       <span className="text-xs font-black text-emerald-600">≥ 85.0</span>
                    </div>
                    <input type="range" className="w-full accent-emerald-600" />
                 </div>
                 <div>
                    <div className="flex justify-between items-center mb-3">
                       <span className="text-xs font-bold text-slate-600">重大红线强制人工复核率</span>
                       <span className="text-xs font-black text-emerald-600">100%</span>
                    </div>
                    <input type="range" className="w-full accent-emerald-600" />
                 </div>
              </div>

              <div className="pt-6 border-t border-slate-50">
                 <div className="flex items-center justify-between p-4 bg-emerald-50 rounded-2xl border border-emerald-100">
                    <div className="flex items-center gap-3">
                       <ShieldCheck className="text-emerald-600" size={24} />
                       <div>
                          <p className="text-xs font-black text-emerald-900">数字化安全审计模式</p>
                          <p className="text-[10px] text-emerald-700 font-medium">开启后将记录所有处置决策的操作轨迹</p>
                       </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-slate-200 rounded-full peer peer-checked:bg-emerald-600 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full"></div>
                    </label>
                 </div>
              </div>
           </div>

           <div className="p-6 bg-slate-900 rounded-2xl text-white shadow-xl shadow-slate-200 relative overflow-hidden group">
              <div className="relative z-10 flex flex-col items-center text-center">
                 <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Server size={24} className="text-emerald-400" />
                 </div>
                 <h4 className="font-black text-base mb-2">系统运行日志实时扫描</h4>
                 <p className="text-[10px] text-slate-400 font-medium mb-4">当前质检队列负载: 0.05 / 5000 TPS</p>
                 <button className="text-[10px] font-black uppercase tracking-[2px] text-emerald-400 hover:text-emerald-300">调取底层堆栈详情</button>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
