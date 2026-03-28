'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { Search, Zap, Leaf, RotateCcw, ArrowRight, ChevronLeft, ChevronRight, Sparkles, SlidersHorizontal, LayoutGrid, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { IdeaCardSkeleton } from '@/components/common/Skeleton';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';

export default function AllIdeas() {
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState('');
  const [sortBy, setSortBy] = useState('recent');
  const [isPaid, setIsPaid] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [appliedSearch, setAppliedSearch] = useState('');

  const { data: categories } = useQuery({
    queryKey: ['categories'],
    queryFn: () => api.get('/categories').then(res => res.data),
  });

  const { data, isLoading } = useQuery({
    queryKey: ['ideas', 'all', page, appliedSearch, category, sortBy, isPaid],
    queryFn: () => api.get('/ideas', {
      params: { page, limit: 9, search: appliedSearch, categoryId: category, sortBy, isPaid }
    }).then(res => res as any),
  });

  const ideas = data?.data || [];
  const meta = data?.meta || { pages: 1 };

  return (
    <div className="min-h-screen bg-white flex flex-col pt-20">
      
      {/* 🚀 Registry Hero - Premium SaaS Light style */}
      <section className="relative py-20 overflow-hidden bg-neutral-50 mb-10 border-b border-neutral-100">
         <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-primary-100/50 to-transparent rounded-full blur-[100px] -mr-48 -mt-48 pointer-events-none" />
         <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-secondary-100/40 to-transparent rounded-full blur-[80px] -ml-24 -mb-24 pointer-events-none" />
         
         <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
            <div className="max-w-4xl">
               <motion.div 
                 initial={{ opacity: 0, y: 10 }}
                 animate={{ opacity: 1, y: 0 }}
                 className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-primary-200 text-primary-700 text-xs font-bold uppercase tracking-widest mb-6 shadow-sm"
               >
                  <Sparkles className="w-4 h-4 text-secondary-500" /> Protocol Directory
               </motion.div>
               <h1 className="text-4xl md:text-6xl font-black text-neutral-900 tracking-tight mb-6 leading-tight">
                 Explore the <br className="hidden md:block" />
                 <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-secondary-500">
                   Biosphere.
                 </span>
               </h1>
               <p className="text-lg text-neutral-600 font-medium leading-relaxed max-w-2xl mb-12">
                 Discover, filter, and analyze validated sustainability protocols engineered to scale environmental impact across global domains.
               </p>

               <div className="relative max-w-2xl group flex flex-col sm:flex-row gap-4">
                  <div className="relative flex-1 group">
                    <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                       <Search className="h-5 w-5 text-neutral-400 group-focus-within:text-primary-500 transition-colors" />
                    </div>
                    <form 
                      onSubmit={(e) => { 
                        e.preventDefault(); 
                        setAppliedSearch(searchInput); 
                        setPage(1); 
                      }}
                      className="w-full"
                    >
                      <input
                        type="text"
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                        placeholder="Search frameworks..."
                        className="block w-full pl-14 pr-6 py-4 bg-white shadow-xl shadow-neutral-900/5 border border-neutral-200 rounded-2xl text-base font-medium text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 transition-all"
                      />
                    </form>
                  </div>
                  <Button 
                    variant="outline" 
                    className="lg:hidden h-14 px-6 rounded-2xl bg-white border-neutral-200 shadow-sm flex items-center gap-2 font-bold text-sm text-neutral-700 focus:ring-primary-500/10"
                    onClick={() => setIsFilterOpen(!isFilterOpen)}
                  >
                    <SlidersHorizontal className="w-4 h-4" /> 
                    {isFilterOpen ? 'Close Filters' : 'Filters'}
                  </Button>
               </div>
            </div>
         </div>
      </section>

      <div className="flex-grow max-w-7xl mx-auto px-6 lg:px-8 pb-20 w-full flex flex-col lg:flex-row gap-12">
        
        {/* Sidebar / Filters */}
        <div className={cn(
          "lg:w-72 shrink-0 transition-all duration-300 overflow-hidden lg:overflow-visible",
          isFilterOpen ? "max-h-[1000px] opacity-100 mb-8 lg:mb-0" : "max-h-0 lg:max-h-none opacity-0 lg:opacity-100"
        )}>
          <div className="sticky top-28 space-y-8 bg-neutral-50/50 lg:bg-transparent p-6 lg:p-0 rounded-2xl border border-neutral-100 lg:border-none">
            <div className="flex items-center justify-between pb-4 border-b border-neutral-100">
               <h2 className="text-xs font-black text-neutral-900 uppercase tracking-widest flex items-center gap-2">
                 <SlidersHorizontal className="w-4 h-4 text-primary-600" /> Controls
               </h2>
               { (category || isPaid || sortBy !== 'recent' || appliedSearch) && (
                 <button 
                   onClick={() => { setCategory(''); setIsPaid(''); setSortBy('recent'); setSearchInput(''); setAppliedSearch(''); }}
                   className="text-xs font-bold text-neutral-500 hover:text-neutral-900 transition-colors"
                 >
                   Reset All
                 </button>
               )}
            </div>
            
            <div className="space-y-8">
               {/* Sort Select */}
               <div className="space-y-3">
                  <h3 className="text-[11px] font-bold text-neutral-500 uppercase tracking-widest">Sort By</h3>
                  <div className="flex flex-col gap-2">
                     {[
                       { id: 'recent', label: 'Latest Submissions' },
                       { id: 'votes', label: 'Most Voted' },
                       { id: 'comments', label: 'Most Discussed' },
                     ].map((opt) => (
                        <button
                          key={opt.id}
                          onClick={() => setSortBy(opt.id)}
                          className={cn(
                            "w-full text-left px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors",
                            sortBy === opt.id ? "bg-primary-50 text-primary-700" : "text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900"
                          )}
                        >
                          {opt.label}
                        </button>
                     ))}
                  </div>
               </div>

               {/* Categories */}
               <div className="space-y-3">
                  <h3 className="text-[11px] font-bold text-neutral-500 uppercase tracking-widest">Categories</h3>
                  <div className="flex flex-col gap-1.5">
                     <button
                       onClick={() => { setCategory(''); setPage(1); }}
                       className={cn(
                         "w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors",
                         category === '' ? "bg-primary-50 text-primary-700" : "text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900"
                       )}
                     >
                       <span className="flex items-center gap-2.5">
                          <LayoutGrid className="w-4 h-4 opacity-70" />
                          View All
                       </span>
                     </button>
                     {categories?.map((c: any) => (
                       <button
                         key={c.id}
                         onClick={() => { setCategory(c.id); setPage(1); }}
                         className={cn(
                           "w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors group",
                           category === c.id ? "bg-primary-50 text-primary-700" : "text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900"
                         )}
                       >
                         <span className="flex items-center gap-2.5">
                            <Leaf className="w-4 h-4 opacity-70" />
                            {c.name}
                         </span>
                         <span className={cn(
                           "text-xs font-bold px-2 py-0.5 rounded-md flex-shrink-0",
                           category === c.id ? "bg-primary-100 text-primary-700" : "bg-neutral-200/50 text-neutral-500"
                         )}>
                           {c._count.ideas}
                         </span>
                       </button>
                     ))}
                  </div>
               </div>

               {/* Access Tiers */}
               <div className="space-y-3">
                  <h3 className="text-[11px] font-bold text-neutral-500 uppercase tracking-widest">Pricing</h3>
                  <div className="grid grid-cols-2 lg:grid-cols-1 gap-2">
                     {[
                       { id: '', label: 'All Models' },
                       { id: 'false', label: 'Free Open-Source' },
                       { id: 'true', label: 'Paid Blueprints' },
                     ].map((tier) => (
                       <button
                         key={tier.id}
                         onClick={() => setIsPaid(tier.id)}
                         className={cn(
                           "flex items-center justify-center lg:justify-start gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold border transition-all",
                           isPaid === tier.id 
                             ? "bg-neutral-900 text-white border-neutral-900 shadow-md" 
                             : "bg-white text-neutral-600 border-neutral-200 hover:border-neutral-300 hover:bg-neutral-50"
                         )}
                       >
                         {tier.label}
                       </button>
                     ))}
                  </div>
               </div>
            </div>
            
            <Button 
               className="w-full h-12 lg:hidden rounded-xl mt-6 font-bold bg-neutral-900 text-white"
               onClick={() => setIsFilterOpen(false)}
            >
               Apply Filters
            </Button>
          </div>
        </div>

        {/* Ideas Grid */}
        <div className="flex-1">
          {isLoading ? (
             <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
               {[1,2,3,4,5,6].map((i) => (
                 <IdeaCardSkeleton key={i} />
               ))}
             </div>
          ) : ideas.length === 0 ? (
             <div className="bg-white rounded-[2rem] border border-neutral-100 p-16 text-center shadow-xl shadow-neutral-900/5 flex flex-col items-center justify-center h-full min-h-[400px]">
                <div className="w-20 h-20 bg-neutral-50 rounded-full flex items-center justify-center mb-6">
                   <Search className="w-8 h-8 text-neutral-300" />
                </div>
                <h3 className="text-2xl font-black text-neutral-900 mb-3">No Results Found</h3>
                <p className="text-neutral-500 font-medium max-w-sm mb-8">We couldn't find any projects matching your current filters. Try adjusting your search criteria.</p>
                <Button 
                   variant="outline"
                   className="h-12 px-8 rounded-xl font-bold"
                   onClick={() => { setSearchInput(''); setAppliedSearch(''); setCategory(''); setIsPaid(''); setSortBy('recent'); }} 
                >
                   Clear All Filters
                </Button>
             </div>
          ) : (
             <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                   {ideas.map((idea: any) => (
                        <Card key={idea.id} className="flex flex-col group card-hover cursor-pointer border-neutral-200 overflow-hidden h-full rounded-2xl bg-white relative">
                           <div className="relative h-48 overflow-hidden bg-neutral-100 shrink-0 border-b border-neutral-100">
                              {idea.images?.[0] ? (
                                 <img 
                                   src={idea.images[0]} 
                                   alt={idea.title} 
                                   className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                                   loading="lazy"
                                   onError={(e) => { 
                                       const fallbacks = [
                                          'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?q=80&w=800',
                                          'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=800',
                                          'https://images.unsplash.com/photo-1501854140801-50d01698950b?q=80&w=800'
                                       ];
                                       const random = Math.floor(Math.random() * fallbacks.length);
                                       (e.target as HTMLImageElement).src = fallbacks[random];
                                    }}
                                 />
                              ) : (
                                 <div className="w-full h-full flex items-center justify-center bg-neutral-50">
                                   <Leaf className="w-10 h-10 text-neutral-200" />
                                 </div>
                              )}
                              
                              <div className="absolute top-3 right-3 flex flex-col gap-2 items-end">
                                 {idea.isPaid ? (
                                    <Badge className="bg-neutral-900 text-white font-bold px-2.5 py-1 shadow-md border-none">
                                       ${idea.price}
                                    </Badge>
                                 ) : (
                                    <Badge className="bg-primary-500 text-white font-bold px-2.5 py-1 shadow-md border-none">
                                       FREE
                                    </Badge>
                                 )}
                              </div>
                              <div className="absolute top-3 left-3">
                                 <Badge className="bg-white/95 backdrop-blur-sm text-neutral-900 border border-neutral-200 shadow-sm font-semibold">
                                    {idea.category?.name || 'General'}
                                 </Badge>
                              </div>
                           </div>
                           
                           <CardContent className="p-5 flex flex-col flex-grow">
                              <Link href={`/ideas/${idea.id}`} className="group-hover:text-primary-600 transition-colors block mb-1.5">
                                <h3 className="text-lg font-bold text-neutral-900 line-clamp-2 leading-tight">{idea.title}</h3>
                              </Link>
                              
                              <div className="flex items-center gap-3 mb-3">
                                 <div className="flex items-center gap-1.5 text-neutral-500 text-[10px] font-bold bg-neutral-50 px-2 py-0.5 rounded-md uppercase tracking-wider">
                                   <TrendingUp className="w-3 h-3 text-primary-500" /> {idea.voteCount} Votes
                                 </div>
                                 <div className="text-[10px] text-neutral-400 font-bold flex items-center gap-1.5 uppercase tracking-wider">
                                   {idea._count?.comments || 0} Comments
                                 </div>
                              </div>
                              
                              <p className="text-neutral-600 text-[13px] flex-grow line-clamp-2 leading-relaxed">
                                 {idea.problemStatement}
                               </p>
                               
                               <div className="mt-4 pt-3 border-t border-neutral-100 flex items-center justify-between">
                                  <div className="flex items-center gap-2.5">
                                     <div className="w-7 h-7 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center text-[10px] font-black overflow-hidden">
                                       {idea.author?.avatar ? (
                                         <img src={idea.author.avatar} alt="Avatar" className="w-full h-full object-cover" />
                                       ) : (
                                         idea.author?.name?.charAt(0) || 'U'
                                       )}
                                     </div>
                                     <div className="text-xs font-bold text-neutral-900 truncate max-w-[100px]">{idea.author?.name || 'Unknown'}</div>
                                  </div>
                                  <Link
                                    href={`/ideas/${idea.id}`}
                                  >
                                    <Button variant="ghost" size="sm" className="h-10 md:h-11 px-4 md:px-6 font-black text-primary-600 hover:bg-primary-50 bg-primary-50/50 text-[11px] uppercase tracking-widest rounded-xl transition-all hover:gap-3 group/btn">
                                      View <ArrowRight className="w-4 h-4 ml-1 group-hover/btn:translate-x-1 transition-transform" />
                                    </Button>
                                  </Link>
                               </div>
                           </CardContent>
                        </Card>
                     ))}
                  </div>

                  {/* Pagination */}
                  {meta.pages > 1 && (
                     <div className="mt-16 flex justify-between items-center bg-neutral-50 p-2 rounded-2xl border border-neutral-100">
                        <Button
                           variant="ghost"
                           disabled={page === 1}
                           onClick={() => { setPage(page - 1); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                           className="font-semibold text-neutral-600 hover:bg-white hover:shadow-sm"
                        >
                           <ChevronLeft className="w-4 h-4 mr-2" /> Previous
                        </Button>
                        
                        <div className="flex items-center gap-1">
                           {Array.from({ length: meta.pages }).map((_, i) => {
                              const p = i + 1;
                              if (p === 1 || p === meta.pages || Math.abs(p - page) <= 1) {
                                 return (
                                    <button
                                       key={p}
                                       onClick={() => { setPage(p); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                                       className={cn(
                                          "w-10 h-10 rounded-xl text-sm font-bold transition-all",
                                          page === p 
                                             ? "bg-primary-600 text-white shadow-md shadow-primary-500/20" 
                                             : "text-neutral-500 hover:bg-neutral-200/50"
                                       )}
                                    >
                                       {p}
                                    </button>
                                 );
                              }
                              if (p === 2 || p === meta.pages - 1) {
                                 return <span key={p} className="w-8 text-center text-neutral-400 font-bold">...</span>;
                              }
                              return null;
                           })}
                        </div>

                        <Button
                           variant="ghost"
                           disabled={page === meta.pages}
                           onClick={() => { setPage(page + 1); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                           className="font-semibold text-neutral-600 hover:bg-white hover:shadow-sm"
                        >
                           Next <ChevronRight className="w-4 h-4 ml-2" />
                        </Button>
                     </div>
                  )}
               </>
          )}
        </div>
      </div>
    </div>
  );
}
