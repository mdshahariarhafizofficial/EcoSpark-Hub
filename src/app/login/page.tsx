'use client';

import { useState } from 'react';
import Link from 'next/link';
import { api } from '@/lib/api';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Leaf, Mail, Lock, Eye, EyeOff, ArrowRight, Sparkles } from 'lucide-react';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});
type LoginForm = z.infer<typeof loginSchema>;

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    mode: 'onTouched',
    defaultValues: { email: '', password: '' }
  });

  const onSubmit = async (data: LoginForm) => {
    setIsLoading(true);
    try {
      const res = await api.post('/auth/login', data);
      login(res.data.token, res.data.user);
      toast.success('Welcome back to the ecosystem!');
      router.push('/dashboard');
    } catch (error: any) {
      toast.error(error.message || 'Authentication failed. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative flex flex-col items-center pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-neutral-50 overflow-hidden">
      {/* Dynamic Background Elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary-100/50 rounded-full blur-[120px] -mr-64 -mt-64" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary-100/30 rounded-full blur-[120px] -ml-64 -mb-64" />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md z-10"
      >
        <div className="text-center mb-10">
          <h1 className="text-4xl font-black text-neutral-900 tracking-tighter mb-4">Initialize Access</h1>
          <p className="text-neutral-500 font-bold max-w-[280px] mx-auto leading-relaxed uppercase tracking-widest text-[10px]">Continue your mission towards a greener future within the biosphere.</p>
        </div>

        <div className="bg-white p-8 sm:p-10 rounded-[2.5rem] shadow-2xl shadow-neutral-200/50 border border-neutral-100 relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-1 h-full bg-primary-500 opacity-0 group-hover:opacity-100 transition-opacity" />
          
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <Input
              id="email"
              type="email"
              label="E-mail Identity"
              required
              icon={<Mail className="w-5 h-5" />}
              {...register('email')}
              error={errors.email?.message}
              placeholder="name@ecosystem.com"
            />

            <div className="space-y-1">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  label="Security Key"
                  required
                  icon={<Lock className="w-5 h-5" />}
                  {...register('password')}
                  error={errors.password?.message}
                  placeholder="••••••••"
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
              <div className="flex items-center justify-end px-1">
                <Link href="#" className="text-xs font-bold text-primary-600 hover:text-primary-700 uppercase tracking-widest">
                  Reset Key
                </Link>
              </div>
            </div>

            <Button 
              type="submit" 
              variant="primary" 
              className="w-full h-14 text-base font-black shadow-xl shadow-primary-500/20 disabled:opacity-50" 
              isLoading={isLoading}
              disabled={!isValid || isLoading}
            >
              Sign In <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </form>

          <div className="mt-10 pt-8 border-t border-neutral-100 text-center">
            <p className="text-neutral-500 text-sm font-medium">
              New to the biosphere?{' '}
              <Link href="/register" className="text-primary-600 font-black hover:underline underline-offset-4 ml-1">
                Create Account
              </Link>
            </p>
          </div>
          
          {/* Subtle Decorative Icon */}
          <div className="absolute -bottom-6 -right-6 text-primary-50/50 -rotate-12 pointer-events-none">
            <Sparkles className="w-24 h-24" />
          </div>
        </div>
        
        <div className="mt-8 text-center text-xs font-bold text-neutral-400 uppercase tracking-widest">
          Secure Authentication Protocol &copy; 2026
        </div>
      </motion.div>
    </div>
  );
}
