import { ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg' | 'icon';
  isLoading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', isLoading, disabled, children, ...props }, ref) => {
    
    const baseStyles = "inline-flex items-center justify-center font-bold rounded-2xl transition-all duration-300 focus-ring disabled:opacity-50 disabled:pointer-events-none active:scale-[0.97] select-none";
    
    const variants = {
      primary: "bg-neutral-900 text-white hover:bg-neutral-800 shadow-xl shadow-neutral-900/10 border border-neutral-800",
      secondary: "bg-primary-600 text-white hover:bg-primary-700 shadow-lg shadow-primary-500/20 border border-primary-500",
      outline: "border-2 border-neutral-200 bg-white text-neutral-700 hover:bg-neutral-50 hover:border-neutral-300 hover:text-neutral-900 shadow-sm",
      ghost: "bg-transparent text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900",
      danger: "bg-red-50 text-red-600 border border-red-100 hover:bg-red-600 hover:text-white hover:shadow-lg hover:shadow-red-500/20",
    };

    const sizes = {
      sm: "h-10 px-4 text-sm",
      md: "h-12 px-7 text-base",
      lg: "h-15 px-9 text-lg",
      icon: "h-12 w-12 p-0",
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {isLoading && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
        {!isLoading && children}
        {isLoading && <span className="sr-only">Loading...</span>}
      </button>
    );
  }
);
Button.displayName = 'Button';

export { Button };
