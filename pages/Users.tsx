
import React from 'react';
import { Users, Shield, MapPin, Key, ChevronRight, Search, Plus } from 'lucide-react';

const UsersPage = () => {
  const departments = [
    { name: '上海青浦供电公司', type: '公司级', count: 124 },
    { name: '运检部 - 质量评价组', type: '部门级', count: 12 },
    { name: '夏阳供电所', type: '所级', count: 28 },
    { name: '朱家角供电所', type: '所级', count: 22 },
  ];

  const roles = [
    { name: '超级管理员', desc: '拥有系统所有配置权限' },
    { name: '质检专责', desc: '负责规则维护与二次复核' },
    { name: '现场班组长', desc: '处理整改工单与绩效反馈' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-black text-slate-800 flex items-center gap-3">
             <Users size={28} className="text-emerald-600" /> 组织与权限治理
          </h2>
          <p className="text-slate-400 text-sm mt-1 font-medium">管理青浦全域组织架构映射、人员角色授权及数据穿透权限</p>
        </div>
        <button className="bg-emerald-600 text-white px-6 py-2.5 rounded-lg text-sm font-black shadow-lg shadow-emerald-200">
           同步 PMS 3.0 人员数据
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Org Tree */}
        <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-6 space-y-4">
           <h3 className="text-sm font-black text-slate-800 flex items-center gap-2 mb-6">
             <MapPin size={16} className="text-emerald-600" /> 组织架构树
           </h3>
           <div className="space-y-2">
             {departments.map((dept, i) => (
               <div key={i} className={`p-4 rounded-xl border group cursor-pointer transition-all ${i === 1 ? 'bg-emerald-50 border-emerald-100 text-emerald-800' : 'bg-white border-slate-100 hover:border-emerald-200'}`}>
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-black">{dept.name}</span>
                    <span className={`text-[9px] px-2 py-0.5 rounded font-black ${i === 1 ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-400'}`}>
                      {dept.type}
                    </span>
                  </div>
                  <div className="mt-2 text-[10px] text-slate-400 font-bold uppercase tracking-widest">{dept.count} 人员同步中</div>
               </div>
             ))}
           </div>
        </div>

        {/* User List & Roles */}
        <div className="lg:col-span-2 space-y-8">
           <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
              <div className="p-4 bg-slate-50 border-b border-slate-100 flex justify-between items-center">
                 <h3 className="text-sm font-black text-slate-800">系统用户列表</h3>
                 <div className="flex gap-2">
                    <div className="relative">
                       <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300" size={14} />
                       <input type="text" placeholder="姓名、工号..." className="pl-8 pr-3 py-1.5 bg-white border border-slate-200 rounded-lg text-[10px] outline-none focus:ring-2 focus:ring-emerald-500" />
                    </div>
                    <button className="bg-white p-1.5 border border-slate-200 rounded-lg text-slate-400 hover:text-emerald-600 transition-colors">
                       <Plus size={16} />
                    </button>
                 </div>
              </div>
              <div className="divide-y divide-slate-50">
                 {[
                   { name: '张三', code: 'QP00821', role: '超级管理员', dept: '青浦运检部' },
                   { name: '李思', code: 'QP00932', role: '质检专责', dept: '夏阳供电所' },
                   { name: '王五', code: 'QP01123', role: '现场班组长', dept: '朱家角供电所' },
                 ].map((user, i) => (
                   <div key={i} className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors group">
                      <div className="flex items-center gap-4">
                         <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 font-black text-sm uppercase">
                            {user.name[0]}
                         </div>
                         <div>
                            <div className="font-black text-slate-800 text-sm">{user.name} <span className="text-[10px] text-slate-400 font-medium ml-2">{user.code}</span></div>
                            <div className="text-[10px] text-slate-400 font-bold">{user.dept}</div>
                         </div>
                      </div>
                      <div className="flex items-center gap-6">
                         <span className="text-[10px] font-black text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">{user.role}</span>
                         <button className="p-2 text-slate-300 group-hover:text-emerald-600"><Key size={16} /></button>
                         <ChevronRight size={16} className="text-slate-200 group-hover:text-emerald-300 transition-colors" />
                      </div>
                   </div>
                 ))}
              </div>
           </div>

           <div className="bg-emerald-900 rounded-2xl p-6 text-white shadow-xl shadow-emerald-100 flex items-center justify-between relative overflow-hidden group">
              <div className="relative z-10">
                 <div className="flex items-center gap-3 mb-2">
                    <Shield size={24} className="text-emerald-400" />
                    <h3 className="font-black text-lg">基于 PMS 3.0 的安全权限域</h3>
                 </div>
                 <p className="text-xs text-emerald-200/80 font-medium max-w-sm">当前所有权限均已通过国网上海数字化部“单点登录(SSO)”与“资产中台”双重认证。确保数据不落人、不越权。</p>
              </div>
              <button className="relative z-10 bg-white text-emerald-900 px-6 py-2.5 rounded-xl text-xs font-black shadow-lg hover:scale-105 transition-transform">
                查看合规审计记录
              </button>
              <Shield size={120} className="absolute -bottom-10 -right-10 text-emerald-800 opacity-20 group-hover:scale-110 transition-transform" />
           </div>
        </div>
      </div>
    </div>
  );
};

export default UsersPage;
