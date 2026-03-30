'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { useState } from 'react';
import { toast } from 'sonner';
import { 
  Plus, Edit, Trash2, Search, Briefcase, 
  ArrowUpRight, ExternalLink, Leaf, AlertCircle, ShieldCheck
} from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { cn, formatDate } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Spinner } from '@/components/ui/Spinner';
import ConfirmModal from '@/components/common/ConfirmModal';

export default function RegistryPage() {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const { data: myIdeas, isLoading: ideasLoading } = useQuery({
    queryKey: ['myIdeas'],
    queryFn: () => api.get('/ideas/dashboard').then(res => res.data),
    enabled: !!user,
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => api.delete(`/ideas/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['myIdeas'] });
      queryClient.invalidateQueries({ queryKey: ['ideas'] });
      toast.success('Protocol terminated from registry.');
      setDeleteId(null);
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to terminate protocol.');
      setDeleteId(null);
    },
  });
  
  const submitMutation = useMutation({
    mutationFn: (id: string) => api.post(`/ideas/${id}/submit`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['myIdeas'] });
      queryClient.invalidateQueries({ queryKey: ['ideas'] });
      toast.success('Protocol submitted for biosphere audit.');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Submission failed.');
    },
  });

  const filteredIdeas = myIdeas?.filter((idea: any) => 
    idea.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (ideasLoading) {
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
          <Badge className="bg-neutral-900 text-white border-none text-[9px] font-black uppercase tracking-[0.3em] px-4 py-2">
             Personal Registry
          </Badge>
          <h1 className="text-4xl lg:text-5xl font-black text-neutral-950 tracking-tighter">
            Innovation <br /> <span className="text-primary-600">Inventory.</span>
          </h1>
          <p className="text-neutral-500 font-medium max-w-xl text-lg leading-relaxed">
            Manage your high-tier ecological blueprints and monitor their progression through the biosphere audit flow.
          </p>
        </div>
        <Link href="/dashboard/new">
           <Button variant="primary" size="lg" className="h-16 px-10 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-2xl shadow-primary-500/20">
             <Plus className="w-4 h-4 mr-2" /> Launch New Spark
           </Button>
        </Link>
      </div>

      {/* 🔎 Search & Toolset */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
         <div className="relative group w-full sm:max-w-md">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
               <Search className="h-4 w-4 text-neutral-300 group-focus-within:text-primary-500 transition-colors" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full pl-11 pr-5 py-4 bg-white border border-neutral-200 rounded-2xl text-sm font-bold transition-all focus:outline-none focus:ring-4 focus:ring-primary-500/10 focus:border-primary-200 placeholder:text-neutral-300 shadow-sm"
              placeholder="Filter by Protocol Name..."
            />
         </div>
      </div>

      {/* 🧬 Registry Grid */}
      <div className="bg-white rounded-[2.5rem] border border-neutral-100 overflow-hidden shadow-xl shadow-neutral-950/[0.02]">
         <div className="divide-y divide-neutral-50">
            {filteredIdeas?.length === 0 ? (
               <div className="py-32 flex flex-col items-center justify-center text-center px-6">
                  <div className="w-20 h-20 bg-neutral-50 rounded-[2rem] flex items-center justify-center mb-6 text-neutral-200 rotate-12">
                     <Leaf className="w-10 h-10" />
                  </div>
                  <h3 className="text-xl font-black text-neutral-900 tracking-tight">No Active Protocols</h3>
                  <p className="text-neutral-500 font-medium max-w-xs mt-2">Initialize your first innovation spark to begin contributing to the registry.</p>
               </div>
            ) : (
               filteredIdeas?.map((idea: any) => (
                  <div key={idea.id} className="p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-10 hover:bg-neutral-50/50 transition-colors group">
                     <div className="flex-1 space-y-4">
                        <div className="flex items-center gap-3">
                           <Badge className={cn(
                              "px-3 py-1 rounded-lg font-black text-[9px] uppercase tracking-[0.15em] border-none shadow-sm",
                              idea.status === 'APPROVED' ? 'bg-primary-50 text-primary-600' : 'bg-secondary-50 text-secondary-600'
                           )}>
                              {idea.status.replace('_', ' ')}
                           </Badge>
                           <span className="text-[10px] font-black text-neutral-300 uppercase tracking-widest">{formatDate(idea.createdAt)}</span>
                        </div>
                        <h3 className="text-2xl font-black text-neutral-950 group-hover:text-primary-600 transition-colors tracking-tight uppercase leading-none">{idea.title}</h3>
                        
                        {/* 🧬 Audit Pulse visualization */}
                        <div className="flex items-center gap-2 max-w-xs py-2">
                           <div className={cn("h-1.5 flex-1 rounded-full transition-all", idea.status !== 'DRAFT' ? 'bg-primary-500 shadow-[0_0_10px_rgba(34,197,94,0.3)]' : 'bg-neutral-100')} />
                           <div className={cn("h-1.5 flex-1 rounded-full transition-all", idea.status === 'APPROVED' || idea.status === 'UNDER_REVIEW' ? 'bg-primary-500 shadow-[0_0_10px_rgba(34,197,94,0.3)]' : 'bg-neutral-100')} />
                           <div className={cn("h-1.5 flex-1 rounded-full transition-all", idea.status === 'APPROVED' ? 'bg-primary-500 shadow-[0_0_10px_rgba(34,197,94,0.3)]' : 'bg-neutral-100')} />
                        </div>
                        <span className="text-[9px] font-black text-neutral-400 uppercase tracking-[0.2em]">Biosphere Audit Tier: {idea.status === 'APPROVED' ? '3' : idea.status === 'UNDER_REVIEW' ? '2' : '1'}</span>
                        
                        {idea.status === 'REJECTED' && idea.feedback && (
                           <div className="mt-4 p-4 bg-secondary-50 rounded-2xl border border-secondary-100 flex items-start gap-3">
                              <div className="p-1.5 bg-secondary-500 rounded-lg text-white shadow-sm shrink-0">
                                 <AlertCircle className="w-3.5 h-3.5" />
                              </div>
                              <div className="space-y-1">
                                 <p className="text-[10px] font-black text-secondary-600 uppercase tracking-widest">Institutional Feedback</p>
                                 <p className="text-xs font-medium text-neutral-600 leading-relaxed italic">"{idea.feedback}"</p>
                              </div>
                           </div>
                        )}
                     </div>

                     <div className="flex flex-wrap items-center gap-4 w-full md:w-auto">
                        <Link href={`/ideas/${idea.id}`} className="flex-1 md:flex-none">
                           <Button variant="outline" className="w-full h-14 px-8 rounded-xl font-black text-[10px] uppercase tracking-widest border-neutral-200 bg-white hover:bg-neutral-50 shadow-sm transition-all hover:border-primary-200">
                              Analyze <ArrowUpRight className="w-4 h-4 ml-2" />
                           </Button>
                        </Link>
                        
                        {(idea.status === 'DRAFT' || idea.status === 'REJECTED') && (
                          <Button 
                             onClick={() => submitMutation.mutate(idea.id)}
                             disabled={submitMutation.isPending}
                             variant="primary" 
                             className="flex-1 md:flex-none h-14 px-8 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-lg shadow-primary-500/10"
                          >
                             {submitMutation.isPending ? 'Submitting...' : 'Submit Protocol'}
                          </Button>
                        )}

                        <div className="flex gap-2">
                           {(idea.status !== 'APPROVED' && idea.status !== 'UNDER_REVIEW') && (
                               <Link href={`/dashboard/edit/${idea.id}`}>
                                  <Button variant="outline" size="icon" className="h-14 w-14 rounded-xl border-neutral-100 text-neutral-400 hover:text-primary-600 hover:border-primary-100 bg-white shadow-sm transition-all"><Edit className="w-5 h-5" /></Button>
                               </Link>
                           )}
                           <Button onClick={() => setDeleteId(idea.id)} variant="outline" size="icon" className="h-14 w-14 rounded-xl border-neutral-100 text-neutral-400 hover:text-secondary-600 hover:border-secondary-100 bg-white shadow-sm transition-all" title="Terminate Protocol"><Trash2 className="w-5 h-5" /></Button>
                           {(idea.status === 'APPROVED' || idea.status === 'UNDER_REVIEW') && (
                              <div className="p-4 bg-neutral-50/50 rounded-xl border border-neutral-100 flex items-center justify-center text-neutral-300" title="Editing locked during active audit.">
                                 <ShieldCheck className="w-5 h-5" />
                              </div>
                           )}
                        </div>
                     </div>
                  </div>
               ))
            )}
         </div>
      </div>

      <ConfirmModal
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={() => { if (deleteId) deleteMutation.mutate(deleteId); }}
        title="Protocol Termination"
        message="Permanently erase this innovation from the registry archive?"
      />
    </div>
  );
}
