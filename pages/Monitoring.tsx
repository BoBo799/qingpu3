
import React, { useState } from 'react';
import { OrderStatus, RiskLevel, InspectionOrder } from '../types';
import { 
  Filter, 
  Download, 
  MoreHorizontal, 
  ExternalLink, 
  AlertTriangle,
  CheckCircle,
  Clock,
  Image as ImageIcon,
  MessageSquareQuote,
  Zap,
  Play,
  Check
} from 'lucide-react';

interface MonitoringProps {
  orders: InspectionOrder[];
  onUpdateOrder: (id: string, status: OrderStatus) => void;
}

const Monitoring: React.FC<MonitoringProps> = ({ orders, onUpdateOrder }) => {
  const [selectedOrder, setSelectedOrder] = useState<InspectionOrder | null>(null);
  const [actionFeedback, setActionFeedback] = useState<string | null>(null);

  const handleAction = (status: OrderStatus) => {
    if (!selectedOrder) return;
    onUpdateOrder(selectedOrder.id, status);
    setActionFeedback(status === OrderStatus.COMPLETED ? "已标记为审核通过" : "已下发整改任务");
    setTimeout(() => {
      setActionFeedback(null);
      setSelectedOrder(null);
    }, 1500);
  };

  const getStatusBadge = (status: OrderStatus) => {
    switch(status) {
      case OrderStatus.ABNORMAL: return <span className="px-3 py-1 bg-rose-50 text-rose-600 rounded-full text-[10px] font-black border border-rose-100">预警拦截</span>;
      case OrderStatus.COMPLETED: return <span className="px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full text-[10px] font-black border border-emerald-100">已审核</span>;
      case OrderStatus.IN_PROGRESS: return <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-[10px] font-black border border-blue-100">AI识别中</span>;
      case OrderStatus.RECTIFYING: return <span className="px-3 py-1 bg-orange-50 text-orange-600 rounded-full text-[10px] font-black border border-orange-100">整改中</span>;
      default: return <span className="px-3 py-1 bg-slate-50 text-slate-400 rounded-full text-[10px] font-black border border-slate-100">待处理</span>;
    }
  };

  return (
    <div className="h-full flex flex-col gap-8 pb-12">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-black text-slate-800">全景化质检监控工作台</h2>
          <p className="text-slate-400 text-sm mt-1">深度集成国网上海安全作业规范，对全量工单进行实时自动化闭环审核</p>
        </div>
        <div className="flex gap-4">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-400 border border-slate-200 px-4 py-2 rounded-lg bg-white">
            <Play size={14} className="text-emerald-500 fill-emerald-500" />
            质检流水线正在运行中...
          </div>
        </div>
      </div>

      <div className="flex-1 flex gap-8 overflow-hidden min-h-[600px]">
        <div className={`flex-1 bg-white rounded-xl border border-slate-100 shadow-sm flex flex-col transition-all ${selectedOrder ? 'hidden lg:flex' : 'w-full'}`}>
          <div className="p-4 border-b border-slate-50 bg-slate-50/30 flex items-center justify-between">
            <div className="flex gap-8 px-4 font-black text-xs text-slate-400">
              <button className="text-emerald-600 border-b-2 border-emerald-600 pb-2">实时流水</button>
              <button className="hover:text-slate-600 pb-2">异常追踪</button>
              <button className="hover:text-slate-600 pb-2">整改复核</button>
            </div>
            <div className="flex gap-2">
              <button className="p-2 hover:bg-slate-100 rounded-lg"><Filter size={16} /></button>
              <button className="p-2 hover:bg-slate-100 rounded-lg"><Download size={16} /></button>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto">
            <table className="w-full text-left">
              <thead className="sticky top-0 bg-white border-b border-slate-100">
                <tr className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  <th className="px-8 py-4">工单索引</th>
                  <th className="px-8 py-4">类型/电压</th>
                  <th className="px-8 py-4">质检状态</th>
                  <th className="px-8 py-4 text-right">风险系数</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {orders.map((order) => (
                  <tr 
                    key={order.id} 
                    onClick={() => setSelectedOrder(order)}
                    className={`group cursor-pointer transition-all ${selectedOrder?.id === order.id ? 'bg-emerald-50' : 'hover:bg-slate-50'}`}
                  >
                    <td className="px-8 py-5">
                      <div className="text-sm font-black text-slate-800">{order.id}</div>
                      <div className="text-[10px] text-slate-400">{order.createTime}</div>
                    </td>
                    <td className="px-8 py-5">
                      <div className="text-xs font-bold text-slate-600">{order.type}</div>
                      <div className="text-[10px] text-slate-400">{order.voltage}</div>
                    </td>
                    <td className="px-8 py-5">{getStatusBadge(order.status)}</td>
                    <td className="px-8 py-5 text-right font-black text-slate-700 text-sm">
                      {order.riskLevel === 'CRITICAL' ? <span className="text-rose-600">92/100</span> : order.riskLevel === 'HIGH' ? <span className="text-orange-500">75/100</span> : '15/100'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {selectedOrder && (
          <div className="w-full lg:w-[480px] bg-white rounded-xl border-2 border-emerald-100 shadow-2xl flex flex-col relative animate-in slide-in-from-right duration-300">
             {actionFeedback && (
               <div className="absolute inset-0 z-50 bg-white/90 flex flex-col items-center justify-center animate-in fade-in">
                  <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-4">
                    <Check size={32} />
                  </div>
                  <span className="font-black text-emerald-800">{actionFeedback}</span>
               </div>
             )}

             <div className="p-6 bg-emerald-600 text-white flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <Zap size={20} className="fill-white" />
                  <h3 className="font-black text-lg">AI 质检工作流解析</h3>
                </div>
                <button onClick={() => setSelectedOrder(null)} className="p-2 hover:bg-white/20 rounded-lg"><MoreHorizontal /></button>
             </div>

             <div className="flex-1 overflow-y-auto p-6 space-y-6">
                <div className="flex items-center justify-between text-[10px] font-black text-slate-400 uppercase">
                  <span>ID: {selectedOrder.id}</span>
                  <span className="text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">规则引擎全量匹配完毕</span>
                </div>

                <div className="space-y-3">
                  <h4 className="text-xs font-black text-slate-800 flex items-center gap-2">
                    <ImageIcon size={14} className="text-emerald-600" /> 现场影像多维校核
                  </h4>
                  <div className="grid grid-cols-2 gap-2">
                    {selectedOrder.evidenceUrls.map((url, i) => (
                      <div key={i} className="aspect-video rounded-lg overflow-hidden border bg-slate-100 group relative">
                        <img src={url} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-emerald-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <ExternalLink size={18} className="text-white" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-100 relative">
                   <div className="flex items-center gap-2 mb-2">
                      <MessageSquareQuote size={16} className="text-emerald-600" />
                      <span className="text-[10px] font-black text-emerald-800 uppercase tracking-wider">AI 辅助审查结论</span>
                   </div>
                   <p className="text-xs text-emerald-900/80 leading-relaxed font-medium">
                     {selectedOrder.aiComment || "分析中，请稍候..."}
                   </p>
                </div>

                <div className="pt-4 border-t border-slate-50 space-y-3">
                  <div className="flex gap-3">
                    <button 
                      onClick={() => handleAction(OrderStatus.COMPLETED)}
                      className="flex-1 py-3.5 bg-emerald-600 text-white rounded-xl font-black text-xs hover:bg-emerald-700 transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-200"
                    >
                      <CheckCircle size={16} /> 审核通过
                    </button>
                    <button 
                      onClick={() => handleAction(OrderStatus.RECTIFYING)}
                      className="flex-1 py-3.5 border-2 border-rose-100 text-rose-500 bg-white rounded-xl font-black text-xs hover:bg-rose-50 transition-all flex items-center justify-center gap-2"
                    >
                      <AlertTriangle size={16} /> 下发整改
                    </button>
                  </div>
                </div>
             </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Monitoring;
