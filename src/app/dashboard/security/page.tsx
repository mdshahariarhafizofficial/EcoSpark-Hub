'use client';

import { useAuth } from '@/contexts/AuthContext';
import { 
  Lock, ShieldCheck, Key, Eye, EyeOff, 
  Smartphone, Fingerprint, LogOut, 
  ChevronRight, AlertCircle, ShieldAlert,
  ArrowUpRight
} from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { api } from '@/lib/api';
import { useState } from 'react';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const securitySchema = z.object({
  password: z.string().min(8, 'Password must be at least 8 characters'),
});
type SecurityForm = z.infer<typeof securitySchema>;

export default function SecurityPage() {
  const { user, logout } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<SecurityForm>({
    resolver: zodResolver(securitySchema),
    mode: 'onTouched',
    defaultValues: {
      password: '',
    }
  });

  const onSubmit = async (data: SecurityForm) => {
    setIsUpdating(true);
    // Simulating institutional security handshake
    setTimeout(() => {
       toast.success('Security identity updated successfully.');
       setIsUpdating(false);
    }, 1500);
  };

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-5 duration-700">
      {/* 📒 Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-neutral-100 pb-10">
        <div className="space-y-4">
          <Badge className="bg-secondary-50 text-secondary-700 border-none text-[9px] font-black uppercase tracking-[0.3em] px-4 py-2">
             Identity & Integirty
          </Badge>
          <h1 className="text-4xl lg:text-5xl font-black text-neutral-950 tracking-tighter">
            Security <br /> <span className="text-primary-600">Protocols.</span>
          </h1>
          <p className="text-neutral-500 font-medium max-w-xl text-lg leading-relaxed">
            Manage your biometric-tier institutional credentials and monitor your biosphere audit tier status.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
         {/* Identity Hub */}
         <div className="lg:col-span-8 space-y-10">
            <Card className="bg-white rounded-[3rem] border border-neutral-100 overflow-hidden shadow-xl shadow-neutral-950/[0.02]">
               <CardContent className="p-10 space-y-8">
                  <div className="flex items-center gap-4 border-b border-neutral-50 pb-8">
                     <div className="w-14 h-14 bg-neutral-950 rounded-[1.5rem] flex items-center justify-center text-white shadow-2xl shadow-neutral-950/20">
                        <Lock className="w-7 h-7" />
                     </div>
                     <div>
                        <h3 className="text-xl font-black text-neutral-950 tracking-tight uppercase">Credential Hub</h3>
                        <p className="text-xs font-bold text-neutral-400">Institutional Identity Lockdown Status: <span className="text-primary-600 uppercase tracking-widest">Active</span></p>
                     </div>
                  </div>

                  <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
                        <Input
                           label="Institutional Password"
                           id="password"
                           type={showPassword ? "text" : "password"} 
                           {...register('password')}
                           icon={<Key className="w-5 h-5" />}
                           placeholder="••••••••••••"
                           error={errors.password?.message}
                           className="bg-neutral-50 border-neutral-200 focus:border-primary-200"
                           rightElement={
                              <button 
                                 type="button"
                                 onClick={() => setShowPassword(!showPassword)}
                                 className="text-neutral-400 hover:text-primary-600 transition-colors"
                              >
                                 {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                              </button>
                           }
                        />

                        <Input
                           label="Audit Recovery Key"
                           id="recovery"
                           type="text" 
                           readOnly
                           icon={<ShieldCheck className="w-5 h-5 text-primary-500" />}
                           className="bg-neutral-100 border-neutral-200 text-[10px] font-black uppercase tracking-widest"
                           value="ES-NODE-VERIFY-0012-P-A"
                        />

                     <div className="md:col-span-2 pt-4">
                        <Button 
                           variant="primary" 
                           className="w-fit h-14 px-10 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-2xl shadow-primary-500/10 disabled:opacity-50"
                           disabled={!isValid || isUpdating}
                        >
                           {isUpdating ? 'Synchronizing Protocols...' : 'Commit Security Update'}
                        </Button>
                     </div>
                  </form>
               </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-black">
               <Card className="bg-white rounded-[2.5rem] border border-neutral-100 overflow-hidden shadow-xl shadow-neutral-950/[0.02]">
                  <CardContent className="p-8 space-y-6">
                     <div className="flex justify-between items-start">
                        <div className="w-12 h-12 bg-neutral-50 rounded-2xl flex items-center justify-center text-neutral-900 border border-neutral-100 shadow-inner">
                           <Smartphone className="w-6 h-6" />
                        </div>
                        <Badge className="bg-primary-50 text-primary-700 border-none font-black text-[8px] uppercase tracking-widest px-3 py-1">Active Hub</Badge>
                     </div>
                     <div>
                        <h4 className="text-lg font-black text-neutral-950 tracking-tight uppercase leading-none mb-1">Mobile Secure Node</h4>
                        <p className="text-xs font-medium text-neutral-500">Authorized biometric-linked mobile biosphere access node.</p>
                     </div>
                     <button className="text-[10px] font-black text-primary-600 uppercase tracking-widest hover:underline flex items-center gap-2">
                        Deauthorize Node <ChevronRight className="w-3 h-3" />
                     </button>
                  </CardContent>
               </Card>

               <Card className="bg-white rounded-[2.5rem] border border-neutral-100 overflow-hidden shadow-xl shadow-neutral-950/[0.02]">
                  <CardContent className="p-8 space-y-6">
                     <div className="flex justify-between items-start">
                        <div className="w-12 h-12 bg-neutral-50 rounded-2xl flex items-center justify-center text-neutral-900 border border-neutral-100 shadow-inner">
                           <Fingerprint className="w-6 h-6" />
                        </div>
                        <Badge className="bg-neutral-100 text-neutral-400 border-none font-black text-[8px] uppercase tracking-widest px-3 py-1">Inactive</Badge>
                     </div>
                     <div>
                        <h4 className="text-lg font-black text-neutral-950 tracking-tight uppercase leading-none mb-1">Passkey Integrity</h4>
                        <p className="text-xs font-medium text-neutral-500">Enable passwordless institutional biometric logins across nodes.</p>
                     </div>
                     <button className="text-[10px] font-black text-primary-600 uppercase tracking-widest hover:underline flex items-center gap-2">
                        Initialize Passkey <ChevronRight className="w-3 h-3" />
                     </button>
                  </CardContent>
               </Card>
            </div>
         </div>

         {/* Sidebar Integrity Information */}
         <div className="lg:col-span-4 space-y-8">
            <Card className="bg-neutral-950 rounded-[3rem] p-10 border-none text-white relative overflow-hidden group shadow-2xl shadow-neutral-950/20">
               <div className="absolute inset-x-0 bottom-0 h-[200px] opacity-[0.05]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
               <div className="relative z-10 space-y-8">
                  <div className="w-16 h-16 bg-primary-600 rounded-[2rem] flex items-center justify-center shadow-[0_10px_30px_rgba(34,197,94,0.4)] group-hover:rotate-12 transition-transform">
                     <ShieldCheck className="w-8 h-8" />
                  </div>
                  <div>
                     <h3 className="text-4xl font-black tracking-tighter uppercase leading-none">Audit <br /> <span className="text-primary-500 text-5xl">Tier 3.</span></h3>
                     <p className="text-white/50 font-medium mt-4">Security Tier Level: Platinum Institutional. <br /> Maximum biometric integrity detected.</p>
                  </div>
                  <div className="space-y-4 pt-6">
                     <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest">
                        <span>Trust Score</span>
                        <span className="text-primary-500">99.8%</span>
                     </div>
                     <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                        <motion.div 
                           initial={{ width: 0 }}
                           animate={{ width: '99.8%' }}
                           transition={{ duration: 2 }}
                           className="h-full bg-primary-500"
                        />
                     </div>
                  </div>
               </div>
            </Card>

            <div className="bg-white p-10 rounded-[3rem] border border-neutral-100 shadow-xl shadow-neutral-950/[0.02] space-y-6">
               <div className="w-12 h-12 bg-secondary-50 p-2 text-secondary-600 rounded-xl mb-6">
                  <ShieldAlert className="w-full h-full" />
               </div>
               <h4 className="text-xl font-black text-neutral-900 tracking-tight uppercase leading-tight">Advanced <br /> Protection.</h4>
               <p className="text-xs font-medium text-neutral-500 leading-relaxed">Ensure two-factor institutional validation is active on all mobile hub nodes to prevent unauthorized blueprint access.</p>
               <Link href="/help" className="mt-4 text-[10px] font-black text-secondary-600 uppercase tracking-widest hover:underline flex items-center gap-2">
                  System Guard Docs <ArrowUpRight className="w-3 h-3" />
               </Link>
            </div>

            <Button 
               onClick={logout}
               variant="outline" 
               className="w-full h-16 rounded-[2rem] border-red-100 bg-red-50/10 hover:bg-red-50 text-red-600 font-black text-[10px] uppercase tracking-widest transition-all"
            >
               <LogOut className="w-4 h-4 mr-3" /> Terminate Active Session
            </Button>
         </div>
      </div>
    </div>
  );
}
