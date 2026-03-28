'use client';

import { motion } from 'framer-motion';
import { Users, Globe, Zap, ShieldCheck, Sparkles, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { cn } from '@/lib/utils';

export default function AboutPage() {
  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
  };

  return (
    <div className="bg-white min-h-screen pt-16 font-sans">
      
      {/* 🌌 High-Performance Manifesto Hero */}
      <section className="relative py-32 md:py-48 overflow-hidden bg-white">
         {/* Abstract Soft Gradients */}
         <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-primary-100/50 to-transparent rounded-full blur-[100px] -mr-48 -mt-48 pointer-events-none" />
         <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-secondary-100/40 to-transparent rounded-full blur-[80px] -ml-24 -mb-24 pointer-events-none" />
         
         <div className="max-w-6xl mx-auto px-6 relative z-10 text-center">
            <motion.div 
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               className="flex flex-col items-center"
            >
               <Badge className="bg-primary-50 text-primary-700 border-primary-100 text-[10px] font-black uppercase tracking-[0.3em] px-4 py-2 mb-10 shadow-sm">
                  <Sparkles className="w-3.5 h-3.5 mr-2 text-secondary-500" /> The Biosphere Protocol
               </Badge>
               
               <h1 className="text-5xl md:text-8xl font-black text-neutral-950 tracking-tighter mb-10 leading-[0.85] uppercase">
                  Accelerating <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-secondary-500">
                     Ecological <br />
                     Intelligence.
                  </span>
               </h1>
               
               <p className="max-w-2xl text-xl text-neutral-600 font-medium leading-relaxed mb-12 tracking-tight">
                  EcoSpark Hub is a decentralized intelligence registry where ecological innovation meets verified institutional stakeholders. We are architecting the future of climate resilience.
               </p>
               
               <div className="flex flex-wrap items-center justify-center gap-6">
                  <Link href="/ideas">
                     <Button variant="primary" size="lg" className="h-16 px-10 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-2xl shadow-primary-500/20">
                        Explore Registry
                     </Button>
                  </Link>
                  <Link href="/register">
                     <Button variant="outline" size="lg" className="h-16 px-10 rounded-2xl text-[10px] font-black uppercase tracking-widest text-neutral-700 border-neutral-200 bg-white hover:bg-neutral-50 shadow-sm">
                        Join the Movement
                     </Button>
                  </Link>
               </div>
            </motion.div>
         </div>
      </section>

      {/* 🧪 The Architectural Gap */}
      <section className="py-32 relative overflow-hidden bg-neutral-50">
         <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-24 items-center">
               <motion.div {...fadeInUp}>
                  <div className="text-[10px] font-black text-primary-600 uppercase tracking-[0.3em] mb-4">Discovery Loop</div>
                  <h2 className="text-4xl md:text-6xl font-black text-neutral-900 mb-8 tracking-tighter leading-none uppercase">The Friction <br />We Eliminate.</h2>
                  
                  <p className="text-xl text-neutral-900/60 font-medium leading-[1.6] mb-12 tracking-tight">
                    Global sustainability initiatives often collide with institutional inertia. Ideas perish in isolation due to lack of verification, funding, and precise visibility. EcoSpark Hub bridges the "Inertia Gap."
                  </p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                     <div className="p-8 bg-white rounded-[2.5rem] border border-neutral-100 shadow-2xl shadow-neutral-900/[0.03]">
                        <div className="text-5xl font-black text-red-500 tracking-tighter mb-2">90%</div>
                        <div className="text-[10px] font-black text-neutral-900 uppercase tracking-widest leading-none">Protocol Failure</div>
                        <p className="text-sm text-neutral-500 mt-2 font-medium">Of unverified ecological concepts fail to reach phase 2 scaling.</p>
                     </div>
                     <div className="p-8 bg-neutral-900 rounded-[2.5rem] text-white shadow-2xl shadow-neutral-900/10">
                        <div className="text-5xl font-black text-primary-400 tracking-tighter mb-2">25k+</div>
                        <div className="text-[10px] font-black text-primary-400 uppercase tracking-widest leading-none">Signals Verified</div>
                        <p className="text-sm text-white/50 mt-2 font-medium">Processed through the Biosphere Audit Tier monthly.</p>
                     </div>
                  </div>
               </motion.div>
               
               <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                  className="relative group"
               >
                  <div className="absolute -inset-4 bg-primary-500/20 rounded-[4rem] rotate-3 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative rounded-[3.5rem] overflow-hidden border-8 border-white shadow-2xl shadow-neutral-900/10">
                     <img 
                        src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=1000" 
                        alt="Ecological Innovation" 
                        className="w-full h-full object-cover transition-all duration-700" 
                     />
                     <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/40 to-transparent" />
                  </div>
               </motion.div>
            </div>
         </div>
      </section>

      {/* ⚙️ Protocol Tier Architecture */}
      <section className="py-32 bg-white">
         <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-24">
               <Badge className="bg-primary-50 text-primary-700 border-primary-200 text-[10px] font-black uppercase tracking-[0.3em] px-4 py-2 mb-6">System Hierarchy</Badge>
               <h2 className="text-4xl md:text-6xl font-black text-neutral-900 tracking-tighter leading-none uppercase">The Biosphere Stack.</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
               {[
                 { 
                   icon: Globe, 
                   title: 'Neural Registry', 
                   desc: 'A transparent ledger of every ecological signal, ensuring permanent and immutable proof of innovation.',
                   color: 'bg-primary-50 text-primary-600'
                 },
                 { 
                   icon: ShieldCheck, 
                   title: 'Audit Loops', 
                   desc: 'Multi-signature expert verification tiers that ensure concepts translate into verified real-world impact.',
                   color: 'bg-secondary-50 text-secondary-600'
                 },
                 { 
                   icon: Zap, 
                   title: 'Pulse Incentives', 
                   desc: 'A high-performance monetization architecture that rewards contributors for significant ecological breakthroughs.',
                   color: 'bg-primary-50 text-primary-600'
                 }
               ].map((v, i) => (
                  <motion.div 
                    key={i} 
                    {...fadeInUp}
                    transition={{ delay: i * 0.1 }}
                  >
                     <Card className="h-full border-none bg-neutral-50 rounded-[3rem] shadow-2xl shadow-neutral-900/[0.02] hover:shadow-primary-500/5 transition-all group overflow-hidden">
                        <CardContent className="p-12 relative">
                           <div className={cn("w-16 h-16 rounded-2xl flex items-center justify-center mb-10 transition-transform group-hover:scale-110", v.color)}>
                              <v.icon className="w-8 h-8" />
                           </div>
                           <h3 className="text-2xl font-black text-neutral-900 mb-6 uppercase tracking-tight">{v.title}</h3>
                           <p className="text-neutral-500 font-bold leading-relaxed tracking-tight">{v.desc}</p>
                           
                           <div className="absolute bottom-0 left-0 w-full h-1 bg-neutral-200 group-hover:bg-primary-500 transition-colors" />
                        </CardContent>
                     </Card>
                  </motion.div>
               ))}
            </div>
         </div>
      </section>

      {/* 🤝 The Collective CTA */}
      <section className="py-48 relative overflow-hidden bg-neutral-50 shadow-inner">
         {/* Dynamic Pulse Orb */}
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-full bg-primary-100/50 blur-[120px] rounded-full pointer-events-none" />
         
         <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
            <motion.div {...fadeInUp}>
               <div className="w-24 h-24 bg-white rounded-[2.5rem] border border-neutral-200 flex items-center justify-center mx-auto mb-12 rotate-12 shadow-xl shadow-neutral-950/5 hover:rotate-0 transition-transform duration-500">
                  <Users className="w-10 h-10 text-primary-500" />
               </div>
               
               <h2 className="text-4xl md:text-7xl font-black text-neutral-950 tracking-tighter mb-10 leading-none uppercase">Architecting <br /> the Biosphere.</h2>
               
               <p className="text-xl text-neutral-600 mb-16 font-medium tracking-tight">
                  We are a global Tier-1 collective of developers, ecological auditors, and industrial strategists. Our mission is to make sustainable intelligence the default protocol for global innovation.
               </p>
               
               <Link href="/contact">
                  <Button variant="primary" size="lg" className="h-20 px-12 rounded-3xl text-[10px] font-black uppercase tracking-[0.3em] shadow-2xl shadow-primary-500/20 group">
                     Join the Collective <ArrowRight className="w-4 h-4 ml-4 transition-transform group-hover:translate-x-2" />
                  </Button>
               </Link>
            </motion.div>
         </div>
      </section>
    </div>
  );
}
