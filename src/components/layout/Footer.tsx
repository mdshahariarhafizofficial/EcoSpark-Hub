import Link from 'next/link';
import { Twitter, Github, Linkedin, Mail, Leaf } from 'lucide-react';
import { Logo } from '@/components/ui/Logo';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-12">
          
          {/* Brand Column */}
          <div className="lg:col-span-4 max-w-sm">
            <Link href="/" className="group inline-block mb-4">
               <Logo className="group-hover:opacity-90 transition-opacity" />
            </Link>
            <p className="text-neutral-500 text-sm leading-relaxed mb-6">
              The platform empowering communities to fund and realize sustainable ideas. Ignite the future of ecological innovation.
            </p>
            <div className="flex gap-3">
              {[
                { icon: Twitter, href: '#', label: 'Twitter' },
                { icon: Github, href: '#', label: 'GitHub' },
                { icon: Linkedin, href: '#', label: 'LinkedIn' },
                { icon: Mail, href: '#', label: 'Email' }
              ].map((social, i) => (
                <a 
                  key={i} 
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 rounded-full flex items-center justify-center text-neutral-500 hover:text-primary-600 hover:bg-primary-50 transition-colors"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-8">
            <div>
              <h3 className="text-sm font-semibold text-neutral-900 mb-4">Platform</h3>
              <ul className="space-y-3">
                <li><Link href="/ideas" className="text-sm text-neutral-500 hover:text-primary-600 transition-colors">Browse Ideas</Link></li>
                <li><Link href="/dashboard/new" className="text-sm text-neutral-500 hover:text-primary-600 transition-colors">Submit Idea</Link></li>
                <li><Link href="/dashboard" className="text-sm text-neutral-500 hover:text-primary-600 transition-colors">Dashboard</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-neutral-900 mb-4">Company</h3>
              <ul className="space-y-3">
                <li><Link href="/about" className="text-sm text-neutral-500 hover:text-primary-600 transition-colors">About Us</Link></li>
                <li><Link href="/blog" className="text-sm text-neutral-500 hover:text-primary-600 transition-colors">Blog</Link></li>
                <li><Link href="/contact" className="text-sm text-neutral-500 hover:text-primary-600 transition-colors">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-neutral-900 mb-4">Legal & Support</h3>
              <ul className="space-y-3">
                <li><Link href="/faq" className="text-sm text-neutral-500 hover:text-primary-600 transition-colors">FAQ</Link></li>
                <li><Link href="/terms" className="text-sm text-neutral-500 hover:text-primary-600 transition-colors">Terms of Service</Link></li>
                <li><Link href="/privacy" className="text-sm text-neutral-500 hover:text-primary-600 transition-colors">Privacy Policy</Link></li>
              </ul>
            </div>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="pt-8 border-t border-neutral-200 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-neutral-500">
            &copy; {new Date().getFullYear()} EcoSpark Hub. All rights reserved.
          </p>
          <p className="text-sm text-neutral-500 flex items-center gap-2">
            Made with <Leaf className="w-4 h-4 text-primary-500" /> for the planet
          </p>
        </div>
      </div>
    </footer>
  );
}
