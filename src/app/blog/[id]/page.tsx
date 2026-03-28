'use client';

import { notFound } from 'next/navigation';
import { dummyPosts } from '../data';
import Link from 'next/link';
import { 
  ArrowLeft, Clock, Calendar, Share2, BookmarkPlus, 
  Sparkles, ArrowRight, TrendingUp, ShieldCheck, 
  Layers, Zap, Award 
} from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { motion, useScroll, useSpring } from 'framer-motion';
import { toast } from 'sonner';

import { use } from 'react';

export default function BlogPostPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const post = dummyPosts.find(p => p.id === parseInt(resolvedParams.id));
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  if (!post) {
    notFound();
  }

  return (
    <article className="min-h-screen bg-white">
      {/* 🚀 Reading Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-primary-500 to-secondary-500 z-[100] origin-left shadow-[0_0_10px_rgba(34,197,94,0.5)]"
        style={{ scaleX }}
      />

      {/* Hero Header - Professional Light Style */}
      <header className="relative w-full overflow-hidden bg-neutral-50 pt-32 pb-24 border-b border-neutral-200">
         {/* Abstract Backgrounds */}
         <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-bl from-primary-100/50 to-transparent rounded-full blur-[100px] -mr-48 -mt-48 pointer-events-none" />
         <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-secondary-100/30 to-transparent rounded-full blur-[80px] -ml-24 -mb-24 pointer-events-none" />
         
         <div className="relative z-10 w-full max-w-5xl mx-auto px-6 lg:px-8">
            <motion.div
               initial={{ opacity: 0, x: -20 }}
               animate={{ opacity: 1, x: 0 }}
               transition={{ duration: 0.6 }}
            >
               <Link href="/blog" className="inline-flex items-center text-xs font-black text-neutral-500 hover:text-primary-600 mb-10 transition-colors group uppercase tracking-[0.2em]">
                  <ArrowLeft className="w-4 h-4 mr-3 group-hover:-translate-x-1 transition-transform" />
                  Terminal / Archive
               </Link>
            </motion.div>
            
            <motion.div 
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.8, delay: 0.2 }}
               className="flex flex-wrap items-center gap-6 mb-10"
            >
               <div className="flex items-center gap-2 px-3 py-1 rounded-lg bg-white border border-primary-100 text-primary-700 font-black text-[10px] uppercase tracking-widest shadow-sm">
                  <Layers className="w-3 h-3" /> {post.category}
               </div>
               <div className="flex items-center gap-2 text-neutral-500 text-[10px] font-bold uppercase tracking-widest">
                  <Clock className="w-3.5 h-3.5 text-neutral-400" /> {post.readTime}
               </div>
               <div className="flex items-center gap-2 text-neutral-500 text-[10px] font-bold uppercase tracking-widest">
                  <Calendar className="w-3.5 h-3.5 text-neutral-400" /> {post.date}
               </div>
            </motion.div>

            <motion.h1 
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.8, delay: 0.3 }}
               className="text-4xl md:text-6xl lg:text-7xl font-black text-neutral-900 leading-[1.05] mb-12 tracking-tighter max-w-5xl"
            >
               {post.title}
            </motion.h1>

            <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               transition={{ duration: 1, delay: 0.5 }}
               className="flex items-center justify-between border-t border-neutral-200 pt-10 mt-12 max-w-5xl"
            >
               <div className="flex items-center gap-5">
                  <div className="relative group cursor-help">
                     <div className="w-14 h-14 rounded-2xl bg-white border border-neutral-200 flex items-center justify-center text-primary-600 font-black text-xl shadow-md group-hover:scale-110 transition-transform">
                        {post.author.charAt(0)}
                     </div>
                     <div className="absolute -bottom-1 -right-1 bg-secondary-500 rounded-full p-1 border-2 border-white shadow-sm">
                        <ShieldCheck className="w-3 h-3 text-white" />
                     </div>
                  </div>
                  <div>
                     <p className="text-neutral-900 font-bold text-lg leading-none mb-2">{post.author}</p>
                     <p className="text-neutral-500 text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-2">
                        Validated Protocol Engineer <TrendingUp className="w-3 h-3 text-primary-500" />
                     </p>
                  </div>
               </div>
               
               <div className="hidden sm:flex items-center gap-3">
                  <Button 
                     variant="outline" 
                     onClick={() => { navigator.clipboard.writeText(window.location.href); toast.success('Link copied to clipboard!'); }}
                     className="h-12 px-6 rounded-xl text-neutral-600 border-neutral-200 bg-white hover:bg-neutral-50 hover:text-neutral-900 transition-all font-bold text-xs uppercase tracking-widest shadow-sm"
                  >
                     <Share2 className="w-4 h-4 mr-2" /> Share
                  </Button>
                  <Button 
                     variant="outline" 
                     onClick={() => toast.success('Saved to bookmarks!')}
                     className="h-12 w-12 p-0 flex items-center justify-center rounded-xl text-neutral-600 border-neutral-200 bg-white hover:bg-neutral-50 hover:text-neutral-900 transition-all shadow-sm"
                  >
                     <BookmarkPlus className="w-5 h-5" />
                  </Button>
               </div>
            </motion.div>
         </div>
      </header>

      {/* Viewport Hero Image */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 mt-12 relative z-20 mb-24 perspective-[2000px]">
         <motion.div 
           initial={{ opacity: 0, scale: 0.9, rotateX: 10 }}
           animate={{ opacity: 1, scale: 1, rotateX: 0 }}
           transition={{ duration: 1.2, delay: 0.6 }}
           className="relative aspect-[21/9] rounded-[3rem] overflow-hidden shadow-2xl border border-neutral-100 bg-neutral-100"
         >
            <img 
              src={post.image} 
              alt={post.title} 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[4000ms]"
              onError={(e) => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1200'; }}
            />
         </motion.div>
      </div>

      {/* Content Body */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 pb-32 flex flex-col lg:flex-row gap-16 relative">
         
         {/* 📟 Technical Telemetry Sidebar (Sticky Desktop) */}
         <div className="hidden lg:flex lg:w-72 shrink-0 flex-col gap-8 sticky top-32 self-start">
            {/* Reading Scanner */}
            <div className="bg-neutral-50 border border-neutral-100 rounded-3xl p-6 shadow-sm overflow-hidden relative group">
               <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 bg-neutral-900 rounded-lg flex items-center justify-center">
                     <Zap className="w-4 h-4 text-primary-400 animate-pulse" />
                  </div>
                  <p className="text-[10px] font-black text-neutral-900 uppercase tracking-widest leading-none">Dispatcher Meta</p>
               </div>
               
               <div className="space-y-5">
                  <div className="flex justify-between items-end border-b border-neutral-200/50 pb-3">
                     <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">Status</span>
                     <span className="text-[10px] font-black text-primary-600 uppercase tracking-widest flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 bg-primary-500 rounded-full animate-pulse" /> Active Read
                     </span>
                  </div>
                  <div className="flex justify-between items-end border-b border-neutral-200/50 pb-3">
                     <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">Word Count</span>
                     <span className="text-[10px] font-black text-neutral-900 uppercase tracking-widest">{post.content.split(' ').length} Units</span>
                  </div>
                  <div className="flex justify-between items-end border-b border-neutral-200/50 pb-3">
                     <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">Integrity</span>
                     <span className="text-[10px] font-black text-neutral-900 uppercase tracking-widest">100% Signed</span>
                  </div>
               </div>

               {/* Interaction Buttons Overlay */}
               <div className="flex gap-2 mt-8">
                  <Button 
                     variant="outline" 
                     size="sm" 
                     onClick={() => { navigator.clipboard.writeText(window.location.href); toast.success('Link copied to clipboard!'); }}
                     className="flex-1 rounded-xl h-10 border-neutral-200 hover:bg-white hover:text-primary-600 font-bold transition-all bg-white/50 text-xs shadow-sm"
                  >
                     <Share2 className="w-3.5 h-3.5 mr-2" /> Share
                  </Button>
                  <Button 
                     variant="outline" 
                     size="sm" 
                     onClick={() => toast.success('Saved to bookmarks!')}
                     className="w-10 h-10 px-0 rounded-xl border-neutral-200 hover:bg-white hover:text-primary-600 flex items-center justify-center font-bold transition-all bg-white/50 shadow-sm"
                  >
                     <BookmarkPlus className="w-4 h-4" />
                  </Button>
               </div>
            </div>

            {/* Validation Proof Badge */}
            <div className="bg-primary-950 rounded-3xl p-6 text-white shadow-xl shadow-primary-900/10 border border-primary-500/20">
               <div className="w-10 h-10 bg-primary-500 rounded-xl flex items-center justify-center mb-4">
                  <Award className="w-6 h-6 text-white" />
               </div>
               <p className="text-sm font-bold mb-2">Validated Protocol</p>
               <p className="text-[10px] text-primary-300 font-medium leading-relaxed opacity-80 uppercase tracking-widest">
                  This publication has been audited by the EcoSpark board and verified for technical accuracy.
               </p>
            </div>
         </div>

         {/* Main Content */}
         <div className="flex-1 max-w-4xl mx-auto lg:mx-0">
            <p className="text-xl md:text-2xl text-neutral-600 font-medium leading-relaxed mb-16 italic border-l-4 border-primary-500 pl-8 rounded-r-2xl bg-gradient-to-r from-primary-50/50 to-transparent py-6">
               "{post.excerpt}"
            </p>

            <div className="prose prose-lg md:prose-xl prose-neutral max-w-none text-neutral-700 marker:text-primary-600 selection:bg-primary-200 prose-headings:font-black prose-headings:text-neutral-900 prose-headings:tracking-tight prose-p:font-medium prose-p:leading-relaxed prose-a:text-primary-600 prose-a:font-bold prose-a:no-underline hover:prose-a:underline">
               {post.content.split('\n\n').map((paragraph, idx) => {
                 if (paragraph.startsWith('#')) {
                    const level = paragraph.match(/^#+/)?.[0].length || 2;
                    const text = paragraph.replace(/^#+\s/, '');
                    const Tag = `h${level}` as any;
                    return <Tag key={idx} className="mt-12 mb-6">{text}</Tag>;
                 }
                 return (
                    <p key={idx} className="mb-8">
                       {paragraph}
                    </p>
                 );
               })}
            </div>
               
            <div className="bg-primary-900 rounded-[3rem] p-10 md:p-16 mt-24 flex flex-col items-center text-center shadow-2xl shadow-primary-900/20 relative overflow-hidden group">
               <div className="absolute inset-0 bg-gradient-to-br from-primary-800 to-transparent pointer-events-none" />
               <div className="absolute -top-32 -right-32 w-96 h-96 bg-primary-500/30 rounded-full blur-[100px]" />
               
               <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mb-8 shadow-xl shadow-primary-900/50 group-hover:scale-110 transition-transform">
                  <Sparkles className="w-10 h-10 text-primary-600" />
               </div>
               
               <h3 className="text-3xl md:text-4xl font-black text-white mb-6 tracking-tight leading-tight relative z-10">
                  Inspired to Make <br />an <span className="text-secondary-400">Impact?</span>
               </h3>
               <p className="text-primary-100 mb-10 max-w-md text-lg leading-relaxed font-medium relative z-10">
                  Every major ecological shift starts with a brave community. Turn this inspiration into action by launching your own blueprint today.
               </p>
               <Link href="/dashboard/new" className="relative z-10">
                  <Button variant="primary" size="lg" className="h-16 px-10 text-lg font-black shadow-xl shadow-primary-900/50 hover:bg-white hover:text-primary-900 bg-white text-primary-900 rounded-2xl w-full sm:w-auto">
                     Initialize Project
                  </Button>
               </Link>
            </div>
         </div>
      </div>

      {/* 📚 Technical Context (Related Posts) */}
      <section className="py-24 bg-neutral-50 border-t border-neutral-100">
         <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="flex items-center justify-between mb-12">
               <div>
                  <Badge className="bg-primary-100 text-primary-700 border-primary-200 mb-4 font-bold px-3 py-1 uppercase tracking-widest text-[10px]">Technical Context</Badge>
                  <h2 className="text-3xl font-black text-neutral-900 tracking-tight">Cross-Referenced Dispatch</h2>
               </div>
               <Link href="/blog">
                  <Button variant="outline" className="font-bold border-neutral-200 hover:bg-white bg-white shadow-sm">
                    View Archive <ArrowUpRight className="ml-2 w-4 h-4" />
                  </Button>
               </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               {dummyPosts
                 .filter(p => p.category === post.category && p.id !== post.id)
                 .slice(0, 2)
                 .map((relatedPost) => (
                   <Link key={relatedPost.id} href={`/blog/${relatedPost.id}`} className="group">
                      <div className="bg-white rounded-[2.5rem] border border-neutral-200/60 p-5 flex flex-col sm:flex-row gap-6 hover:shadow-2xl transition-all duration-500">
                         <div className="w-full sm:w-40 h-40 shrink-0 rounded-[2rem] overflow-hidden">
                            <img 
                              src={relatedPost.image} 
                              alt={relatedPost.title} 
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                              onError={(e) => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=400'; }}
                            />
                         </div>
                         <div className="flex flex-col justify-center">
                            <Badge className="w-fit bg-neutral-100 text-neutral-500 border-none mb-3 font-bold text-[9px] uppercase tracking-widest px-2 py-0.5">{relatedPost.category}</Badge>
                            <h4 className="text-xl font-black text-neutral-900 leading-tight mb-2 group-hover:text-primary-600 transition-colors line-clamp-2">{relatedPost.title}</h4>
                            <p className="text-neutral-500 text-sm font-medium line-clamp-1">{relatedPost.excerpt}</p>
                         </div>
                      </div>
                   </Link>
                 ))}
               {/* Quick Fallback if no related posts in same category */}
               {dummyPosts
                 .filter(p => p.category === post.category && p.id !== post.id).length === 0 && 
                 dummyPosts
                    .filter(p => p.id !== post.id)
                    .slice(0, 2)
                    .map((relatedPost) => (
                      <Link key={relatedPost.id} href={`/blog/${relatedPost.id}`} className="group">
                        <div className="bg-white rounded-[2.5rem] border border-neutral-200/60 p-5 flex flex-col sm:flex-row gap-6 hover:shadow-2xl transition-all duration-500">
                           <div className="w-full sm:w-40 h-40 shrink-0 rounded-[2rem] overflow-hidden">
                              <img 
                                src={relatedPost.image} 
                                alt={relatedPost.title} 
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                onError={(e) => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=400'; }}
                              />
                           </div>
                           <div className="flex flex-col justify-center">
                              <Badge className="w-fit bg-neutral-100 text-neutral-500 border-none mb-3 font-bold text-[9px] uppercase tracking-widest px-2 py-0.5">{relatedPost.category}</Badge>
                              <h4 className="text-xl font-black text-neutral-900 leading-tight mb-2 group-hover:text-primary-600 transition-colors line-clamp-2">{relatedPost.title}</h4>
                              <p className="text-neutral-500 text-sm font-medium line-clamp-1">{relatedPost.excerpt}</p>
                           </div>
                        </div>
                      </Link>
                    ))
               }
            </div>
         </div>
      </section>
    </article>
  );
}

function ArrowUpRight(props: any) {
   return (
      <svg
         {...props}
         xmlns="http://www.w3.org/2000/svg"
         width="24"
         height="24"
         viewBox="0 0 24 24"
         fill="none"
         stroke="currentColor"
         strokeWidth="2"
         strokeLinecap="round"
         strokeLinejoin="round"
      >
         <path d="M7 7h10v10" />
         <path d="M7 17 17 7" />
      </svg>
   )
}
