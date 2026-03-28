'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { 
  CreditCard, ShieldCheck, Download, 
  ExternalLink, ArrowUpRight, Search,
  History, TrendingUp
} from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { cn, formatDate } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Spinner } from '@/components/ui/Spinner';

export default function PaymentsPage() {
  const { user } = useAuth();

  const { data: myPurchases, isLoading: purchasesLoading } = useQuery({
    queryKey: ['myPurchases'],
    queryFn: () => api.get('/payments/my').then(res => res.data),
    enabled: !!user,
  });

  const totalInvested = myPurchases?.reduce((sum: number, p: any) => sum + p.amount, 0) || 0;

  if (purchasesLoading) {
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
          <Badge className="bg-primary-50 text-primary-700 border-none text-[9px] font-black uppercase tracking-[0.3em] px-4 py-2">
             Governance & Finance
          </Badge>
          <h1 className="text-4xl lg:text-5xl font-black text-neutral-950 tracking-tighter">
            Payments <br /> <span className="text-primary-600">Ledger.</span>
          </h1>
          <p className="text-neutral-500 font-medium max-w-xl text-lg leading-relaxed">
            Monitor your capital allocation across the biosphere and manage your secured project blueprints.
          </p>
        </div>
        <div className="flex items-center gap-4 bg-white p-6 rounded-[2rem] border border-neutral-100 shadow-xl shadow-neutral-900/[0.02]">
           <div className="w-12 h-12 bg-primary-50 rounded-2xl flex items-center justify-center text-primary-600">
              <TrendingUp className="w-6 h-6" />
           </div>
           <div>
              <p className="text-[10px] font-black text-neutral-400 uppercase tracking-widest">Total Allocated</p>
              <p className="text-2xl font-black text-neutral-950">${totalInvested.toLocaleString()}</p>
           </div>
        </div>
      </div>

      {/* 🧬 Transaction History */}
      <div className="bg-white rounded-[2.5rem] border border-neutral-100 overflow-hidden shadow-xl shadow-neutral-950/[0.02]">
         <div className="p-8 border-b border-neutral-50 flex items-center justify-between">
            <h3 className="text-xl font-black text-neutral-950 tracking-tight flex items-center gap-3">
               <History className="w-5 h-5 text-primary-500" /> Secure Blueprints
            </h3>
            <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-neutral-50 rounded-full border border-neutral-100 text-[10px] font-black text-neutral-400 uppercase tracking-widest uppercase">
               Blockchain Verified
            </div>
         </div>
         
         <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
               <thead>
                  <tr className="bg-neutral-50/50">
                     <th className="p-8 text-[10px] font-black text-neutral-400 uppercase tracking-widest border-b border-neutral-50">Blueprint</th>
                     <th className="p-8 text-[10px] font-black text-neutral-400 uppercase tracking-widest border-b border-neutral-50">Transaction ID</th>
                     <th className="p-8 text-[10px] font-black text-neutral-400 uppercase tracking-widest border-b border-neutral-50">Date</th>
                     <th className="p-8 text-[10px] font-black text-neutral-400 uppercase tracking-widest border-b border-neutral-50">Status</th>
                     <th className="p-8 text-[10px] font-black text-neutral-400 uppercase tracking-widest border-b border-neutral-50 text-right">Amount</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-neutral-50">
                  {myPurchases?.length === 0 ? (
                     <tr>
                        <td colSpan={5} className="py-32 text-center">
                           <div className="flex flex-col items-center">
                              <CreditCard className="w-12 h-12 text-neutral-200 mb-4" />
                              <p className="text-neutral-400 font-bold uppercase tracking-widest">No transactions logged.</p>
                           </div>
                        </td>
                     </tr>
                  ) : (
                     myPurchases?.map((purchase: any) => (
                        <tr key={purchase.id} className="hover:bg-neutral-50/50 transition-colors group">
                           <td className="p-8">
                              <Link href={`/ideas/${purchase.idea.id}`} className="group-hover:text-primary-600 transition-colors">
                                 <p className="font-black text-neutral-900 uppercase tracking-tight truncate max-w-xs">{purchase.idea.title}</p>
                                 <p className="text-[10px] font-medium text-neutral-400">Node: {purchase.idea.author.name}</p>
                              </Link>
                           </td>
                           <td className="p-8">
                              <code className="text-[10px] font-mono text-neutral-400 bg-neutral-50 px-3 py-1.5 rounded-lg border border-neutral-100">
                                 {(purchase.stripeSessionId || purchase.id || 'N/A').slice(0, 16)}...
                              </code>
                           </td>
                           <td className="p-8 text-xs font-bold text-neutral-500">
                              {formatDate(purchase.createdAt)}
                           </td>
                           <td className="p-8">
                              <Badge className="bg-primary-50 text-primary-700 border-none font-black text-[9px] uppercase tracking-widest px-3 py-1">
                                 Secured
                              </Badge>
                           </td>
                           <td className="p-8 text-right font-black text-neutral-900">
                              ${purchase.amount}
                           </td>
                        </tr>
                     ))
                  )}
               </tbody>
            </table>
         </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
         <Card className="bg-neutral-950 p-10 border-none rounded-[3rem] text-white relative overflow-hidden group">
            <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 2px, transparent 0)', backgroundSize: '32px 32px' }}></div>
            <div className="relative z-10 space-y-6">
               <div className="w-16 h-16 bg-primary-600 rounded-[2rem] flex items-center justify-center shadow-2xl shadow-primary-900/50 group-hover:rotate-12 transition-transform">
                  <ShieldCheck className="w-8 h-8" />
               </div>
               <div>
                  <h4 className="text-2xl font-black tracking-tight uppercase">Identity Audit.</h4>
                  <p className="text-white/50 font-medium mt-2">All transactions are anchored to your institutional identity key.</p>
               </div>
               <Button variant="outline" className="w-full border-white/10 bg-white/5 hover:bg-white/10 text-white font-black text-[10px] uppercase tracking-widest h-14 rounded-2xl">
                  Download Certificate Hub
               </Button>
            </div>
         </Card>
         
         <div className="bg-white p-10 rounded-[3rem] border border-neutral-100 shadow-xl shadow-neutral-950/[0.02] flex flex-col justify-between">
            <div className="space-y-4">
               <h4 className="text-xl font-black text-neutral-950 tracking-tight flex items-center gap-3"><ExternalLink className="w-5 h-5 text-neutral-400" /> Legal & Compliance</h4>
               <p className="text-neutral-500 font-medium">EcoSpark Hub uses Stripe for end-to-end encrypted payment processing. All blueprints are technically verified before clearing.</p>
            </div>
            <Link href="/help" className="mt-8 text-[10px] font-black text-primary-600 uppercase tracking-[0.2em] hover:underline">
               Governance Support <ArrowUpRight className="w-4 h-4 inline ml-1" />
            </Link>
         </div>
      </div>
    </div>
  );
}
