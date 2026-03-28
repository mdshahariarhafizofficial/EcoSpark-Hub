import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Providers from '@/components/Providers';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ScrollProgress from '@/components/layout/ScrollProgress';
import FloatingElements from '@/components/common/FloatingElements';
import { GlobalLoader } from '@/components/common/GlobalLoader';

const inter = Inter({ subsets: ['latin'] });

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  title: 'EcoSpark Hub | Ignite Sustainable Innovation',
  description: 'The world\'s first community-driven ecosystem for ecological innovation. Fund, share, and realize sustainable projects that change the world.',
  keywords: 'sustainability, eco-innovation, green technology, community funding, environmental projects',
  icons: {
    icon: '/icon.svg',
    apple: '/icon.svg',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://ecospark.hub',
    siteName: 'EcoSpark Hub',
    title: 'EcoSpark Hub | The Future of Sustainability',
    description: 'Transforming sustainable ideas into global impact through community action and funding.',
    images: [{ url: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?q=80&w=2000' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'EcoSpark Hub | Sustainability Launchpad',
    description: 'Empowering ecological innovators through community action.',
    images: ['https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?q=80&w=2000'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full scroll-smooth" data-scroll-behavior="smooth" suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen bg-neutral-50 flex flex-col antialiased`} suppressHydrationWarning>
        <Providers>
          <GlobalLoader />
          <ScrollProgress />
          <FloatingElements />
          <Navbar />
          <main className="flex-grow flex flex-col">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
