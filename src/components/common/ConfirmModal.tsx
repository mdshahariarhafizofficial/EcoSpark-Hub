'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, X } from 'lucide-react';

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  isDanger?: boolean;
}

export default function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  isDanger = true
}: ConfirmModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="w-full max-w-md bg-white rounded-[2rem] shadow-2xl overflow-hidden border border-neutral-100"
          >
            <div className="p-8">
              <div className="flex justify-between items-start mb-6">
                 <div className={`p-3 rounded-2xl ${isDanger ? 'bg-red-50 text-red-500' : 'bg-emerald-50 text-emerald-500'}`}>
                    <AlertCircle className="w-6 h-6" />
                 </div>
                 <button onClick={onClose} className="p-2 hover:bg-neutral-100 rounded-xl transition-colors">
                    <X className="w-5 h-5 text-neutral-400" />
                 </button>
              </div>
              
              <h3 className="text-2xl font-black text-neutral-900 mb-2">{title}</h3>
              <p className="text-neutral-500 font-medium leading-relaxed">{message}</p>
              
              <div className="mt-10 flex gap-4">
                 <button
                    onClick={onClose}
                    className="flex-1 py-4 bg-neutral-100 text-neutral-900 font-black rounded-2xl hover:bg-neutral-200 transition-all active:scale-95"
                 >
                    {cancelText}
                 </button>
                 <button
                    onClick={() => { onConfirm(); onClose(); }}
                    className={`flex-1 py-4 text-white font-black rounded-2xl transition-all active:scale-95 shadow-lg ${isDanger ? 'bg-red-500 hover:bg-red-600 shadow-red-500/20' : 'bg-emerald-500 hover:bg-emerald-600 shadow-emerald-500/20'}`}
                 >
                    {confirmText}
                 </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
