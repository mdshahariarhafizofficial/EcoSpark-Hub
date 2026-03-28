'use client';

import { ArrowLeft, ShieldAlert } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

export default function CancelPage() {
  return (
    <div className="min-h-screen bg-neutral-50 flex items-center justify-center p-4 pt-24">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full"
      >
         <Card className="p-10 flex flex-col items-center justify-center text-center shadow-lg border-none">
            <div className="w-20 h-20 bg-amber-50 text-amber-500 rounded-full flex items-center justify-center mb-6">
               <ShieldAlert className="w-10 h-10" />
            </div>
            
            <h1 className="text-3xl font-extrabold text-neutral-900 mb-3">Payment <span className="text-amber-500">Cancelled</span></h1>
            <p className="text-neutral-500 text-sm font-medium leading-relaxed mb-8">
               No funds were deducted. The initiative blueprints remain padlocked for now. You can try again whenever you're ready.
            </p>
            
            <div className="flex flex-col w-full gap-3">
               <Button 
                  variant="primary" 
                  className="w-full flex items-center justify-center gap-2"
                  onClick={() => window.history.back()}
               >
                  <ArrowLeft className="w-4 h-4" /> Try Again
               </Button>
               <Link href="/ideas" className="w-full">
                  <Button variant="outline" className="w-full">
                     View Market
                  </Button>
               </Link>
            </div>
         </Card>
      </motion.div>
    </div>
  );
}
