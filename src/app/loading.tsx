'use client';

import { motion } from 'framer-motion';

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-neutral-950 overflow-hidden">
      {/* Technical Biosphere Grid */}
      <div className="absolute inset-0 opacity-[0.08]" style={{ 
        backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', 
        backgroundSize: '24px 24px' 
      }}></div>
      
      <div className="relative flex flex-col items-center">
        {/* Simplified Technical Progress */}
        <div className="w-20 h-20 mb-8 relative">
           <svg viewBox="0 0 24 24" fill="none" className="w-full h-full text-primary-400 drop-shadow-[0_0_10px_rgba(34,197,94,0.5)]">
              <motion.path
                d="M12 2C12 2 7 6.5 7 12C7 17.5 12 22 12 22M12 2C12 2 17 6.5 17 12C17 17.5 12 22 12 22M12 2V22"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              />
           </svg>
           <motion.div 
             animate={{ rotate: 360 }}
             transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
             className="absolute -inset-6 border-[1.5px] border-primary-500/10 border-t-primary-500/60 rounded-full"
           />
        </div>

        <div className="flex flex-col items-center gap-2">
          <span className="text-[10px] font-black text-white uppercase tracking-[0.4em] animate-pulse">
            Syncing Biosphere
          </span>
          <div className="w-32 h-[1px] bg-primary-950 overflow-hidden rounded-full border border-white/5">
             <motion.div 
               animate={{ x: ["-100%", "100%"] }}
               transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
               className="h-full w-full bg-gradient-to-r from-transparent via-primary-400 to-transparent"
             />
          </div>
        </div>
      </div>
    </div>
  );
}
