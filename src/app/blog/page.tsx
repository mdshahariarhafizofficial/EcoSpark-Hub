'use client';
import { useState, useMemo } from 'react';
import { dummyPosts } from './data';
import { ArrowRight, ArrowLeft, Search, Sparkles, LayoutGrid } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

const POSTS_PER_PAGE = 6;

export default function BlogPage() {
  const [category, setCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  const filteredPosts = useMemo(() => {
    return dummyPosts.filter(p => {
      const matchCategory = category === 'All' || p.category === category;
      const matchSearch = p.title.toLowerCase().includes(search.toLowerCase()) ||
                          p.excerpt.toLowerCase().includes(search.toLowerCase());
      return matchCategory && matchSearch;
    });
  }, [category, search]);

  const totalPages = Math.max(1, Math.ceil(filteredPosts.length / POSTS_PER_PAGE));
  const startIndex = (page - 1) * POSTS_PER_PAGE;
  const currentPosts = filteredPosts.slice(startIndex, startIndex + POSTS_PER_PAGE);

  return (
    <div className="min-h-screen bg-white pt-20 flex flex-col">
      
      {/* 🚀 Registry Hero - Premium SaaS Light style */}
      <section className="relative py-20 overflow-hidden bg-neutral-50 mb-10 border-b border-neutral-100">
         <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-primary-100/50 to-transparent rounded-full blur-[100px] -mr-48 -mt-48 pointer-events-none" />
         <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-secondary-100/40 to-transparent rounded-full blur-[80px] -ml-24 -mb-24 pointer-events-none" />
         
         <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 text-center">
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex justify-center">
               <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-primary-200 text-primary-700 text-xs font-bold uppercase tracking-widest mb-6 shadow-sm">
                  <Sparkles className="w-4 h-4 text-secondary-500" /> Dispatch Notes
               </div>
            </motion.div>
            <h1 className="text-4xl md:text-6xl font-black text-neutral-900 tracking-tight mb-6 leading-tight max-w-4xl mx-auto">
               The Green <br className="hidden md:block" />
               <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-secondary-500">
                 Gazette.
               </span>
            </h1>
            <p className="text-lg text-neutral-600 font-medium leading-relaxed max-w-2xl mx-auto mb-10">
               Critical updates, framework tutorials, and structural strategies for sustainable engineering. Read insights from global domain experts.
            </p>
         </div>
      </section>

      <div className="flex-grow max-w-7xl mx-auto px-6 lg:px-8 pb-24 w-full">

        {/* Filters */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 mb-12">
           <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 w-full lg:w-auto">
              <button
                 onClick={() => { setCategory('All'); setPage(1); }}
                 className={cn(
                   "px-5 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center gap-2",
                   category === 'All'
                      ? "bg-primary-50 text-primary-700 shadow-sm"
                      : "bg-white text-neutral-500 border border-neutral-200 hover:border-neutral-300 hover:text-neutral-900"
                 )}
              >
                 <LayoutGrid className="w-4 h-4" /> All
              </button>
              {['Energy', 'Waste', 'Agriculture', 'Water', 'Transport', 'Innovation', 'Finance'].map(cat => (
                <button
                   key={cat}
                   onClick={() => { setCategory(cat); setPage(1); }}
                   className={cn(
                     "px-5 py-2.5 rounded-xl text-sm font-bold transition-all",
                     category === cat
                        ? "bg-primary-50 text-primary-700 shadow-sm"
                        : "bg-white text-neutral-500 border border-neutral-200 hover:border-neutral-300 hover:text-neutral-900"
                   )}
                >
                   {cat}
                </button>
              ))}
           </div>
           
           <div className="w-full lg:w-80 shrink-0">
              <div className="relative group">
                 <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 group-focus-within:text-primary-500 transition-colors" />
                 <input
                    type="text"
                    value={search}
                    onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                    placeholder="Search publications..."
                    className="w-full pl-12 pr-4 py-3 bg-white border border-neutral-200 rounded-xl text-sm font-medium text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 shadow-sm transition-all"
                 />
              </div>
           </div>
        </div>

        {/* Article Grid */}
        {currentPosts.length > 0 ? (
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {currentPosts.map(post => (
                <motion.div key={post.id} whileHover={{ y: -4 }}>
                  <Card className="flex flex-col h-full bg-white rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300 group border-neutral-200">
                     <div className="relative h-60 overflow-hidden bg-neutral-100 shrink-0 border-b border-neutral-100">
                         <img
                            src={post.image}
                            alt={post.title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            onError={(e) => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=800'; }}
                            loading="lazy"
                         />
                        <div className="absolute top-4 left-4">
                           <span className="bg-white/95 backdrop-blur-sm text-neutral-900 border border-neutral-200 shadow-sm font-bold text-xs px-3 py-1.5 rounded-lg">
                              {post.category}
                           </span>
                        </div>
                     </div>
                     <CardContent className="p-8 flex flex-col flex-grow bg-white">
                        <Link href={`/blog/${post.id}`} className="group-hover:text-primary-600 transition-colors">
                           <h3 className="text-xl font-bold text-neutral-900 mb-4 line-clamp-2 leading-tight">
                              {post.title}
                           </h3>
                        </Link>
                        <p className="text-neutral-600 text-sm leading-relaxed mb-8 flex-grow line-clamp-3 font-medium">
                           {post.excerpt}
                        </p>
                        
                        <div className="flex items-center justify-between pt-6 border-t border-neutral-100 mt-auto">
                           <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-full bg-primary-50 flex items-center justify-center text-primary-700 font-bold text-sm border border-primary-100">
                                 {post.author.charAt(0)}
                              </div>
                              <div className="flex flex-col">
                                 <span className="text-sm font-bold text-neutral-900">{post.author}</span>
                                 <span className="text-[10px] text-neutral-500 font-bold uppercase tracking-widest mt-0.5">{post.date} · {post.readTime}</span>
                              </div>
                           </div>
                           <Link href={`/blog/${post.id}`}>
                              <Button variant="ghost" size="icon" className="group/btn text-primary-600 bg-primary-50/50 hover:bg-primary-50 rounded-xl h-10 w-10">
                                 <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-0.5 transition-transform" />
                              </Button>
                           </Link>
                        </div>
                     </CardContent>
                  </Card>
                </motion.div>
              ))}
           </div>
        ) : (
           <div className="text-center py-24 bg-neutral-50 rounded-3xl border border-neutral-100 shadow-inner mb-16">
              <div className="w-20 h-20 bg-white shadow-sm rounded-full flex items-center justify-center mx-auto mb-6">
                 <Search className="w-8 h-8 text-neutral-300" />
              </div>
              <h3 className="text-2xl font-black text-neutral-900 mb-3">No publications found</h3>
              <p className="text-base font-medium text-neutral-500 max-w-sm mx-auto">Try adjusting your category or search query.</p>
              <Button variant="outline" onClick={() => { setSearch(''); setCategory('All'); }} className="mt-8 h-12 px-8 font-bold rounded-xl">
                 Clear Filters
              </Button>
           </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
           <div className="flex justify-center items-center gap-2 mt-8">
              <Button
                 variant="ghost"
                 disabled={page === 1}
                 onClick={() => { setPage(page - 1); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                 className="rounded-xl h-12 px-5 font-bold text-neutral-600 hover:bg-neutral-50 border border-transparent hover:border-neutral-200 transition-all"
              >
                 <ArrowLeft className="w-4 h-4 mr-2" /> Previous
              </Button>
              <div className="flex items-center gap-1 mx-2">
                 {Array.from({ length: totalPages }).map((_, i) => (
                    <button
                       key={i + 1}
                       onClick={() => { setPage(i + 1); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                       className={cn(
                          "w-12 h-12 rounded-xl text-sm font-bold transition-all",
                          page === i + 1
                             ? "bg-primary-600 text-white shadow-md shadow-primary-500/20 scale-105"
                             : "bg-white border border-neutral-200 text-neutral-600 hover:bg-neutral-50"
                       )}
                    >
                       {i + 1}
                    </button>
                 ))}
              </div>
              <Button
                 variant="ghost"
                 disabled={page === totalPages}
                 onClick={() => { setPage(page + 1); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                 className="rounded-xl h-12 px-5 font-bold text-neutral-600 hover:bg-neutral-50 border border-transparent hover:border-neutral-200 transition-all"
              >
                 Next <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
           </div>
        )}
      </div>
    </div>
  );
}
