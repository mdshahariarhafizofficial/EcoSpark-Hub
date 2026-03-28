'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, Minus, Search, Globe, Zap, 
  ShieldCheck, Award, MessageCircle, ArrowRight,
  Sparkles, LifeBuoy, Fingerprint, Coins
} from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import Link from 'next/link';

// 📚 FAQ Data Schema
const faqCategories = [
  { id: 'general', name: 'General', icon: Globe },
  { id: 'projects', name: 'Projects', icon: Zap },
  { id: 'funding', name: 'Funding', icon: Coins },
  { id: 'security', name: 'Security', icon: ShieldCheck },
];

const faqs = [
  {
    id: 1,
    category: 'general',
    question: "What is the EcoSpark Hub Biosphere Registry?",
    answer: "The Biosphere Registry is a transparent, immutable ledger of ecological signals and verified sustainability projects. It allows developers, auditors, and investors to track real-world impact through a standardized technical protocol."
  },
  {
    id: 2,
    category: 'general',
    question: "Is it free to use the platform?",
    answer: "Browsing the public registry is completely free. Submitting projects for verification and accessing deep-tier audit data involves a nominal protocol fee that sustains our community of expert ecological auditors."
  },
  {
    id: 3,
    category: 'projects',
    question: "How do I submit my project to the registry?",
    answer: "Simply navigate to your dashboard and select 'Initialize Project'. You will be guided through our technical documentation requirements, including impact scoping, resource mapping, and verification evidence."
  },
  {
    id: 4,
    category: 'projects',
    question: "What are 'Verification Tiers'?",
    answer: "Every project goes through three tiers of verification: 1. AI Signal Detection, 2. Peer Review Audit, and 3. Institutional Board Validation. Higher tiers unlock deeper search visibility and larger institutional funding pools."
  },
  {
    id: 5,
    category: 'funding',
    question: "Who provides the funding for projects?",
    answer: "EcoSpark Hub connects verified projects with a global network of 'Secondary-Tier' capital providers, including impact investors, carbon credit markets, and institutional sustainability boards."
  },
  {
    id: 6,
    category: 'funding',
    question: "Is my investment secure on the platform?",
    answer: "Yes. All financial transactions are handled through verified payment gateways (like Stripe), and project milestones are verified by our audit loops before capital is released to project developers."
  },
  {
    id: 7,
    category: 'security',
    question: "How is my project Intellectual Property (IP) protected?",
    answer: "We use a 'Proof of Innovation' protocol that creates a permanent, timestamped record of your project concept on our registry. While high-level impact metrics are public, your proprietary technical blueprints remain encrypted and only accessible by authorized auditors."
  },
  {
    id: 8,
    category: 'security',
    question: "What happens if a project fails an audit?",
    answer: "Failed audits are not public. Project developers receive detailed 'Diagnostic Feedback' and are invited to refine their technical documentation for a follow-up verification cycle."
  }
];

