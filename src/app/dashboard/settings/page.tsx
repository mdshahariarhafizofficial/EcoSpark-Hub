'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useState, useCallback } from 'react';
import { toast } from 'sonner';
import { 
  User, Mail, Camera, ShieldCheck, 
  Save, Loader2, Info, Sparkles,
  Link as LinkIcon, Github, Twitter
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Card } from '@/components/ui/Card';
import ImageUpload from '@/components/common/ImageUpload';
import { Badge } from '@/components/ui/Badge';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const settingsSchema = z.object({
  name: z.string().min(5, 'Name must be at least 5 characters'),
  bio: z.string().refine(val => !val || val.trim().split(/\s+/).length >= 10, 'Must be at least 10 words'),
});
type SettingsForm = z.infer<typeof settingsSchema>;

export default function SettingsPage() {
  const { user, updateProfile } = useAuth();
  const [isPending, setIsPending] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState(user?.avatar || '');
  const [avatarFile, setAvatarFile] = useState<File | null>(null);

  const handleAvatarChange = useCallback((remaining: string[], newFiles: File[]) => {
    setAvatarUrl(remaining[0] || '');
    setAvatarFile(newFiles[0] || null);
  }, []);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid },
  } = useForm<SettingsForm>({
    resolver: zodResolver(settingsSchema),
    mode: 'onTouched',
    defaultValues: {
      name: user?.name || '',
      bio: user?.bio || '',
    }
  });

  const onSubmit = async (data: SettingsForm) => {
    setIsPending(true);
    try {
      const formPayload = new FormData();
      formPayload.append('name', data.name);
      formPayload.append('bio', data.bio || '');
      if (avatarFile) {
        formPayload.append('avatar', avatarFile);
      } else {
        formPayload.append('avatar', avatarUrl);
      }
      await updateProfile(formPayload);
      toast.success('Identity synchronized successfully!');
    } catch (error: any) {
      if (error.errors) {
        Object.entries(error.errors).forEach(([field, message]) => {
          setError(field as any, { type: 'manual', message: message as string });
        });
        toast.error(error.message || 'Synchronization failed. Please check the fields.');
      } else {
        toast.error(error.message || 'Synchronization failed.');
      }
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-5 duration-700 pb-20">
      {/* 🛠️ Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-neutral-100 pb-10">
        <div className="space-y-4">
          <Badge className="bg-emerald-50 text-emerald-700 border-none text-[9px] font-black uppercase tracking-[0.3em] px-4 py-2">
             Member Configuration
          </Badge>
          <h1 className="text-4xl lg:text-5xl font-black text-neutral-950 tracking-tighter">
            Identity <br /> <span className="text-primary-600">Protocols.</span>
          </h1>
          <p className="text-neutral-500 font-medium max-w-xl text-lg leading-relaxed">
            Modify your institutional presence and synchronize your ecological credentials with the global network.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
         {/* Left Column - Main Settings */}
         <div className="lg:col-span-8 space-y-8">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
               <Card className="p-8 md:p-10 bg-white border-neutral-100 shadow-xl shadow-neutral-900/[0.02] rounded-[2.5rem]">
                  <h2 className="text-xs font-black text-neutral-400 uppercase tracking-widest mb-8 flex items-center gap-2">
                     <div className="w-1.5 h-1.5 rounded-full bg-primary-500" /> Core Authentication Data
                  </h2>
                  
                  <div className="space-y-6">
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Input
                           label="Public Name"
                           {...register('name')}
                           error={errors.name?.message}
                           placeholder="Your full name"
                           className="bg-neutral-50 border-neutral-200 rounded-2xl h-14 px-6 font-bold focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 transition-all outline-none"
                        />
                        <div className="space-y-1.5 opacity-60">
                           <label className="block text-sm font-black text-neutral-900 uppercase tracking-widest ml-1">Secure Email</label>
                           <div className="h-14 bg-neutral-100 border border-neutral-200 rounded-2xl px-6 flex items-center justify-between text-neutral-500 font-bold text-sm">
                              {user?.email} <ShieldCheck className="w-4 h-4 text-primary-600" />
                           </div>
                           <p className="text-[9px] text-neutral-400 font-bold uppercase tracking-widest ml-1">Restricted Field (Requires SSO Key)</p>
                        </div>
                     </div>

                     <Textarea
                        label="Institutional Bio"
                        {...register('bio')}
                        error={errors.bio?.message}
                        rows={5}
                        placeholder="Describe your ecological mission..."
                        className="bg-neutral-50 border-neutral-200 rounded-2xl px-6 py-4 font-medium focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 transition-all outline-none"
                     />
                  </div>
               </Card>

               <Card className="p-8 md:p-10 bg-white border-neutral-100 shadow-xl shadow-neutral-900/[0.02] rounded-[2.5rem]">
                  <h2 className="text-xs font-black text-neutral-400 uppercase tracking-widest mb-8 flex items-center gap-2">
                     <div className="w-1.5 h-1.5 rounded-full bg-primary-500" /> Visual Identity Node
                  </h2>
                  
                  <div className="flex flex-col gap-6">
                     <p className="text-xs text-neutral-400 font-medium flex items-center gap-2">
                        <Info className="w-4 h-4 text-primary-500" /> Synchronize a high-resolution image to represent your digital node.
                     </p>
                     <ImageUpload 
                        initialImages={avatarUrl ? [avatarUrl] : []}
                        onChange={handleAvatarChange}
                        maxFiles={1}
                     />
                  </div>
               </Card>

               <Button 
                  type="submit" 
                  variant="primary" 
                  size="lg" 
                  isLoading={isPending}
                  disabled={!isValid || isPending}
                  className="h-16 px-10 rounded-[2rem] text-xs font-black uppercase tracking-widest shadow-2xl shadow-primary-500/20 w-fit disabled:opacity-50"
               >
                  Update Identity <Save className="w-4 h-4 ml-2" />
               </Button>
            </form>
         </div>

         {/* Right Column - Status & Support */}
         <div className="lg:col-span-4 space-y-6">
            <Card className="p-8 bg-neutral-900 text-white rounded-[2.5rem] border-none relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-primary-500/10 rounded-full blur-3xl" />
               <div className="relative z-10 space-y-6">
                  <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-primary-400 border border-white/10">
                     <Sparkles className="w-6 h-6" />
                  </div>
                  <div>
                     <h3 className="text-xl font-black tracking-tight uppercase">Trust Score</h3>
                     <p className="text-neutral-400 text-xs font-bold uppercase tracking-widest mt-1">Institutional Index</p>
                  </div>
                  <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                     <div className="h-full w-[85%] bg-primary-500 shadow-[0_0_15px_rgba(16,185,129,0.5)]" />
                  </div>
                  <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
                     <span>850 / 1000 Pts</span>
                     <span className="text-primary-400">High Reliability</span>
                  </div>
               </div>
            </Card>

            <Card className="p-8 bg-white border-neutral-100 rounded-[2.5rem] shadow-sm">
               <h3 className="text-xs font-black text-neutral-400 uppercase tracking-widest mb-6 border-b border-neutral-50 pb-4">Linked Nodes</h3>
               <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-neutral-50 rounded-2xl group cursor-pointer hover:bg-neutral-100 transition-all">
                     <div className="flex items-center gap-3">
                        <Github className="w-5 h-5 text-neutral-900" />
                        <span className="text-xs font-black uppercase tracking-widest">Github</span>
                     </div>
                     <LinkIcon className="w-4 h-4 text-neutral-300 group-hover:text-primary-600 transition-colors" />
                  </div>
                  <div className="flex items-center justify-between p-4 bg-neutral-50 rounded-2xl group cursor-pointer hover:bg-neutral-100 transition-all">
                     <div className="flex items-center gap-3">
                        <Twitter className="w-5 h-5 text-[#1DA1F2]" />
                        <span className="text-xs font-black uppercase tracking-widest">Twitter (X)</span>
                     </div>
                     <LinkIcon className="w-4 h-4 text-neutral-300 group-hover:text-primary-600 transition-colors" />
                  </div>
               </div>
            </Card>
         </div>
      </div>
    </div>
  );
}
