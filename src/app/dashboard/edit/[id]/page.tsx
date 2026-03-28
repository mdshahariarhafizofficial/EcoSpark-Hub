'use client';

import { use, useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useQuery, useMutation } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { toast } from 'sonner';
import { Leaf, DollarSign, Info, Loader2, Save, X, Sparkles, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ImageUpload from '@/components/common/ImageUpload';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const ideaSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters'),
  categoryId: z.string().min(1, 'Please select a category'),
  problemStatement: z.string().refine(val => val.trim().split(/\s+/).length >= 10, 'Must be at least 10 words'),
  solution: z.string().refine(val => val.trim().split(/\s+/).length >= 10, 'Must be at least 10 words'),
  description: z.string().refine(val => val.trim().split(/\s+/).length >= 10, 'Must be at least 10 words'),
  isPaid: z.boolean(),
  price: z.string().optional(),
}).refine(data => !data.isPaid || (data.price && Number(data.price) > 0), {
  message: "Price is required for premium protocols",
  path: ["price"]
});
type IdeaForm = z.infer<typeof ideaSchema>;

export default function EditIdea({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { id } = use(params);
  const [newFiles, setNewFiles] = useState<File[]>([]);
  const [remainingImages, setRemainingImages] = useState<string[]>([]);

  const handleImageSync = useCallback((remaining: string[], files: File[]) => {
    setRemainingImages(remaining);
    setNewFiles(files);
  }, []);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    setError,
    formState: { errors, isValid },
  } = useForm<IdeaForm>({
    resolver: zodResolver(ideaSchema),
    mode: 'onTouched',
  });

  const isPaidWatch = watch('isPaid');

  const { data: ideaRes, isLoading: ideaLoading } = useQuery({
    queryKey: ['idea', 'edit', id],
    queryFn: () => api.get(`/ideas/${id}`).then(res => res.data),
  });

  const { data: categories } = useQuery({
    queryKey: ['categories'],
    queryFn: () => api.get('/categories').then(res => res.data),
  });

  useEffect(() => {
    if (ideaRes?.data) {
      const idea = ideaRes.data;
      reset({
        title: idea.title,
        categoryId: idea.categoryId,
        problemStatement: idea.problemStatement,
        solution: idea.solution,
        description: idea.description,
        isPaid: idea.isPaid,
        price: idea.price?.toString() || '',
      });
      setRemainingImages(idea.images || []);
    }
  }, [ideaRes, reset]);

  const updateMutation = useMutation({
    mutationFn: (data: FormData) => api.patch(`/ideas/${id}`, data, {
      headers: { 'Content-Type': 'multipart/form-data' }
    }),
    onSuccess: () => {
      toast.success('Initiative updated successfully!');
      router.push('/dashboard/registry');
    },
    onError: (error: any) => {
      if (error.errors) {
        Object.entries(error.errors).forEach(([field, message]) => {
          setError(field as any, { type: 'manual', message: message as string });
        });
        toast.error(error.message || 'Validation failed. Please check the highlighted fields.');
      } else {
        const message = error.message || 'An unexpected error occurred. Please try again.';
        toast.error(message);
      }
    },
  });

  const onSubmit = (data: IdeaForm) => {
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('categoryId', data.categoryId);
    formData.append('problemStatement', data.problemStatement);
    formData.append('solution', data.solution);
    formData.append('description', data.description);
    formData.append('isPaid', String(data.isPaid));
    if (data.isPaid && data.price) {
      formData.append('price', data.price);
    }

    // Handle images: send remaining URLs as body, new Files as uploads
    remainingImages.forEach(url => formData.append('images', url));
    newFiles.forEach(file => formData.append('images', file));

    updateMutation.mutate(formData);
  };

  if (ideaLoading) return (
     <div className="min-h-screen flex flex-col items-center justify-center bg-neutral-50 gap-4">
        <Loader2 className="w-10 h-10 text-emerald-500 animate-spin" />
        <p className="text-neutral-400 font-bold uppercase tracking-widest text-xs">Retrieving Blueprint...</p>
     </div>
  );

  return (
    <div className="min-h-screen bg-neutral-50/50 py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto mt-12">
        
        {/* Header Section - MATCH NEW IDEA */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
           <div>
              <motion.div 
                 initial={{ opacity: 0, x: -20 }}
                 animate={{ opacity: 1, x: 0 }}
                 className="flex items-center gap-2 text-emerald-600 font-black text-[10px] uppercase tracking-widest mb-4"
              >
                 <Sparkles className="w-4 h-4" /> EcoSpark Hub Revision Tool
              </motion.div>
              <h1 className="text-4xl md:text-6xl font-black text-neutral-900 tracking-tightest leading-none">Modify <br /> Existing <span className="text-emerald-500 font-serif italic">Blueprint.</span></h1>
           </div>
           <div className="flex gap-4">
              <button 
                type="button"
                onClick={() => router.back()} 
                className="p-5 bg-white border border-neutral-100 rounded-[1.5rem] text-neutral-400 hover:text-red-500 transition-all shadow-sm hover:rotate-90"
              >
                 <X className="w-6 h-6" />
              </button>
           </div>
        </div>
        
        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
           
           {/* Main Form Left Column */}
           <div className="lg:col-span-8 flex flex-col gap-8">
              <section className="card-premium p-8 md:p-10 bg-white shadow-sm border border-neutral-100 rounded-[2.5rem]">
                 <h2 className="text-xs font-black text-neutral-400 uppercase tracking-widest mb-8 flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Identity Synchronization
                 </h2>
                 
                 <div className="space-y-6">
                    <Input
                       label="Initiative Title"
                       required 
                       type="text"
                       {...register('title')}
                       error={errors.title?.message}
                       placeholder="Update the title..."
                       className="bg-neutral-50 border-neutral-200 h-16 text-lg font-bold placeholder:font-normal"
                    />

                    <div className="space-y-2">
                       <label className="block text-sm font-bold text-neutral-800 tracking-tight ml-1">Biosphere Domain</label>
                       <select
                          required
                          {...register('categoryId')}
                          className="w-full h-16 bg-neutral-50 border-2 border-neutral-200 text-neutral-900 rounded-2xl px-6 outline-none transition-all duration-300 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 font-bold text-lg appearance-none cursor-pointer"
                       >
                          <option value="" disabled>Select Segment</option>
                          {categories?.map((c: any) => <option key={c.id} value={c.id}>{c.name}</option>)}
                       </select>
                       {errors.categoryId?.message && (
                          <div className="flex items-center gap-1.5 ml-1 animate-in fade-in slide-in-from-top-1 duration-200 pt-1">
                             <span className="text-xs font-bold text-red-600 uppercase tracking-wider">{errors.categoryId.message as string}</span>
                          </div>
                       )}
                    </div>
                 </div>
              </section>

              <section className="card-premium p-8 md:p-10 bg-white shadow-sm border border-neutral-100 rounded-[2.5rem]">
                 <h2 className="text-xs font-black text-neutral-400 uppercase tracking-widest mb-8 flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Protocol Documentation
                 </h2>
                 
                 <div className="space-y-6">
                    <Textarea
                       label="The Critical Problem"
                       required 
                       {...register('problemStatement')}
                       error={errors.problemStatement?.message}
                       rows={3}
                       className="bg-neutral-50 border-neutral-200 font-bold p-6 text-lg focus:border-emerald-500 focus:ring-emerald-500/10"
                    />

                    <Textarea
                       label="The Proposed Solution"
                       required 
                       {...register('solution')}
                       error={errors.solution?.message}
                       rows={3}
                       className="bg-neutral-50 border-neutral-200 font-bold p-6 text-lg focus:border-emerald-500 focus:ring-emerald-500/10"
                    />

                    <Textarea
                       label="Technical Implementation"
                       required 
                       {...register('description')}
                       error={errors.description?.message}
                       rows={10}
                       className="bg-neutral-50 border-neutral-200 font-medium p-6 text-base focus:border-emerald-500 focus:ring-emerald-500/10"
                    />
                 </div>
              </section>
           </div>

           {/* Sticky Right Column - Media & Monetization */}
           <div className="lg:col-span-4 sticky top-24 flex flex-col gap-6">
              <section className="card-premium p-8 bg-white shadow-sm border border-neutral-100 rounded-[2.5rem] overflow-visible">
                 <h3 className="text-xs font-black text-neutral-400 uppercase tracking-widest mb-6 border-b border-neutral-100 pb-4">Media Layer</h3>
                 <ImageUpload 
                    initialImages={remainingImages} 
                    onChange={(remaining, files) => {
                       setRemainingImages(remaining);
                       setNewFiles(files);
                    }} 
                 />
                 <p className="text-[10px] text-neutral-400 font-bold uppercase tracking-widest mt-4 flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Update visual assets for validation.
                 </p>
              </section>

              <section className="card-premium p-8 bg-neutral-900 text-white group overflow-hidden relative rounded-[2.5rem]">
                 <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl" />
                 <h3 className="text-xs font-black text-emerald-400 uppercase tracking-widest mb-6 border-b border-white/10 pb-4">Monetization Protocol</h3>
                 
                 <label className="flex items-center gap-4 cursor-pointer mb-6 p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all">
                    <div className="relative">
                        <input
                           type="checkbox"
                           {...register('isPaid')}
                           className="peer sr-only"
                        />
                       <div className="w-12 h-6 bg-neutral-700 rounded-full peer-checked:bg-emerald-500 transition-colors" />
                       <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-6 shadow-md" />
                    </div>
                    <div>
                       <span className="block text-sm font-black uppercase tracking-widest">Premium Tier</span>
                       <span className="text-[10px] text-neutral-400 font-bold">Require payment to unlock.</span>
                    </div>
                 </label>

                 <AnimatePresence>
                     {isPaidWatch && (
                       <motion.div 
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          className="space-y-4"
                       >
                          <label className="text-[10px] font-black text-emerald-400 uppercase tracking-widest block ml-1">Unlock Price (USD)</label>
                          <div className="relative">
                             <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-neutral-500">
                                <DollarSign className="w-5 h-5" />
                             </div>
                              <input
                                 type="number"
                                 min="1"
                                 step="0.01"
                                 {...register('price')}
                                 required={isPaidWatch}
                                 placeholder="49.99"
                                 className="w-full pl-12 pr-6 py-4 bg-neutral-800 border border-neutral-700 rounded-2xl text-white font-mono text-xl focus:border-emerald-500 outline-none transition-all"
                              />
                           </div>
                           {errors.price?.message && <p className="mt-1.5 text-[10px] uppercase font-black tracking-widest text-red-500">{errors.price.message as string}</p>}
                       </motion.div>
                    )}
                 </AnimatePresence>
              </section>

              <button
                 type="submit"
                 disabled={!isValid || updateMutation.isPending}
                 className="w-full py-5 rounded-[2rem] text-xl font-black bg-emerald-500 text-white hover:bg-emerald-600 flex items-center justify-center gap-3 shadow-2xl shadow-emerald-500/20 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                 {updateMutation.isPending ? (
                    <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin" />
                 ) : (
                    <>
                       PATCH BLUEPRINT <Save className="w-6 h-6" />
                    </>
                 )}
              </button>

              <p className="text-center text-[10px] text-neutral-400 font-black uppercase tracking-widest flex items-center justify-center gap-2">
                 <ShieldCheck className="w-4 h-4 text-emerald-500" /> Authorized Revision Channel
              </p>
           </div>
        </form>
      </div>
    </div>
  );
}
