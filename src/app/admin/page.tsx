'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { 
  ShieldCheck, Users, FileText, DollarSign, 
  Clock, Plus, Trash2, Edit, 
  Download, ExternalLink, Tag, AlertCircle, Search, Mail, MessageSquare
} from 'lucide-react';
import Link from 'next/link';
import { formatDate, cn } from '@/lib/utils';
import { useState, useEffect } from 'react';
import Modal from '@/components/common/Modal';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Textarea } from '@/components/ui/Textarea';
import { Spinner } from '@/components/ui/Spinner';

export default function AdminDashboard() {
  const { isAdmin, user, isLoading: authLoading } = useAuth();
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState('overview');
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<any>(null);
  const [categoryName, setCategoryName] = useState('');
  const [categoryDesc, setCategoryDesc] = useState('');
  const [categoryColor, setCategoryColor] = useState('#10b981');
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const [rejectId, setRejectId] = useState('');
  const [rejectionReason, setRejectionReason] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  // Clear search on tab change
  useEffect(() => {
    setSearchQuery('');
  }, [activeTab]);

  // Stats Query
  const { data: stats, isLoading: statsLoading } = useQuery({
    queryKey: ['adminStats'],
    queryFn: () => api.get('/ideas/stats'),
    enabled: isAdmin,
  });

  // Users Query
  const { data: rawUsersData } = useQuery({
    queryKey: ['adminUsers'],
    queryFn: () => api.get('/users'),
    enabled: isAdmin && activeTab === 'users',
  });

  const usersData = {
    ...rawUsersData,
    data: rawUsersData?.data?.filter((u: any) => 
      u.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      u.email.toLowerCase().includes(searchQuery.toLowerCase())
    )
  };

  // Ideas Query
  const { data: rawIdeasData } = useQuery({
    queryKey: ['adminIdeas', activeTab],
    queryFn: () => api.get('/ideas', { params: { status: activeTab === 'ideas' ? 'UNDER_REVIEW' : undefined } }),
    enabled: isAdmin && (activeTab === 'ideas' || activeTab === 'all-ideas'),
  });

  const ideasData = {
    ...rawIdeasData,
    data: rawIdeasData?.data?.filter((idea: any) => 
      idea.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      idea.author?.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
  };

  // Categories Query
  const { data: categoriesData } = useQuery({
    queryKey: ['adminCategories'],
    queryFn: () => api.get('/categories'),
    enabled: isAdmin && activeTab === 'categories',
  });

  // Purchases Query
  const { data: purchasesData } = useQuery({
    queryKey: ['adminPurchases'],
    queryFn: () => api.get('/payments'),
    enabled: isAdmin && activeTab === 'purchases',
  });

  const { data: commentsData } = useQuery({
    queryKey: ['adminComments'],
    queryFn: () => api.get('/comments'),
    enabled: isAdmin && activeTab === 'comments',
  });

  const { data: subscribersData } = useQuery({
    queryKey: ['adminSubscribers'],
    queryFn: () => api.get('/newsletter'),
    enabled: isAdmin && activeTab === 'subscribers',
  });

  const { data: messagesData } = useQuery({
    queryKey: ['adminMessages'],
    queryFn: () => api.get('/contact'),
    enabled: isAdmin && activeTab === 'messages',
  });

  // Mutations
  const toggleUserStatusMutation = useMutation({
    mutationFn: ({ id, isActive }: { id: string, isActive: boolean }) => api.patch(`/users/${id}/status`, { isActive }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminUsers'] });
      toast.success('User status updated');
    },
  });

  const toggleUserRoleMutation = useMutation({
    mutationFn: ({ id, role }: { id: string, role: 'ADMIN' | 'MEMBER' }) => api.patch(`/users/${id}/role`, { role }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminUsers'] });
      toast.success('User role updated');
    },
    onError: (err: any) => toast.error(err.message || 'Error updating role'),
  });

  const approvalMutation = useMutation({
    mutationFn: ({ id, status, feedback }: { id: string, status: 'approve' | 'reject', feedback?: string }) => 
      api.post(`/ideas/${id}/${status}`, { feedback }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminIdeas'] });
      queryClient.invalidateQueries({ queryKey: ['adminStats'] });
      queryClient.invalidateQueries({ queryKey: ['ideas'] });
      queryClient.invalidateQueries({ queryKey: ['myIdeas'] });
      toast.success('Idea status updated');
      setIsRejectModalOpen(false);
      setRejectionReason('');
    },
    onError: (err: any) => toast.error(err.message || 'Error updating idea'),
  });

  const deleteIdeaMutation = useMutation({
    mutationFn: (id: string) => api.delete(`/ideas/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminIdeas'] });
      queryClient.invalidateQueries({ queryKey: ['adminStats'] });
      queryClient.invalidateQueries({ queryKey: ['ideas'] });
      queryClient.invalidateQueries({ queryKey: ['myIdeas'] });
      toast.success('Idea deleted successfully');
    },
    onError: (err: any) => toast.error(err.message || 'Error deleting idea'),
  });

  const categoryMutation = useMutation({
    mutationFn: (data: any) => editingCategory 
      ? api.put(`/categories/${editingCategory.id}`, data)
      : api.post('/categories', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminCategories'] });
      setIsCategoryModalOpen(false);
      setEditingCategory(null);
      setCategoryName('');
      setCategoryDesc('');
      toast.success(`Category ${editingCategory ? 'updated' : 'created'}`);
    },
    onError: (err: any) => toast.error(err.message || 'Error saving category'),
  });

  const deleteCategoryMutation = useMutation({
    mutationFn: (id: string) => api.delete(`/categories/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminCategories'] });
      toast.success('Category deleted');
    },
    onError: (err: any) => toast.error(err.message || 'Error deleting category'),
  });

  const deleteCommentMutation = useMutation({
    mutationFn: (id: string) => api.delete(`/comments/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminComments'] });
      toast.success('Comment deleted');
    },
    onError: (err: any) => toast.error(err.message || 'Error deleting comment'),
  });

  const updateMessageStatusMutation = useMutation({
    mutationFn: ({ id, status }: { id: string, status: string }) => api.patch(`/contact/${id}/status`, { status }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminMessages'] });
      toast.success('Message status updated');
    },
    onError: (err: any) => toast.error(err.message || 'Error updating status'),
  });

  const deleteMessageMutation = useMutation({
    mutationFn: (id: string) => api.delete(`/contact/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminMessages'] });
      toast.success('Message deleted');
    },
    onError: (err: any) => toast.error(err.message || 'Error deleting message'),
  });

  const exportToCSV = (data: any[], filename: string) => {
    if (!data || !data.length) return;
    const headers = Object.keys(data[0]).filter(k => typeof data[0][k] !== 'object').join(',');
    const rows = data.map(item => 
      Object.keys(item)
        .filter(k => typeof item[k] !== 'object')
        .map(k => `"${item[k]}"`)
        .join(',')
    ).join('\n');
    const csvContent = `${headers}\n${rows}`;
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', `${filename}_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (authLoading) return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-neutral-50 border-t border-neutral-200">
      <Spinner size="lg" />
    </div>
  );

  if (!isAdmin) return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-neutral-50 px-4">
      <Card className="max-w-md w-full p-8 text-center border-none shadow-md">
        <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
           <AlertCircle className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold text-neutral-900 mb-2">Access Prohibited</h2>
        <p className="text-neutral-500 mb-8">Admin privileges required to access this area.</p>
        <Link href="/">
           <Button variant="primary" className="w-full">Return Home</Button>
        </Link>
      </Card>
    </div>
  );

  return (
    <div className="min-h-screen bg-neutral-50 py-12 px-4 sm:px-6 lg:px-8 mt-16">
      <div className="max-w-7xl mx-auto space-y-8">
        
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
           <div className="flex items-center gap-4">
              <div className="p-3 bg-primary-600 rounded-xl text-white shadow-sm">
                 <ShieldCheck className="w-8 h-8" />
              </div>
              <div>
                 <h1 className="text-3xl font-extrabold text-neutral-900">Admin Control</h1>
                 <p className="text-neutral-500 text-sm font-medium mt-1">Logged in as {user?.name}</p>
              </div>
           </div>
           
           <div className="flex items-center gap-3">
              <Button 
                variant="outline"
                onClick={() => {
                  if (activeTab === 'users') exportToCSV(usersData?.data || [], 'users');
                  if (activeTab === 'ideas' || activeTab === 'all-ideas') exportToCSV(ideasData?.data || [], 'ideas');
                  if (activeTab === 'purchases') exportToCSV(purchasesData?.data || [], 'purchases');
                  if (activeTab === 'subscribers') exportToCSV(subscribersData?.data || [], 'subscribers');
                  if (activeTab === 'messages') exportToCSV(messagesData?.data || [], 'inquiries');
                }}
                className="flex items-center gap-2"
              >
                <Download className="w-4 h-4" /> Export Data
              </Button>
           </div>
        </header>

        {/* Tab Navigation */}
        <div className="flex bg-white rounded-lg border border-neutral-200 p-1 shadow-sm overflow-x-auto no-scrollbar gap-1 mb-8">
           {[
             { id: 'overview', label: 'Overview' },
             { id: 'ideas', label: 'Review Queue' },
             { id: 'all-ideas', label: 'All Ideas' },
             { id: 'users', label: 'Users' },
             { id: 'categories', label: 'Categories' },
             { id: 'purchases', label: 'Payments' },
             { id: 'comments', label: 'Moderation' },
             { id: 'subscribers', label: 'Subscribers' },
             { id: 'messages', label: 'Inquiries' }
           ].map((tab) => (
             <button
               key={tab.id}
               onClick={() => setActiveTab(tab.id)}
               className={cn(
                  "px-4 py-2 text-sm font-semibold transition-all rounded-md whitespace-nowrap",
                  activeTab === tab.id 
                    ? "bg-neutral-100 text-neutral-900 shadow-sm" 
                    : "text-neutral-500 hover:text-neutral-900 hover:bg-neutral-50"
               )}
             >
               {tab.label}
             </button>
           ))}
        </div>

        <AnimatePresence mode="wait">
          {activeTab === 'overview' && (
             <motion.div 
               key="overview"
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               className="space-y-6"
             >
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {[
                      { label: 'Total Initiatives', value: stats?.data?.totalIdeas, icon: FileText, color: 'text-primary-600', bg: 'bg-primary-50' },
                      { label: 'Pending Review', value: stats?.data?.pendingIdeas, icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50' },
                      { label: 'Platform Users', value: stats?.data?.totalUsers, icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
                      { label: 'Total Volume', value: `$${stats?.data?.totalRevenue?.toLocaleString() || 0}`, icon: DollarSign, color: 'text-emerald-600', bg: 'bg-emerald-50' },
                    ].map((stat, i) => (
                      <Card key={i} className="p-6 flex items-center justify-between">
                         <div>
                            <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-1">{stat.label}</p>
                            <p className="text-3xl font-bold text-neutral-900">{statsLoading ? '...' : stat.value}</p>
                         </div>
                         <div className={cn("p-4 rounded-xl", stat.bg, stat.color)}>
                            <stat.icon className="w-6 h-6" />
                         </div>
                      </Card>
                   ))}
                </div>

                <Card className="p-6">
                    <h3 className="text-lg font-bold text-neutral-900 mb-6 border-b border-neutral-100 pb-4">Initiative Activity (Last 12 Months)</h3>
                    <div className="h-[300px] flex items-end justify-between gap-4 px-2 pb-2 border-b border-neutral-200">
                      {stats?.data?.monthlyActivity?.map((stat: any, i: number) => {
                        const maxCount = Math.max(...stats.data.monthlyActivity.map((m: any) => m.count), 1);
                        const height = (stat.count / maxCount) * 90 + 5; // Min 5% height for visibility
                        return (
                          <div key={i} className="w-full relative group h-full flex items-end">
                            <motion.div 
                              initial={{ height: 0 }}
                              animate={{ height: `${height}%` }}
                              className="bg-primary-100 group-hover:bg-primary-400 transition-colors w-full rounded-t-sm relative" 
                            >
                               <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-neutral-900 text-white text-[10px] py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                                  {stat.count} Initiatives
                               </div>
                            </motion.div>
                          </div>
                      )})}
                      {!stats?.data?.monthlyActivity && Array.from({length: 12}).map((_, i) => (
                        <div key={i} className="w-full bg-neutral-100 animate-pulse h-8 rounded-t-sm" />
                      ))}
                    </div>
                    <div className="flex justify-between mt-4 px-2">
                      {stats?.data?.monthlyActivity?.map((stat: any, i: number) => (
                        <span key={i} className="text-[10px] font-bold text-neutral-500 uppercase">{stat.month}</span>
                      )) || ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map(m => (
                        <span key={m} className="text-[10px] font-bold text-neutral-400 uppercase">{m}</span>
                      ))}
                    </div>
                </Card>

             </motion.div>
          )}

          {(activeTab === 'ideas' || activeTab === 'all-ideas') && (
             <motion.div 
               key="ideas"
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
             >
                <Card className="overflow-hidden min-h-[500px]">
                   <div className="p-5 border-b border-neutral-200 bg-neutral-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                         <h2 className="text-lg font-bold text-neutral-900">
                            {activeTab === 'ideas' ? 'Review Queue' : 'All Initiatives'}
                         </h2>
                         <p className="text-neutral-500 text-sm mt-0.5">{ideasData?.data?.length || 0} items found</p>
                      </div>
                      <div className="w-full sm:w-64">
                         <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                               <Search className="h-4 w-4 text-neutral-400 group-focus-within:text-primary-500" />
                            </div>
                            <input
                              type="text"
                              value={searchQuery}
                              onChange={(e) => setSearchQuery(e.target.value)}
                              className="block w-full pl-9 pr-3 py-2 bg-white border border-neutral-200 rounded-lg text-sm transition-shadow focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent placeholder:text-neutral-400"
                              placeholder="Search initiatives..."
                            />
                         </div>
                      </div>
                   </div>

                   <div className="overflow-x-auto">
                      <table className="w-full text-left text-sm whitespace-nowrap">
                         <thead className="bg-neutral-50 text-neutral-500 border-b border-neutral-200">
                           <tr>
                             <th className="px-6 py-3 font-semibold">Initiative</th>
                             <th className="px-6 py-3 font-semibold">Category</th>
                             <th className="px-6 py-3 font-semibold">Status</th>
                             <th className="px-6 py-3 font-semibold text-right">Actions</th>
                           </tr>
                         </thead>
                         <tbody className="divide-y divide-neutral-100">
                           {ideasData?.data?.map((idea: any) => (
                             <tr key={idea.id} className="hover:bg-neutral-50 transition-colors">
                               <td className="px-6 py-4">
                                  <div className="flex items-center gap-3">
                                     <div className="w-10 h-10 rounded-lg bg-neutral-100 overflow-hidden shrink-0">
                                        {idea.images?.[0] ? <img src={idea.images[0]} className="w-full h-full object-cover" /> : <FileText className="w-full h-full p-2 text-neutral-300" />}
                                     </div>
                                     <div>
                                        <Link href={`/ideas/${idea.id}`} className="font-bold text-neutral-900 hover:text-primary-600 transition-colors block max-w-xs truncate">{idea.title}</Link>
                                        <div className="text-xs text-neutral-500 mt-1">By {idea.author?.name} • {formatDate(idea.createdAt)}</div>
                                     </div>
                                  </div>
                               </td>
                               <td className="px-6 py-4">
                                  <Badge variant="neutral">{idea.category?.name}</Badge>
                               </td>
                               <td className="px-6 py-4">
                                  <Badge variant={
                                     idea.status === 'UNDER_REVIEW' ? 'warning' :
                                     idea.status === 'APPROVED' ? 'success' : 'error'
                                  }>
                                     {idea.status.replace('_', ' ')}
                                  </Badge>
                               </td>
                                <td className="px-6 py-4 text-right">
                                   <div className="flex justify-end gap-2">
                                      {idea.status === 'UNDER_REVIEW' ? (
                                        <>
                                           <Button 
                                             size="sm" 
                                             variant="outline" 
                                             className="text-red-600 hover:bg-red-50 hover:border-red-200" 
                                             onClick={() => { setRejectId(idea.id); setIsRejectModalOpen(true); }}
                                           >
                                             Reject
                                           </Button>
                                           <Button 
                                             size="sm" 
                                             variant="primary" 
                                             onClick={() => approvalMutation.mutate({id: idea.id, status: 'approve'})}
                                             isLoading={approvalMutation.isPending && (approvalMutation.variables as any)?.id === idea.id}
                                           >
                                             Approve
                                           </Button>
                                           <Button 
                                             size="sm" 
                                             variant="outline" 
                                             className="text-red-600 border-none hover:bg-red-50" 
                                             onClick={() => deleteIdeaMutation.mutate(idea.id)}
                                             isLoading={deleteIdeaMutation.isPending && deleteIdeaMutation.variables === idea.id}
                                           >
                                             <Trash2 className="w-3.5 h-3.5" />
                                           </Button>
                                        </>
                                      ) : (
                                        <>
                                           <Link href={`/ideas/${idea.id}`}>
                                              <Button size="sm" variant="outline" className="flex items-center gap-1"><ExternalLink className="w-3.5 h-3.5" /> View</Button>
                                           </Link>
                                           <Button 
                                             size="sm" 
                                             variant="outline" 
                                             className="text-red-600 border-none hover:bg-red-50" 
                                             onClick={() => deleteIdeaMutation.mutate(idea.id)}
                                             isLoading={deleteIdeaMutation.isPending && deleteIdeaMutation.variables === idea.id}
                                           >
                                             <Trash2 className="w-3.5 h-3.5" />
                                           </Button>
                                        </>
                                      )}
                                   </div>
                                </td>
                             </tr>
                           ))}
                         </tbody>
                      </table>
                      {ideasData?.data?.length === 0 && (
                        <div className="text-center py-12 text-neutral-500">
                          <FileText className="w-8 h-8 mx-auto text-neutral-300 mb-3" />
                          <p>No initiatives found matching the criteria.</p>
                        </div>
                      )}
                   </div>
                </Card>
             </motion.div>
          )}

          {activeTab === 'users' && (
             <motion.div key="users" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <Card className="overflow-hidden min-h-[500px]">
                   <div className="p-5 border-b border-neutral-200 bg-neutral-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <h2 className="text-lg font-bold text-neutral-900">User Management</h2>
                      <div className="w-full sm:w-64">
                         <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                               <Search className="h-4 w-4 text-neutral-400 group-focus-within:text-primary-500" />
                            </div>
                            <input
                              type="text"
                              value={searchQuery}
                              onChange={(e) => setSearchQuery(e.target.value)}
                              className="block w-full pl-9 pr-3 py-2 bg-white border border-neutral-200 rounded-lg text-sm transition-shadow focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent placeholder:text-neutral-400"
                              placeholder="Search users..."
                            />
                         </div>
                      </div>
                   </div>
                   <div className="overflow-x-auto">
                      <table className="w-full text-left text-sm whitespace-nowrap">
                         <thead className="bg-neutral-50 text-neutral-500 border-b border-neutral-200">
                           <tr>
                             <th className="px-6 py-3 font-semibold">User</th>
                             <th className="px-6 py-3 font-semibold">Role</th>
                             <th className="px-6 py-3 font-semibold">Status</th>
                             <th className="px-6 py-3 font-semibold text-right">Actions</th>
                           </tr>
                         </thead>
                         <tbody className="divide-y divide-neutral-100">
                           {usersData?.data?.map((u: any) => (
                             <tr key={u.id} className="hover:bg-neutral-50 transition-colors">
                               <td className="px-6 py-4">
                                  <div className="flex items-center gap-3">
                                     <div className="w-10 h-10 rounded-full bg-primary-100 text-primary-700 font-bold flex items-center justify-center shrink-0 overflow-hidden">
                                        {u.avatar ? <img src={u.avatar} className="w-full h-full object-cover" /> : <span>{u.name.charAt(0)}</span>}
                                     </div>
                                     <div>
                                        <div className="font-bold text-neutral-900">{u.name}</div>
                                        <div className="text-xs text-neutral-500">{u.email}</div>
                                     </div>
                                  </div>
                               </td>
                               <td className="px-6 py-4">
                                  <Badge variant={u.role === 'ADMIN' ? 'primary' : 'neutral'}>
                                     {u.role}
                                  </Badge>
                               </td>
                               <td className="px-6 py-4">
                                 <Badge variant={u.isActive ? 'success' : 'error'}>
                                   {u.isActive ? 'Active' : 'Suspended'}
                                 </Badge>
                               </td>
                               <td className="px-6 py-4 text-right">
                                  <div className="flex justify-end gap-2">
                                     <Button 
                                       size="sm"
                                       variant="outline"
                                       onClick={() => toggleUserRoleMutation.mutate({ id: u.id, role: u.role === 'ADMIN' ? 'MEMBER' : 'ADMIN' })}
                                       className="text-neutral-600 hover:bg-neutral-50"
                                     >
                                       {u.role === 'ADMIN' ? 'Demote' : 'Promote'}
                                     </Button>
                                     <Button 
                                       size="sm"
                                       variant="outline"
                                       onClick={() => toggleUserStatusMutation.mutate({ id: u.id, isActive: !u.isActive })}
                                       className={u.isActive ? 'text-red-600 hover:bg-red-50 hover:border-red-200' : 'text-emerald-600 hover:bg-emerald-50 hover:border-emerald-200'}
                                     >
                                       {u.isActive ? 'Suspend' : 'Activate'}
                                     </Button>
                                  </div>
                               </td>
                             </tr>
                           ))}
                         </tbody>
                      </table>
                   </div>
                </Card>
             </motion.div>
          )}

          {activeTab === 'categories' && (
             <motion.div key="categories" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                <div className="flex justify-between items-center">
                   <h2 className="text-xl font-bold text-neutral-900">Categories</h2>
                   <Button onClick={() => { setEditingCategory(null); setCategoryName(''); setCategoryDesc(''); setIsCategoryModalOpen(true); }} variant="primary" className="flex items-center gap-2">
                      <Plus className="w-4 h-4" /> Add Category
                   </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                   {categoriesData?.data?.map((cat: any) => (
                     <Card key={cat.id} className="p-6 flex flex-col group border-t-4" style={{ borderTopColor: cat.color }}>
                        <div className="flex justify-between items-start mb-4">
                           <h3 className="text-lg font-bold text-neutral-900">{cat.name}</h3>
                           <div className="flex gap-1">
                              <Button variant="outline" size="icon" className="h-8 w-8 text-blue-600 border-none hover:bg-blue-50" onClick={() => { setEditingCategory(cat); setCategoryName(cat.name); setCategoryDesc(cat.description || ''); setCategoryColor(cat.color || '#10b981'); setIsCategoryModalOpen(true); }}><Edit className="w-3.5 h-3.5" /></Button>
                              <Button 
                                variant="outline" 
                                size="icon" 
                                className="h-8 w-8 text-red-600 border-none hover:bg-red-50" 
                                onClick={() => deleteCategoryMutation.mutate(cat.id)}
                                isLoading={deleteCategoryMutation.isPending && deleteCategoryMutation.variables === cat.id}
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </Button>
                           </div>
                        </div>
                        <p className="text-neutral-500 text-sm mb-6 flex-grow">{cat.description || 'No description provided.'}</p>
                        <div className="pt-4 border-t border-neutral-100 flex items-center justify-between text-sm">
                           <span className="font-semibold text-neutral-500">{cat._count.ideas} Initiatives</span>
                        </div>
                     </Card>
                   ))}
                </div>
             </motion.div>
          )}

          {activeTab === 'purchases' && (
             <motion.div key="purchases" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <Card className="overflow-hidden min-h-[500px]">
                   <div className="p-5 border-b border-neutral-200 bg-neutral-50/50 flex justify-between items-center">
                      <h2 className="text-lg font-bold text-neutral-900">Premium Unlocks</h2>
                      <div className="text-right">
                         <div className="text-xs font-semibold text-neutral-500">Total Revenue</div>
                         <div className="text-xl font-bold text-primary-600">${stats?.data?.totalRevenue?.toLocaleString() || 0}</div>
                      </div>
                   </div>
                   <div className="overflow-x-auto">
                      <table className="w-full text-left text-sm whitespace-nowrap">
                         <thead className="bg-neutral-50 text-neutral-500 border-b border-neutral-200">
                            <tr>
                              <th className="px-6 py-3 font-semibold">Buyer</th>
                              <th className="px-6 py-3 font-semibold">Initiative</th>
                              <th className="px-6 py-3 font-semibold">Amount</th>
                              <th className="px-6 py-3 font-semibold text-right">Transaction ID</th>
                            </tr>
                         </thead>
                         <tbody className="divide-y divide-neutral-100">
                            {purchasesData?.data?.map((p: any) => (
                              <tr key={p.id} className="hover:bg-neutral-50 transition-colors">
                                <td className="px-6 py-4">
                                   <div className="font-bold text-neutral-900">{p.user?.name}</div>
                                   <div className="text-xs text-neutral-500">{p.user?.email}</div>
                                </td>
                                <td className="px-6 py-4">
                                   <Link href={`/ideas/${p.idea?.id}`} className="font-semibold text-primary-600 hover:text-primary-700 truncate block max-w-xs">{p.idea?.title}</Link>
                                </td>
                                <td className="px-6 py-4 font-bold text-neutral-900">${p.amount.toFixed(2)}</td>
                                <td className="px-6 py-4 text-right font-mono text-xs text-neutral-500">{p.stripeSessionId?.slice(-12) || 'INTERNAL'}</td>
                              </tr>
                            ))}
                         </tbody>
                      </table>
                   </div>
                </Card>
             </motion.div>
          )}

          {activeTab === 'comments' && (
             <motion.div key="comments" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <Card className="overflow-hidden min-h-[500px]">
                   <div className="p-5 border-b border-neutral-200 bg-neutral-50/50">
                      <h2 className="text-lg font-bold text-neutral-900">Moderation Log</h2>
                   </div>
                   <div className="overflow-x-auto">
                      <table className="w-full text-left text-sm">
                         <thead className="bg-neutral-50 text-neutral-500 border-b border-neutral-200">
                           <tr>
                             <th className="px-6 py-3 font-semibold">Author</th>
                             <th className="px-6 py-3 font-semibold">Comment</th>
                             <th className="px-6 py-3 font-semibold text-right">Actions</th>
                           </tr>
                         </thead>
                         <tbody className="divide-y divide-neutral-100">
                           {commentsData?.data?.map((c: any) => (
                             <tr key={c.id} className="hover:bg-neutral-50 transition-colors">
                               <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="font-bold text-neutral-900">{c.author?.name}</div>
                                  <div className="text-xs text-neutral-500">{formatDate(c.createdAt)}</div>
                               </td>
                               <td className="px-6 py-4 max-w-md">
                                  <p className="text-sm text-neutral-700 line-clamp-2">{c.content}</p>
                                  <Link href={`/ideas/${c.idea?.id}`} className="text-xs font-semibold text-primary-600 hover:underline mt-1 block truncate">On: {c.idea?.title}</Link>
                               </td>
                               <td className="px-6 py-4 text-right whitespace-nowrap">
                                  <Button 
                                    size="sm" 
                                    variant="outline" 
                                    className="text-red-600 hover:bg-red-50 hover:border-red-200" 
                                    onClick={() => deleteCommentMutation.mutate(c.id)}
                                    isLoading={deleteCommentMutation.isPending && deleteCommentMutation.variables === c.id}
                                  >
                                     <Trash2 className="w-4 h-4" />
                                  </Button>
                               </td>
                             </tr>
                           ))}
                         </tbody>
                      </table>
                   </div>
                </Card>
             </motion.div>
          )}
          
          {activeTab === 'subscribers' && (
             <motion.div key="subscribers" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <Card className="overflow-hidden min-h-[500px]">
                   <div className="p-5 border-b border-neutral-200 bg-neutral-50/50">
                      <h2 className="text-lg font-bold text-neutral-900">Newsletter Subscribers</h2>
                      <p className="text-sm text-neutral-500">{subscribersData?.data?.length || 0} active subscriptions</p>
                   </div>
                   <div className="overflow-x-auto">
                      <table className="w-full text-left text-sm whitespace-nowrap">
                         <thead className="bg-neutral-50 text-neutral-500 border-b border-neutral-200">
                           <tr>
                             <th className="px-6 py-3 font-semibold">Email</th>
                             <th className="px-6 py-3 font-semibold">Subscribed On</th>
                             <th className="px-6 py-3 font-semibold text-right">Status</th>
                           </tr>
                         </thead>
                         <tbody className="divide-y divide-neutral-100">
                           {subscribersData?.data?.map((s: any) => (
                             <tr key={s.id} className="hover:bg-neutral-50 transition-colors">
                               <td className="px-6 py-4">
                                  <div className="flex items-center gap-2">
                                     <Mail className="w-4 h-4 text-neutral-400" />
                                     <span className="font-bold text-neutral-900">{s.email}</span>
                                  </div>
                               </td>
                               <td className="px-6 py-4 text-neutral-500">{formatDate(s.createdAt)}</td>
                               <td className="px-6 py-4 text-right">
                                  <Badge variant="success">Active</Badge>
                               </td>
                             </tr>
                           ))}
                         </tbody>
                      </table>
                   </div>
                </Card>
             </motion.div>
          )}

          {activeTab === 'messages' && (
             <motion.div key="messages" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <Card className="overflow-hidden min-h-[500px]">
                   <div className="p-5 border-b border-neutral-200 bg-neutral-50/50">
                      <h2 className="text-lg font-bold text-neutral-900">Inquiry Inbox</h2>
                      <p className="text-sm text-neutral-500">{messagesData?.data?.length || 0} total inquiries</p>
                   </div>
                   <div className="overflow-x-auto">
                      <table className="w-full text-left text-sm">
                         <thead className="bg-neutral-50 text-neutral-500 border-b border-neutral-200">
                           <tr>
                             <th className="px-6 py-3 font-semibold">From</th>
                             <th className="px-6 py-3 font-semibold">Message</th>
                             <th className="px-6 py-3 font-semibold">Status</th>
                             <th className="px-6 py-3 font-semibold text-right">Actions</th>
                           </tr>
                         </thead>
                         <tbody className="divide-y divide-neutral-100">
                           {messagesData?.data?.map((m: any) => (
                             <tr key={m.id} className="hover:bg-neutral-50 transition-colors">
                               <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="font-bold text-neutral-900">{m.name}</div>
                                  <div className="text-xs text-neutral-500">{m.email}</div>
                                  <div className="text-[10px] text-neutral-400 mt-1">{formatDate(m.createdAt)}</div>
                               </td>
                               <td className="px-6 py-4 max-w-sm">
                                  <div className="text-xs font-bold text-neutral-900 mb-1">{m.subject}</div>
                                  <p className="text-xs text-neutral-600 line-clamp-2">{m.message}</p>
                               </td>
                               <td className="px-6 py-4">
                                  <select 
                                    value={m.status} 
                                    onChange={(e) => updateMessageStatusMutation.mutate({ id: m.id, status: e.target.value })}
                                    className={cn(
                                       "text-xs font-semibold px-2 py-1 rounded-md border-none focus:ring-1 focus:ring-primary-500",
                                       m.status === 'NEW' ? "bg-blue-50 text-blue-700" :
                                       m.status === 'READ' ? "bg-amber-50 text-amber-700" : "bg-emerald-50 text-emerald-700"
                                    )}
                                  >
                                     <option value="NEW">New</option>
                                     <option value="READ">Read</option>
                                     <option value="REPLIED">Replied</option>
                                  </select>
                               </td>
                               <td className="px-6 py-4 text-right whitespace-nowrap">
                                  <Button 
                                    size="sm" 
                                    variant="outline" 
                                    className="text-red-600 hover:bg-red-50 hover:border-red-200" 
                                    onClick={() => deleteMessageMutation.mutate(m.id)}
                                    isLoading={deleteMessageMutation.isPending && deleteMessageMutation.variables === m.id}
                                  >
                                     <Trash2 className="w-4 h-4" />
                                  </Button>
                               </td>
                             </tr>
                           ))}
                         </tbody>
                      </table>
                   </div>
                </Card>
             </motion.div>
          )}

        </AnimatePresence>
      </div>

      <Modal isOpen={isCategoryModalOpen} onClose={() => setIsCategoryModalOpen(false)} title={editingCategory ? 'Edit Category' : 'Create Category'}>
         <form onSubmit={(e) => { e.preventDefault(); categoryMutation.mutate({ name: categoryName, description: categoryDesc, color: categoryColor }); }} className="space-y-6 mt-4">
            <Input label="Category Name" type="text" value={categoryName} onChange={(e) => setCategoryName(e.target.value)} placeholder="e.g. Clean Energy" required />
            <div className="space-y-1.5">
               <label className="block text-sm font-semibold text-neutral-700">Brand Color (HEX)</label>
               <div className="flex gap-4 items-center">
                  <div className="w-10 h-10 rounded-lg shrink-0 border border-neutral-200" style={{ backgroundColor: categoryColor }} />
                  <input type="text" value={categoryColor} onChange={(e) => setCategoryColor(e.target.value)} className="block w-full bg-white border border-neutral-300 rounded-lg px-4 py-2 text-neutral-900 focus:outline-none focus:ring-2 focus:ring-primary-500 sm:text-sm font-mono placeholder:font-sans" placeholder="#10B981" required />
                </div>
             </div>
            <Textarea label="Description" value={categoryDesc} onChange={(e) => setCategoryDesc(e.target.value)} rows={3} placeholder="Briefly define this category..." />
            <div className="flex justify-end gap-3 pt-4">
              <Button type="button" variant="outline" onClick={() => setIsCategoryModalOpen(false)}>Cancel</Button>
              <Button type="submit" variant="primary" isLoading={categoryMutation.isPending}>{editingCategory ? 'Update' : 'Create'}</Button>
            </div>
         </form>
      </Modal>

      <Modal isOpen={isRejectModalOpen} onClose={() => setIsRejectModalOpen(false)} title="Reject Initiative">
         <div className="space-y-6 mt-4">
            <div className="p-4 bg-red-50 text-red-700 text-sm rounded-lg border border-red-200 flex items-start gap-3">
               <AlertCircle className="w-5 h-5 shrink-0" />
               <p>Please provide a reason for rejecting this initiative. This feedback will be shared with the author.</p>
            </div>
            <Textarea label="Rejection Reason" value={rejectionReason} onChange={(e) => setRejectionReason(e.target.value)} rows={4} placeholder="e.g. This initiative lacks technical feasibility details..." />
            <div className="flex gap-3 justify-end pt-4">
               <Button variant="outline" onClick={() => setIsRejectModalOpen(false)}>Cancel</Button>
               <Button onClick={() => approvalMutation.mutate({ id: rejectId, status: 'reject', feedback: rejectionReason })} disabled={approvalMutation.isPending || !rejectionReason.trim()} className="bg-red-600 hover:bg-red-700 text-white border-none">
                  {approvalMutation.isPending ? 'Processing...' : 'Reject Initiative'}
               </Button>
            </div>
         </div>
      </Modal>
    </div>
  );
}
