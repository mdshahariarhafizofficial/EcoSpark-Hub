import { cn } from '@/lib/utils';
import Image from 'next/image';

interface LogoProps {
  className?: string;
  withText?: boolean;
}

export function Logo({ className, withText = true }: LogoProps) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className="relative flex items-center justify-center w-8 h-8 shrink-0 group-hover:scale-110 transition-transform">
        <Image 
          src="/favicon.png" 
          alt="EcoSpark Hub" 
          width={32} 
          height={32} 
          className="object-contain"
          priority
        />
      </div>
      {withText && (
        <span className="font-extrabold text-xl tracking-tight text-neutral-900 flex items-center">
          EcoSpark<span className="text-primary-600">Hub</span>
        </span>
      )}
    </div>
  );
}
