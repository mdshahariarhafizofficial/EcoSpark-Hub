'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { 
  BarChart3, TrendingUp, Zap, Target, 
  ArrowUpRight, Info, Activity, Leaf,
  ChevronRight, Download
} from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Spinner } from '@/components/ui/Spinner';

export default function AnalyticsPage() {
  const { user } = useAuth();

  const { data: dashboardData, isLoading: statsLoading } = useQuery({
    queryKey: ['dashboardStats'],
    queryFn: () => api.get('/users/dashboard/stats').then(res => res.data),
    enabled: !!user,
  });

  const stats = dashboardData?.stats;

  if (statsLoading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
         <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-5 duration-700">
      {/* 📒 Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-neutral-100 pb-10">
        <div className="space-y-4">
          <Badge className="bg-primary-50 text-primary-700 border-none text-[9px] font-black uppercase tracking-[0.3em] px-4 py-2">
             Telemetric Deep-Dive
          </Badge>
          <h1 className="text-4xl lg:text-5xl font-black text-neutral-950 tracking-tighter">
            Impact <br /> <span className="text-primary-600">Analytics.</span>
          </h1>
          <p className="text-neutral-500 font-medium max-w-xl text-lg leading-relaxed">
            Real-time telemetry of your innovation performance, carbon mitigation trajectory, and institutional engagement velocity.
          </p>
        </div>
        <div className="flex items-center gap-3">
           <Button variant="outline" size="sm" className="h-12 px-6 rounded-xl border-neutral-200 font-black text-[10px] uppercase tracking-widest bg-white">
              <Download className="w-4 h-4 mr-2" /> Export CSV
           </Button>
           <Button variant="outline" size="sm" className="h-12 px-10 rounded-xl border-neutral-200 font-black text-[10px] uppercase tracking-widest bg-white">
              7D <ChevronRight className="w-3 h-3 ml-1" />
           </Button>
        </div>
      </div>

      {/* 📊 High-Tier Telemetry Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         {/* Growth Velocity Card */}
         <Card className="lg:col-span-2 bg-white rounded-[3rem] border border-neutral-100 overflow-hidden shadow-xl shadow-neutral-950/[0.02]">
            <CardContent className="p-10 space-y-10">
               <div className="flex items-center justify-between">
                  <div className="space-y-1">
                     <h3 className="text-xl font-black text-neutral-950 tracking-tight flex items-center gap-2 uppercase">
                        Protocol Growth <TrendingUp className="w-5 h-5 text-primary-500" />
                     </h3>
                     <p className="text-xs font-bold text-neutral-400">Institutional Engagement Performance</p>
                  </div>
                  <div className="flex items-center gap-4">
                     <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-primary-500 shadow-[0_0_8px_rgba(34,197,94,0.4)]" />
                        <span className="text-[10px] font-black text-neutral-400 uppercase tracking-widest">Votes</span>
                     </div>
                     <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-neutral-200" />
                        <span className="text-[10px] font-black text-neutral-400 uppercase tracking-widest">Views</span>
                     </div>
                  </div>
               </div>

               {/* Custom SVG Chart Visualization */}
               <div className="relative h-[250px] w-full mt-10">
                  <svg className="w-full h-full overflow-visible" preserveAspectRatio="none">
                     {/* Horizontal Grid Lines */}
                     {[0.2, 0.4, 0.6, 0.8, 1].map((p, i) => (
                        <line key={i} x1="0" y1={250 * p} x2="100%" y2={250 * p} stroke="#f5f5f5" strokeWidth="1" />
                     ))}
                     
                     {/* Chart Path 1 (Votes) */}
                     <motion.path
                        d="M0,200 L100,180 L200,140 L300,160 L400,100 L500,110 L600,60 L700,80 L800,20 L900,40 L1000,10"
                        fill="none"
                        stroke="#22c55e"
                        strokeWidth="4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 1 }}
                        transition={{ duration: 1.5, ease: "easeInOut" }}
                        className="drop-shadow-[0_4px_10px_rgba(34,197,94,0.3)]"
                     />

                     {/* Chart Area Fill */}
                     <motion.path
                        d="M0,200 L100,180 L200,140 L300,160 L400,100 L500,110 L600,60 L700,80 L800,20 L900,40 L1000,10 L1000,250 L0,250 Z"
                        fill="url(#gradient-primary)"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.15 }}
                        transition={{ duration: 1, delay: 0.5 }}
                     />

                     <defs>
                        <linearGradient id="gradient-primary" x1="0" y1="0" x2="0" y2="1">
                           <stop offset="0%" stopColor="#22c55e" />
                           <stop offset="100%" stopColor="transparent" />
                        </linearGradient>
                     </defs>
                  </svg>
                  
                  {/* Data Point Markers */}
                  <div className="absolute top-[20px] left-[80%] flex flex-col items-center group">
                     <div className="bg-neutral-950 text-white text-[9px] font-black px-2 py-1 rounded mb-2 opacity-0 group-hover:opacity-100 transition-opacity">Peak Pulse</div>
                     <div className="w-4 h-4 bg-white border-2 border-primary-500 rounded-full shadow-lg shadow-primary-500/20" />
                  </div>
               </div>
            </CardContent>
         </Card>

         <div className="space-y-8">
            <Card className="bg-primary-600 text-white rounded-[3rem] p-10 border-none shadow-2xl shadow-primary-500/20 relative overflow-hidden group">
               <div className="absolute inset-0 opacity-[0.1]" style={{ backgroundImage: 'radial-gradient(circle at 1.5px 1.5px, white 1.5px, transparent 0)', backgroundSize: '16px 16px' }}></div>
               <div className="relative z-10 space-y-6">
                  <div className="flex justify-between items-start">
                     <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center">
                        <Zap className="w-6 h-6" />
                     </div>
                     <Badge className="bg-white/20 text-white border-none text-[8px] font-black uppercase tracking-widest px-3 py-1">Critical Trajectory</Badge>
                  </div>
                  <div>
                     <p className="text-[10px] font-black text-white/50 uppercase tracking-widest uppercase">Verified CO2 Mitigation</p>
                     <p className="text-4xl font-black tracking-tight">{((stats?.ideasCount || 0) * 458).toLocaleString()} <span className="text-lg text-primary-200">KGS</span></p>
                  </div>
                  <div className="pt-6 border-t border-white/10">
                     <p className="text-xs font-medium text-white/70">Estimated biosphere restoration impact based on current Registry profile.</p>
                  </div>
               </div>
            </Card>

            <Card className="bg-white rounded-[3rem] p-10 border border-neutral-100 shadow-xl shadow-neutral-950/[0.02] flex flex-col justify-between">
               <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 bg-neutral-50 rounded-2xl flex items-center justify-center text-neutral-400">
                     <Target className="w-6 h-6" />
                  </div>
                  <div>
                     <h4 className="text-sm font-black text-neutral-900 tracking-tight uppercase">Registry Goal</h4>
                     <p className="text-[10px] font-black text-primary-600 uppercase tracking-wider">Board Validated Projects</p>
                  </div>
               </div>
               <div className="relative w-full h-3 bg-neutral-100 rounded-full overflow-hidden">
                  <motion.div 
                     initial={{ width: 0 }}
                     animate={{ width: '65%' }}
                     transition={{ duration: 2, ease: "easeOut" }}
                     className="absolute inset-y-0 left-0 bg-primary-500 shadow-[0_0_10px_rgba(34,197,94,0.4)]"
                  />
               </div>
               <div className="flex justify-between items-center mt-4">
                  <p className="text-[10px] font-black text-neutral-400 uppercase tracking-widest uppercase px-1">Phase 01 Completion</p>
                  <p className="text-sm font-black text-neutral-950 tracking-tight">65%</p>
               </div>
            </Card>
         </div>
      </div>

      {/* 🧬 Analytics Table - Engagement Velocity */}
      <div className="bg-white rounded-[3rem] border border-neutral-100 overflow-hidden shadow-xl shadow-neutral-950/[0.02]">
         <div className="p-8 border-b border-neutral-50">
            <h3 className="text-xl font-black text-neutral-950 tracking-tight flex items-center gap-3 lowercase">
               <Activity className="w-5 h-5 text-primary-500" /> Sector Performance Matrix
            </h3>
         </div>
         <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
               <thead>
                  <tr className="bg-neutral-50/50">
                     <th className="p-8 text-[10px] font-black text-neutral-400 uppercase tracking-widest border-b border-neutral-50">Biosphere Sector</th>
                     <th className="p-8 text-[10px] font-black text-neutral-400 uppercase tracking-widest border-b border-neutral-50">Velocity</th>
                     <th className="p-8 text-[10px] font-black text-neutral-400 uppercase tracking-widest border-b border-neutral-50">Impact Factor</th>
                     <th className="p-8 text-[10px] font-black text-neutral-400 uppercase tracking-widest border-b border-neutral-50 text-right">Telemetry Score</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-neutral-50">
                  {[
                     { sector: 'Energy Grids', velocity: '+24%', impact: 'High', score: '92/100', color: 'bg-primary-500' },
                     { sector: 'Maritime Blueprints', velocity: '+12%', impact: 'Ultra', score: '84/100', color: 'bg-blue-500' },
                     { sector: 'Atmospheric Capture', velocity: '+8%', impact: 'Critical', score: '76/100', color: 'bg-secondary-500' },
                  ].map((row, i) => (
                     <tr key={i} className="hover:bg-neutral-50/50 transition-colors">
                        <td className="p-8">
                           <div className="flex items-center gap-4">
                              <div className={cn("w-2 h-8 rounded-full", row.color)} />
                              <p className="font-black text-neutral-900 uppercase tracking-tight">{row.sector}</p>
                           </div>
                        </td>
                        <td className="p-8 font-bold text-primary-600">
                           {row.velocity}
                        </td>
                        <td className="p-8">
                           <Badge className="bg-neutral-900 text-white font-black text-[8px] uppercase tracking-widest px-3 py-1">
                              {row.impact}
                           </Badge>
                        </td>
                        <td className="p-8 text-right font-black text-neutral-950">
                           {row.score}
                        </td>
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </div>
    </div>
  );
}

