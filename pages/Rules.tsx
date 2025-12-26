
import React, { useState } from 'react';
import { Rule } from '../types';
import { 
  Plus, 
  Search, 
  Settings2, 
  Code, 
  Database, 
  Play, 
  ChevronRight,
  GitBranch,
  Save,
  Trash2,
  Copy,
  CheckCircle,
  Loader2
} from 'lucide-react';

interface RulesProps {
  rules: Rule[];
  onToggleRule: (id: string) => void;
}

const Rules: React.FC<RulesProps> = ({ rules, onToggleRule }) => {
  const [activeTab, setActiveTab] = useState('library');
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationResult, setSimulationResult] = useState<string | null>(null);

  const startSimulation = () => {
    setIsSimulating(true);
    setSimulationResult(null);
    setTimeout(() => {
      setIsSimulating(false);
      setSimulationResult("模拟测试完成：基于昨日500份历史工单，新逻辑识别出隐藏违规3例，误报率降低5%。");
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-black text-slate-800">智能质检规则中心</h1>
          <p className="text-slate-500 mt-1 text-sm font-medium">将国网上海业务规程、大模型Prompt转化为全流程数字化执行逻辑</p>
        </div>
        <button className="bg-emerald-600 text-white px-6 py-2.5 rounded-lg text-sm font-black hover:bg-emerald-700 transition-all flex items-center gap-2 shadow-lg shadow-emerald-200">
          <Plus size={18} /> 新建规则逻辑
        </button>
      </div>

      <div className="flex gap-8">
        <div className="w-64 space-y-3">
          <button 
            onClick={() => setActiveTab('library')}
            className={`w-full flex items-center gap-3 px-4 py-4 rounded-xl font-black text-xs transition-all border-l-4 ${activeTab === 'library' ? 'bg-emerald-50 text-emerald-700 border-emerald-500 shadow-sm' : 'bg-white text-slate-400 border-transparent hover:bg-slate-50'}`}
          >
            <Database size={18} /> 规则库静态管理
          </button>
          <button 
            onClick={() => setActiveTab('editor')}
            className={`w-full flex items-center gap-3 px-4 py-4 rounded-xl font-black text-xs transition-all border-l-4 ${activeTab === 'editor' ? 'bg-emerald-50 text-emerald-700 border-emerald-500 shadow-sm' : 'bg-white text-slate-400 border-transparent hover:bg-slate-50'}`}
          >
            <Settings2 size={18} /> 可视化配置引擎
          </button>
          
          <div className="p-5 sg-card-bg border border-emerald-100 rounded-2xl mt-8">
            <div className="flex items-center gap-2 text-emerald-700 mb-3">
              <Play size={16} className="fill-emerald-700" />
              <span className="text-[10px] font-black uppercase tracking-wider">隔离沙箱模拟</span>
            </div>
            {simulationResult ? (
              <div className="text-[10px] font-medium text-emerald-900/70 mb-4 animate-in fade-in">
                {simulationResult}
              </div>
            ) : (
              <p className="text-[10px] font-medium text-slate-400 leading-relaxed mb-4">在发布规则前，使用历史工单库进行全量回归测试，确保业务逻辑闭环。</p>
            )}
            <button 
              onClick={startSimulation}
              disabled={isSimulating}
              className="w-full bg-white border border-emerald-200 text-emerald-600 py-2.5 rounded-lg text-xs font-black hover:bg-emerald-50 transition-all shadow-sm flex items-center justify-center gap-2"
            >
              {isSimulating ? <Loader2 className="animate-spin" size={14} /> : '启动模拟回归测试'}
            </button>
          </div>
        </div>

        <div className="flex-1">
          {activeTab === 'library' ? (
            <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden animate-in fade-in duration-500">
              <div className="p-4 bg-slate-50 border-b border-slate-100 flex gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300" size={16} />
                  <input type="text" placeholder="搜索规则编码、名称或逻辑片段..." className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-xs outline-none focus:ring-2 focus:ring-emerald-500 transition-all" />
                </div>
              </div>
              <div className="divide-y divide-slate-50">
                {rules.map((rule) => (
                  <div key={rule.id} className="p-6 hover:bg-slate-50 transition-colors">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-4">
                        <div className={`p-3 rounded-xl ${rule.isActive ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-slate-100 text-slate-400 border border-slate-200'}`}>
                          <GitBranch size={20} />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="text-sm font-black text-slate-800">{rule.name}</h3>
                            <span className="px-2 py-0.5 bg-slate-100 text-slate-400 rounded text-[9px] font-bold">{rule.code}</span>
                          </div>
                          <div className="flex items-center gap-3 mt-1">
                            <span className="text-[10px] font-bold text-emerald-600 uppercase">{rule.category}</span>
                            <span className="text-[10px] text-slate-400 font-bold">等级: {rule.riskLevel}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex flex-col items-end">
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" checked={rule.isActive} onChange={() => onToggleRule(rule.id)} />
                            <div className="w-10 h-5 bg-slate-200 rounded-full peer peer-checked:bg-emerald-500 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-full"></div>
                          </label>
                          <span className="text-[9px] font-black text-slate-400 mt-1 uppercase tracking-tighter">{rule.isActive ? 'Enabled' : 'Paused'}</span>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 bg-slate-50 p-3 rounded-lg border border-slate-100 font-mono text-[10px] text-slate-500">
                      {rule.logic}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-12 flex flex-col items-center justify-center animate-in zoom-in-95 duration-500">
               <div className="w-20 h-20 bg-emerald-50 text-emerald-600 rounded-3xl flex items-center justify-center mb-6">
                 <Settings2 size={40} />
               </div>
               <h3 className="text-lg font-black text-slate-800 mb-2">数字化逻辑编辑器</h3>
               <p className="text-sm text-slate-400 text-center max-w-sm mb-8 font-medium">
                 通过可视化拖拽“属性对比”、“空间围栏”、“多图联审”等算子，快速构建业务规则，无需编写代码。
               </p>
               <button className="bg-emerald-600 text-white px-8 py-3 rounded-xl text-sm font-black shadow-lg shadow-emerald-200">
                 立即进入工作台
               </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Rules;
