'use client';

import { FileSearch, ArrowLeft, Home } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';

export default function NotFound() {
  return (
    <div className="min-h-screen pt-24 pb-12 flex flex-col items-center justify-center bg-neutral-50 px-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="max-w-lg w-full text-center space-y-8"
      >
        <div className="relative inline-flex items-center justify-center">
          <div className="absolute inset-0 bg-primary-500/20 blur-2xl rounded-full" />
          <div className="relative p-8 bg-white rounded-3xl shadow-lg border border-neutral-100">
            <FileSearch className="w-20 h-20 text-primary-500" strokeWidth={1.5} />
            <div className="absolute -top-3 -right-3 bg-red-500 text-white text-[10px] font-bold px-3 py-1.5 rounded-full shadow-sm uppercase tracking-widest">
              404
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <h1 className="text-4xl md:text-5xl font-extrabold text-neutral-900 tracking-tight">
             Page <span className="text-primary-600">Not Found</span>
          </h1>
          <p className="text-lg text-neutral-600 font-medium">
             The initiative or page you're looking for has been moved or no longer exists.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <Link href="/">
             <Button variant="primary" size="lg" className="w-full sm:w-auto">
               <Home className="w-4 h-4 mr-2" /> Back to Home
             </Button>
          </Link>
          <Button 
            variant="outline" 
            size="lg" 
            onClick={() => window.history.back()}
            className="w-full sm:w-auto hover:text-primary-600 hover:border-primary-200 hover:bg-primary-50"
          >
            <ArrowLeft className="w-4 h-4 mr-2" /> Previous Page
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
