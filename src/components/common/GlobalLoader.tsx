'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, animate } from 'framer-motion';

export function GlobalLoader() {
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialMount, setIsInitialMount] = useState(true);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (isInitialMount) {
      setIsLoading(true);
      
      // Technical Counter Animation
      const controls = animate(0, 100, {
        duration: 2.2,
        onUpdate: (value) => setCount(Math.floor(value)),
        onComplete: () => {
          setTimeout(() => {
            setIsLoading(false);
            setIsInitialMount(false);
          }, 400);
        }
      });

      return () => controls.stop();
    }

    // Faster state transition for subsequent route changes
    setIsLoading(true);
    const timeout = setTimeout(() => setIsLoading(false), 900);
    return () => clearTimeout(timeout);
  }, [pathname]);

  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        <motion.div
          key="ultra-loader"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ 
            opacity: 0, 
            scale: 1.1,
            filter: "blur(20px)",
            transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } 
          }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-primary-950 overflow-hidden"
        >
          {/* Technical Biosphere Grid (Dot Background) */}
          <div className="absolute inset-0 opacity-[0.12]" style={{ 
            backgroundImage: 'radial-gradient(circle at 1.5px 1.5px, white 1.5px, transparent 0)', 
            backgroundSize: '32px 32px' 
          }}></div>
          
          {/* Animated Glow Halo */}
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1.5, opacity: 0.25 }}
            transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
            className="absolute w-[800px] h-[800px] bg-primary-500/30 rounded-full blur-[150px] pointer-events-none"
          />

          <div className="relative flex flex-col items-center">
            {/* SVG Drawing Logo */}
            <div className="w-24 h-24 mb-12 relative">
              <svg viewBox="0 0 24 24" fill="none" className="w-full h-full text-primary-400 drop-shadow-[0_0_20px_rgba(34,197,94,0.8)]">
                <motion.path
                  d="M12 2C12 2 7 6.5 7 12C7 17.5 12 22 12 22M12 2C12 2 17 6.5 17 12C17 17.5 12 22 12 22M12 2V22"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 1.8, ease: "easeInOut" }}
                />
                <motion.path
                  d="M12 8L15 11M12 11L9 14"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 0.8 }}
                  transition={{ duration: 1.2, delay: 0.6, ease: "easeInOut" }}
                />
              </svg>
              
              {/* Outer Scanning Ring */}
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                className="absolute -inset-10 border-[1.5px] border-primary-500/30 rounded-full"
              />
              <motion.div 
                animate={{ rotate: -360 }}
                transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                className="absolute -inset-14 border-[1.5px] border-secondary-500/20 rounded-full border-dashed"
              />
            </div>

            {/* Technical Counter */}
            <div className="flex flex-col items-center gap-4">
              <div className="relative">
                <span className="text-6xl font-black tabular-nums tracking-tighter text-white font-mono drop-shadow-lg">
                  {count.toString().padStart(2, '0')}<span className="text-primary-400">%</span>
                </span>
                <motion.div 
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 2.2, ease: "easeInOut" }}
                  className="absolute -bottom-4 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary-500 to-transparent"
                />
              </div>
              
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-[11px] font-black text-white uppercase tracking-[0.6em] mt-6 flex items-center gap-3 drop-shadow-md"
              >
                <span className="w-1.5 h-1.5 bg-primary-400 rounded-full animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.8)]" />
                Biosphere Initializing
                <span className="w-1.5 h-1.5 bg-primary-400 rounded-full animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.8)]" />
              </motion.p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
