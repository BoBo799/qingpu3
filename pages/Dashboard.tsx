
import React, { useState } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, PieChart, Pie, Cell
} from 'recharts';
import { 
  TrendingUp, TrendingDown, ClipboardList, AlertCircle, CheckCircle2, Zap, 
  LayoutGrid, BrainCircuit, Loader2, X, Activity, Download, 
  FileText, ShieldAlert, Lightbulb, Calendar, HardDrive, ChevronRight
} from 'lucide-react';
import { DASHBOARD_TREND_DATA, REGION_STATIONS } from '../constants';
import { InspectionOrder, OrderStatus } from '../types';
import { generateQualityReport } from '../services/geminiService';

const StatCard = ({ title, value, change, isPositive, icon: Icon }: any) => (
  <div className="sg-card-bg p-6 rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-all group relative overflow-hidden">
    <div className="flex items-center gap-4 relative z-10">
      <div className={`p-4 rounded-full bg-white shadow-inner flex items-center justify-center border border-slate-50 group-hover:scale-110 transition-transform`}>
        <Icon size={24} className="text-emerald-600" />
      </div>
      <div className="flex-1">
        <h3 className="text-slate-500 text-xs font-bold mb-1">{title}</h3>
        <div className="flex items-end gap-2">
          <div className="text-2xl font-black text-slate-800">{value}</div>
          <div className={`flex items-center gap-0.5 text-[10px] font-bold mb-1.5 ${isPositive ? 'text-emerald-600' : 'text-rose-500'}`}>
            {isPositive ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
            {change}%
          </div>
        </div>
      </div>
    </div>
  </div>
);

const Dashboard = ({ orders }: { orders: InspectionOrder[] }) => {
  const [report, setReport] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerateReport = async () => {
    setIsGenerating(true);
    const stats = {
      total: orders.length,
      abnormal: orders.filter(o => o.status === OrderStatus.ABNORMAL).length,
      completed: orders.filter(o => o.status === OrderStatus.COMPLETED).length,
    };
    const res = await generateQualityReport(stats);
    setReport(res || "生成失败，请稍后重试。");
    setIsGenerating(false);
  };

  const handleExportReport = () => {
    if (!report) return;
    const blob = new Blob([`【智能质检质量洞察报告】\n生成时间：${new Date().toLocaleString()}\n\n${report}`], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `质量分析报告_${new Date().toISOString().split('T')[0]}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const dataPie = [
    { name: '合格', value: orders.filter(o => o.status === OrderStatus.COMPLETED).length, color: '#4FB0A4' },
    { name: '异常提醒', value: orders.filter(o => o.status === OrderStatus.ABNORMAL).length, color: '#FF6B6B' },
    { name: '流转中', value: orders.filter(o => o.status === OrderStatus.IN_PROGRESS).length, color: '#FFB347' },
  ];

  return (
    <div className="space-y-8 pb-12">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-black text-slate-800 flex items-center gap-3">
            <LayoutGrid className="text-emerald-600" size={24} />
            管理态势概览
          </h2>
          <p className="text-slate-400 text-sm mt-1 font-medium">数字化监测上海青浦全域电力运维实时质量与风险分布</p>
        </div>
        <button 
          onClick={handleGenerateReport}
          disabled={isGenerating}
          className="flex items-center gap-2 bg-emerald-600 text-white px-6 py-2.5 rounded-lg text-sm font-bold hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-200 disabled:opacity-50"
        >
          {isGenerating ? <Loader2 className="animate-spin" size={18} /> : <BrainCircuit size={18} />}
          AI 智能质量分析报告
        </button>
      </div>

      {report && (
        <div className="bg-white border border-emerald-100 rounded-3xl shadow-2xl shadow-emerald-100/50 overflow-hidden animate-in zoom-in-95 duration-500">
          {/* Report Header */}
          <div className="bg-emerald-600 px-8 py-5 flex justify-between items-center">
            <div className="flex items-center gap-3 text-white">
              <div className="p-2 bg-white/20 rounded-lg">
                <FileText size={20} />
              </div>
              <div>
                <h3 className="font-black text-lg leading-none">数字化质量评价全景洞察报告</h3>
                <p className="text-[10px] opacity-70 mt-1 uppercase tracking-widest font-bold">Intelligent Quality Insight Document</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button 
                onClick={handleExportReport}
                className="p-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors flex items-center gap-2 text-xs font-black"
              >
                <Download size={16} /> 导出
              </button>
              <button onClick={() => setReport(null)} className="p-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors">
                <X size={16} />
              </button>
            </div>
          </div>

          {/* Report Metadata Bar */}
          <div className="px-8 py-3 bg-slate-50 border-b border-slate-100 flex items-center gap-8 text-[10px] font-black text-slate-400 uppercase tracking-tighter">
            <div className="flex items-center gap-1.5"><Calendar size={12} /> 生成时间: {new Date().toLocaleDateString()}</div>
            <div className="flex items-center gap-1.5"><HardDrive size={12} /> 数据源: PMS 3.0 Realtime</div>
            <div className="flex items-center gap-1.5"><ShieldAlert size={12} /> 风险等级: 系统自动识别</div>
          </div>

          {/* Report Content */}
          <div className="p-8 grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div className="lg:col-span-8 space-y-8">
              {report.split('\n').filter(l => l.trim()).map((line, i) => {
                let icon = <CheckCircle2 size={18} className="text-emerald-500" />;
                let title = "";
                let content = line;

                if (line.includes('态势') || line.includes('总结')) {
                   icon = <Activity size={18} className="text-blue-500" />;
                   title = "总体态势评价";
                } else if (line.includes('风险') || line.includes('不足')) {
                   icon = <ShieldAlert size={18} className="text-rose-500" />;
                   title = "核心风险点识别";
                } else if (line.includes('建议') || line.includes('措施')) {
                   icon = <Lightbulb size={18} className="text-amber-500" />;
                   title = "业务改进建议";
                }

                return (
                  <div key={i} className="group transition-all">
                    {title && (
                      <div className="flex items-center gap-2 mb-3">
                         <div className="p-1.5 rounded-lg bg-slate-50 group-hover:bg-white transition-colors border border-transparent group-hover:border-slate-100">
                           {icon}
                         </div>
                         <span className="font-black text-slate-800 text-sm">{title}</span>
                      </div>
                    )}
                    <div className={`${title ? 'pl-11' : ''} text-slate-600 text-sm leading-relaxed font-medium`}>
                      {content.replace(/^[一二三四五六七、\d\. ]+/, '')}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Sidebar with mini stats */}
            <div className="lg:col-span-4 bg-slate-50/50 rounded-2xl p-6 border border-slate-100 h-fit">
               <h4 className="text-xs font-black text-slate-800 mb-4 flex items-center gap-2 uppercase">
                 <ClipboardList size={14} className="text-emerald-600" />
                 本期质检关键指标
               </h4>
               <div className="space-y-4">
                  <div className="p-3 bg-white rounded-xl border border-slate-100 flex justify-between items-center shadow-sm">
                    <span className="text-[10px] text-slate-400 font-bold">全量接入</span>
                    <span className="text-sm font-black text-slate-800">{orders.length} <small className="text-[9px] font-normal">单</small></span>
                  </div>
                  <div className="p-3 bg-white rounded-xl border border-slate-100 flex justify-between items-center shadow-sm">
                    <span className="text-[10px] text-slate-400 font-bold">异常锁定</span>
                    <span className="text-sm font-black text-rose-500">{orders.filter(o => o.status === OrderStatus.ABNORMAL).length} <small className="text-[9px] font-normal">单</small></span>
                  </div>
                  <div className="p-3 bg-white rounded-xl border border-slate-100 flex justify-between items-center shadow-sm">
                    <span className="text-[10px] text-slate-400 font-bold">审核效率</span>
                    <span className="text-sm font-black text-emerald-600">+18% <small className="text-[9px] font-normal">同比</small></span>
                  </div>
               </div>
               <div className="mt-8 pt-6 border-t border-slate-200">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                       <BrainCircuit size={20} />
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-slate-400 uppercase leading-none">AI Engine Status</p>
                      <p className="text-xs font-black text-emerald-600 mt-1">深度学习神经元活跃中</p>
                    </div>
                  </div>
               </div>
            </div>
          </div>
        </div>
      )}

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="今日接入总单量" value={orders.length} change="12.4" isPositive={true} icon={ClipboardList} />
        <StatCard title="实时综合合格率" value={`${orders.length > 0 ? ((orders.filter(o => o.status === OrderStatus.COMPLETED).length / orders.length) * 100).toFixed(1) : 0}%`} change="1.4" isPositive={true} icon={CheckCircle2} />
        <StatCard title="红线预警拦截" value={orders.filter(o => o.riskLevel === 'CRITICAL').length} change="25.0" isPositive={false} icon={AlertCircle} />
        <StatCard title="数字减负工时" value="158h" change="18.2" isPositive={true} icon={Zap} />
      </div>

      {/* Main Trend Chart Section */}
      <div className="bg-white p-8 rounded-xl border border-slate-100 shadow-sm flex flex-col">
        <div className="flex items-center gap-2 mb-8">
          <div className="w-2 h-6 bg-emerald-500 rounded-full" />
          <h3 className="text-lg font-black text-slate-800">各供电所质检负荷态势</h3>
        </div>
        <div className="flex-1 h-[350px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={DASHBOARD_TREND_DATA}>
              <defs>
                <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#4FB0A4" stopOpacity={0.2}/>
                  <stop offset="95%" stopColor="#4FB0A4" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10, fontWeight: 'bold'}} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10, fontWeight: 'bold'}} />
              <Tooltip contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)', fontSize: '11px'}} />
              <Area type="monotone" dataKey="count" name="工单接入量" stroke="#4FB0A4" strokeWidth={3} fill="url(#colorCount)" />
              <Area type="monotone" dataKey="error" name="异常风险数" stroke="#FF6B6B" strokeWidth={2} fill="transparent" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 bg-white p-8 rounded-xl border border-slate-100 shadow-sm flex flex-col items-center">
          <h3 className="text-lg font-black text-slate-800 mb-8">综合质量构成</h3>
          <div className="h-64 w-full relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={dataPie} innerRadius={70} outerRadius={100} paddingAngle={8} dataKey="value">
                  {dataPie.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-2xl font-black text-slate-800">{orders.length > 0 ? ((orders.filter(o => o.status === OrderStatus.COMPLETED).length / orders.length) * 100).toFixed(1) : 0}%</span>
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">合格率</span>
            </div>
          </div>
          <div className="w-full space-y-3 mt-4 px-4">
            {dataPie.map(item => (
              <div key={item.name} className="flex justify-between text-xs font-bold">
                <span className="flex items-center gap-2 text-slate-500">
                  <div className="w-2 h-2 rounded-full" style={{backgroundColor: item.color}} /> {item.name}
                </span>
                <span className="text-slate-800">{item.value} 单</span>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden flex flex-col">
          <div className="p-6 bg-slate-50/50 flex justify-between items-center border-b border-slate-100">
            <h3 className="text-lg font-black text-slate-800 flex items-center gap-2">
              <div className="w-2 h-6 bg-rose-500 rounded-full" />
              属地风险监控预警
            </h3>
            <span className="text-[10px] font-bold text-slate-400 italic">源自国网数据中台</span>
          </div>
          <div className="divide-y divide-slate-100 overflow-y-auto flex-1">
            {REGION_STATIONS.filter(r => r.risk >= 0).sort((a, b) => b.risk - a.risk).map((item, i) => (
              <div key={i} className="p-4 flex items-center justify-between hover:bg-emerald-50/30 transition-all cursor-pointer group">
                <div className="flex items-center gap-6">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center border ${item.risk > 10 ? 'bg-rose-50 border-rose-100 text-rose-500' : 'bg-amber-50 border-amber-100 text-amber-500'}`}>
                    <AlertCircle size={24} />
                  </div>
                  <div>
                    <div className="font-black text-slate-800 text-base">{item.name}</div>
                    <div className="text-xs text-slate-400 font-medium mt-0.5">
                      {item.risk > 0 ? `检测到${item.risk}处异常拦截，建议加强二次复核` : '当前运行态势良好，暂未发现结构性风险'}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-10">
                  <div className="text-right">
                    <div className="text-lg font-black text-slate-800">{item.risk} <span className="text-xs font-normal text-slate-400">个案</span></div>
                    <div className="text-[9px] font-black text-emerald-600/60 uppercase tracking-widest mt-0.5">Risk Monitor</div>
                  </div>
                  <button className="p-2 text-slate-300 group-hover:text-emerald-600 transition-colors">
                    <ChevronRight size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
