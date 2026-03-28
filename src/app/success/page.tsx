'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { CheckCircle, ShieldCheck, LayoutDashboard, Sparkles, ArrowRight, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { api } from '@/lib/api';

function SuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');

  const [status, setStatus] = useState<'loading' | 'verified' | 'failed'>('loading');
  const [ideaId, setIdeaId] = useState<string | null>(null);

  useEffect(() => {
    if (!sessionId) {
      setStatus('verified'); // No session = generic success (direct nav)
      return;
    }

    let attempts = 0;
    const MAX_ATTEMPTS = 5;

    const poll = () => {
      attempts++;
      api.get(`/payments/success?session_id=${sessionId}`)
        .then((res: any) => {
          const data = res?.data ?? res;
          if (data?.hasPurchased === true) {
            setIdeaId(data?.ideaId ?? null);
            setStatus('verified');
          } else if (attempts < MAX_ATTEMPTS) {
            setTimeout(poll, 2000);
          } else {
            setStatus('failed');
          }
        })
        .catch(() => setStatus('failed'));
    };

    poll();
  }, [sessionId]);

  if (status === 'loading') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full mx-auto mt-16 px-4"
      >
        <Card className="p-12 flex flex-col items-center justify-center text-center shadow-2xl border-none bg-white gap-6">
          <div className="w-20 h-20 bg-primary-50 rounded-full flex items-center justify-center">
            <Loader2 className="w-10 h-10 text-primary-500 animate-spin" />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-neutral-900 mb-2">Syncing Access</h1>
            <p className="text-neutral-500 text-sm">Finalizing your blueprint access. This takes just a moment...</p>
          </div>
          <div className="w-full bg-neutral-100 rounded-full h-1.5 overflow-hidden">
            <div className="bg-primary-500 h-1.5 rounded-full animate-pulse w-3/4" />
          </div>
        </Card>
      </motion.div>
    );
  }

  if (status === 'failed') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full mx-auto mt-16 px-4"
      >
        <Card className="p-10 flex flex-col items-center justify-center text-center shadow-xl border border-amber-100 bg-white gap-6">
          <div className="w-16 h-16 bg-amber-50 rounded-full flex items-center justify-center">
            <ShieldCheck className="w-8 h-8 text-amber-500" />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-neutral-900 mb-2">Payment Received</h1>
            <p className="text-neutral-500 text-sm leading-relaxed">
              Your payment was successful. Access may take a few minutes to sync. 
              Please refresh the idea page shortly, or view your purchases below.
            </p>
          </div>
          <div className="flex flex-col w-full gap-3">
            <Link href="/dashboard/payments" className="w-full">
              <Button variant="primary" className="w-full h-12 text-sm font-bold shadow-lg shadow-primary-200">
                View My Purchases
              </Button>
            </Link>
            <Link href="/ideas" className="w-full">
              <Button variant="outline" className="w-full h-12 text-sm font-bold">
                Browse Ideas
              </Button>
            </Link>
          </div>
          {sessionId && (
            <p className="text-[10px] text-neutral-400 font-mono">REF: {sessionId.substring(0, 24)}...</p>
          )}
        </Card>
      </motion.div>
    );
  }

  // Verified success
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-md w-full mx-auto mt-16 px-4"
    >
      <Card className="p-8 md:p-12 flex flex-col items-center justify-center text-center shadow-2xl border-none bg-white gap-6">
        {/* Animated success icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.1 }}
          className="w-24 h-24 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center shadow-xl shadow-primary-500/30"
        >
          <CheckCircle className="w-12 h-12 text-white" />
        </motion.div>

        <div>
          <div className="bg-primary-50 text-primary-700 text-[10px] tracking-widest font-black px-4 py-1.5 rounded-full flex items-center gap-2 border border-primary-100 mx-auto w-fit mb-4">
            <ShieldCheck className="w-3.5 h-3.5" /> TRANSACTION VERIFIED
          </div>
          <h1 className="text-3xl font-extrabold text-neutral-900 mb-2">
            Blueprint <span className="text-primary-600">Unlocked</span>
          </h1>
          <p className="text-neutral-500 text-sm leading-relaxed">
            Your payment was successful and your access to the full blueprint has been granted immediately.
          </p>
        </div>

        <div className="flex flex-col w-full gap-3">
          {ideaId && (
            <Link href={`/ideas/${ideaId}`} className="w-full">
              <Button variant="primary" className="w-full h-12 text-sm font-bold shadow-lg shadow-primary-200 flex items-center justify-center gap-2">
                <Sparkles className="w-4 h-4" /> View Your Blueprint
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          )}
          <Link href="/dashboard/payments" className="w-full">
            <Button variant={ideaId ? 'outline' : 'primary'} className="w-full h-12 text-sm font-bold flex items-center justify-center gap-2">
              <LayoutDashboard className="w-4 h-4" /> My Purchases
            </Button>
          </Link>
          {!ideaId && (
            <Link href="/ideas" className="w-full">
              <Button variant="outline" className="w-full h-12 text-sm font-bold">
                Browse Ideas
              </Button>
            </Link>
          )}
        </div>

        {sessionId && (
          <p className="text-[10px] text-neutral-400 font-mono">
            REF: {sessionId.substring(0, 24)}...
          </p>
        )}
      </Card>

      <p className="text-center text-neutral-400 text-xs mt-6">
        Need assistance?{' '}
        <Link href="/contact" className="text-primary-600 hover:underline">
          Contact Support
        </Link>
      </p>
    </motion.div>
  );
}

export default function SuccessPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-primary-50/30 pt-20 pb-12">
      <Suspense
        fallback={
          <div className="flex flex-col items-center justify-center py-40 gap-4">
            <div className="w-10 h-10 border-4 border-primary-500 border-t-transparent rounded-full animate-spin" />
            <p className="text-sm text-neutral-500 font-medium">Loading details...</p>
          </div>
        }
      >
        <SuccessContent />
      </Suspense>
    </div>
  );
}
