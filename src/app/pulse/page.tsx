'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Zap, Globe, Globe2, Leaf, ShieldCheck, 
  ArrowUpRight, BarChart3, PieChart, Activity,
  Database, LineChart, TrendingUp, Sparkles,
  Award, Target
} from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import Link from 'next/link';

// 📊 Mock Impact Data
const stats = [
  { label: 'CO2 MITIGATION', value: 8429, unit: 'M. Tons', icon: Leaf, color: 'text-primary-600' },
  { label: 'VERIFIED PROTOCOLS', value: 1240, unit: 'Units', icon: ShieldCheck, color: 'text-secondary-500' },
  { label: 'ALLOCATED CAPITAL', value: 24.8, unit: 'M. USD', icon: Globe, color: 'text-primary-500' },
  { label: 'ACTIVE NODES', value: 25.4, unit: 'K. Experts', icon: Globe2, color: 'text-secondary-600' },
];

const sectorDistribution = [
  { name: 'Energy', value: 42, color: 'bg-primary-500' },
  { name: 'AgriTech', value: 24, color: 'bg-secondary-500' },
  { name: 'Waste', value: 18, color: 'bg-neutral-800' },
  { name: 'Materials', value: 16, color: 'bg-primary-300' },
];

const boardMetrics = [
  { label: 'Audit Latency', value: '72h', trend: '-12%', desc: 'Avg. time from submission to Tier-1 verification.' },
  { label: 'Success Velocity', value: '94%', trend: '+4%', desc: 'Protocols meeting Tier-3 institutional requirements.' },
  { label: 'Global Synchronization', value: '184', trend: 'Nodes', desc: 'Regional hubs actively validating new blueprints.' },
];

