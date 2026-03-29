'use client';

import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import {
  Menu, X, LogOut, Settings, LayoutDashboard,
  ChevronDown, Home, Activity, Lightbulb,
  FileText, Info, HelpCircle, Mail
} from 'lucide-react';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const links = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Ideas', href: '/ideas', icon: Lightbulb },
    { name: 'Blog', href: '/blog', icon: FileText },
    { name: 'About', href: '/about', icon: Info },
    { name: 'Pulse', href: '/pulse', icon: Activity },
    { name: 'FAQ', href: '/faq', icon: HelpCircle },
    { name: 'Contact', href: '/contact', icon: Mail },
  ];

  return (
    <nav
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300",
        scrolled
          ? "bg-white/95 backdrop-blur-md border-b border-neutral-200 py-3 shadow-sm"
          : "bg-white/50 backdrop-blur-sm py-5 border-b border-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo Section */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 flex items-center justify-center transform group-hover:scale-105 transition-all">
              <Image 
                src="/favicon.png" 
                alt="EcoSpark Hub" 
                width={36} 
                height={36} 
                className="object-contain"
                priority
              />
            </div>
            <span className="font-extrabold text-xl tracking-tight text-neutral-900">
              EcoSpark<span className="text-primary-600">Hub</span>
            </span>
          </Link>

          {/* Center Navigation (Desktop) */}
          <div className="hidden md:flex items-center gap-1 p-1 bg-neutral-100/80 rounded-full border border-neutral-200/60 backdrop-blur-md">
            {links.map((link) => {
              const isActive = pathname === link.href || (link.name === 'Blog' && pathname.includes('/blog'));
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={cn(
                    'px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 flex items-center gap-2',
                    isActive
                      ? 'bg-white text-primary-700 shadow-sm'
                      : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-200/50'
                  )}
                >
                  <link.icon className={cn("w-4 h-4", isActive ? "text-primary-600" : "text-neutral-400")} />
                  {link.name}
                </Link>
              );
            })}
          </div>

          {/* Right Actions (Desktop) */}
          <div className="hidden md:flex items-center gap-4">
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                  className="flex items-center gap-2 p-1.5 pr-3 bg-white border border-neutral-200 rounded-full hover:border-primary-500 hover:shadow-md transition-all group"
                >
                  <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-bold overflow-hidden">
                    {user?.avatar ? (
                      <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-sm">{user?.name?.charAt(0).toUpperCase() || 'U'}</span>
                    )}
                  </div>
                  <ChevronDown className={cn("w-4 h-4 text-neutral-500 transition-transform duration-300", showProfileMenu && "rotate-180")} />
                </button>

                <AnimatePresence>
                  {showProfileMenu && (
                    <>
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-40 bg-transparent"
                        onClick={() => setShowProfileMenu(false)}
                      />
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute right-0 mt-3 w-64 bg-white rounded-2xl shadow-xl border border-neutral-100 overflow-hidden z-50 p-2"
                      >
                        <div className="px-4 py-3 mb-2 bg-neutral-50 rounded-xl border border-neutral-100">
                          <p className="text-sm font-bold text-neutral-900 truncate">{user?.name}</p>
                          <p className="text-xs text-neutral-500 truncate mt-0.5">{user?.email}</p>
                        </div>

                        <div className="space-y-1">
                          <Link href="/dashboard" className="flex items-center px-4 py-2.5 text-sm font-semibold text-neutral-700 hover:bg-neutral-50 rounded-lg transition-colors" onClick={() => setShowProfileMenu(false)}>
                            <LayoutDashboard className="w-4 h-4 mr-3 text-neutral-400" /> Dashboard
                          </Link>
                          <Link href="/profile" className="flex items-center px-4 py-2.5 text-sm font-semibold text-neutral-700 hover:bg-neutral-50 rounded-lg transition-colors" onClick={() => setShowProfileMenu(false)}>
                            <Settings className="w-4 h-4 mr-3 text-neutral-400" /> Settings
                          </Link>
                          <div className="h-px bg-neutral-100 my-2 mx-2" />
                          <button
                            onClick={() => { setShowProfileMenu(false); logout(); }}
                            className="flex w-full items-center px-4 py-2.5 text-sm font-semibold text-red-600 hover:bg-red-50 rounded-lg transition-colors text-left"
                          >
                            <LogOut className="w-4 h-4 mr-3" /> Sign Out
                          </button>
                        </div>
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link href="/login" className="text-sm font-semibold text-neutral-600 hover:text-neutral-900 transition-colors px-3 py-2">
                  Sign In
                </Link>
                <Link href="/register">
                  <Button variant="primary" size="sm" className="rounded-full px-6 font-semibold shadow-md shadow-primary-500/20">
                    Get Started
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 rounded-lg transition-colors"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: '100vh' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden fixed inset-x-0 top-full bg-white border-t border-neutral-100 overflow-y-auto z-40"
          >
            <div className="px-6 py-8 space-y-6">
              <div className="flex flex-col space-y-2">
                {links.map((link) => {
                  const isActive = pathname === link.href || (link.name === 'Blog' && pathname.includes('/blog'));
                  return (
                    <Link
                      key={link.name}
                      href={link.href}
                      className={cn(
                        'px-4 py-4 rounded-xl text-lg font-bold transition-all flex items-center gap-4',
                        isActive
                          ? 'text-primary-600 bg-primary-50/50'
                          : 'text-neutral-700 hover:bg-neutral-50'
                      )}
                      onClick={() => setIsOpen(false)}
                    >
                      <link.icon className={cn("w-5 h-5", isActive ? "text-primary-600" : "text-neutral-400")} />
                      {link.name}
                    </Link>
                  );
                })}
              </div>

              {!isAuthenticated ? (
                <div className="pt-6 border-t border-neutral-100 flex flex-col gap-4">
                  <Link href="/login" onClick={() => setIsOpen(false)}>
                    <Button variant="outline" className="w-full h-14 rounded-xl text-lg">Log In</Button>
                  </Link>
                  <Link href="/register" onClick={() => setIsOpen(false)}>
                    <Button variant="primary" className="w-full h-14 rounded-xl text-lg">Get Started</Button>
                  </Link>
                </div>
              ) : (
                <div className="pt-6 border-t border-neutral-100 space-y-4">
                  <div className="flex items-center gap-4 px-4 py-4 bg-neutral-50 rounded-2xl">
                    <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-bold text-lg">
                      {user?.name?.charAt(0).toUpperCase() || 'U'}
                    </div>
                    <div>
                      <p className="text-base font-bold text-neutral-900">{user?.name}</p>
                      <p className="text-sm text-neutral-500">{user?.email}</p>
                    </div>
                  </div>
                  <div className="flex flex-col space-y-2">
                    <Link href="/dashboard" className="px-4 py-4 rounded-xl text-lg font-bold text-neutral-700 hover:bg-neutral-50 flex items-center" onClick={() => setIsOpen(false)}>
                      <LayoutDashboard className="w-5 h-5 mr-3 text-neutral-400" /> Dashboard
                    </Link>
                    <Link href="/profile" className="px-4 py-4 rounded-xl text-lg font-bold text-neutral-700 hover:bg-neutral-50 flex items-center" onClick={() => setIsOpen(false)}>
                      <Settings className="w-5 h-5 mr-3 text-neutral-400" /> Settings
                    </Link>
                    <button
                      onClick={() => { setIsOpen(false); logout(); }}
                      className="w-full text-left px-4 py-4 rounded-xl text-lg font-bold text-red-600 hover:bg-red-50 flex items-center"
                    >
                      <LogOut className="w-5 h-5 mr-3" /> Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

