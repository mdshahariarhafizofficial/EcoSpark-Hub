'use client';

import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { motion } from 'framer-motion';
import { 
  ArrowRight, Leaf, Search, Zap, Droplets, Users, 
  Sparkles, Globe, ShieldCheck, Award, MessageSquare,
  ChevronDown, ArrowUpRight, CheckCircle2, Trees
} from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import Counter from '@/components/common/Counter';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';

export default function Home() {
  const [email, setEmail] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  const { data: featuredIdeas, isLoading } = useQuery({
    queryKey: ['ideas', 'featured', 'v2'], // Forced refetch for new dummy data
    queryFn: () => api.get('/ideas', { params: { limit: 3, sortBy: 'votes' } }).then((res: any) => res.data),
  });

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error('Please enter your email');
      return;
    }
    toast.success('Successfully subscribed to the Green Gazette!');
    setEmail('');
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-100px" },
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as any }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white overflow-hidden text-neutral-900">
      
      {/* 🚀 Hero Section (Light & Fresh) */}
      <section className="relative min-h-[90vh] flex items-center pt-28 pb-20 overflow-hidden bg-neutral-50">
        {/* Abstract Green Gradients */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-br from-primary-100/60 to-transparent rounded-full blur-3xl -mr-48 -mt-48 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-secondary-100/50 to-transparent rounded-full blur-3xl -ml-24 -mb-24 pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 w-full">
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-primary-200 text-primary-700 text-sm font-bold shadow-sm mb-8">
                   <Sparkles className="w-4 h-4 text-secondary-500" /> Defining the Next Green Era
                </div>
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-primary-950 leading-[1.05] tracking-tight mb-8">
                  Spark the <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-secondary-500">
                    Biosphere.
                  </span>
                </h1>
                <p className="text-lg md:text-xl text-primary-900/70 mb-10 leading-relaxed font-medium max-w-xl">
                  Connect with global innovators, validate crucial workflows, and fund technical blueprints that actively shape our collective ecological future.
                </p>
                
                <div className="max-w-lg mb-10 relative group z-20">
                  <div className="absolute -inset-1 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-[1.75rem] blur opacity-25 group-hover:opacity-40 transition duration-500" />
                  <div className="relative flex items-center bg-white p-2 rounded-[1.5rem] border border-neutral-200 shadow-xl shadow-neutral-900/5">
                    <Search className="h-6 w-6 text-neutral-400 ml-4 shrink-0 transition-colors group-focus-within:text-primary-500" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && searchQuery) router.push(`/ideas?search=${encodeURIComponent(searchQuery)}`);
                      }}
                      className="block w-full px-4 py-4 bg-transparent text-neutral-900 placeholder:text-neutral-400 focus:outline-none font-medium text-lg"
                      placeholder="Search protocols, energy, waste..."
                    />
                    <Button 
                      onClick={() => { if (searchQuery) router.push(`/ideas?search=${encodeURIComponent(searchQuery)}`); }}
                      variant="primary" 
                      className="rounded-xl px-8 h-14 shrink-0 shadow-lg shadow-primary-500/30 text-base font-bold relative z-30"
                    >
                      Explore
                    </Button>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                   <Link href="/register">
                      <Button size="lg" className="h-14 px-8 text-lg font-bold w-full sm:w-auto shadow-xl shadow-primary-500/20 rounded-xl">
                         Start Collaborating <ArrowRight className="ml-2 w-5 h-5" />
                      </Button>
                   </Link>
                </div>
              </motion.div>
              
              {/* --- ULTRA-COOL BIOSPHERE VIEWPORT --- */}
              <div className="relative hidden lg:block h-full w-full min-h-[600px] perspective-[1500px]">
                  {/* Floating Eco-Node Particles (Depth Layer) */}
                  <motion.div 
                    animate={{ y: [0, -40, 0], x: [0, 20, 0] }}
                    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-1/4 left-1/4 w-32 h-32 bg-primary-400/10 rounded-full blur-[80px] pointer-events-none"
                  />
                  <motion.div 
                    animate={{ y: [0, 60, 0], x: [0, -30, 0] }}
                    transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-secondary-400/5 rounded-full blur-[100px] pointer-events-none"
                  />

                  {/* Main Viewport Layer */}
                  <motion.div
                     initial={{ opacity: 0, scale: 0.9, rotateY: 15, rotateX: 10 }}
                     animate={{ opacity: 1, scale: 1, rotateY: -10, rotateX: 5 }}
                     transition={{ duration: 1.5, ease: "easeOut" }}
                     whileHover={{ rotateY: -5, rotateX: 2, scale: 1.02 }}
                     className="absolute inset-0 top-12 bottom-12 right-12 left-8 rounded-[3rem] overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.3)] border-[1px] border-white/20 bg-neutral-900 z-10"
                  >
                     <img 
                       src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=1200" 
                       alt="Eco Innovation" 
                       className="w-full h-full object-cover opacity-80 group-hover:scale-110 transition-transform duration-[4000ms]" 
                     />
                     
                     {/* Dynamic Scanning Beam */}
                     <motion.div 
                       animate={{ top: ["-100%", "200%"] }}
                       transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                       className="absolute inset-x-0 h-40 bg-gradient-to-b from-transparent via-primary-500/20 to-transparent pointer-events-none z-20"
                     />
                     <motion.div 
                       animate={{ top: ["-100%", "200%"] }}
                       transition={{ duration: 4, repeat: Infinity, ease: "linear", delay: 0.1 }}
                       className="absolute inset-x-0 h-[1px] bg-primary-400/50 shadow-[0_0_15px_rgba(34,197,94,0.8)] z-20"
                     />

                     {/* Holographic UI Frame */}
                     <div className="absolute inset-4 border border-white/10 rounded-[2.5rem] pointer-events-none z-20">
                        {/* Corner Brackets */}
                        <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-primary-500/60 rounded-tl-2xl" />
                        <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-primary-500/60 rounded-tr-2xl" />
                        <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-primary-500/60 rounded-bl-2xl" />
                        <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-primary-500/60 rounded-br-2xl" />
                        
                        {/* Telemetry Text */}
                        <div className="absolute top-6 left-8 flex flex-col gap-1">
                           <p className="text-[8px] font-black text-primary-400 uppercase tracking-[0.3em]">Sector: Alpha-9</p>
                           <p className="text-[8px] font-bold text-white/40 uppercase tracking-[0.2em]">AQI: 98% Optimal</p>
                        </div>
                        <div className="absolute bottom-6 right-8 text-right">
                           <div className="flex items-center gap-2 justify-end mb-1">
                              <span className="w-1.5 h-1.5 bg-primary-500 rounded-full animate-pulse" />
                              <p className="text-[8px] font-black text-primary-400 uppercase tracking-[0.3em]">Syncing...</p>
                           </div>
                           <p className="text-[8px] font-bold text-white/40 uppercase tracking-[0.2em]">ALT: 1,240m</p>
                        </div>
                     </div>
                  </motion.div>

                  {/* Floating Card 1: Pipeline Stats */}
                  <motion.div
                     initial={{ opacity: 0, y: 50, rotateZ: -5 }}
                     animate={{ opacity: 1, y: 0, rotateZ: -5 }}
                     transition={{ duration: 1.2, delay: 0.5 }}
                     whileHover={{ rotateZ: 0, scale: 1.05 }}
                     className="absolute bottom-16 -left-8 bg-white/10 backdrop-blur-3xl border border-white/20 p-6 rounded-[2rem] shadow-2xl z-20 w-72"
                  >
                     <div className="flex items-center gap-4 mb-5">
                        <div className="w-12 h-12 bg-primary-500 rounded-2xl flex items-center justify-center shadow-lg shadow-primary-500/20">
                           <Zap className="w-6 h-6 text-white" />
                        </div>
                        <div>
                           <p className="text-[10px] font-black text-primary-400 uppercase tracking-widest mb-1">Live Pipeline</p>
                           <p className="text-2xl font-black text-white tracking-tighter leading-none">6.4GW</p>
                        </div>
                     </div>
                     <div className="flex items-end gap-2 h-14 mt-2">
                        {[30, 45, 35, 75, 55, 100].map((h, i) => (
                           <div key={i} className="flex-1 bg-white/5 rounded-t-lg relative group overflow-hidden">
                              <motion.div 
                                animate={{ height: [`${h/2}%`, `${h}%`, `${h/2}%`] }}
                                transition={{ duration: 3 + i, repeat: Infinity, ease: "easeInOut" }}
                                className="absolute bottom-0 w-full bg-gradient-to-t from-primary-600 to-primary-400 rounded-t-lg" 
                              />
                           </div>
                        ))}
                     </div>
                  </motion.div>

                  {/* Floating Card 2: Status */}
                  <motion.div
                     initial={{ opacity: 0, y: -50, rotateZ: 5 }}
                     animate={{ opacity: 1, y: 0, rotateZ: 5 }}
                     transition={{ duration: 1.2, delay: 0.7 }}
                     whileHover={{ rotateZ: 0, scale: 1.05 }}
                     className="absolute top-20 -right-4 bg-white/10 backdrop-blur-3xl border border-white/20 p-4 pr-6 rounded-3xl shadow-2xl z-20 flex items-center gap-4 group cursor-pointer"
                  >
                     <div className="relative">
                        <div className="w-12 h-12 rounded-full border-2 border-primary-500/40 p-0.5">
                           <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop" className="w-full h-full rounded-full object-cover" alt="Avatar" />
                        </div>
                        <div className="absolute -bottom-1 -right-1 bg-primary-500 rounded-full p-[2px] shadow-sm">
                           <CheckCircle2 className="w-4 h-4 text-white" />
                        </div>
                     </div>
                     <div>
                        <p className="text-sm font-black text-white">Dr. Sarah Chen</p>
                        <p className="text-[9px] font-bold text-primary-400 uppercase tracking-[0.15em] mt-0.5">Verified</p>
                     </div>
                  </motion.div>

                  {/* Floating Card 3: Metrics */}
                  <motion.div
                     initial={{ opacity: 0, x: 50 }}
                     animate={{ opacity: 1, x: 0 }}
                     transition={{ duration: 1.2, delay: 0.9 }}
                     whileHover={{ scale: 1.1, rotateZ: 2 }}
                     className="absolute bottom-48 -right-12 bg-neutral-900/90 backdrop-blur-3xl border border-white/10 text-white p-5 rounded-[2.5rem] shadow-2xl z-20"
                  >
                     <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-primary-500/20 rounded-2xl flex items-center justify-center border border-primary-500/20">
                           <Sparkles className="w-5 h-5 text-primary-400" />
                        </div>
                        <div>
                           <p className="text-2xl font-black leading-none numbers-tabular tracking-tighter">98.5%</p>
                           <p className="text-[9px] font-bold text-primary-400 uppercase tracking-[0.2em] mt-1.5 opacity-80">Eco Match</p>
                        </div>
                     </div>
                  </motion.div>
               </div>
            </div>
         </div>
      </section>

      {/* 📊 Impact Stats Section */}
      <section className="relative z-20 -mt-12 mx-4 sm:mx-8 lg:mx-auto max-w-[95%] xl:max-w-[1400px] mb-20">
         <div className="bg-gradient-to-r from-primary-600 to-secondary-600 rounded-[2rem] shadow-2xl shadow-primary-500/30 overflow-hidden relative border border-white/20">
            {/* Abstract Glowing Orbs inside the stat container */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/20 blur-[100px] rounded-full pointer-events-none -mr-40 -mt-40 mix-blend-overlay" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-secondary-900/20 blur-[100px] rounded-full pointer-events-none -ml-20 -mb-20 mix-blend-overlay" />
            
            <div className="grid grid-cols-2 lg:grid-cols-4 divide-y lg:divide-y-0 lg:divide-x divide-white/20 relative z-10 w-full py-4 lg:py-5 px-4 sm:px-8">
               {[
                 { icon: Users, val: 25, label: 'Active Members', suffix: 'k+', prefix: '' },
                 { icon: Leaf, val: 1200, label: 'Projects Live', suffix: '+', prefix: '' },
                 { icon: Droplets, val: 15, label: 'Tons Carbon Offset', suffix: 'M', prefix: '' },
                 { icon: Zap, val: 4.2, label: 'Capital Deployed', suffix: 'M', prefix: '$' },
               ].map((stat, i) => (
                 <motion.div 
                   key={i} 
                   initial={{ opacity: 0, y: 10 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   viewport={{ once: true, margin: "-50px" }}
                   transition={{ duration: 0.4, delay: i * 0.1, type: 'spring', bounce: 0.3 }}
                   className="flex items-center justify-center text-left py-3 px-4 lg:px-6 group gap-4 lg:gap-5"
                 >
                    <div className="w-10 h-10 lg:w-12 lg:h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center shrink-0 border border-white/30 group-hover:scale-110 group-hover:bg-white/30 transition-all duration-300 shadow-sm">
                       <stat.icon className="text-white w-5 h-5 lg:w-6 lg:h-6 drop-shadow-sm" />
                    </div>
                    <div>
                       <div className="text-2xl lg:text-3xl font-extrabold text-white tracking-tighter drop-shadow-sm leading-none mb-1">
                          <Counter value={stat.val} prefix={stat.prefix} suffix={stat.suffix} />
                       </div>
                       <div className="text-[9px] sm:text-[10px] font-bold text-white/90 uppercase tracking-[0.15em] drop-shadow-sm leading-none">{stat.label}</div>
                    </div>
                 </motion.div>
               ))}
            </div>
         </div>
      </section>

      {/* 2. COMMUNITY FAVORITES - FEATURED IDEAS */}
      <section className="py-24 bg-neutral-50 border-t border-neutral-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary-50 text-secondary-700 text-xs font-bold mb-4 uppercase tracking-widest border border-secondary-100">
                <Award className="w-4 h-4" /> Validated Blueprints
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-primary-950 tracking-tight leading-tight">
                Top Trending Frameworks.
              </h2>
            </div>
            <Link href="/ideas">
              <Button variant="outline" className="group font-bold text-neutral-700 border-neutral-300 hover:bg-white bg-white shadow-sm">
                View catalog <ArrowUpRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </Button>
            </Link>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               {[1, 2, 3].map((i) => (
                  <div key={i} className="animate-pulse bg-white border border-neutral-200 rounded-3xl h-[480px] w-full shadow-sm" />
               ))}
            </div>
          ) : (
             <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               {featuredIdeas?.map((idea: any, index: number) => {
                 const fallbacks = [
                   'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?q=80&w=800',
                   'https://images.unsplash.com/photo-1511818966892-d7d671e672a2?q=80&w=800',
                   'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=800',
                   'https://images.unsplash.com/photo-1466611653911-95081537e5b7?q=80&w=800',
                   'https://images.unsplash.com/photo-1433086966358-54859d0ed716?q=80&w=800'
                 ];
                 const fallbackImageUrl = fallbacks[index % fallbacks.length];
                 
                 return (
                 <motion.div key={idea.id} className="cursor-pointer group h-full">
                    <Card className="flex flex-col group card-hover border-neutral-200 overflow-hidden h-full bg-white rounded-3xl">
                      <div className="relative h-60 overflow-hidden bg-neutral-100 shrink-0">
                        {(() => {
                           let firstImage = fallbackImageUrl;
                           if (Array.isArray(idea.images) && idea.images.length > 0 && typeof idea.images[0] === 'string' && idea.images[0].length > 10) {
                              firstImage = idea.images[0];
                           } else if (typeof idea.images === 'string') {
                              try { 
                                const parsed = JSON.parse(idea.images); 
                                if (Array.isArray(parsed) && parsed.length > 0 && typeof parsed[0] === 'string' && parsed[0].length > 10) firstImage = parsed[0];
                              } catch(e) {}
                           }
                           
                           return (
                             <img 
                               src={firstImage} 
                               alt={idea.title} 
                               referrerPolicy="no-referrer" 
                               className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                               onError={(e) => { (e.target as HTMLImageElement).src = fallbackImageUrl; }}
                             />
                           );
                        })()}
                        <div className="absolute top-4 right-4">
                           <Badge className={cn(
                             "font-bold px-3 py-1.5 shadow-md border-none text-sm",
                             idea.isPaid ? "bg-neutral-900 text-white" : "bg-primary-500 text-white"
                           )}>
                              {idea.isPaid ? `$${idea.price}` : 'FREE'}
                           </Badge>
                        </div>
                        <div className="absolute bottom-4 left-4">
                           <Badge variant="secondary" className="bg-white/95 backdrop-blur-md text-neutral-900 border-none font-bold px-3 py-1.5 shadow-sm">
                              {idea.category?.name || 'General'}
                           </Badge>
                        </div>
                      </div>
                      <CardContent className="p-8 flex flex-col flex-grow">
                        <div className="flex items-center gap-3 mb-4">
                           <div className="flex items-center gap-1.5 text-primary-700 bg-primary-50 px-2.5 py-1 rounded-md text-xs font-bold tracking-tight">
                             <ArrowUpRight className="w-4 h-4" /> {idea.voteCount || 0} Votes
                           </div>
                           <div className="text-xs text-neutral-500 font-semibold tracking-tight flex items-center gap-1.5">
                             <MessageSquare className="w-4 h-4" /> {idea._count?.comments || 0}
                           </div>
                        </div>
                        <h3 className="text-2xl font-bold text-neutral-900 mb-3 group-hover:text-primary-600 transition-colors line-clamp-2 leading-tight">
                           {idea.title}
                        </h3>
                        <p className="text-neutral-600 text-base mb-8 line-clamp-3 leading-relaxed">
                           {idea.problemStatement}
                        </p>
                        <div className="mt-auto pt-6 border-t border-neutral-100 flex items-center justify-between">
                           <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-full bg-neutral-100 flex items-center justify-center text-sm font-bold text-neutral-600">
                                 {idea.author?.name?.charAt(0) || 'U'}
                              </div>
                              <span className="text-sm font-bold text-neutral-900">{idea.author?.name || 'Unknown'}</span>
                           </div>
                           <Link href={`/ideas/${idea.id}`}>
                              <Button variant="ghost" size="sm" className="h-10 font-bold text-primary-600 hover:bg-primary-50 group/btn rounded-lg">
                                 View Details <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                              </Button>
                           </Link>
                        </div>
                      </CardContent>
                    </Card>
                 </motion.div>
               )})}
             </div>
          )}
        </div>
      </section>

      {/* 3. HOW IT WORKS */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
           <div className="text-center mb-20 max-w-3xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-black text-primary-950 tracking-tight">Deployment Pipeline.</h2>
              <p className="mt-6 text-xl text-primary-900/60 font-medium leading-relaxed">Transforming a raw spark of inspiration into a fully-funded real-world ecological solution in three stages.</p>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
              <div className="hidden md:block absolute top-[40%] left-[10%] w-[80%] h-0.5 bg-neutral-100 -z-10" />
              
              {[
                { step: '01', title: 'Submit Blueprint', desc: 'Securely publish your ecological or technical architecture for global community review.', icon: MessageSquare },
                { step: '02', title: 'Community Audit', desc: 'Global domain experts validate feasibility through rigorous voting and commenting cycles.', icon: ShieldCheck },
                { step: '03', title: 'Capital Injection', desc: 'Acquire funding instantly through tokenized access or direct blueprint purchases.', icon: Zap },
              ].map((item, i) => (
                <motion.div key={i} {...fadeInUp} transition={{ delay: i * 0.15 }} className="bg-white p-10 rounded-[2.5rem] border border-neutral-100 shadow-xl shadow-neutral-900/5 relative hover:-translate-y-2 transition-transform duration-500 overflow-hidden group">
                   <div className="absolute top-0 right-0 p-8 text-8xl font-black text-neutral-50/50 -rotate-12 transition-transform group-hover:rotate-0">{item.step}</div>
                   <div className="w-16 h-16 bg-primary-50 rounded-2xl flex items-center justify-center mb-8 relative z-10 border border-primary-100">
                      <item.icon className="w-8 h-8 text-primary-600" />
                   </div>
                   <h3 className="text-2xl font-bold text-neutral-900 mb-4 relative z-10">{item.title}</h3>
                   <p className="text-neutral-600 font-medium leading-relaxed relative z-10">{item.desc}</p>
                </motion.div>
              ))}
           </div>
        </div>
      </section>

      {/* 4. WHY CHOOSE ECOSPARK HUB */}
      <section className="py-32 bg-primary-900 relative overflow-hidden">
        {/* Abstract Background pattern */}
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '32px 32px' }}></div>
        <div className="absolute top-0 left-0 w-[800px] h-[800px] bg-primary-600 rounded-full blur-[150px] opacity-30 -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              <div>
                 <Badge className="bg-primary-800 text-primary-100 border-primary-700 mb-8 font-bold px-4 py-1.5 uppercase tracking-widest text-xs">Platform Architecture</Badge>
                 <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight mb-8 leading-[1.1]">
                    Engineered for <br /><span className="text-primary-300">Total Transparency.</span>
                 </h2>
                 <p className="text-primary-100 text-lg md:text-xl font-medium mb-12 leading-relaxed max-w-xl">
                   We built EcoSpark Hub to eliminate the friction between profound ecological ideas and the capital required to build them.
                 </p>
                 <div className="space-y-8">
                    {[
                      { title: 'Cryptographic Integrity', desc: 'All transactions and blueprint accesses are securely logged and verifiably sound.', icon: ShieldCheck },
                      { title: 'Aggressive Capital Allocation', desc: 'Creators instantly retain 95% of proceeds. The highest direct-transfer rate in climate tech.', icon: Zap },
                      { title: 'Meritocratic Discovery', desc: 'The most impactful algorithms and frameworks rise strictly through community consensus.', icon: Globe },
                    ].map((feature, i) => (
                      <motion.div key={i} {...fadeInUp} transition={{ delay: i * 0.1 }} className="flex gap-5">
                         <div className="shrink-0 w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center text-primary-300 shadow-inner">
                            <feature.icon className="w-7 h-7" />
                         </div>
                         <div>
                            <h4 className="text-xl font-bold text-white mb-2">{feature.title}</h4>
                            <p className="text-primary-100/70 text-base font-medium leading-relaxed">{feature.desc}</p>
                         </div>
                      </motion.div>
                    ))}
                 </div>
              </div>
              <div className="relative">
                 <div className="rounded-[2.5rem] overflow-hidden shadow-2xl relative">
                    <img src="https://images.unsplash.com/photo-1454165833222-d1d7448d2188?q=80&w=1200" alt="Tech Hub" className="opacity-80 object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-tr from-primary-900/60 to-transparent" />
                 </div>
                 {/* Decorative stats card over image */}
                 <div className="absolute -bottom-8 -left-8 bg-white p-8 rounded-3xl shadow-2xl border border-neutral-100 hidden md:block w-72">
                    <div className="flex items-center gap-5 mb-5">
                       <Award className="w-12 h-12 text-primary-600" />
                       <div>
                          <p className="text-xs font-bold text-neutral-400 uppercase tracking-widest">Global Rank</p>
                          <p className="text-2xl font-black text-neutral-900">#1 Platform</p>
                       </div>
                    </div>
                    <div className="text-sm text-neutral-600 font-medium bg-neutral-50 p-3 rounded-lg border border-neutral-100">Verified by Open-Climate Association 2026.</div>
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* 5. DISPATCH NOTES (Editorial Section) */}
      <section className="py-24 bg-neutral-50 border-y border-neutral-100/50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
           <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
              <div className="max-w-2xl">
                 <Badge className="bg-primary-100 text-primary-700 border-primary-200 mb-6 font-bold px-3 py-1 uppercase tracking-widest text-[10px]">Technical Journal</Badge>
                 <h2 className="text-4xl md:text-5xl font-black text-primary-950 tracking-tight mb-6">Dispatch Notes.</h2>
                 <p className="text-lg text-primary-900/60 font-medium leading-relaxed">Critical updates, framework tutorials, and structural strategies for sustainable engineering.</p>
              </div>
              <Link href="/blog">
                 <Button variant="outline" size="lg" className="font-bold border-neutral-200 hover:bg-white bg-white shadow-sm">
                   Full Archive <ArrowUpRight className="ml-2 w-4 h-4" />
                 </Button>
              </Link>
           </div>
           
           <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
              {/* Featured Post (8 Cols) */}
              <motion.div 
                {...fadeInUp}
                className="lg:col-span-8 group cursor-pointer"
              >
                <div className="relative aspect-[16/9] rounded-[2.5rem] overflow-hidden shadow-2xl mb-8 border border-white">
                  <img src="https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?q=80&w=1200" alt="Featured Dispatch" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" onError={(e) => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800'; }} />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary-950/80 via-primary-950/20 to-transparent" />
                  <div className="absolute top-6 left-6">
                    <div className="glass px-4 py-2 rounded-full text-xs font-bold text-white uppercase tracking-widest flex items-center gap-2">
                       <span className="w-2 h-2 bg-secondary-400 rounded-full animate-pulse" /> Trending Protocol
                    </div>
                  </div>
                  <div className="absolute bottom-10 left-10 right-10">
                    <div className="flex items-center gap-4 text-primary-100 text-sm font-bold mb-4">
                      <span>March 2026</span>
                      <span className="w-1 h-1 bg-white/30 rounded-full" />
                      <span>8 min read</span>
                    </div>
                    <h3 className="text-3xl md:text-4xl font-black text-white leading-tight mb-4 group-hover:text-primary-300 transition-colors">Decentralized Grid Architecture for High-Density Residential Zones</h3>
                    <p className="text-primary-100/80 font-medium line-clamp-2 max-w-2xl">A technical deep-dive into autonomous peer-to-peer energy redistribution using the latest smart-contract frameworks.</p>
                  </div>
                </div>
              </motion.div>

              {/* Latest Posts (4 Cols) */}
              <div className="lg:col-span-4 space-y-8">
                {[
                  { title: 'Polymers to Protein: Advanced Recyclers', cat: 'Materials', thumb: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=400', read: '5m' },
                  { title: 'Hydro-ponic Automation with IoT', cat: 'AgriTech', thumb: 'https://images.unsplash.com/photo-1585314062340-f1a5a7c9328d?w=400', read: '4m' },
                  { title: 'Funding Economics for Hardware', cat: 'Capital', thumb: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400', read: '6m' },
                ].map((post, i) => (
                  <motion.div 
                    key={i} 
                    {...fadeInUp}
                    transition={{ delay: 0.2 + (i * 0.1) }}
                    className="flex gap-5 group cursor-pointer items-center"
                  >
                    <div className="w-24 h-24 shrink-0 rounded-2xl overflow-hidden border border-neutral-200">
                      <img src={post.thumb} alt={post.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-[10px] font-black text-primary-600 uppercase tracking-widest">{post.cat}</span>
                        <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">{post.read} read</span>
                      </div>
                      <h4 className="text-base font-bold text-primary-950 leading-tight group-hover:text-primary-600 transition-colors line-clamp-2">{post.title}</h4>
                    </div>
                  </motion.div>
                ))}
              </div>
           </div>
        </div>
      </section>

      {/* 6. NEWSLETTER / FINAL CTA COMBINED */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
           <div className="bg-neutral-50 rounded-[3rem] p-10 md:py-16 md:px-12 relative overflow-hidden shadow-inner border border-neutral-100">
              {/* Dynamic Soft Pulse Orb */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-full bg-primary-100/50 blur-[120px] rounded-full pointer-events-none" />
              
              <div className="text-center relative z-10 max-w-3xl mx-auto">
                 <h2 className="text-4xl md:text-5xl font-black text-neutral-950 tracking-tight mb-6 uppercase">
                    Initialize Your Impact.
                 </h2>
                 <p className="text-neutral-600 text-lg font-medium leading-relaxed mb-10">
                    Join 25,000+ engineers, researchers, and capital allocators building the infrastructure for a sustainable earth.
                 </p>
                 <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
                    <Link href="/register">
                       <Button size="lg" variant="primary" className="h-16 px-10 text-lg font-black rounded-2xl shadow-xl shadow-primary-500/20 w-full sm:w-auto">
                          Create Free Account
                       </Button>
                    </Link>
                    <Link href="/ideas">
                       <Button variant="outline" size="lg" className="h-16 px-10 text-lg font-black text-neutral-700 border-neutral-200 bg-white hover:bg-neutral-50 shadow-sm rounded-2xl w-full sm:w-auto">
                          Browse Blueprints
                       </Button>
                    </Link>
                 </div>
                 
                 <div className="mt-12 pt-10 border-t border-neutral-200">
                    <p className="text-sm text-neutral-400 font-bold uppercase tracking-widest mb-6">Or Subscribe to Weekly Dispatch</p>
                    <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
                       <input 
                         type="email" 
                         value={email}
                         onChange={(e) => setEmail(e.target.value)}
                         placeholder="address@company.com" 
                         className="flex-grow h-14 px-6 rounded-xl bg-white border border-neutral-200 focus:border-primary-500 focus:outline-none text-neutral-900 font-medium placeholder:text-neutral-400 shadow-sm transition-colors"
                       />
                       <Button type="submit" variant="primary" className="h-14 px-8 font-bold rounded-xl text-white bg-primary-600 hover:bg-primary-700 border-none shrink-0 w-full sm:w-auto shadow-xl shadow-primary-500/10 transition-all">
                          Subscribe
                       </Button>
                    </form>
                 </div>
              </div>
           </div>
        </div>
      </section>

    </div>
  );
}
