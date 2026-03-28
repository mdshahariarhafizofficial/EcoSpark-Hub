'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { formatDate, cn } from '@/lib/utils';
import { toast } from 'sonner';
import { 
  User, Mail, Shield, Settings, 
  Package, Bookmark, LogOut, Camera,
  ChevronRight, ExternalLink, ShieldCheck, ArrowRight, AlertCircle,
  Key, CloudUpload, Sparkles, Fingerprint, Leaf
} from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import GlobalLoading from '@/components/common/GlobalLoading';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Input } from '@/components/ui/Input';

export default function ProfilePage() {
  const { user, logout, updateProfile, isLoading: authLoading } = useAuth();
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState('overview');
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user?.name || '');
  const [avatar, setAvatar] = useState(user?.avatar || '');

  // Purchases Query
  const { data: purchases } = useQuery({
    queryKey: ['myPurchases'],
    queryFn: () => api.get('/payments/my').then(res => res.data),
    enabled: !!user,
  });

  // Bookmarks Query
  const { data: bookmarks } = useQuery({
    queryKey: ['myBookmarks'],
    queryFn: () => api.get('/ideas/bookmarks').then(res => res.data),
    enabled: !!user,
  });

  const updateMutation = useMutation({
    mutationFn: (data: any) => api.patch(`/users/${user?.id}`, data),
    onSuccess: (res) => {
      updateProfile(res.data.data);
      setIsEditing(false);
      toast.success('Identity profile updated successfully!');
      queryClient.invalidateQueries({ queryKey: ['currentUser'] });
    },
    onError: () => toast.error('Failed to synchronize profile updates.'),
  });

  if (authLoading) {
    return <GlobalLoading />;
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-50 px-4">
        <Card className="max-w-md w-full p-12 text-center border-none shadow-2xl rounded-[3rem] bg-white">
           <div className="w-20 h-20 bg-primary-50 text-primary-600 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-inner">
              <Fingerprint className="w-10 h-10" />
           </div>
           <h2 className="text-3xl font-black text-neutral-900 mb-3 tracking-tight">Identity Required</h2>
           <p className="text-neutral-500 mb-10 font-medium">Please authenticate to access your personal protocol ecosystem.</p>
           <Link href="/login">
              <Button variant="primary" className="w-full h-14 rounded-2xl">Execute Login</Button>
           </Link>
        </Card>
      </div>
    );
  }

  const menuItems = [
    { id: 'overview', icon: User, label: 'Biosphere Identity' },
    { id: 'purchases', icon: Package, label: 'Blueprint Vault' },
    { id: 'bookmarks', icon: Bookmark, label: 'Reading List' },
    { id: 'settings', icon: Key, label: 'Security Protocols' },
  ];

  return (
    <div className="min-h-screen bg-neutral-50/50 py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Profile Header */}
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12 pb-12 border-b border-neutral-100">
          <div className="relative group">
            <div className="w-40 h-40 rounded-[3rem] bg-white p-2 shadow-2xl shadow-neutral-900/10 border border-neutral-100 overflow-hidden group-hover:scale-105 transition-transform duration-500">
               {avatar || user.avatar ? (
                 <img src={avatar || user.avatar} alt="Avatar" className="w-full h-full rounded-[2.5rem] object-cover" />
               ) : (
                 <div className="w-full h-full rounded-[2.5rem] bg-primary-100 flex items-center justify-center text-primary-600 text-5xl font-black">
                    {user.name.charAt(0)}
                 </div>
               )}
            </div>
            <label className="absolute bottom-1 right-1 p-3.5 bg-neutral-900 text-white rounded-2xl border-4 border-white shadow-xl hover:bg-primary-600 transition-all cursor-pointer group-hover:scale-110 active:scale-90">
               <Camera className="w-5 h-5" />
               <input 
                 type="file" 
                 accept="image/*" 
                 className="hidden" 
                 onChange={(e) => {
                   const file = e.target.files?.[0];
                   if (file) {
                     const reader = new FileReader();
                     reader.onloadend = () => {
                       setAvatar(reader.result as string);
                       updateMutation.mutate({ avatar: reader.result as string });
                     };
                     reader.readAsDataURL(file);
                   }
                 }}
               />
            </label>
          </div>

          <div className="text-center md:text-left space-y-4">
            <div className="space-y-1">
               <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-100 text-primary-700 text-[9px] font-black uppercase tracking-[0.2em] mb-2">
                 <Sparkles className="w-3 h-3" /> Verified Member
               </div>
               <h1 className="text-4xl md:text-5xl font-black text-neutral-900 tracking-tighter">{user.name}</h1>
               <p className="text-neutral-500 font-bold tracking-tight text-lg">{user.email}</p>
            </div>
            <div className="flex flex-wrap justify-center md:justify-start gap-4">
               <div className="px-5 py-2.5 bg-white rounded-xl border border-neutral-100 shadow-sm flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span className="text-xs font-black text-neutral-600 uppercase tracking-widest">{user.role}</span>
               </div>
               <div className="px-5 py-2.5 bg-white rounded-xl border border-neutral-100 shadow-sm flex items-center gap-3">
                  <span className="text-xs font-black text-neutral-400 uppercase tracking-widest leading-none">Joined</span>
                  <span className="text-xs font-black text-neutral-900 uppercase tracking-widest">{formatDate(user.createdAt)}</span>
               </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-4 gap-4">
             <div className="bg-white p-3 rounded-[2rem] border border-neutral-100 shadow-xl shadow-neutral-900/[0.02]">
                {menuItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={cn(
                      "w-full flex items-center justify-between p-4 rounded-2xl text-sm font-black transition-all mb-1 uppercase tracking-widest group",
                      activeTab === item.id 
                        ? "bg-primary-50 text-primary-700 shadow-inner" 
                        : "text-neutral-400 hover:text-neutral-900 hover:bg-neutral-50"
                    )}
                  >
                     <div className="flex items-center gap-4">
                        <item.icon className={cn("w-5 h-5 transition-colors", activeTab === item.id ? "text-primary-600" : "text-neutral-300 group-hover:text-neutral-900")} /> 
                        {item.label}
                     </div>
                     <ChevronRight className={cn("w-4 h-4 transition-transform", activeTab === item.id ? "translate-x-1" : "opacity-0")} />
                  </button>
                ))}
                
                <div className="my-3 mx-4 border-t border-neutral-50" />
                
                <button 
                  onClick={logout}
                  className="w-full flex items-center gap-4 p-4 rounded-2xl text-sm font-black text-red-400 hover:bg-red-50 hover:text-red-600 transition-all uppercase tracking-widest"
                >
                   <LogOut className="w-5 h-5" /> Terminate Access
                </button>
             </div>
             
             {/* Profile Progress Card */}
             <Card className="mt-8 bg-neutral-900 border-none text-white p-8 rounded-[2rem] overflow-hidden relative">
                <div className="relative z-10 space-y-4">
                   <h3 className="text-xl font-black tracking-tight">Identity Progress</h3>
                   <div className="space-y-4">
                      <div>
                         <div className="flex justify-between text-[10px] font-black uppercase tracking-widest mb-1.5 text-neutral-400">
                            <span>Contribution Score</span>
                            <span>85%</span>
                         </div>
                         <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                            <div className="h-full w-[85%] bg-primary-500" />
                         </div>
                      </div>
                      <p className="text-[10px] text-neutral-400 font-bold uppercase tracking-[0.15em] leading-relaxed">Complete your profile to unlock premium sponsorship blueprints.</p>
                      <Button variant="outline" className="w-full h-10 text-[10px] border-white/20 text-white hover:bg-white hover:text-neutral-900 rounded-xl">Unlock Prototypes</Button>
                   </div>
                </div>
                <Sparkles className="absolute -bottom-10 -right-10 w-40 h-40 text-white/[0.03] -rotate-12" />
             </Card>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-8 min-h-[600px]">
             <AnimatePresence mode="wait">
               {activeTab === 'overview' && (
                 <motion.div 
                   key="overview"
                   initial={{ opacity: 0, x: 20 }}
                   animate={{ opacity: 1, x: 0 }}
                   exit={{ opacity: 0, x: -20 }}
                   className="space-y-8"
                 >
                    <Card className="p-8 md:p-10 border-neutral-100 rounded-[2.5rem] shadow-xl shadow-neutral-900/[0.02]">
                       <h3 className="text-2xl font-black text-neutral-900 mb-8 flex items-center gap-4">
                          <div className="w-10 h-10 bg-primary-50 text-primary-600 rounded-xl flex items-center justify-center"><User className="w-5 h-5" /></div>
                          Personal Protocol
                       </h3>
                       <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                          <div className="space-y-2">
                             <label className="text-[10px] font-black text-neutral-400 uppercase tracking-widest ml-1">Identity Name</label>
                             <div className="p-5 bg-neutral-50/50 rounded-2xl font-black text-neutral-800 border border-neutral-100/50 text-lg tracking-tight">{user.name}</div>
                          </div>
                          <div className="space-y-2">
                             <label className="text-[10px] font-black text-neutral-400 uppercase tracking-widest ml-1">E-mail Hub</label>
                             <div className="p-5 bg-neutral-50/50 rounded-2xl font-black text-neutral-800 border border-neutral-100/50 text-lg tracking-tight">{user.email}</div>
                          </div>
                          <div className="space-y-2">
                             <label className="text-[10px] font-black text-neutral-400 uppercase tracking-widest ml-1">System Verification</label>
                             <div className="p-5 bg-emerald-50 border border-emerald-100 rounded-2xl font-black text-emerald-700 flex items-center justify-between text-lg tracking-tight">
                                <span>{user.role}</span>
                                <ShieldCheck className="w-6 h-6" />
                             </div>
                          </div>
                          <div className="space-y-2">
                             <label className="text-[10px] font-black text-neutral-400 uppercase tracking-widest ml-1">Archive Initialized</label>
                             <div className="p-5 bg-neutral-50/50 rounded-2xl font-black text-neutral-800 border border-neutral-100/50 text-lg tracking-tight">{formatDate(user.createdAt)}</div>
                          </div>
                       </div>
                    </Card>

                    <Card className="bg-gradient-to-br from-neutral-900 to-neutral-800 border-none text-white p-12 rounded-[2.5rem] relative overflow-hidden shadow-2xl">
                       <div className="relative z-10 max-w-md space-y-6">
                          <h3 className="text-3xl font-black tracking-tighter leading-none">Expand the Biosphere</h3>
                          <p className="text-neutral-400 leading-relaxed font-medium">Ready to share your next sustainability protocol with the global ecosystem?</p>
                          <Link href="/dashboard/new" className="inline-block">
                             <Button variant="secondary" className="h-14 px-8 rounded-2xl font-black text-sm uppercase tracking-widest shadow-2xl shadow-primary-500/20">
                                Launch Spark <ArrowRight className="ml-2 w-5 h-5" />
                             </Button>
                          </Link>
                       </div>
                       <Leaf className="absolute top-0 right-0 w-64 h-64 text-white/[0.03] -mr-20 -mt-20 rotate-45" />
                    </Card>
                 </motion.div>
               )}

               {activeTab === 'purchases' && (
                  <motion.div 
                    key="purchases"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                     <div className="flex items-center justify-between p-4">
                        <h3 className="text-2xl font-black text-neutral-900 tracking-tight">Blueprint Vault</h3>
                        <div className="w-12 h-12 bg-primary-100 text-primary-600 rounded-2xl flex items-center justify-center shadow-inner"><Package className="w-6 h-6" /></div>
                     </div>
                     
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {purchases?.data?.map((p: any) => (
                          <Card key={p.id} className="flex flex-col h-full hover:shadow-2xl hover:shadow-neutral-200/50 transition-all duration-500 group border-neutral-100 rounded-[2rem] overflow-hidden">
                             <CardContent className="p-8 flex flex-col flex-grow">
                                <div className="flex justify-between items-start mb-6">
                                   <Badge variant="success" className="px-3 py-1 rounded-lg font-black text-[9px] uppercase tracking-widest border-none">Verified Protocol</Badge>
                                   <span className="text-[10px] text-neutral-400 font-black uppercase tracking-widest">{formatDate(p.createdAt)}</span>
                                </div>
                                <h4 className="text-xl font-black text-neutral-900 mb-8 group-hover:text-primary-600 transition-colors line-clamp-2 leading-tight tracking-tight">{p.idea?.title}</h4>
                                <div className="flex items-center gap-3 mb-8 pt-6 border-t border-neutral-100 mt-auto">
                                   <div className="w-8 h-8 rounded-xl bg-neutral-100 flex items-center justify-center text-xs font-black text-neutral-600 border border-neutral-200 shadow-inner">
                                      {p.idea?.author?.name.charAt(0)}
                                   </div>
                                   <span className="text-xs font-black text-neutral-500 uppercase tracking-widest">Protocol Lead: {p.idea?.author?.name}</span>
                                </div>
                                <Link href={`/ideas/${p.idea?.id}`}>
                                   <Button variant="outline" className="w-full h-12 rounded-xl text-xs font-black uppercase tracking-widest group/btn">
                                      Open Blueprint <ExternalLink className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                                   </Button>
                                </Link>
                             </CardContent>
                          </Card>
                        ))}
                        {(!purchases?.data || purchases.data.length === 0) && (
                           <div className="col-span-full py-40 text-center border-2 border-dashed border-neutral-200 rounded-[3rem] bg-white">
                              <div className="w-20 h-20 bg-neutral-50 rounded-[2rem] flex items-center justify-center mx-auto mb-8 text-neutral-200"><Package className="w-10 h-10" /></div>
                              <h3 className="text-2xl font-black text-neutral-900 mb-2 tracking-tight">Vault is Empty</h3>
                              <p className="text-neutral-500 font-medium max-w-xs mx-auto mb-10">Acquire premium sustainability protocols to see them archived here.</p>
                              <Link href="/ideas">
                                 <Button variant="primary" className="h-14 px-8 rounded-2xl">Browse Marketplace</Button>
                              </Link>
                           </div>
                        )}
                     </div>
                  </motion.div>
               )}

               {activeTab === 'bookmarks' && (
                  <motion.div 
                    key="bookmarks"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                     <div className="flex items-center justify-between p-4">
                        <h3 className="text-2xl font-black text-neutral-900 tracking-tight">Reading Protocols</h3>
                        <div className="w-12 h-12 bg-primary-100 text-primary-600 rounded-2xl flex items-center justify-center shadow-inner"><Bookmark className="w-6 h-6" /></div>
                     </div>
                     
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {bookmarks?.data?.map((b: any) => (
                          <Card key={b.id} className="flex flex-col h-full hover:shadow-2xl hover:shadow-neutral-200/50 transition-all duration-500 group border-neutral-100 rounded-[2rem] overflow-hidden">
                             <CardContent className="p-8 flex flex-col flex-grow">
                                <Badge variant="neutral" className="w-fit px-3 py-1 rounded-lg font-black text-[9px] uppercase tracking-widest border-none mb-6">{b.idea?.category?.name}</Badge>
                                <h4 className="text-xl font-black text-neutral-900 mb-4 group-hover:text-primary-600 transition-colors line-clamp-2 leading-tight tracking-tight">{b.idea?.title}</h4>
                                <p className="text-neutral-500 text-sm leading-relaxed mb-8 line-clamp-3 flex-grow font-medium">{b.idea?.problemStatement}</p>
                                <Link href={`/ideas/${b.idea?.id}`} className="mt-auto">
                                   <Button variant="secondary" className="w-full h-12 rounded-xl text-xs font-black uppercase tracking-widest">
                                      Analyze Spark <ArrowRight className="w-4 h-4 ml-2" />
                                   </Button>
                                </Link>
                             </CardContent>
                          </Card>
                        ))}
                        {(!bookmarks?.data || bookmarks.data.length === 0) && (
                           <div className="col-span-full py-40 text-center border-2 border-dashed border-neutral-200 rounded-[3rem] bg-white">
                              <div className="w-20 h-20 bg-neutral-50 rounded-[2rem] flex items-center justify-center mx-auto mb-8 text-neutral-200"><Bookmark className="w-10 h-10" /></div>
                              <h3 className="text-2xl font-black text-neutral-900 mb-2 tracking-tight">No Active Links</h3>
                              <p className="text-neutral-500 font-medium max-w-xs mx-auto">Save interesting initiatives to your reading protocol for rapid access.</p>
                           </div>
                        )}
                     </div>
                  </motion.div>
               )}

               {activeTab === 'settings' && (
                  <motion.div 
                    key="settings"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-8"
                  >
                     <Card className="p-10 border-neutral-100 rounded-[2.5rem] shadow-xl shadow-neutral-900/[0.02]">
                        <div className="flex justify-between items-center mb-10 pb-6 border-b border-neutral-50">
                           <h3 className="text-2xl font-black text-neutral-900 tracking-tight">Administrative Configuration</h3>
                           {!isEditing ? (
                             <Button variant="outline" size="sm" className="rounded-xl h-10 text-[10px]" onClick={() => setIsEditing(true)}>Modify Identity</Button>
                           ) : (
                             <div className="flex gap-2">
                                <Button variant="ghost" size="sm" className="rounded-xl h-10 text-[10px]" onClick={() => setIsEditing(false)}>Abort</Button>
                                <Button variant="primary" size="sm" className="rounded-xl h-10 text-[10px]" onClick={() => updateMutation.mutate({ name })} isLoading={updateMutation.isPending}>Deploy Updates</Button>
                             </div>
                           )}
                        </div>

                        <div className="space-y-8">
                           <div className="space-y-2">
                              <label className="text-[10px] font-black text-neutral-400 uppercase tracking-widest ml-1">Biosphere Alias</label>
                              {isEditing ? (
                                 <Input 
                                   type="text" 
                                   value={name}
                                   onChange={(e) => setName(e.target.value)}
                                   className="h-14 rounded-2xl border-2 font-black text-lg"
                                 />
                              ) : (
                                <div className="p-5 bg-neutral-50 border border-neutral-100 rounded-2xl text-lg font-black text-neutral-900 tracking-tight">{user.name}</div>
                              )}
                           </div>

                           <div className="space-y-2 opacity-60">
                              <label className="text-[10px] font-black text-neutral-400 uppercase tracking-widest ml-1">Encryption Keys</label>
                              <div className="p-5 bg-neutral-50 border border-neutral-100 rounded-2xl text-lg font-mono text-neutral-400 tracking-widest">•••••••••••••••••</div>
                              <p className="text-[10px] text-neutral-500 mt-2 font-bold uppercase tracking-widest">Connect to master node console to regenerate security credentials.</p>
                           </div>
                        </div>
                     </Card>

                     <Card className="p-10 bg-red-50/50 border border-red-100 rounded-[2.5rem]">
                        <div className="flex flex-col md:flex-row items-center gap-8">
                           <div className="p-5 bg-white rounded-2xl shadow-xl shadow-red-500/10"><AlertCircle className="w-10 h-10 text-red-500" /></div>
                           <div className="flex-1 text-center md:text-left space-y-1">
                              <h3 className="text-xl font-black text-red-900 tracking-tight">Identity Termination</h3>
                              <p className="text-red-700/60 text-sm font-bold leading-relaxed uppercase tracking-widest">Permanently erase your biosphere identity and all associated protocols.</p>
                           </div>
                           <Button variant="outline" className="h-12 border-red-200 text-red-600 hover:bg-red-600 hover:text-white rounded-xl text-xs font-black uppercase tracking-widest px-6 shadow-sm">
                              Erase Identity
                           </Button>
                        </div>
                     </Card>
                  </motion.div>
               )}
             </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
