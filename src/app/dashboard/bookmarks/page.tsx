'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { toast } from 'sonner';
import { 
  Bookmark, ArrowUpRight, Search, 
  ExternalLink, Leaf, Sparkles, Trash2
} from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Spinner } from '@/components/ui/Spinner';

export default function BookmarksPage() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data: myBookmarks, isLoading: bookmarksLoading } = useQuery({
    queryKey: ['myBookmarks'],
    queryFn: () => api.get('/ideas/bookmarks').then(res => res.data),
    enabled: !!user,
  });

  const removeBookmarkMutation = useMutation({
    mutationFn: (ideaId: string) => api.post(`/ideas/${ideaId}/bookmark`),
    onSuccess: (res: any) => {
      queryClient.invalidateQueries({ queryKey: ['myBookmarks'] });
      toast.success('Bookmark removed.');
    },
    onError: (err: any) => toast.error('Error removing bookmark: ' + err.message),
  });

  if (bookmarksLoading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
         <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-5 duration-700">
      {/* 📒 Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-neutral-100 pb-10">
        <div className="space-y-4">
          <Badge className="bg-purple-50 text-purple-700 border-none text-[9px] font-black uppercase tracking-[0.3em] px-4 py-2">
             Research & Discovery
          </Badge>
          <h1 className="text-4xl lg:text-5xl font-black text-neutral-950 tracking-tighter">
            Saved <br /> <span className="text-primary-600">Protocols.</span>
          </h1>
          <p className="text-neutral-500 font-medium max-w-xl text-lg leading-relaxed">
            Manage your high-tier ecological bookmarks and track innovation blueprints for future institutional investment.
          </p>
        </div>
        <div className="flex items-center gap-4 bg-white p-6 rounded-[2rem] border border-neutral-100 shadow-xl shadow-neutral-900/[0.02]">
           <div className="w-12 h-12 bg-purple-50 rounded-2xl flex items-center justify-center text-purple-600 shadow-inner">
              <Sparkles className="w-6 h-6" />
           </div>
           <div>
              <p className="text-[10px] font-black text-neutral-400 uppercase tracking-widest">Saved Items</p>
              <p className="text-2xl font-black text-neutral-950">{myBookmarks?.length || 0}</p>
           </div>
        </div>
      </div>

      {/* 🧬 Bookmarks Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
         {myBookmarks?.length === 0 ? (
            <div className="lg:col-span-3 py-32 flex flex-col items-center justify-center text-center px-6 bg-white rounded-[3rem] border border-dashed border-neutral-200">
               <div className="w-20 h-20 bg-neutral-50 rounded-[2rem] flex items-center justify-center mb-6 text-neutral-200">
                  <Bookmark className="w-10 h-10" />
               </div>
               <h3 className="text-xl font-black text-neutral-900 tracking-tight">Archive Empty</h3>
               <p className="text-neutral-500 font-medium max-w-xs mt-2">Explore the marketplace and secure blueprints to your personal archive.</p>
               <Link href="/marketplace" className="mt-8">
                  <Button variant="primary" className="h-14 px-10 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl shadow-primary-500/20">Explore Marketplace</Button>
               </Link>
            </div>
         ) : (
            myBookmarks?.map((bookmark: any) => (
               <Card key={bookmark.id} className="group hover:shadow-2xl transition-all duration-500 border-neutral-100 bg-white overflow-hidden rounded-[2.5rem] relative">
                  <CardContent className="p-8">
                     <div className="flex justify-between items-start mb-8">
                        <div className="w-14 h-14 bg-purple-50 rounded-2xl flex items-center justify-center text-purple-600 shadow-inner group-hover:rotate-12 transition-transform">
                           <Bookmark className="w-7 h-7 fill-current" />
                        </div>
                        <div className="flex gap-2">
                           <Button 
                              variant="outline" 
                              size="icon" 
                              onClick={() => removeBookmarkMutation.mutate(bookmark.id)}
                              disabled={removeBookmarkMutation.isPending}
                              title="Remove Bookmark"
                              className="h-12 w-12 rounded-full border-neutral-100 group/remove hover:bg-red-50 hover:border-red-200 transition-colors"
                           >
                              <Trash2 className="w-5 h-5 text-neutral-400 group-hover/remove:text-red-500" />
                           </Button>
                           <Link href={`/ideas/${bookmark.id}`}>
                              <Button variant="outline" size="icon" className="h-12 w-12 rounded-full border-neutral-100 hover:bg-neutral-50 hover:border-primary-200 transition-colors">
                                 <ArrowUpRight className="w-5 h-5 text-neutral-400 group-hover:text-primary-600" />
                              </Button>
                           </Link>
                        </div>
                     </div>
                     
                     <div className="space-y-4">
                        <Badge className="bg-neutral-900 text-white font-black text-[9px] uppercase tracking-widest border-none px-3 py-1">
                           Innovation Blueprint
                        </Badge>
                        <h4 className="text-xl font-black text-neutral-900 tracking-tight group-hover:text-primary-600 transition-colors uppercase leading-tight line-clamp-2 min-h-[3rem]">
                           {bookmark.title}
                        </h4>
                        
                        <div className="pt-4 flex items-center justify-between border-t border-neutral-50">
                           <div className="flex items-center gap-2">
                              <div className="w-8 h-8 rounded-full bg-neutral-100 flex items-center justify-center text-[10px] font-bold text-neutral-500">
                                 {bookmark.author.name.charAt(0)}
                              </div>
                              <span className="text-[10px] font-black text-neutral-400 uppercase tracking-widest truncate max-w-[100px]">{bookmark.author.name}</span>
                           </div>
                           <Link href={`/ideas/${bookmark.id}`} className="text-[10px] font-black text-primary-600 uppercase tracking-widest hover:underline">
                              Registry Profile
                           </Link>
                        </div>
                     </div>
                  </CardContent>
               </Card>
            ))
         )}
      </div>

      <div className="bg-neutral-950 p-12 rounded-[4rem] text-white relative overflow-hidden mt-12 shadow-2xl shadow-neutral-950/20">
         <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
         <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
            <div className="max-w-2xl space-y-6">
               <h3 className="text-4xl lg:text-5xl font-black tracking-tighter uppercase leading-none">Global <br /> <span className="text-primary-500">Innovation</span> Index.</h3>
               <p className="text-white/50 text-lg font-medium">Your bookmarked protocols are part of the global ecological telemetry network. Monitor their success trajectory in the pulse feed.</p>
               <Link href="/pulse">
                  <Button variant="outline" className="h-14 px-10 border-white/10 bg-white/5 hover:bg-white/10 text-white font-black text-[10px] uppercase tracking-widest rounded-2xl">
                     View Technical Pulse
                  </Button>
               </Link>
            </div>
            <div className="w-48 h-48 bg-primary-600/10 rounded-full border border-primary-500/20 flex items-center justify-center animate-pulse">
               <Leaf className="w-24 h-24 text-primary-500" />
            </div>
         </div>
      </div>
    </div>
  );
}