export default function PulsePage() {
  const [counts, setCounts] = useState(stats.map(() => 0));

  useEffect(() => {
    const intervals = stats.map((stat, i) => {
      return setInterval(() => {
        setCounts(prev => {
          const next = [...prev];
          if (next[i] < stat.value) {
            next[i] = Math.min(stat.value, next[i] + (stat.value / 50));
          }
          return next;
        });
      }, 30);
    });
    return () => intervals.forEach(clearInterval);
  }, []);

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.8 }
  };

  return (
    <div className="bg-white min-h-screen pt-24 font-sans">
      
      {/* 🌌 High-Performance Telemetry Hero */}
      <section className="relative py-24 md:py-32 overflow-hidden bg-white border-b border-neutral-100">
         <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-primary-100/40 to-transparent rounded-full blur-[100px] -mr-48 -mt-48 pointer-events-none" />
         <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-secondary-100/30 to-transparent rounded-full blur-[80px] -ml-24 -mb-24 pointer-events-none" />
         
         <div className="max-w-6xl mx-auto px-6 relative z-10">
            <motion.div 
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               className="flex flex-col items-center text-center"
            >
               <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-primary-50 border border-primary-100 mb-10 shadow-sm group cursor-help">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-primary-500"></span>
                  </span>
                  <span className="text-xs font-black text-primary-700 uppercase tracking-[0.3em]">Live Telemetry Feed</span>
               </div>
               
               <h1 className="text-5xl md:text-8xl font-black text-neutral-950 tracking-tighter mb-10 leading-[0.95] uppercase">
                  Global Biosphere <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-secondary-500 underline decoration-primary-500/20 underline-offset-8">
                     Pulse / Archive.
                  </span>
               </h1>
               
               <p className="max-w-3xl text-xl text-neutral-600 font-medium leading-relaxed mb-12 tracking-tight">
                  Transparent architectural monitoring of human-scale ecological projects. Verified through multi-tiered audit protocols.
               </p>

               {/* Interaction Buttons */}
               <div className="flex flex-wrap items-center justify-center gap-6">
                  <Link href="/ideas">
                     <Button variant="primary" size="lg" className="h-16 px-10 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-2xl shadow-primary-500/20">
                        Access Registry
                     </Button>
                  </Link>
                  <Button variant="outline" size="lg" className="h-16 px-10 rounded-2xl text-[10px] font-black uppercase tracking-widest text-neutral-700 border-neutral-200 bg-white hover:bg-neutral-50 shadow-sm">
                     <Database className="w-4 h-4 mr-3 text-primary-500" /> Technical Data Pack
                  </Button>
               </div>
            </motion.div>
         </div>
      </section>

      {/* 🚀 Impact Logic Grid */}
      <section className="py-24 bg-neutral-50/50">
         <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
               {stats.map((stat, i) => (
                  <motion.div
                    key={i}
                    {...fadeInUp}
                    transition={{ delay: i * 0.1 }}
                    className="p-10 bg-white rounded-[2.5rem] border border-neutral-200/60 shadow-xl shadow-neutral-950/[0.02] flex flex-col items-center text-center group hover:border-primary-500/20 transition-all"
                  >
                     <div className={`w-14 h-14 rounded-2xl bg-neutral-50 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform ${stat.color}`}>
                        <stat.icon className="w-7 h-7" />
                     </div>
                     <p className="text-[10px] font-black text-neutral-400 uppercase tracking-[0.3em] mb-4">{stat.label}</p>
                     <div className="flex items-baseline gap-2">
                        <span className="text-5xl font-black text-neutral-950 tracking-tighter">
                           {stat.value % 1 === 0 ? Math.floor(counts[i]) : counts[i].toFixed(1)}
                        </span>
                        <span className="text-sm font-black text-primary-600 uppercase tracking-widest">{stat.unit}</span>
                     </div>
                  </motion.div>
               ))}
            </div>

            {/* Sub-Impact Visualization Row */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mt-20">
               {/* 📂 Sector Distribution */}
               <div className="lg:col-span-8 bg-white rounded-[3rem] p-10 md:p-16 border border-neutral-200/60 shadow-xl shadow-neutral-950/[0.02]">
                  <div className="flex items-center justify-between mb-12">
                     <div>
                        <Badge className="bg-primary-50 text-primary-700 border-primary-100 mb-4 font-bold px-3 py-1 uppercase tracking-widest text-[9px]">Sector Weighting</Badge>
                        <h3 className="text-3xl font-black text-neutral-950 tracking-tight">Registry Distribution</h3>
                     </div>
                     <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-neutral-950 flex items-center justify-center group cursor-pointer hover:bg-primary-600 transition-colors">
                           <BarChart3 className="w-5 h-5 text-white" />
                        </div>
                     </div>
                  </div>

                  <div className="space-y-10">
                     {sectorDistribution.map((sector, i) => (
                        <div key={i}>
                           <div className="flex justify-between items-end mb-4">
                              <span className="text-sm font-black text-neutral-900 uppercase tracking-widest">{sector.name}</span>
                              <span className="text-sm font-black text-primary-600">{sector.value}%</span>
                           </div>
                           <div className="h-6 w-full bg-neutral-100 rounded-full overflow-hidden">
                              <motion.div 
                                initial={{ width: 0 }}
                                whileInView={{ width: `${sector.value}%` }}
                                transition={{ duration: 1.5, delay: 0.2 + (i * 0.1) }}
                                viewport={{ once: true }}
                                className={`h-full ${sector.color} shadow-lg shadow-primary-500/10`}
                              />
                           </div>
                        </div>
                     ))}
                  </div>
               </div>

               {/* 📑 Quick Board Insight */}
               <div className="lg:col-span-4 flex flex-col gap-10">
                  <div className="bg-neutral-950 rounded-[3rem] p-10 text-white relative overflow-hidden flex-1 group shadow-2xl shadow-neutral-950/20">
                     <div className="absolute inset-0 opacity-[0.1]" style={{ 
                        backgroundImage: 'radial-gradient(circle at 1.5px 1.5px, white 1.5px, transparent 0)', 
                        backgroundSize: '24px 24px' 
                     }}></div>
                     <div className="relative z-10 h-full flex flex-col justify-between">
                        <div>
                           <div className="w-12 h-12 bg-primary-600 rounded-2xl flex items-center justify-center mb-8 shadow-xl shadow-primary-900/50 group-hover:scale-110 transition-transform">
                              <TrendingUp className="w-6 h-6 text-white" />
                           </div>
                           <h4 className="text-2xl font-black mb-4 tracking-tight leading-tight uppercase">Protocol <br />Velocity.</h4>
                           <p className="text-white/50 text-sm font-medium leading-relaxed">System-wide performance metrics for Tier-3 board validation cycles.</p>
                        </div>
                        <Link href="/about" className="mt-8 flex items-center gap-3 text-primary-400 font-black text-xs uppercase tracking-[0.2em] hover:text-white transition-colors">
                           Audit Process <ArrowUpRight className="w-4 h-4" />
                        </Link>
                     </div>
                  </div>

                  <div className="bg-primary-50 border border-primary-100 rounded-[3rem] p-10 flex flex-col justify-center gap-4">
                     <p className="text-[10px] font-black text-primary-700 uppercase tracking-widest opacity-80 flex items-center gap-2">
                        <Activity className="w-3 h-3" /> Technical Uptime
                     </p>
                     <p className="text-3xl font-black text-neutral-900 tracking-tight leading-none uppercase">99.98% / Signed</p>
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* 🧬 Board Performance Analysis */}
      <section className="py-24 bg-white relative">
         <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-20">
               <Badge className="bg-neutral-950 text-white border-none mb-6 font-bold px-4 py-2 uppercase tracking-widest text-[10px]">Registry Audit</Badge>
               <h2 className="text-4xl md:text-6xl font-black text-neutral-950 tracking-tighter leading-none uppercase">Validator <br /> Intelligence.</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
               {boardMetrics.map((metric, i) => (
                  <motion.div
                    key={i}
                    {...fadeInUp}
                    transition={{ delay: i * 0.1 }}
                    className="p-12 bg-neutral-50 rounded-[3rem] border border-neutral-100 flex flex-col items-center text-center relative group hover:bg-white hover:border-primary-500/20 transition-all duration-500 shadow-2xl shadow-transparent hover:shadow-neutral-950/[0.02]"
                  >
                     <p className="text-[10px] font-black text-neutral-400 uppercase tracking-[0.3em] mb-4">{metric.label}</p>
                     <div className="text-5xl font-black text-neutral-950 tracking-tighter mb-4 flex items-center gap-3">
                        {metric.value}
                        <span className={`text-[10px] px-2 py-1 rounded-lg border font-black uppercase tracking-widest ${
                           metric.trend.startsWith('+') || metric.trend.endsWith('Nodes') ? 'bg-primary-50 text-primary-600 border-primary-200' : 'bg-secondary-50 text-secondary-600 border-secondary-200'
                        }`}>
                           {metric.trend}
                        </span>
                     </div>
                     <p className="text-sm text-neutral-500 font-medium leading-relaxed max-w-[200px]">{metric.desc}</p>
                     
                     <div className="absolute top-0 right-0 p-8 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Sparkles className="w-5 h-5 text-primary-400" />
                     </div>
                  </motion.div>
               ))}
            </div>
         </div>
      </section>

      {/* 🤝 Final Registry CTA */}
      <section className="py-32 bg-white overflow-hidden relative border-t border-neutral-100">
         <div className="max-w-4xl mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative py-24"
            >
               <div className="w-24 h-24 bg-primary-600 rounded-[2.5rem] flex items-center justify-center mx-auto mb-12 shadow-2xl shadow-primary-500/40 rotate-12 hover:rotate-0 transition-transform duration-500">
                  <PieChart className="w-10 h-10 text-white" />
               </div>
               
               <h2 className="text-4xl md:text-7xl font-black text-neutral-950 tracking-tighter mb-10 leading-none uppercase">Join the <br /> Technical <span className="text-primary-600">Shift.</span></h2>
               <p className="text-xl text-neutral-600 mb-16 font-medium tracking-tight max-w-2xl mx-auto">
                  Every data point above represents a verified ecological shift. Be part of the next metrics by submitting your blueprint today.
               </p>
               
               <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
                  <Link href="/register">
                     <Button variant="primary" size="lg" className="h-20 px-12 rounded-3xl text-[10px] font-black uppercase tracking-[0.3em] shadow-2xl shadow-primary-500/20 group">
                        Initialize Project <ArrowUpRight className="w-4 h-4 ml-4 transition-transform group-hover:translate-x-2" />
                     </Button>
                  </Link>
               </div>
            </motion.div>
         </div>
      </section>
    </div>
  );
}
