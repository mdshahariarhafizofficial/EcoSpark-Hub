'use client';

import { useState } from 'react';
import Link from 'next/link';
import { api } from '@/lib/api';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Leaf, User, Mail, Lock, Eye, EyeOff, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const registerSchema = z.object({
  name: z.string().min(5, 'Name must be at least 5 characters'),
  email: z.string().email('Please enter a valid email address'),
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number')
    .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character'),
  terms: z.boolean().refine(val => val === true, 'You must accept the terms & conditions'),
});
type RegisterForm = z.infer<typeof registerSchema>;

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
    mode: 'onTouched',
    defaultValues: { name: '', email: '', password: '', terms: false }
  });

  const password = watch('password', '');
  
  const passwordRules = [
    { label: 'At least 8 characters', met: password.length >= 8 },
    { label: 'One uppercase letter', met: /[A-Z]/.test(password) },
    { label: 'One number', met: /[0-9]/.test(password) },
    { label: 'One special character', met: /[^A-Za-z0-9]/.test(password) },
  ];

  const allRulesMet = passwordRules.every(rule => rule.met);

  const onSubmit = async (data: RegisterForm) => {
    setIsLoading(true);
    try {
      const res = await api.post('/auth/register', {
        name: data.name,
        email: data.email,
        password: data.password
      });
      login(res.data.token, res.data.user);
      toast.success('Identity established! Welcome to the ecosystem.');
      router.push('/dashboard');
    } catch (error: any) {
      if (error.response?.data?.errors) {
        error.response.data.errors.forEach((err: any) => toast.error(err.message));
      } else {
        toast.error(error.message || 'Registration failed early. Please check inputs.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative flex flex-col items-center pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-neutral-50 overflow-hidden">
      {/* Dynamic Background Elements */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-secondary-100/50 rounded-full blur-[120px] -ml-64 -mt-64" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-primary-100/30 rounded-full blur-[120px] -mr-64 -mb-64" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md z-10"
      >
        <div className="text-center mb-10">
          <h1 className="text-4xl font-black text-neutral-900 tracking-tighter mb-4">Establish Identity</h1>
          <p className="text-neutral-500 font-bold max-w-[280px] mx-auto leading-relaxed uppercase tracking-widest text-[10px]">Create your unique identifier within the global biosphere ecosystem.</p>
        </div>

        <div className="bg-white p-8 sm:p-10 rounded-[2.5rem] shadow-2xl shadow-neutral-200/50 border border-neutral-100 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-1 h-full bg-secondary-500 opacity-0 group-hover:opacity-100 transition-opacity" />

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <Input
              id="name"
              type="text"
              label="Collaborator Name"
              required
              icon={<User className="w-5 h-5" />}
              {...register('name')}
              error={errors.name?.message}
              placeholder="Full Name"
            />

            <Input
              id="email"
              type="email"
              label="Identity Email"
              required
              icon={<Mail className="w-5 h-5" />}
              {...register('email')}
              error={errors.email?.message}
              placeholder="name@ecosystem.com"
            />

            <div className="space-y-4">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                label="Initialize Security Key"
                required
                icon={<Lock className="w-5 h-5" />}
                {...register('password')}
                error={errors.password?.message}
                placeholder="••••••••"
                className={cn(
                  allRulesMet && !errors.password ? "border-primary-500 bg-primary-50/10 focus:ring-primary-500/10" : ""
                )}
                rightElement={
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-neutral-400 hover:text-secondary-600 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                }
              />

              {/* Real-time Password Rules Checklist */}
              <div className="bg-neutral-50 rounded-2xl p-4 border border-neutral-100 space-y-2">
                <p className="text-[10px] font-black text-neutral-400 uppercase tracking-widest mb-2">Security Key Requirements</p>
                <div className="grid grid-cols-1 gap-2">
                  {passwordRules.map((rule, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <div className={cn(
                        "w-4 h-4 rounded-full flex items-center justify-center transition-colors",
                        rule.met ? "bg-primary-500 text-white" : "bg-neutral-200 text-neutral-400"
                      )}>
                        <CheckCircle2 className="w-2.5 h-2.5" />
                      </div>
                      <span className={cn(
                        "text-[10px] font-bold uppercase tracking-wider transition-colors",
                        rule.met ? "text-primary-600" : "text-neutral-400"
                      )}>
                        {rule.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex items-start gap-3 p-4 bg-neutral-50 rounded-2xl border border-neutral-100">
                <input
                  id="terms"
                  type="checkbox"
                  required
                  {...register('terms')}
                  className="mt-1 h-4 w-4 rounded border-neutral-300 text-primary-600 focus:ring-primary-600 transition-colors cursor-pointer"
                />
                <label htmlFor="terms" className="text-xs font-bold text-neutral-600 leading-relaxed uppercase tracking-wider">
                  I agree to the{' '}
                  <Link href="/terms" className="text-primary-600 hover:underline">Terms</Link>
                  {' '}and{' '}
                  <Link href="/privacy" className="text-primary-600 hover:underline">Privacy Policy</Link>
                </label>
              </div>
              {errors.terms?.message && (
                <div className="flex items-center gap-1.5 ml-1 animate-in fade-in slide-in-from-top-1 duration-200 pt-1">
                  <span className="text-xs font-bold text-red-600 uppercase tracking-wider">{errors.terms.message as string}</span>
                </div>
              )}
            </div>

            <Button
              type="submit"
              variant="secondary"
              className="w-full h-14 text-base font-black shadow-xl shadow-primary-500/20 disabled:opacity-50"
              isLoading={isLoading}
              disabled={!isValid || isLoading}
            >
              Establish Identity <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </form>

          <div className="mt-10 pt-8 border-t border-neutral-100 text-center">
            <p className="text-neutral-500 text-sm font-medium">
              Already a collaborator?{' '}
              <Link href="/login" className="text-primary-600 font-black hover:underline underline-offset-4 ml-1">
                Sign In
              </Link>
            </p>
          </div>

          {/* Subtle Decorative Icon */}
          <div className="absolute -bottom-6 -left-6 text-secondary-50/50 -rotate-12 pointer-events-none">
            <ShieldCheck className="w-24 h-24" />
          </div>
        </div>

        <div className="mt-8 text-center text-xs font-bold text-neutral-400 uppercase tracking-widest">
          Secure Identity Protocol &copy; 2026
        </div>
      </motion.div>
    </div>
  );
}
