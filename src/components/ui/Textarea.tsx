import { TextareaHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, id, ...props }, ref) => {
    return (
      <div className="w-full space-y-2">
        {label && (
          <label htmlFor={id} className="block text-sm font-bold text-neutral-800 tracking-tight ml-1">
            {label}
          </label>
        )}
        <div className="relative group">
          <textarea
            ref={ref}
            id={id}
            className={cn(
               "w-full min-h-[120px] p-5 bg-white border-2 border-neutral-100 text-neutral-900 rounded-2xl outline-none transition-all duration-300 focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10 placeholder:text-neutral-400 disabled:bg-neutral-50 disabled:cursor-not-allowed resize-y font-medium",
               error ? "border-red-100 bg-red-50/30 focus:ring-red-500/10 focus:border-red-500" : "",
               className
            )}
            {...props}
          />
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

Textarea.displayName = 'Textarea';

export { Textarea };
