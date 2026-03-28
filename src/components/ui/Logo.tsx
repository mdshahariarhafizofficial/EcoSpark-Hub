import { Zap, Leaf } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
  withText?: boolean;
}

export function Logo({ className, withText = true }: LogoProps) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className="relative flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-primary-400 to-primary-600 shadow-sm shrink-0">
        <Leaf className="w-5 h-5 text-white absolute -mt-0.5 -ml-0.5" strokeWidth={2.5} />
        <Zap className="w-3.5 h-3.5 text-secondary-300 absolute mt-1.5 ml-1.5" strokeWidth={3} />
      </div>
      {withText && (
        <span className="font-extrabold text-xl tracking-tight text-neutral-900 flex items-center">
          Eco<span className="text-primary-600">Spark</span>
        </span>
      )}
    </div>
  );
}
