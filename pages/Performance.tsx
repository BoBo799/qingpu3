
import React from 'react';
import { 
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend
} from 'recharts';
import { Award, Target, TrendingUp, AlertTriangle, Lightbulb, UserCheck, ShieldCheck } from 'lucide-react';
import { PERFORMANCE_RADAR_DATA, PERFORMANCE_RANK_DATA } from '../constants';

const Performance = () => {
  return (
    <div className="space-y-10 pb-20">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-black text-slate-800 flex items-center gap-3">
             <UserCheck size={28} className="text-emerald-600" />
             数字化绩效画像系统
          </h2>
          <p className="text-slate-400 text-sm mt-1">基于PMS 3.0实时作业数据的数字化绩效评价体系</p>
        </div>
        <div className="flex gap-4">
          <button className="bg-white border-2 border-slate-200 text-slate-500 px-6 py-2 rounded-lg text-sm font-bold hover:bg-slate-50 transition-all">
            导出季度报告
          </button>
          <button className="bg-emerald-600 text-white px-6 py-2 rounded-lg text-sm font-bold hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-200">
            绩效权重配置
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Radar Map */}
        <div className="bg-white p-8 rounded-xl border border-slate-100 shadow-sm">
          <div className="flex items-center gap-3 mb-10 border-b border-slate-50 pb-4">
            <Award className="text-emerald-600" size={24} />
            <h3 className="text-lg font-black text-slate-800">班组能力评价模型 (青浦局)</h3>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={PERFORMANCE_RADAR_DATA}>
                <PolarGrid stroke="#f1f5f9" />
                <PolarAngleAxis dataKey="subject" tick={{fill: '#94a3b8', fontSize: 11, fontWeight: 'bold'}} />
                <PolarRadiusAxis angle={30} domain={[0, 150]} tick={false} axisLine={false} />
                <Radar name="目标班组 (运检一班)" dataKey="A" stroke="#4FB0A4" fill="#4FB0A4" fillOpacity={0.6} />
                <Radar name="全局平均基准线" dataKey="B" stroke="#cbd5e1" fill="#cbd5e1" fillOpacity={0.2} />
                <Legend iconType="circle" wrapperStyle={{paddingTop: '20px', fontWeight: 'bold', fontSize: '12px'}} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Ranking */}
        <div className="bg-white p-8 rounded-xl border border-slate-100 shadow-sm">
          <div className="flex items-center gap-3 mb-10 border-b border-slate-50 pb-4">
            <Target className="text-emerald-600" size={24} />
            <h3 className="text-lg font-black text-slate-800">各供电所班组绩效排行榜</h3>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={PERFORMANCE_RANK_DATA} layout="vertical" margin={{ left: 20, right: 30 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f8fafc" />
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} width={120} tick={{fontSize: 12, fontWeight: 'bold', fill: '#64748b'}} />
                <Tooltip cursor={{fill: '#f0fdfa'}} />
                <Bar dataKey="score" fill="#4FB0A4" radius={[0, 8, 8, 0]} barSize={25} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Insight Tiles */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-8 bg-emerald-600 rounded-2xl text-white shadow-xl shadow-emerald-200 group transition-all">
          <div className="flex items-center gap-3 mb-6">
             <div className="p-2 bg-white/20 rounded-lg group-hover:scale-110 transition-transform"><TrendingUp size={24} /></div>
             <h4 className="text-xl font-black">卓越质量奖</h4>
          </div>
          <p className="text-emerald-50 text-xs font-medium leading-relaxed mb-6 opacity-80">配电运检一班 本月在“安全红线”和“工单合规”维度表现突出，无一例红线违规，建议通报表扬。</p>
          <button className="w-full bg-white text-emerald-600 py-2 rounded-lg text-xs font-black shadow-lg">查看详细贡献</button>
        </div>

        <div className="p-8 bg-slate-900 rounded-2xl text-white shadow-xl shadow-slate-200 group transition-all">
          <div className="flex items-center gap-3 mb-6">
             <div className="p-2 bg-white/10 rounded-lg group-hover:scale-110 transition-transform"><ShieldCheck size={24} className="text-emerald-400" /></div>
             <h4 className="text-xl font-black">重点关注预警</h4>
          </div>
          <p className="text-slate-400 text-xs font-medium leading-relaxed mb-6 opacity-80">抢修二组 在“响应速度”上得分下滑 12%，主要受古镇作业环境限制。建议优化抢修点布局。</p>
          <button className="w-full border border-emerald-400/30 text-emerald-400 py-2 rounded-lg text-xs font-black hover:bg-emerald-400/10">调取响应分析</button>
        </div>

        <div className="p-8 bg-white rounded-2xl border-2 border-emerald-50 shadow-sm group transition-all">
          <div className="flex items-center gap-3 mb-6">
             <div className="p-2 bg-emerald-50 rounded-lg group-hover:scale-110 transition-transform text-emerald-600"><Lightbulb size={24} /></div>
             <h4 className="text-xl font-black text-slate-800">数字化应用建议</h4>
          </div>
          <p className="text-slate-400 text-xs font-medium leading-relaxed mb-6">检测到 自动化监控班 的“创新贡献”显著提升，其沉淀的AI误报校核逻辑已成功覆盖全区。</p>
          <div className="flex gap-2">
            <span className="px-3 py-1 bg-emerald-50 text-emerald-600 text-[10px] font-black rounded-full uppercase tracking-tighter">AI Knowledge Pool</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Performance;
