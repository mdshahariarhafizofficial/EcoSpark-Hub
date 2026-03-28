'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { 
  Plus, Leaf, TrendingUp, CreditCard,
  Bookmark, Sparkles, ArrowUpRight,
  Activity, ShieldCheck, Zap, Briefcase,
  ChevronRight, BarChart3
} from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { cn, formatDate } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Spinner } from '@/components/ui/Spinner';
import Counter from '@/components/common/Counter';

export default function MemberDashboard() {
  const { user } = useAuth();

  // 📈 Core Telemetry Fetch
  const { data: dashboardData, isLoading: statsLoading } = useQuery({
    queryKey: ['dashboardStats'],
    queryFn: () => api.get('/users/dashboard/stats').then(res => res.data),
    enabled: !!user,
  });

  const stats = dashboardData?.stats;
  const statCards = [
    { label: 'Active Sparks', val: stats?.ideasCount || 0, icon: Leaf, color: 'text-primary-600', bg: 'bg-primary-50', href: '/dashboard/registry' },
    { label: 'Global Endorsements', val: stats?.votesReceived || 0, icon: Zap, color: 'text-amber-500', bg: 'bg-amber-50', href: '/dashboard/registry' },
    { label: 'Invested Capital', val: stats?.totalInvested || 0, icon: CreditCard, color: 'text-secondary-600', bg: 'bg-secondary-50', isMoney: true, href: '/dashboard/payments' },
    { label: 'Secured Blueprints', val: stats?.purchasesCount || 0, icon: ShieldCheck, color: 'text-blue-600', bg: 'bg-blue-50', href: '/dashboard/payments' },
  ];

  if (statsLoading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
         <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-5 duration-700">
      {/* 🌌 Command Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-neutral-100 pb-12 text-black">
        <div className="space-y-4">
          <Badge className="bg-primary-50 text-primary-700 border-primary-100 text-[10px] font-black uppercase tracking-[0.3em] px-4 py-2 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 mr-2 text-secondary-500" /> Command Center
          </Badge>
          <h1 className="text-4xl lg:text-6xl font-black text-neutral-950 tracking-tighter leading-none">
            Telemetry <br /> <span className="text-primary-600">Overview.</span>
          </h1>
          <p className="text-neutral-500 font-medium max-w-xl text-lg leading-relaxed">
            Manage your institutional innovation workflow across the biosphere. Monitor impact trajectory and node connectivity.
          </p>
        </div>
        <div className="flex items-center gap-4">
           <Link href="/dashboard/new">
              <Button variant="primary" size="lg" className="h-16 px-10 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-2xl shadow-primary-500/20">
                <Plus className="w-4 h-4 mr-2" /> Launch New Spark
              </Button>
           </Link>
        </div>
      </div>

      {/* 📊 Impact Analytics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, i) => (
          <Link key={i} href={stat.href}>
            <Card className="group hover:shadow-2xl hover:shadow-neutral-900/[0.04] transition-all duration-500 border-neutral-100 overflow-hidden relative bg-white">
               <CardContent className="p-8">
               <div className="flex justify-between items-start mb-6">
                  <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center shadow-inner", stat.bg)}>
                     <stat.icon className={cn("w-7 h-7 transition-transform group-hover:rotate-12", stat.color)} />
                  </div>
                  <div className="h-8 w-8 rounded-full border border-neutral-100 flex items-center justify-center text-neutral-300 group-hover:text-primary-500 group-hover:border-primary-100 transition-colors">
                     <ArrowUpRight className="w-4 h-4" />
                  </div>
               </div>
               <div className="space-y-1">
                  <div className="text-4xl font-black text-neutral-950 tracking-tighter numbers-tabular">
                  {stat.isMoney ? '$' : ''}<Counter value={stat.val} />
                  </div>
                  <div className="text-[10px] font-black text-neutral-400 uppercase tracking-[0.2em]">{stat.label}</div>
               </div>
               </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* 🔋 Telemetry Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
         {/* Primary Activity Feed */}
         <div className="lg:col-span-8 space-y-10">
            <div className="bg-white rounded-[3rem] border border-neutral-100 overflow-hidden shadow-xl shadow-neutral-950/[0.02]">
               <div className="p-8 border-b border-neutral-50 flex items-center justify-between">
                  <h3 className="text-xl font-black text-neutral-950 tracking-tight flex items-center gap-3 lowercase">
                     <Activity className="w-5 h-5 text-primary-500" /> Recent Activity
                  </h3>
                  <Link href="/pulse" className="text-[10px] font-black text-primary-600 uppercase tracking-widest hover:underline">Global Pulse</Link>
               </div>
               <div className="divide-y divide-neutral-50">
                  {dashboardData?.recentIdeas?.map((idea: any) => (
                     <div key={idea.id} className="p-8 hover:bg-neutral-50/50 transition-colors group">
                        <div className="flex items-center justify-between mb-3">
                           <Badge className="bg-primary-50 text-primary-700 border-none font-black text-[9px] uppercase tracking-widest">Protocol Creation</Badge>
                           <span className="text-[10px] font-bold text-neutral-400 capitalize">{formatDate(idea.createdAt)}</span>
                        </div>
                        <h4 className="text-lg font-black text-neutral-900 group-hover:text-primary-600 transition-colors uppercase leading-none">{idea.title}</h4>
                        <div className="mt-4 flex items-center gap-4">
                           <div className="flex items-center gap-1.5 text-xs font-bold text-neutral-500">
                              <div className="w-2 h-2 rounded-full bg-primary-500 shadow-[0_0_8px_rgba(34,197,94,0.4)]" /> Status: {idea.status.replace('_', ' ')}
                           </div>
                           <div className="flex items-center gap-1.5 text-xs font-bold text-neutral-500">
                              <TrendingUp className="w-3.5 h-3.5 text-primary-500" /> {idea.voteCount} Endorsements
                           </div>
                        </div>
                     </div>
                  ))}
                  {dashboardData?.recentPurchases?.length === 0 && dashboardData?.recentIdeas?.length === 0 && (
                     <div className="py-24 text-center">
                        <p className="text-neutral-400 font-bold uppercase tracking-widest">No recent telemetry logs.</p>
                     </div>
                  )}
               </div>
            </div>
         </div>

         {/* Sidebar Navigation Context */}
         <div className="lg:col-span-4 space-y-8">
            <div className="bg-neutral-950 rounded-[2.5rem] p-10 text-white relative overflow-hidden group shadow-2xl shadow-neutral-950/20">
               <div className="absolute inset-x-0 bottom-0 h-1/2 opacity-[0.05]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '32px 32px' }}></div>
               <div className="relative z-10 space-y-8">
                  <div className="w-16 h-16 bg-primary-600 rounded-[2rem] flex items-center justify-center mb-8 shadow-xl shadow-primary-900/50 group-hover:rotate-12 transition-transform">
                     <ShieldCheck className="w-8 h-8" />
                  </div>
                  <div>
                     <h4 className="text-3xl font-black mb-2 tracking-tight leading-none uppercase">Technical <br /> Registry.</h4>
                     <p className="text-white/50 text-sm font-medium leading-relaxed">Access your innovation blueprints and monitor institutional board audits.</p>
                  </div>
                  <Link href="/dashboard/registry">
                     <Button variant="outline" className="w-full border-white/10 bg-white/5 hover:bg-white/10 text-white font-black text-[10px] uppercase tracking-widest h-14 rounded-2xl">
                        Open Registry Workspace <ChevronRight className="w-3 h-3 ml-2" />
                     </Button>
                  </Link>
               </div>
            </div>

            <Card className="bg-white rounded-[2.5rem] border border-neutral-100 p-8 shadow-xl shadow-neutral-950/[0.02]">
               <div className="space-y-6">
                  <div className="flex items-center gap-3">
                     <div className="w-10 h-10 bg-primary-50 rounded-xl flex items-center justify-center text-primary-600">
                        <Zap className="w-5 h-5" />
                     </div>
                     <span className="text-[10px] font-black text-neutral-400 uppercase tracking-widest">System Health</span>
                  </div>
                  
                  <div className="space-y-4">
                     {[
                        { label: 'Biosphere Node', status: 'Online', color: 'bg-primary-500' },
                        { label: 'Blockchain Core', status: 'Active', color: 'bg-primary-500' },
                        { label: 'Stripe Gateway', status: 'Connected', color: 'bg-primary-500' },
                     ].map((node, i) => (
                        <div key={i} className="flex items-center justify-between">
                           <span className="text-xs font-bold text-neutral-600">{node.label}</span>
                           <div className="flex items-center gap-2">
                              <div className={cn("w-1.5 h-1.5 rounded-full animate-pulse", node.color)} />
                              <span className="text-[9px] font-black text-neutral-400 uppercase tracking-widest">{node.status}</span>
                           </div>
                        </div>
                     ))}
                  </div>
                  
                  <Link href="/dashboard/integrations">
                     <Button variant="outline" className="w-full h-12 rounded-xl text-[9px] font-black uppercase tracking-widest mt-4">
                        Manage Connections
                     </Button>
                  </Link>
               </div>
            </Card>
         </div>
      </div>
    </div>
  );
}
