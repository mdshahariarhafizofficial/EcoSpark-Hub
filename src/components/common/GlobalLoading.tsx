'use client';

export default function GlobalLoading() {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white/60 dark:bg-neutral-950/60 backdrop-blur-sm">
       <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 border-4 border-emerald-100 dark:border-emerald-900 border-t-emerald-500 rounded-full animate-spin shadow-lg shadow-emerald-500/20" />
          <p className="text-sm font-black text-neutral-600 dark:text-neutral-400 uppercase tracking-[0.2em] animate-pulse">EcoSpark Synchronizing</p>
       </div>
    </div>
  );
}
