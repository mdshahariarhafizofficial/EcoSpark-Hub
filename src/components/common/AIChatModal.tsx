'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Sparkles, Loader2 } from 'lucide-react';
import { api } from '@/lib/api';

type Message = {
  role: 'user' | 'model';
  content: string;
};

export default function AIChatModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', content: "Hi! I'm your EcoSpark Assistant. How can I help you today?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      // Direct call to /api/chat for mock AI response
      const res = await api.post('/chat', { message: userMessage });
      
      if ((res as any).success) {
         setMessages(prev => [...prev, { role: 'model', content: (res as any).message }]);
      } else {
         throw new Error('Failed to get response');
      }
    } catch (err: any) {
      console.error('Frontend AI Chat Error:', err);
      const errorMessage = err.response?.data?.message || err.message || "I'm having trouble connecting to the AI system. Please ensure the API is configured correctly or try again later.";
      setMessages(prev => [...prev, { role: 'model', content: errorMessage }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2, type: "spring", bounce: 0.3 }}
            className="mb-4 bg-white w-[350px] sm:w-[400px] rounded-2xl shadow-2xl border border-neutral-100 overflow-hidden flex flex-col"
            style={{ height: '550px', maxHeight: 'calc(100vh - 120px)' }}
          >
            {/* Header */}
            <div className="bg-primary-600 p-4 flex items-center justify-between text-white shrink-0">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-primary-200" />
                <h3 className="font-bold text-base tracking-tight">EcoSpark Assistant</h3>
              </div>
              <button onClick={() => setIsOpen(false)} className="hover:bg-primary-700 p-1.5 rounded-lg transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-5 bg-neutral-50 scroll-smooth">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div 
                    className={`max-w-[85%] p-3.5 rounded-2xl ${
                      msg.role === 'user' 
                        ? 'bg-primary-600 text-white rounded-br-sm shadow-sm' 
                        : 'bg-white border border-neutral-200 text-neutral-800 rounded-bl-sm shadow-sm'
                    }`}
                  >
                    <p className={`text-[14px] whitespace-pre-wrap leading-relaxed ${msg.role === 'user' ? 'font-medium font-sans' : 'font-sans'}`}>
                      {msg.content}
                    </p>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white border border-neutral-200 text-neutral-500 p-3.5 rounded-2xl rounded-bl-sm shadow-sm flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin text-primary-500" />
                    <span className="text-xs font-bold tracking-widest uppercase">Typing</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} className="h-2" />
            </div>

            {/* Input Form */}
            <form onSubmit={handleSend} className="p-3 bg-white border-t border-neutral-100 flex gap-2 shrink-0">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about sustainability..."
                className="flex-1 bg-neutral-100 border-2 border-transparent focus:bg-white focus:border-primary-500 px-4 py-3 rounded-xl text-[14px] font-medium transition-all outline-none"
                disabled={isLoading}
              />
              <button 
                type="submit" 
                disabled={!input.trim() || isLoading}
                className="bg-primary-600 text-white w-12 h-12 rounded-xl hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center shrink-0 shadow-sm"
              >
                <Send className="w-5 h-5 ml-1" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-gradient-to-tr from-primary-600 to-secondary-500 text-white rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.2)] flex items-center justify-center hover:shadow-primary-500/40 transition-shadow border-2 border-white relative z-50"
        aria-label="Toggle AI Assistant"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
               <X className="w-6 h-6" />
            </motion.div>
          ) : (
            <motion.div key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
               <MessageSquare className="w-6 h-6" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
