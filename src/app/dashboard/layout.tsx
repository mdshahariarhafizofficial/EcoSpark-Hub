'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { DashboardSidebar } from '@/components/layout/DashboardSidebar';
import { Leaf, Menu, X } from 'lucide-react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login');
    }
  }, [user, isLoading, router]);

  // Close sidebar on route change
  useEffect(() => {
    setIsSidebarOpen(false);
  }, []);

  if (isLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center animate-bounce">
            <Leaf className="w-8 h-8 text-primary-600" />
          </div>
          <p className="text-sm font-black text-neutral-400 uppercase tracking-widest">Initializing Hub...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50 flex">
      <DashboardSidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      <main className="flex-1 lg:ml-72 min-h-screen relative overflow-x-hidden">
        {/* Mobile Header (Hidden on Desktop) */}
        <div className="lg:hidden h-16 bg-white border-b border-neutral-200 px-6 flex items-center justify-between sticky top-0 z-30 shadow-sm">
          <Link href="/" className="flex items-center gap-2">
            <Leaf className="w-5 h-5 text-primary-600" />
            <span className="font-black text-lg tracking-tighter text-neutral-900">EcoSpark</span>
          </Link>
          <button 
             onClick={() => setIsSidebarOpen(true)}
             className="p-2 text-neutral-500 hover:text-primary-600 transition-colors"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>

        <div className="max-w-7xl mx-auto p-6 sm:p-10 lg:p-14">
          {children}
        </div>
      </main>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSidebarOpen(false)}
            className="fixed inset-0 bg-neutral-900/40 backdrop-blur-sm z-40 lg:hidden"
          />
        )}
      </AnimatePresence>
    </div>
  );
}
