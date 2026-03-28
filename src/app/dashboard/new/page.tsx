'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { toast } from 'sonner';
import { DollarSign, Info, ShieldCheck, Zap, Sparkles, CheckCircle2, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ImageUpload from '@/components/common/ImageUpload';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Card } from '@/components/ui/Card';
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

export default function NewIdea() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [images, setImages] = useState<(string | File)[]>([]);
  
  const handleImageChange = useCallback((_: string[], newFiles: File[]) => {
    setImages(newFiles);
  }, []);

  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors, isValid },
  } = useForm<IdeaForm>({
    resolver: zodResolver(ideaSchema),
    mode: 'onTouched',
    defaultValues: {
      title: '',
      categoryId: '',
      problemStatement: '',
      solution: '',
      description: '',
      isPaid: false,
      price: '',
    }
  });

  const isPaidWatch = watch('isPaid');

  const { data: categories, isLoading: categoriesLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: () => api.get('/categories').then(res => res.data),
  });

  const createMutation = useMutation({
    mutationFn: (data: FormData) => api.post('/ideas', data, {
      headers: { 'Content-Type': 'multipart/form-data' }
    }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ideas'] });
      queryClient.invalidateQueries({ queryKey: ['myIdeas'] });
      toast.success('Initiative Submitted successfully!');
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

    images.forEach((file: any) => {
      if (file instanceof File) {
        formData.append('images', file);
      }
    });

    createMutation.mutate(formData);
  };

  if (categoriesLoading) return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-50 font-medium text-neutral-500">
      Loading Categories...
    </div>
  );

  return (
    <div className="min-h-screen bg-neutral-50 py-12 px-4 sm:px-6 lg:px-8 mt-16">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
           <div>
              <div className="flex items-center gap-2 text-primary-600 font-bold text-sm mb-3">
                 <Sparkles className="w-4 h-4" /> Start a New Initiative
              </div>
              <h1 className="text-3xl md:text-5xl font-extrabold text-neutral-900 tracking-tight">
                 Submit your Project
              </h1>
           </div>
           <div className="hidden md:block text-right">
              <p className="text-sm text-neutral-500 font-medium">
                 Estimated review time:<br />
                 <span className="text-neutral-900 font-bold">48-72 Hours</span>
              </p>
           </div>
        </div>
        
        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
           
           {/* Main Form Left Column */}
           <div className="lg:col-span-8 flex flex-col gap-8">
              <Card className="p-8">
                 <h2 className="text-base font-bold text-neutral-900 border-b border-neutral-100 pb-4 mb-6">
                    Core Information
                 </h2>
                 
                 <div className="space-y-6">
                    <Input
                       label="Initiative Title"
                       required 
                       type="text"
                       {...register('title')}
                       error={errors.title?.message}
                       placeholder="e.g. Decentralized Solar Desalination"
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                       <div className="space-y-2">
                          <label className="block text-sm font-bold text-neutral-800 tracking-tight ml-1">Category</label>
                           <select
                              required
                              {...register('categoryId')}
                              className="w-full h-12 bg-white border-2 border-neutral-100 text-neutral-900 rounded-2xl px-5 outline-none transition-all duration-300 focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10 font-medium appearance-none cursor-pointer"
                           >
                              <option value="" disabled>Select Segment</option>
                              {categories?.map((c: any) => <option key={c.id} value={c.id}>{c.name}</option>)}
                           </select>
                           {errors.categoryId?.message && <p className="animate-in fade-in slide-in-from-top-1 duration-200 text-xs font-bold text-red-600 uppercase tracking-wider ml-1 mt-1">{errors.categoryId.message as string}</p>}
                       </div>
                       
                       <div className="space-y-2">
                          <label className="block text-sm font-bold text-neutral-800 tracking-tight ml-1">Impact Potential</label>
                          <div className="w-full h-12 bg-neutral-50 border-2 border-neutral-100 border-dashed rounded-2xl px-5 text-neutral-500 font-medium flex items-center justify-between pointer-events-none">
                             Community Validated <Zap className="w-4 h-4 text-emerald-500" />
                          </div>
                       </div>
                    </div>
                 </div>
              </Card>

              <Card className="p-8">
                 <h2 className="text-base font-bold text-neutral-900 border-b border-neutral-100 pb-4 mb-6">
                    Blueprint Details
                 </h2>
                 
                 <div className="space-y-6">
                    <Textarea
                       label="The Problem"
                       required 
                       {...register('problemStatement')}
                       error={errors.problemStatement?.message}
                       rows={3}
                       placeholder="What environmental vacuum does this fill?"
                    />

                    <Textarea
                       label="The Proposed Solution"
                       required 
                       {...register('solution')}
                       error={errors.solution?.message}
                       rows={3}
                       placeholder="Describe the atomic spark of your idea."
                    />

                    <Textarea
                       label="Technical Implementation"
                       required 
                       {...register('description')}
                       error={errors.description?.message}
                       rows={8}
                       placeholder="Full technical specifications, materials required, and implementation lifecycle..."
                    />
                 </div>
              </Card>
           </div>

            {/* Sticky Right Column - Media & Monetization */}
            <div className="lg:col-span-4 lg:sticky lg:top-24 flex flex-col gap-8">
               <Card className="p-6">
                  <h3 className="text-sm font-bold text-neutral-900 border-b border-neutral-100 pb-3 mb-6">Media Upload</h3>
                  <div className="rounded-xl overflow-hidden mb-4">
                     <ImageUpload 
                        onChange={handleImageChange} 
                     />
                  </div>
                  <p className="text-xs text-neutral-500 flex items-start gap-2">
                     <Info className="w-4 h-4 text-primary-500 shrink-0" /> Synchronize up to 5 high-resolution blueprint captures for validation.
                  </p>
               </Card>
 
               <Card className="p-6 bg-neutral-900 border-none text-white overflow-hidden relative">
                  <h3 className="text-sm font-bold text-white border-b border-white/10 pb-3 mb-6">Licensing Protocol</h3>
                  
                  <label className="flex items-start gap-3 cursor-pointer mb-6 group">
                     <div className="relative flex items-start pt-0.5">
                        <input
                           type="checkbox"
                           {...register('isPaid')}
                           className="sr-only peer"
                        />
                        <div className="w-10 h-5 bg-neutral-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary-500 ring-2 ring-transparent peer-focus:ring-primary-500/30"></div>
                     </div>
                     <div className="flex-grow">
                        <span className="block text-sm font-bold">Premium Asset</span>
                        <span className="text-xs text-neutral-400">Require payment to unlock the full documentation.</span>
                     </div>
                  </label>
 
                  <AnimatePresence>
                     {isPaidWatch && (
                        <motion.div 
                           initial={{ opacity: 0, height: 0 }}
                           animate={{ opacity: 1, height: 'auto' }}
                           exit={{ opacity: 0, height: 0 }}
                           className="space-y-2 overflow-hidden"
                        >
                           <label className="text-xs font-semibold text-neutral-300 block">Unlock Price (USD)</label>
                           <div className="relative group">
                              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                 <DollarSign className="h-4 w-4 text-neutral-400" />
                              </div>
                               <input
                                 type="number"
                                 min="1"
                                 step="0.01"
                                 {...register('price')}
                                 required={isPaidWatch}
                                 placeholder="49.99"
                                 className="block w-full pl-9 pr-3 py-2 bg-neutral-800 border border-neutral-700 rounded-lg text-white placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-primary-500 sm:text-sm"
                              />
                           </div>
                           {errors.price?.message && <p className="mt-1.5 text-sm font-medium text-red-500">{errors.price.message as string}</p>}
                        </motion.div>
                     )}
                  </AnimatePresence>
               </Card>
 
               <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  isLoading={createMutation.isPending}
                  disabled={!isValid || createMutation.isPending}
                  className="w-full flex items-center justify-center gap-2 disabled:opacity-50"
               >
                  Publish Initiative <CheckCircle2 className="w-5 h-5" />
               </Button>
 
               <div className="flex items-center justify-center gap-4 text-xs font-semibold text-neutral-400">
                  <div className="flex items-center gap-1.5">
                     <ShieldCheck className="w-4 h-4 text-neutral-400" /> Secure
                  </div>
                  <div className="flex items-center gap-1.5">
                     <Clock className="w-4 h-4 text-neutral-400" /> Quick Review
                  </div>
               </div>
            </div>
        </form>
      </div>
    </div>
  );
}
