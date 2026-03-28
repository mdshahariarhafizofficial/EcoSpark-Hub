import { InputHTMLAttributes, forwardRef, ReactNode } from 'react';
import { cn } from '@/lib/utils';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: ReactNode;
  rightElement?: ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, icon, rightElement, id, ...props }, ref) => {
    return (
      <div className="w-full space-y-2">
        {label && (
          <label htmlFor={id} className="block text-sm font-bold text-neutral-800 tracking-tight ml-1">
            {label}
          </label>
        )}
        <div className="relative group">
          {icon && (
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-neutral-400 group-focus-within:text-primary-500 transition-colors">
              {icon}
            </div>
          )}
          <input
            ref={ref}
            id={id}
            className={cn(
              "w-full h-12 bg-white border-2 border-neutral-100 text-neutral-900 rounded-2xl outline-none transition-all duration-300 focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10 placeholder:text-neutral-400 disabled:bg-neutral-50 disabled:cursor-not-allowed font-medium",
              icon ? "pl-12" : "pl-5",
              rightElement ? "pr-12" : "pr-5",
              error ? "border-red-100 bg-red-50/30 focus:ring-red-500/10 focus:border-red-500" : "",
              className
            )}
            {...props}
          />
          {rightElement && (
            <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
              {rightElement}
            </div>
          )}
        </div>
        {error && (
          <div className="flex items-center gap-1.5 ml-1 animate-in fade-in slide-in-from-top-1 duration-200">
            <span className="text-xs font-bold text-red-600 uppercase tracking-wider">{error}</span>
          </div>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export { Input };
