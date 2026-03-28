'use client';

import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Sparkles, User, Globe } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const contactSchema = z.object({
  name: z.string().min(5, 'Name must be at least 5 characters'),
  email: z.string().email('Please enter a valid email address'),
  subject: z.string(),
  message: z.string().refine(val => val.trim().split(/\s+/).length >= 10, 'Message must be at least 10 words'),
});
type ContactForm = z.infer<typeof contactSchema>;

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
    mode: 'onTouched',
    defaultValues: { name: '', email: '', message: '', subject: 'General Query' }
  });

  const onSubmit = async (data: ContactForm) => {
    setIsSubmitting(true);
    try {
      const { api } = await import('@/lib/api');
      await api.post('/contact', data);
      toast.success('Message Received! Our experts will reach out within 24 hours.');
      reset();
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.5 }
  };

  return (
    <div className="bg-neutral-50 min-h-screen py-24 px-4 sm:px-6 lg:px-8 relative pt-32">
      <div className="max-w-7xl mx-auto relative z-10">
         {/* Page Header */}
         <div className="text-center max-w-2xl mx-auto mb-16">
            <Badge variant="primary" className="mb-4">
               <Sparkles className="w-3.5 h-3.5 mr-1" /> Get in Touch
            </Badge>
            <h1 className="text-4xl md:text-5xl font-extrabold text-neutral-900 tracking-tight mb-6">
              Let&apos;s Build the Future.
            </h1>
            <p className="text-lg text-neutral-600 font-medium">
              Our specialists are ready to help you navigate the infrastructure of sustainability. Reach out through our secure protocol or visit our hub.
            </p>
         </div>

         {/* Layout */}
         <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            
            {/* Contact Form Side */}
            <motion.div 
               {...fadeInUp}
               className="order-2 lg:order-1"
            >
               <Card className="p-8">
                  <h2 className="text-2xl font-bold text-neutral-900 mb-6">Send us a Message</h2>
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Input
                           label="Full Name"
                           required
                           type="text"
                           {...register('name')}
                           error={errors.name?.message}
                           placeholder="John Doe"
                           icon={<User className="w-5 h-5" />}
                        />
                        <Input
                           label="Email Address"
                           required
                           type="email"
                           {...register('email')}
                           error={errors.email?.message}
                           placeholder="john@example.com"
                           icon={<Mail className="w-5 h-5" />}
                        />
                     </div>

                     <div className="space-y-2">
                        <label className="block text-sm font-bold text-neutral-800 tracking-tight ml-1">Inquiry Type</label>
                        <select 
                           {...register('subject')}
                           className="w-full h-12 bg-white border-2 border-neutral-100 text-neutral-900 rounded-2xl px-5 outline-none transition-all duration-300 focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10 font-medium appearance-none cursor-pointer"
                        >
                           <option>General Query</option>
                           <option>Technical Support</option>
                           <option>Partnership Proposal</option>
                           <option>Investor Relations</option>
                        </select>
                     </div>

                     <Textarea
                        label="Your Message"
                        required
                        rows={6}
                        {...register('message')}
                        error={errors.message?.message}
                        placeholder="Detail your requirements..."
                     />

                     <Button
                        type="submit"
                        variant="primary"
                        size="lg"
                        className="w-full disabled:opacity-50"
                        disabled={!isValid || isSubmitting}
                        isLoading={isSubmitting}
                     >
                        Send Message <Send className="w-4 h-4 ml-2" />
                     </Button>
                  </form>
               </Card>
            </motion.div>

            {/* Contact Info Side */}
            <motion.div 
              {...fadeInUp}
              className="order-1 lg:order-2 space-y-6 lg:pl-8"
            >
               <h2 className="text-2xl font-bold text-neutral-900 mb-6">Contact Information</h2>
               
               {[
                 { icon: Mail, label: 'Email Support', value: 'hello@ecosparkhub.com', desc: 'Secure email for official inquiries.', color: 'text-primary-600', bg: 'bg-primary-50' },
                 { icon: Phone, label: 'Direct Line', value: '+1 (888) ECO-SPARK', desc: 'Mon-Fri, 9am - 6pm EST.', color: 'text-neutral-600', bg: 'bg-neutral-100' },
                 { icon: MapPin, label: 'Headquarters', value: '77 Silicon Valley, Ste 200', desc: 'Palo Alto, California, 94301.', color: 'text-neutral-600', bg: 'bg-neutral-100' }
               ].map((info, i) => (
                 <Card key={i} className="group border-none shadow-sm hover:shadow-md transition-shadow">
                    <CardContent className="p-6 flex gap-5 items-center">
                       <div className={cn("w-14 h-14 rounded-full flex items-center justify-center shrink-0", info.bg)}>
                          <info.icon className={cn("w-6 h-6", info.color)} />
                       </div>
                       <div>
                          <h4 className="text-sm font-semibold text-neutral-500 mb-1">{info.label}</h4>
                          <p className="text-lg font-bold text-neutral-900">{info.value}</p>
                          <p className="text-sm text-neutral-500 mt-1">{info.desc}</p>
                       </div>
                    </CardContent>
                 </Card>
               ))}

               <Card className="bg-neutral-900 border-none text-white mt-8">
                  <CardContent className="p-8">
                     <div className="flex items-center gap-3 mb-4">
                        <Globe className="w-5 h-5 text-primary-400" />
                        <span className="text-sm font-bold text-primary-400 uppercase tracking-widest">Global Support</span>
                     </div>
                     <p className="text-neutral-300 text-sm leading-relaxed">
                        We operate across 12 timezones to ensure your green spark is never left in the dark.
                     </p>
                  </CardContent>
               </Card>
            </motion.div>
         </div>
      </div>
    </div>
  );
}
