'use client';

import { use, useState, useEffect, useRef } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import {
  Leaf, ArrowUp, ArrowDown, MessageCircle, Lock, Zap, Calendar,
  AlertCircle, Bookmark, Share2, Twitter, Linkedin, Facebook, Copy, 
  ChevronRight, ShieldCheck, CheckCircle2, TrendingUp, Sparkles, 
  Clock, Globe, FileText, Coins, ArrowRight, User, ArrowLeft
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { formatDate, cn } from '@/lib/utils';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Card, CardContent } from '@/components/ui/Card';
import { Textarea } from '@/components/ui/Textarea';
import { Spinner } from '@/components/ui/Spinner';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const commentSchema = z.object({
  content: z.string().min(5, 'Comment must be at least 5 characters'),
});
type CommentForm = z.infer<typeof commentSchema>;

export default function IdeaDetails({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { user, isAuthenticated, isAdmin } = useAuth();
  const queryClient = useQueryClient();
  const [currency, setCurrency] = useState<'usd' | 'bdt'>('usd');

  const {
    register: registerComment,
    handleSubmit: handleSubmitComment,
    reset: resetComment,
    formState: { errors: commentErrors, isValid: isCommentValid }
  } = useForm<CommentForm>({
    resolver: zodResolver(commentSchema),
    mode: 'onTouched',
    defaultValues: { content: '' }
  });

  const { data: ideaRes, isLoading, error } = useQuery({
    queryKey: ['idea', id],
    queryFn: () => api.get(`/ideas/${id}`).then(res => res.data),
    retry: false,
  });

  const { data: commentsRes } = useQuery({
    queryKey: ['comments', id],
    queryFn: () => api.get(`/comments/idea/${id}`).then(res => res.data),
  });

  // Track payment sync state for UI overlay
  const [isSyncingPayment, setIsSyncingPayment] = useState(false);
  const pollRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Handle URL payment success/cancel params — with polling fallback
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const payment = urlParams.get('payment');
    const sessionId = urlParams.get('session_id');

    if (payment === 'cancelled') {
      toast.error('Payment was cancelled.');
      window.history.replaceState({}, document.title, `/ideas/${id}`);
      return;
    }

    if (payment === 'success' && sessionId) {
      setIsSyncingPayment(true);
      const loadingToastId = toast.loading('Synchronizing access to blueprint...');

      let attempts = 0;
      const MAX_ATTEMPTS = 6;
      const POLL_INTERVAL_MS = 2000;

      const poll = () => {
        attempts++;
        api.get(`/payments/success?session_id=${sessionId}`)
          .then(async (res: any) => {
            const data = res?.data ?? res;
            if (data?.hasPurchased === true) {
              await queryClient.invalidateQueries({ queryKey: ['idea', id] });
              toast.dismiss(loadingToastId);
              toast.success('🎉 Blueprint access granted! Welcome.');
              setIsSyncingPayment(false);
              window.history.replaceState({}, document.title, `/ideas/${id}`);
            } else if (attempts < MAX_ATTEMPTS) {
              // Still PENDING — retry after delay
              pollRef.current = setTimeout(poll, POLL_INTERVAL_MS);
            } else {
              // Exhausted retries
              toast.dismiss(loadingToastId);
              toast.error('Access sync is taking longer than expected. Please refresh the page.');
              setIsSyncingPayment(false);
              window.history.replaceState({}, document.title, `/ideas/${id}`);
            }
          })
          .catch(() => {
            toast.dismiss(loadingToastId);
            toast.error('Error verifying payment. Please contact support.');
            setIsSyncingPayment(false);
            window.history.replaceState({}, document.title, `/ideas/${id}`);
          });
      };

      // Start polling immediately
      poll();
    }

    return () => {
      if (pollRef.current) clearTimeout(pollRef.current);
    };
  }, [id, queryClient]);

  const voteMutation = useMutation({
    mutationFn: (type: 'UP' | 'DOWN') => api.post(`/votes/idea/${id}`, { type }),
    onSuccess: (res: any) => {
      queryClient.setQueryData(['idea', id], (old: any) => {
        if (!old) return old;
        return {
          ...old,
          voteCount: res.data?.voteCount ?? old.voteCount,
          userVote: res.data?.userVote ?? old.userVote,
        };
      });
      queryClient.invalidateQueries({ queryKey: ['idea', id] });
      queryClient.invalidateQueries({ queryKey: ['ideas'] });
    },
  });

  const removeVoteMutation = useMutation({
    mutationFn: () => api.delete(`/votes/idea/${id}`),
    onSuccess: (res: any) => {
      queryClient.setQueryData(['idea', id], (old: any) => {
        if (!old) return old;
        return {
          ...old,
          voteCount: res.data?.voteCount ?? old.voteCount,
          userVote: null,
        };
      });
      queryClient.invalidateQueries({ queryKey: ['idea', id] });
      queryClient.invalidateQueries({ queryKey: ['ideas'] });
    },
  });

  const commentMutation = useMutation({
    mutationFn: (data: CommentForm) => api.post(`/comments/idea/${id}`, { content: data.content }),
    onSuccess: (res: any) => {
      resetComment();
      toast.success('Comment added');
      queryClient.setQueryData(['comments', id], (old: any) => {
        const newComment = res.data;
        return [newComment, ...(old || [])];
      });
      queryClient.invalidateQueries({ queryKey: ['comments', id] });
    },
    onError: (err: any) => toast.error(err.message || 'Error adding comment'),
  });

  const purchaseMutation = useMutation({
    mutationFn: () => api.post(`/payments/idea/${id}`, { currency }),
    onSuccess: (res: any) => {
      // api interceptor returns response.data directly, so data is at res.data or res itself
      const sessionUrl = res?.data?.sessionUrl ?? res?.sessionUrl;
      if (sessionUrl) {
        window.location.href = sessionUrl;
      } else {
        toast.error('Failed to initialize payment session. Please try again.');
      }
    },
    onError: (err: any) => toast.error(err?.message || 'Error initiating payment'),
  });

  const adminApprovalMutation = useMutation({
    mutationFn: (status: 'approve' | 'reject') => api.post(`/ideas/${id}/${status}`, { feedback: status === 'reject' ? prompt('Reason for rejection:') : undefined }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['idea', id] });
      toast.success('Idea status updated');
    },
    onError: (err: any) => toast.error(err.message || 'Error updating status'),
  });

  const bookmarkMutation = useMutation({
    mutationFn: () => api.post(`/ideas/${id}/bookmark`),
    onSuccess: (res: any) => {
      queryClient.invalidateQueries({ queryKey: ['idea', id] });
      const msg = res?.data?.message ?? res?.message ?? 'Bookmark updated.';
      toast.success(msg);
    },
  });

  if (isLoading) return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <Spinner size="xl" className="text-primary-500" />
    </div>
  );

  if (error) return (
    <div className="min-h-screen flex items-center justify-center p-8 bg-neutral-50">
       <div className="bg-white p-12 rounded-[3.5rem] shadow-xl shadow-neutral-900/5 text-center max-w-lg w-full border border-neutral-100">
          <div className="w-20 h-20 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-8">
             <AlertCircle className="w-10 h-10" />
          </div>
          <h2 className="text-3xl font-black text-neutral-900 mb-4 tracking-tight leading-none">Transmission Failed</h2>
          <p className="text-neutral-500 font-medium mb-10 leading-relaxed">{(error as any).message || 'The requested ecological blueprint could not be located in our verified registry.'}</p>
          <Link href="/ideas">
            <Button variant="primary" className="w-full h-14 rounded-2xl text-sm font-bold shadow-md shadow-primary-500/20">Return to Registry</Button>
          </Link>
       </div>
    </div>
  );

  if (!ideaRes) return null;

  const idea = ideaRes;
  const comments = commentsRes || [];

  return (
    <div className="min-h-screen bg-white flex flex-col pt-20 font-sans">

      {/* Payment Sync Banner */}
      {isSyncingPayment && (
        <div className="fixed top-0 left-0 right-0 z-[200] bg-primary-600 text-white px-6 py-3 flex items-center justify-center gap-3 shadow-lg">
          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin shrink-0" />
          <p className="text-sm font-bold tracking-wide">Synchronizing blueprint access — please wait...</p>
        </div>
      )}
      
      {/* 🌌 High-Performance Header Area - Light Premium Theme */}
      <section className="relative overflow-hidden bg-neutral-50 border-b border-neutral-100 pt-16 pb-32">
         {/* Abstract Gradients */}
         <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-bl from-primary-100/50 to-transparent rounded-full blur-[100px] -mr-48 -mt-48 pointer-events-none" />
         <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-secondary-100/40 to-transparent rounded-full blur-[80px] -ml-24 -mb-24 pointer-events-none" />
         
         <div className="max-w-7xl mx-auto px-6 h-full relative z-10 flex flex-col">
            <div className="max-w-4xl">
               <Link href="/ideas" className="inline-flex items-center text-sm font-bold text-neutral-500 hover:text-primary-600 mb-10 transition-colors group">
                  <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                  Back to Directory
               </Link>

               <motion.div 
                 initial={{ opacity: 0, y: 10 }}
                 animate={{ opacity: 1, y: 0 }}
                 className="flex flex-wrap items-center gap-3 mb-6"
               >
                  <div className="bg-primary-50 border border-primary-100 text-primary-700 text-xs font-bold px-3 py-1.5 rounded-lg shadow-sm">
                     {idea.category?.name}
                  </div>
                  {idea.isPaid && (
                     <div className="bg-neutral-900 border border-neutral-800 text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow-sm flex items-center gap-1.5">
                        <Lock className="w-3.5 h-3.5" /> Premium Protocol
                     </div>
                  )}
                  <div className={cn(
                    "text-xs font-bold px-3 py-1.5 rounded-lg shadow-sm border",
                    idea.status === 'APPROVED' ? 'bg-green-50 border-green-200 text-green-700' : 
                    idea.status === 'UNDER_REVIEW' ? 'bg-amber-50 border-amber-200 text-amber-700' :
                    'bg-neutral-100 border-neutral-200 text-neutral-600'
                  )}>
                    Status: {idea.status.replace('_', ' ')}
                  </div>
               </motion.div>
               
               <motion.h1 
                 initial={{ opacity: 0, y: 10 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ delay: 0.1 }}
                 className="text-4xl md:text-5xl lg:text-6xl font-black text-neutral-900 tracking-tight mb-8 leading-[1.1]"
               >
                  {idea.title}
               </motion.h1>
               
               <motion.div 
                 initial={{ opacity: 0, y: 10 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ delay: 0.2 }}
                 className="flex flex-wrap items-center gap-6 md:gap-8 text-neutral-600 text-sm font-semibold"
               >
                  <div className="flex items-center gap-3">
                     <div className="w-10 h-10 rounded-full bg-white border border-neutral-200 flex items-center justify-center font-bold text-neutral-900 shadow-sm overflow-hidden">
                        {idea.author?.avatar ? (
                          <img src={idea.author.avatar} alt={idea.author.name} className="w-full h-full object-cover" />
                        ) : (
                          idea.author?.name?.charAt(0) || 'U'
                        )}
                     </div>
                     <span className="text-neutral-900 font-bold">{idea.author?.name}</span>
                  </div>
                  <div className="w-1 h-1 rounded-full bg-neutral-300 hidden md:block" />
                  <div className="flex items-center gap-2">
                     <Clock className="w-4 h-4 text-neutral-400" /> {formatDate(idea.createdAt)}
                  </div>
                  <div className="w-1 h-1 rounded-full bg-neutral-300 hidden md:block" />
                  <div className="flex items-center gap-2 text-primary-600 font-bold bg-primary-50 px-2.5 py-1 rounded-md">
                     <TrendingUp className="w-4 h-4" /> {idea.voteCount} Endorsements
                  </div>
               </motion.div>
            </div>
         </div>
      </section>

      {/* Hero Image */}
      <div className="max-w-[1400px] w-full mx-auto px-6 -mt-20 relative z-20 mb-20">
         <div className="aspect-[21/8] md:aspect-[21/7] rounded-[2rem] overflow-hidden shadow-2xl border border-neutral-100 bg-neutral-100">
            <img 
              src={idea.images?.[0] || 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?q=80&w=2000'}
              alt={idea.title}
              className="w-full h-full object-cover"
              onError={(e) => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?q=80&w=2000'; }}
            />
         </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pb-24 w-full flex flex-col lg:flex-row gap-16">
         
         {/* 🛠 Interactive Intelligence Sidebar */}
         <div className="lg:w-[360px] shrink-0">
            <div className="sticky top-28 space-y-8">
               
               {/* Discovery Actions Card */}
               <Card className="rounded-[2rem] border border-neutral-100 shadow-xl shadow-neutral-900/5 bg-white overflow-hidden p-8">
                  <div className="space-y-8">
                     <div className="flex items-center justify-between pb-6 border-b border-neutral-100">
                        <div className="space-y-1">
                           <div className="text-xs font-bold text-neutral-500 uppercase tracking-widest">Endorsement Pulse</div>
                           <h3 className="text-xl font-black text-neutral-900 tracking-tight">Active Impact</h3>
                        </div>
                        <div className="text-3xl font-black text-primary-600 tabular-nums bg-primary-50 px-3 py-1.5 rounded-xl">{idea.voteCount}</div>
                     </div>
                     
                     <div className="grid grid-cols-2 gap-4">
                        <button
                           onClick={() => {
                              if (!isAuthenticated) return toast.info('Log in to vote');
                              idea.userVote === 'UP' ? removeVoteMutation.mutate() : voteMutation.mutate('UP');
                           }}
                           disabled={voteMutation.isPending || idea.status !== 'APPROVED'}
                           className={cn(
                             "h-14 rounded-xl flex items-center justify-center gap-2 transition-all font-bold text-sm border-2 shadow-sm",
                             idea.userVote === 'UP' 
                               ? "bg-primary-50 border-primary-200 text-primary-700" 
                               : "bg-white border-neutral-200 text-neutral-600 hover:border-neutral-300 hover:bg-neutral-50"
                           )}
                        >
                           <ArrowUp className="w-5 h-5" /> Escalate
                        </button>
                        <button
                           onClick={() => {
                              if (!isAuthenticated) return toast.info('Log in to vote');
                              idea.userVote === 'DOWN' ? removeVoteMutation.mutate() : voteMutation.mutate('DOWN');
                           }}
                           disabled={voteMutation.isPending || idea.status !== 'APPROVED'}
                           className={cn(
                             "h-14 rounded-xl flex items-center justify-center gap-2 transition-all font-bold text-sm border-2 shadow-sm",
                             idea.userVote === 'DOWN' 
                               ? "bg-red-50 border-red-200 text-red-700" 
                               : "bg-white border-neutral-200 text-neutral-600 hover:border-neutral-300 hover:bg-neutral-50"
                           )}
                        >
                           <ArrowDown className="w-5 h-5" /> Dismiss
                        </button>
                     </div>
                     
                     <Button 
                        onClick={() => {
                           if (!isAuthenticated) return toast.info('Log in to bookmark');
                           bookmarkMutation.mutate();
                        }}
                        variant="outline"
                        className={cn(
                          "w-full h-14 rounded-xl text-sm font-bold flex items-center justify-center gap-3 transition-all border-2",
                          idea.isBookmarked 
                             ? "bg-neutral-900 border-neutral-900 text-white shadow-md" 
                             : "bg-white border-neutral-200 text-neutral-700 hover:bg-neutral-50"
                        )}
                     >
                        {idea.isBookmarked ? <Bookmark className="w-5 h-5 fill-current" /> : <Bookmark className="w-5 h-5" />}
                        {idea.isBookmarked ? 'Saved to Vault' : 'Save Protocol'}
                     </Button>
                  </div>
               </Card>

               {/* Access Protocol Card */}
               {idea.isLocked && (
                  <Card className="rounded-[2rem] border border-neutral-200 shadow-2xl shadow-neutral-900/10 bg-neutral-900 text-white p-8 relative overflow-hidden group">
                     <div className="absolute top-0 right-0 w-48 h-48 bg-primary-500/20 blur-[60px] rounded-full -mr-24 -mt-24 group-hover:bg-primary-500/30 transition-colors pointer-events-none" />
                     <div className="relative z-10 space-y-8">
                        <div className="space-y-2">
                           <div className="flex items-center gap-2 text-primary-400 text-xs font-bold uppercase tracking-widest">
                              <Lock className="w-4 h-4" /> Intelligence Tier
                           </div>
                           <h3 className="text-2xl font-black tracking-tight">Full Blueprint Access</h3>
                        </div>
                        
                        <div className="flex items-center bg-white/10 p-1.5 rounded-xl border border-white/5">
                           <button onClick={() => setCurrency('usd')} className={cn("flex-1 py-2 text-xs font-bold uppercase tracking-widest rounded-lg transition-all", currency === 'usd' ? 'bg-white text-neutral-900 shadow-md' : 'text-neutral-400 hover:text-white')}>USD</button>
                           <button onClick={() => setCurrency('bdt')} className={cn("flex-1 py-2 text-xs font-bold uppercase tracking-widest rounded-lg transition-all", currency === 'bdt' ? 'bg-white text-neutral-900 shadow-md' : 'text-neutral-400 hover:text-white')}>BDT</button>
                        </div>
                        
                        <div className="space-y-4">
                           <div className="flex items-center justify-between font-bold text-sm text-neutral-400 px-1">
                              <span>Protocol Fee</span>
                              <span className="text-white text-2xl font-black">
                                 {currency === 'usd' 
                                    ? `$${(idea.price || 10).toFixed(2)}` 
                                    : `৳${Math.round((idea.price || 10) * 120)}`}
                              </span>
                           </div>
                           <Button
                              variant="primary"
                              onClick={() => {
                                 if (!isAuthenticated) { toast.info('Log in to purchase'); return; }
                                 purchaseMutation.mutate();
                              }}
                              isLoading={purchaseMutation.isPending}
                              className="w-full h-14 rounded-xl font-bold text-sm shadow-lg shadow-primary-500/20"
                           >
                              Unlock Protocol
                           </Button>
                        </div>
                     </div>
                  </Card>
               )}

               {/* Share Pulse */}
               <div className="p-6 bg-neutral-50 rounded-2xl border border-neutral-100 space-y-4">
                  <div className="text-xs font-bold text-neutral-500 uppercase tracking-widest text-center">Broadcast Impact</div>
                  <div className="flex items-center justify-center gap-3">
                     {[Twitter, Linkedin, Facebook, Copy].map((Icon, i) => (
                        <button key={i} className="w-12 h-12 bg-white rounded-xl border border-neutral-200 flex items-center justify-center text-neutral-500 hover:text-primary-600 hover:border-primary-200 hover:bg-primary-50 transition-all shadow-sm">
                           <Icon className="w-5 h-5" />
                        </button>
                     ))}
                  </div>
               </div>
            </div>
         </div>

         {/* 📖 High-Density Protocol Content */}
         <div className="flex-1 space-y-16">
            
            {/* Admin Audit Block */}
            {isAdmin && idea.status === 'UNDER_REVIEW' && (
               <motion.div 
                 initial={{ opacity: 0, y: -10 }}
                 animate={{ opacity: 1, y: 0 }}
                 className="bg-amber-50 border border-amber-200 rounded-[2rem] p-8 flex flex-col md:flex-row items-center justify-between gap-8 shadow-sm"
               >
                  <div className="flex items-center gap-6">
                     <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-amber-500 shadow-sm border border-amber-100 shrink-0">
                        <ShieldCheck className="w-8 h-8" />
                     </div>
                     <div className="space-y-1">
                        <h3 className="text-xl font-black text-amber-900 tracking-tight">Audit Required</h3>
                        <p className="text-amber-700 text-sm font-semibold">Pending biosphere verification protocol.</p>
                     </div>
                  </div>
                  <div className="flex gap-4 w-full md:w-auto shrink-0">
                     <Button variant="outline" onClick={() => adminApprovalMutation.mutate('reject')} className="h-12 px-6 rounded-xl text-red-600 border-red-200 hover:bg-red-50 bg-white font-bold text-sm">
                        Decline
                     </Button>
                     <Button variant="primary" onClick={() => adminApprovalMutation.mutate('approve')} className="h-12 px-8 rounded-xl font-bold text-sm shadow-md">
                        Verify Protocol
                     </Button>
                  </div>
               </motion.div>
             )}

            <section className="space-y-12">
               {/* Problem Statement */}
               <div className="space-y-6">
                  <div className="flex items-center gap-4">
                     <div className="w-12 h-12 bg-red-50 rounded-2xl flex items-center justify-center text-red-600 border border-red-100">
                        <AlertCircle className="w-6 h-6" />
                     </div>
                     <h3 className="text-2xl font-black text-neutral-900 tracking-tight">Environmental Friction</h3>
                  </div>
                  <div className="bg-neutral-50 rounded-[2rem] p-8 border border-neutral-100 relative overflow-hidden">
                     <p className="text-neutral-700 text-lg md:text-xl font-medium leading-relaxed relative z-10">
                        {idea.problemStatement}
                     </p>
                  </div>
               </div>

               {/* Proposed Solution */}
               <div className="space-y-6">
                  <div className="flex items-center gap-4">
                     <div className="w-12 h-12 bg-primary-50 rounded-2xl flex items-center justify-center text-primary-600 border border-primary-100">
                        <CheckCircle2 className="w-6 h-6" />
                     </div>
                     <h3 className="text-2xl font-black text-neutral-900 tracking-tight">Proposed Architecture</h3>
                  </div>
                  
                  {idea.isLocked ? (
                     <div className="bg-neutral-50 rounded-[2rem] p-16 border-2 border-dashed border-neutral-200 flex flex-col items-center justify-center text-center">
                        <div className="w-20 h-20 bg-white rounded-[1.5rem] flex items-center justify-center text-neutral-400 shadow-sm mb-6 border border-neutral-100">
                           <Lock className="w-8 h-8" />
                        </div>
                        <h3 className="text-2xl font-black text-neutral-900 mb-4 tracking-tighter">Blueprint Encryption Active</h3>
                        <p className="text-neutral-500 font-medium max-w-md mx-auto leading-relaxed">The architectural solution is gated behind a premium verification layer. Purchase the protocol to view full schematics.</p>
                     </div>
                  ) : (
                     <div className="space-y-10">
                        <div className="bg-white rounded-[2rem] p-8 border border-neutral-200 shadow-xl shadow-neutral-900/5 relative overflow-hidden group">
                           <p className="text-neutral-800 text-xl font-bold leading-relaxed relative z-10">
                              {idea.solution}
                           </p>
                        </div>
                        
                        <div className="prose prose-lg prose-neutral max-w-none text-neutral-700 font-medium">
                           <h4 className="text-xs font-bold text-neutral-400 uppercase tracking-widest mb-6 flex items-center gap-3">
                              <FileText className="w-4 h-4" /> Technical Specification
                           </h4>
                           <div className="space-y-6 leading-relaxed bg-white p-8 rounded-[2rem] border border-neutral-100">
                              {idea.description.split('\n').map((para: string, i: number) => (
                                <p key={i}>{para}</p>
                              ))}
                           </div>
                        </div>
                     </div>
                  )}
               </div>
            </section>

            {/* 💬 Discussion */}
            <section className="space-y-10 pt-10 border-t border-neutral-100">
               <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                  <div className="flex items-center gap-4">
                     <div className="w-12 h-12 bg-primary-50 rounded-2xl flex items-center justify-center text-primary-600 border border-primary-100">
                        <MessageCircle className="w-6 h-6" />
                     </div>
                     <h3 className="text-2xl font-black text-neutral-900 tracking-tight">Intelligence Discussion</h3>
                  </div>
                  <div className="px-4 py-2 bg-neutral-50 border border-neutral-200 rounded-xl text-xs font-bold text-neutral-600">
                     {comments.length} Signals Decoded
                  </div>
               </div>

               {isAuthenticated ? (
                  idea.status === 'APPROVED' ? (
                     <div className="bg-white rounded-[2rem] p-6 sm:p-8 border border-neutral-200 shadow-sm">
                        <form onSubmit={handleSubmitComment((data) => commentMutation.mutate(data))} className="space-y-6">
                           <Textarea
                              placeholder="Inject protocol feedback or ask for architectural clarification..."
                              {...registerComment('content')}
                              error={commentErrors.content?.message}
                              className="min-h-[120px] bg-neutral-50 border border-neutral-200 focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 rounded-xl text-base font-medium placeholder:text-neutral-400"
                           />
                           <div className="flex justify-end">
                              <Button
                                 type="submit"
                                 variant="primary"
                                 disabled={!isCommentValid || commentMutation.isPending}
                                 isLoading={commentMutation.isPending}
                                 className="h-12 px-8 rounded-xl font-bold text-sm shadow-md disabled:opacity-50"
                              >
                                 Post Feedback
                              </Button>
                           </div>
                        </form>
                     </div>
                  ) : (
                     <div className="bg-neutral-50 rounded-[2.5rem] p-12 text-center border border-dashed border-neutral-300">
                        <Lock className="w-10 h-10 mx-auto mb-4 text-neutral-400" />
                        <p className="text-xl font-black text-neutral-900 tracking-tight mb-2">Discussion Channel Gated</p>
                        <p className="text-neutral-500 font-medium text-sm">Awaiting official registry approval for public signal transmission.</p>
                     </div>
                  )
               ) : (
                  <div className="bg-primary-50 rounded-[2.5rem] p-10 text-center border border-primary-100">
                     <h4 className="text-xl font-black text-primary-900 mb-3 tracking-tight">Signal Injection Required</h4>
                     <p className="text-primary-700 font-medium text-sm mb-8">Authentication necessary for biosphere protocol participation.</p>
                     <Link href="/login">
                       <Button variant="primary" className="h-12 px-8 rounded-xl font-bold text-sm shadow-md">Sign In to Blueprint</Button>
                     </Link>
                  </div>
               )}

               <div className="space-y-6">
                  {comments.length === 0 ? (
                     <div className="text-center py-20 bg-white rounded-[2rem] border border-neutral-100">
                        <Globe className="w-12 h-12 mx-auto mb-4 text-neutral-200" />
                        <p className="text-neutral-400 font-bold text-sm">Awaiting first global signal submission</p>
                     </div>
                  ) : (
                     comments.map((comment: any) => (
                        <div key={comment.id} className="flex gap-4 sm:gap-6 bg-white p-6 rounded-[2rem] border border-neutral-100 shadow-sm hover:shadow-md transition-shadow">
                           <div className="w-12 h-12 rounded-full bg-primary-50 border border-primary-100 flex items-center justify-center font-bold text-primary-700 flex-shrink-0 overflow-hidden text-sm">
                              {comment.author?.avatar ? (
                                 <img src={comment.author.avatar} alt={comment.author.name} className="w-full h-full object-cover" />
                              ) : (
                                 comment.author?.name.charAt(0) || 'U'
                              )}
                           </div>
                           <div className="flex-grow space-y-2">
                              <div className="flex items-center gap-3">
                                 <span className="text-sm font-bold text-neutral-900">{comment.author?.name}</span>
                                 <span className="text-xs font-semibold text-neutral-400">{formatDate(comment.createdAt)}</span>
                              </div>
                              <p className="text-neutral-700 text-base font-medium leading-relaxed bg-neutral-50 p-4 rounded-xl border border-neutral-100">
                                 {comment.content}
                              </p>
                           </div>
                        </div>
                     ))
                  )}
               </div>
            </section>
         </div>
      </div>
    </div>
  );
}
