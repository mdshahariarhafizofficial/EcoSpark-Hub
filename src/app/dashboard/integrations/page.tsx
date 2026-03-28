'use client';

import { useAuth } from '@/contexts/AuthContext';
import { 
  Zap, Globe, ShieldCheck, Link2, 
  ExternalLink, CheckCircle, AlertCircle,
  Database, Cpu, Share2, ArrowUpRight
} from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';

export default function IntegrationsPage() {
  const { user } = useAuth();

  const integrations = [
    {
      id: 'stripe',
      name: 'Financial Node (Stripe)',
      description: 'End-to-end encrypted protocol for capital allocation and blueprint security clearance.',
      status: 'CONNECTED',
      icon: Zap,
      color: 'bg-primary-500',
      lastSync: '0.4s ago'
    },
    {
      id: 'biosphere',
      name: 'Biosphere API 3.0',
      description: 'Primary data-stream for real-time ecological telemetry and global innovation pulse.',
      status: 'ACTIVE',
      icon: Globe,
      color: 'bg-blue-500',
      lastSync: 'Real-time'
    },
    {
      id: 'node-auth',
      name: 'Institutional Validator',
      description: 'Identity verification node for high-tier project audits and board validation.',
      status: 'VERIFIED',
      icon: ShieldCheck,
      color: 'bg-secondary-500',
      lastSync: 'Identity Latency: 4ms'
    }
  ];

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-5 duration-700">
      {/* 📒 Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-neutral-100 pb-10">
        <div className="space-y-4">
          <Badge className="bg-primary-50 text-primary-700 border-none text-[9px] font-black uppercase tracking-[0.3em] px-4 py-2">
             System Connectivity
          </Badge>
          <h1 className="text-4xl lg:text-5xl font-black text-neutral-950 tracking-tighter">
            Technical <br /> <span className="text-primary-600">Integrations.</span>
          </h1>
          <p className="text-neutral-500 font-medium max-w-xl text-lg leading-relaxed">
            Manage your connection across the biosphere network. Monitor node latency and institutional validation protocols.
          </p>
        </div>
        <Button variant="outline" className="h-14 px-10 rounded-2xl border-neutral-200 font-black text-[10px] uppercase tracking-widest bg-white shadow-xl shadow-neutral-950/[0.02]">
           <Link2 className="w-4 h-4 mr-2" /> Connect New Node
        </Button>
      </div>

      {/* 🧬 Active Nodes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
         {integrations.map((node) => (
            <Card key={node.id} className="group hover:shadow-2xl transition-all duration-500 border-neutral-100 bg-white overflow-hidden rounded-[3rem] p-4">
               <CardContent className="p-8 space-y-8">
                  <div className="flex justify-between items-start">
                     <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-neutral-950/[0.05] transition-transform group-hover:rotate-12", node.color)}>
                        <node.icon className="w-7 h-7" />
                     </div>
                     <Badge className="bg-primary-50 text-primary-700 font-black text-[8px] uppercase tracking-[0.2em] px-3 py-1 border-none shadow-sm flex items-center gap-1.5">
                        <CheckCircle className="w-2.5 h-2.5" /> {node.status}
                     </Badge>
                  </div>

                  <div className="space-y-2">
                     <h4 className="text-xl font-black text-neutral-950 tracking-tight uppercase">{node.name}</h4>
                     <p className="text-xs font-medium text-neutral-500 leading-relaxed">{node.description}</p>
                  </div>

                  <div className="pt-6 border-t border-neutral-50 flex items-center justify-between text-[10px] font-black uppercase tracking-widest">
                     <div className="flex items-center gap-2 text-neutral-400">
                        <Cpu className="w-3.5 h-3.5" /> {node.lastSync}
                     </div>
                     <button className="text-primary-600 hover:underline">Config Hub</button>
                  </div>
               </CardContent>
            </Card>
         ))}
      </div>

      {/* 📊 Network Status Visualization */}
      <Card className="bg-neutral-950 p-12 rounded-[4rem] text-white relative overflow-hidden group shadow-2xl shadow-neutral-950/20">
         <div className="absolute inset-x-0 bottom-0 h-[200px] opacity-[0.05]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
         <div className="relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
            <div className="lg:col-span-2 space-y-6">
               <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full text-[9px] font-black uppercase tracking-widest text-primary-400 border border-white/10">
                  <Activity className="w-3 h-3" /> All Systems Nominal
               </div>
               <h3 className="text-4xl lg:text-5xl font-black tracking-tighter uppercase leading-none">Biosphere <br /> <span className="text-primary-500 text-6xl">Latency.</span></h3>
               <p className="text-white/50 text-lg font-medium max-w-xl">Your node connectivity is processed through institutional optical channels. Current average packet delay across Registry Hub: <span className="text-white">1.2ms</span>.</p>
               <div className="flex items-center gap-4 pt-4">
                  <Button variant="outline" className="border-white/10 bg-white/5 hover:bg-white/10 text-white font-black text-[10px] uppercase tracking-widest h-14 rounded-2xl">
                     View Technical Logs
                  </Button>
                  <Button variant="outline" className="border-white/10 bg-white/5 hover:bg-white/10 text-white font-black text-[10px] uppercase tracking-widest h-14 rounded-2xl">
                     Refresh Connectivity
                  </Button>
               </div>
            </div>
            
            <div className="relative hidden lg:flex items-center justify-center">
               <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                  className="w-64 h-64 border-2 border-white/5 rounded-full flex items-center justify-center"
               >
                  <div className="absolute top-0 w-4 h-4 bg-primary-500 rounded-full shadow-[0_0_20px_rgba(34,197,94,0.6)]" />
                  <div className="w-48 h-48 border-2 border-white/5 rounded-full flex items-center justify-center">
                     <Share2 className="w-16 h-16 text-primary-500/50" />
                  </div>
               </motion.div>
            </div>
         </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-black">
         <div className="bg-white p-10 rounded-[3rem] border border-neutral-100 shadow-xl shadow-neutral-950/[0.02] flex flex-col justify-between">
            <div className="space-y-4">
               <h4 className="text-xl font-black text-neutral-950 tracking-tight flex items-center gap-3"><Database className="w-5 h-5 text-primary-500" /> Data Sovereignty</h4>
               <p className="text-neutral-500 font-medium">Your innovation blueprints are stored using institutional-grade encryption. No third-party nodes have access to your private Registry archive without valid blueprint security clearance.</p>
            </div>
            <Link href="/help" className="mt-8 text-[10px] font-black text-primary-600 uppercase tracking-[0.2em] hover:underline">
               Security Documentation <ArrowUpRight className="w-4 h-4 inline ml-1" />
            </Link>
         </div>
         
         <div className="bg-white p-10 rounded-[3rem] border border-neutral-100 shadow-xl shadow-neutral-950/[0.02] flex flex-col justify-between">
            <div className="space-y-4">
               <h4 className="text-xl font-black text-neutral-950 tracking-tight flex items-center gap-3"><AlertCircle className="w-5 h-5 text-secondary-500" /> Webhook Protocol</h4>
               <p className="text-neutral-500 font-medium">Automatic telemetry alerts are pushed to your secure node whenever a protocol status changes in the Registry. Ensure your financial node is active to receive payment clearances.</p>
            </div>
            <Link href="/help" className="mt-8 text-[10px] font-black text-primary-600 uppercase tracking-[0.2em] hover:underline">
               Webhook Diagnostics <ArrowUpRight className="w-4 h-4 inline ml-1" />
            </Link>
         </div>
      </div>
    </div>
  );
}

function Activity(props: any) {
   return (
      <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>
   )
}
