'use client';

import {
  LayoutDashboard,
  Briefcase,
  Clock,
  Bookmark,
  CreditCard,
  Settings,
  Plus,
  ChevronRight,
  LogOut,
  ShieldAlert,
  X,
  Activity,
  BarChart3,
  ShieldCheck,
  Zap,
  Lock
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';
import { Logo } from '@/components/ui/Logo';

interface DashboardSidebarProps {
  isOpen?: boolean;
  setIsOpen?: (open: boolean) => void;
}

export function DashboardSidebar({ isOpen, setIsOpen }: DashboardSidebarProps) {
  const pathname = usePathname();
  const { logout, user } = useAuth();

  const monitoringNav = [
    { name: 'Telemetry Overview', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Impact Analytics', href: '/dashboard/analytics', icon: BarChart3 },
  ];

  const workspaceNav = [
    { name: 'My Registry', href: '/dashboard/registry', icon: Briefcase },
    { name: 'Saved Protocols', href: '/dashboard/bookmarks', icon: Bookmark },
  ];

  const governanceNav = [
    { name: 'Payments Hub', href: '/dashboard/payments', icon: CreditCard },
    { name: 'Technical Nodes', href: '/dashboard/integrations', icon: Zap },
  ];

  const securityNav = [
    { name: 'Identity Protocols', href: '/dashboard/settings', icon: Settings },
    { name: 'Security Hub', href: '/dashboard/security', icon: Lock },
  ];

  const adminNav = [
    { name: 'Admin Hub', href: '/admin', icon: ShieldAlert },
  ];

  return (
    <aside className={cn(
      "w-72 bg-white border-r border-neutral-200 h-screen fixed top-0 left-0 flex flex-col z-50 transform-gpu overflow-hidden transition-transform duration-300 ease-in-out lg:translate-x-0",
      isOpen ? "translate-x-0 shadow-2xl shadow-neutral-900/20" : "-translate-x-full shadow-none"
    )}>
      {/* Sidebar Header */}
      <div className="p-8 pb-4 relative">
        {setIsOpen && (
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-8 right-6 p-2 text-neutral-400 hover:text-neutral-900 lg:hidden transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        )}
        <Link href="/" className="flex inline-flex mb-5 group">
          <Logo />
        </Link>

        <Link href="/dashboard/new">
          <button className="w-full h-14 bg-neutral-900 text-white rounded-2xl font-black text-xs flex items-center justify-center gap-3 hover:bg-neutral-800 transition-all shadow-xl shadow-neutral-900/10 active:scale-95 group uppercase tracking-widest">
            <Plus className="w-4 h-4 group-hover:rotate-90 transition-transform" />
            Launch Spark
          </button>
        </Link>
      </div>

      {/* Navigation Groups */}
      <div className="flex-1 px-4 py-6 overflow-y-auto space-y-10">
        <div>
          <h4 className="px-5 text-[10px] font-black text-neutral-400 uppercase tracking-[0.2em] mb-4">Monitoring</h4>
          <nav className="space-y-1.5">
            {monitoringNav.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center justify-between px-5 py-3.5 rounded-2xl text-sm font-bold transition-all group",
                    isActive
                      ? "bg-primary-50 text-neutral-900"
                      : "text-neutral-500 hover:text-neutral-900 hover:bg-neutral-50"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <item.icon className={cn("w-5 h-5 transition-colors", isActive ? "text-primary-600 drop-shadow-[0_0_8px_rgba(16,185,129,0.3)]" : "text-neutral-400 group-hover:text-neutral-900")} />
                    {item.name}
                  </div>
                  {isActive && <ChevronRight className="w-4 h-4 text-primary-600" />}
                </Link>
              );
            })}
          </nav>
        </div>

        <div>
          <h4 className="px-5 text-[10px] font-black text-neutral-400 uppercase tracking-[0.2em] mb-4">Workspace</h4>
          <nav className="space-y-1.5">
            {workspaceNav.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center justify-between px-5 py-3.5 rounded-2xl text-sm font-bold transition-all group",
                    isActive
                      ? "bg-primary-50 text-neutral-900"
                      : "text-neutral-500 hover:text-neutral-900 hover:bg-neutral-50"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <item.icon className={cn("w-5 h-5 transition-colors", isActive ? "text-primary-600 drop-shadow-[0_0_8px_rgba(16,185,129,0.3)]" : "text-neutral-400 group-hover:text-neutral-900")} />
                    {item.name}
                  </div>
                </Link>
              );
            })}
          </nav>
        </div>

        <div>
          <h4 className="px-5 text-[10px] font-black text-neutral-400 uppercase tracking-[0.2em] mb-4">Governance</h4>
          <nav className="space-y-1.5">
            {governanceNav.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center justify-between px-5 py-3.5 rounded-2xl text-sm font-bold transition-all group",
                    isActive
                      ? "bg-primary-50 text-neutral-900"
                      : "text-neutral-500 hover:text-neutral-900 hover:bg-neutral-50"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <item.icon className={cn("w-5 h-5 transition-colors", isActive ? "text-primary-600 drop-shadow-[0_0_8px_rgba(16,185,129,0.3)]" : "text-neutral-400 group-hover:text-neutral-900")} />
                    {item.name}
                  </div>
                </Link>
              );
            })}
          </nav>
        </div>

        <div>
          <h4 className="px-5 text-[10px] font-black text-neutral-400 uppercase tracking-[0.2em] mb-4">Integrity</h4>
          <nav className="space-y-1.5">
            {securityNav.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center justify-between px-5 py-3.5 rounded-2xl text-sm font-bold transition-all group",
                    isActive
                      ? "bg-primary-50 text-neutral-900"
                      : "text-neutral-500 hover:text-neutral-900 hover:bg-neutral-50"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <item.icon className={cn("w-5 h-5 transition-colors", isActive ? "text-primary-600 drop-shadow-[0_0_8px_rgba(16,185,129,0.3)]" : "text-neutral-400 group-hover:text-neutral-900")} />
                    {item.name}
                  </div>
                </Link>
              );
            })}
          </nav>
        </div>

        {user?.role === 'ADMIN' && (
          <div>
            <h4 className="px-5 text-[10px] font-black text-neutral-400 uppercase tracking-[0.2em] mb-4">Admin Protocol</h4>
            <nav className="space-y-1.5">
              {adminNav.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      "flex items-center justify-between px-5 py-3.5 rounded-2xl text-sm font-bold transition-all group",
                      isActive
                        ? "bg-red-50 text-red-900"
                        : "text-neutral-500 hover:text-red-600 hover:bg-red-50"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <item.icon className={cn("w-5 h-5 transition-colors", isActive ? "text-red-600" : "text-neutral-400 group-hover:text-red-600")} />
                      {item.name}
                    </div>
                  </Link>
                );
              })}
            </nav>
          </div>
        )}
      </div>

      {/* Sidebar Footer */}
      <div className="p-4 bg-neutral-50/50 mt-auto">
        <div className="px-4 py-4 mb-4 rounded-3xl bg-white border border-neutral-100 shadow-xl shadow-neutral-900/5 flex items-center gap-4 group cursor-pointer hover:border-primary-200 transition-all">
          <div className="w-11 h-11 rounded-2xl bg-primary-100 flex items-center justify-center text-primary-700 font-black border border-white shadow-inner group-hover:scale-110 transition-transform overflow-hidden">
            {user?.avatar ? (
              <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
            ) : (
              user?.name.charAt(0)
            )}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-black text-neutral-900 truncate tracking-tight">{user?.name}</p>
            <p className="text-[10px] text-primary-600 truncate font-black uppercase tracking-wider">{user?.role}</p>
          </div>
        </div>
        <button
          onClick={logout}
          className="w-full h-12 flex items-center gap-3 px-5 rounded-2xl text-xs font-black text-neutral-400 hover:bg-red-50 hover:text-red-600 transition-all uppercase tracking-widest group"
        >
          <LogOut className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Sign Out Hub
        </button>
      </div>
    </aside>
  );
}
