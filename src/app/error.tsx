'use client';

import { ShieldAlert, RotateCcw, Home, Info, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { Button } from '@/components/ui/Button';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error to an analytics or reporting service
    console.error('An unexpected application error occurred:', error);
  }, [error]);

  return (
    <div className="min-h-screen pt-24 pb-12 flex flex-col items-center justify-center bg-neutral-50 px-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="max-w-lg w-full text-center space-y-8"
      >
        <div className="relative inline-flex items-center justify-center">
          <div className="absolute inset-0 bg-red-500/20 blur-2xl rounded-full" />
          <div className="relative p-8 bg-white rounded-3xl shadow-lg border border-red-100">
            <ShieldAlert className="w-20 h-20 text-red-500" strokeWidth={1.5} />
            <div className="absolute -top-3 -right-3 bg-neutral-900 text-white text-[10px] font-bold px-3 py-1.5 rounded-full shadow-sm uppercase tracking-widest">
              SYSTEM ERROR
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <h1 className="text-4xl md:text-5xl font-extrabold text-neutral-900 tracking-tight">
             Unexpected <span className="text-red-600">Anomaly</span>
          </h1>
          <p className="text-lg text-neutral-600 font-medium max-w-sm mx-auto">
             The application experienced an unexpected ecosystem failure. Our technical architects have been notified.
          </p>
          
          <div className="mt-6 p-4 bg-red-50 rounded-xl border border-red-100 flex items-start gap-3 max-w-full text-left text-sm text-red-800 shadow-sm">
             <AlertCircle className="w-5 h-5 shrink-0 text-red-600" />
             <p className="font-mono text-xs overflow-x-auto">{error.message || 'Unknown application error'}</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <Button 
            variant="primary" 
            size="lg" 
            onClick={() => reset()}
            className="w-full sm:w-auto"
          >
            <RotateCcw className="w-4 h-4 mr-2" /> Refresh Page
          </Button>
          <Link href="/">
             <Button 
               variant="outline" 
               size="lg" 
               className="w-full sm:w-auto hover:bg-neutral-100"
             >
               <Home className="w-4 h-4 mr-2" /> Return Home
             </Button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