export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState('general');
  const [searchQuery, setSearchQuery] = useState('');
  const [openId, setOpenId] = useState<number | null>(1);

  const filteredFaqs = faqs.filter(faq => 
    (faq.category === activeCategory || searchQuery !== '') &&
    (faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
     faq.answer.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="bg-white min-h-screen pt-24 font-sans">
      
      {/* 🌌 High-Impact Hero Header */}
      <section className="relative py-24 md:py-32 overflow-hidden bg-white border-b border-neutral-100">
         <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-primary-100/40 to-transparent rounded-full blur-[100px] -mr-48 -mt-48 pointer-events-none" />
         <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-secondary-100/30 to-transparent rounded-full blur-[80px] -ml-24 -mb-24 pointer-events-none" />
         
         <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
            <motion.div 
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               className="flex flex-col items-center"
            >
               <Badge className="bg-primary-50 text-primary-700 border-primary-100 text-[10px] font-black uppercase tracking-[0.3em] px-4 py-2 mb-10 shadow-sm">
                  <LifeBuoy className="w-3.5 h-3.5 mr-2 text-secondary-500" /> Support Protocols
               </Badge>
               
               <h1 className="text-5xl md:text-7xl font-black text-neutral-950 tracking-tighter mb-10 leading-[0.95] uppercase">
                  Frequently Asked <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-secondary-500">
                     Protocols.
                  </span>
               </h1>
               
               <p className="max-w-2xl text-lg text-neutral-600 font-medium leading-relaxed mb-12 tracking-tight">
                  Everything you need to know about the Biosphere Registry, project verification tiers, and institutional funding cycles.
               </p>

               {/* 🔍 Search Interface */}
               <div className="w-full max-w-2xl relative group">
                  <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none">
                     <Search className="w-5 h-5 text-neutral-400 group-focus-within:text-primary-500 transition-colors" />
                  </div>
                  <Input 
                    type="text" 
                    placeholder="Search for a protocol or keyword..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="h-16 pl-16 pr-6 rounded-[1.5rem] border-neutral-200 bg-white shadow-xl shadow-neutral-950/[0.03] focus:ring-primary-500 text-lg font-medium"
                  />
               </div>
            </motion.div>
         </div>
      </section>

      {/* 📂 Categorized Accordion System */}
      <section className="py-24 bg-neutral-50/50">
         <div className="max-w-6xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
               
               {/* Categories Sidebar */}
               <div className="lg:col-span-4 self-start sticky top-32">
                  <div className="space-y-3">
                     {faqCategories.map((category) => (
                        <button
                          key={category.id}
                          onClick={() => { setActiveCategory(category.id); setSearchQuery(''); }}
                          className={`w-full flex items-center justify-between p-5 rounded-[1.5rem] transition-all duration-300 border-2 ${
                            activeCategory === category.id && searchQuery === ''
                              ? 'bg-neutral-950 border-neutral-950 text-white shadow-xl shadow-neutral-950/20'
                              : 'bg-white border-white text-neutral-500 hover:border-neutral-200'
                          }`}
                        >
                           <div className="flex items-center gap-4">
                              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                                activeCategory === category.id && searchQuery === '' ? 'bg-white/10' : 'bg-neutral-50'
                              }`}>
                                 <category.icon className="w-5 h-5" />
                              </div>
                              <span className="font-black uppercase tracking-widest text-xs">{category.name}</span>
                           </div>
                           <ArrowRight className={`w-4 h-4 transition-transform ${
                              activeCategory === category.id && searchQuery === '' ? 'translate-x-0 opacity-100' : '-translate-x-2 opacity-0'
                           }`} />
                        </button>
                     ))}
                  </div>

                  {/* Sidebar Help Card */}
                  <div className="mt-12 p-8 bg-primary-600 rounded-[2.5rem] text-white shadow-2xl shadow-primary-900/10 relative overflow-hidden group">
                     <div className="absolute top-0 right-0 p-6 opacity-30">
                        <MessageCircle className="w-16 h-16 rotate-12 group-hover:rotate-0 transition-transform duration-500" />
                     </div>
                     <p className="text-[10px] font-black uppercase tracking-[0.3em] mb-4 opacity-70">Direct Access</p>
                     <h4 className="text-xl font-black mb-6 leading-tight">Can't find your protocol?</h4>
                     <Link href="/contact">
                        <Button className="w-full bg-white text-primary-700 hover:bg-neutral-50 font-black h-12 rounded-xl text-xs uppercase tracking-widest">
                           Technical Support
                        </Button>
                     </Link>
                  </div>
               </div>

               {/* FAQs List */}
               <div className="lg:col-span-8">
                  <div className="space-y-4">
                     <AnimatePresence mode="popLayout">
                        {filteredFaqs.length > 0 ? (
                           filteredFaqs.map((faq) => (
                              <motion.div
                                key={faq.id}
                                layout
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className={`overflow-hidden rounded-[2rem] border transition-all duration-300 ${
                                  openId === faq.id ? 'bg-white border-primary-500/20 shadow-xl shadow-primary-900/[0.02]' : 'bg-white/50 border-neutral-100 hover:border-neutral-200'
                                }`}
                              >
                                 <button
                                   onClick={() => setOpenId(openId === faq.id ? null : faq.id)}
                                   className="w-full p-8 flex items-center justify-between text-left group"
                                 >
                                    <div className="flex items-center gap-5">
                                       <span className={`text-[10px] font-black transition-colors ${openId === faq.id ? 'text-primary-500' : 'text-neutral-400 group-hover:text-neutral-950'}`}>
                                          F{faq.id.toString().padStart(2, '0')}
                                       </span>
                                       <h3 className={`text-lg md:text-xl font-black tracking-tight leading-tight transition-colors ${openId === faq.id ? 'text-neutral-950' : 'text-neutral-600 group-hover:text-neutral-950'}`}>
                                          {faq.question}
                                       </h3>
                                    </div>
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 border transition-all ${
                                       openId === faq.id ? 'bg-primary-500 border-primary-500 text-white' : 'bg-white border-neutral-100 group-hover:border-neutral-300 text-neutral-400'
                                    }`}>
                                       {openId === faq.id ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                                    </div>
                                 </button>
                                 
                                 <motion.div
                                   initial={false}
                                   animate={{ height: openId === faq.id ? 'auto' : 0 }}
                                   className="overflow-hidden"
                                 >
                                    <div className="p-8 pt-0 text-lg text-neutral-500 font-medium leading-relaxed max-w-2xl border-t border-neutral-50 mt-2">
                                       <div className="pt-6">
                                          {faq.answer}
                                       </div>
                                    </div>
                                 </motion.div>
                              </motion.div>
                           ))
                        ) : (
                           <div className="text-center py-24 bg-white rounded-[3rem] border border-dashed border-neutral-200">
                              <LifeBuoy className="w-16 h-16 text-neutral-300 mx-auto mb-6" />
                              <h3 className="text-xl font-black text-neutral-900 uppercase">No Protocols Found</h3>
                              <p className="text-neutral-500 font-bold mt-2">Try adjusting your search criteria or category.</p>
                           </div>
                        )}
                     </AnimatePresence>
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* 🤝 Still Have Questions CTA */}
      <section className="py-24 bg-white overflow-hidden relative">
         <div className="max-w-7xl mx-auto px-6">
            <div className="bg-neutral-50 rounded-[3rem] p-12 md:p-24 text-center relative overflow-hidden group border border-neutral-100 shadow-inner">
               {/* Dynamic Pulse Orb */}
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-full bg-primary-100/50 blur-[120px] rounded-full pointer-events-none" />
               
               <motion.div
                 initial={{ opacity: 0, scale: 0.9 }}
                 whileInView={{ opacity: 1, scale: 1 }}
                 transition={{ duration: 0.8 }}
                 viewport={{ once: true }}
                 className="relative z-10"
               >
                  <div className="w-20 h-20 bg-white rounded-[2.5rem] border border-neutral-200 flex items-center justify-center mx-auto mb-8 shadow-xl shadow-neutral-950/5 hover:rotate-12 transition-transform duration-500">
                     <Fingerprint className="w-10 h-10 text-primary-500" />
                  </div>
                  <h2 className="text-4xl md:text-6xl font-black text-neutral-950 tracking-tighter mb-8 leading-none uppercase">Need Technical <br /> <span className="text-primary-600">Resolution?</span></h2>
                  <p className="max-w-xl mx-auto text-lg text-neutral-600 font-medium mb-12 tracking-tight">
                     For complex architectural queries or institutional data access, please reach out directly to our protocol engineering team.
                  </p>
                  <Link href="/contact">
                     <Button variant="primary" size="lg" className="h-20 px-12 rounded-3xl text-[10px] font-black uppercase tracking-[0.3em] shadow-2xl shadow-primary-500/20 group">
                        Initialize Support Chain <ArrowRight className="w-4 h-4 ml-4 transition-transform group-hover:translate-x-2" />
                     </Button>
                  </Link>
               </motion.div>
            </div>
         </div>
      </section>
    </div>
  );
}
