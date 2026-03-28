'use client';

import { cn } from '@/lib/utils';

export function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-neutral-200 dark:bg-neutral-800", className)}
      {...props}
    />
  );
}

export function IdeaCardSkeleton() {
  return (
    <div className="bg-white rounded-3xl border border-neutral-100 shadow-xl overflow-hidden flex flex-col h-[400px]">
       <Skeleton className="h-48 w-full rounded-none" />
       <div className="p-6 space-y-4">
          <div className="flex justify-between">
             <Skeleton className="h-6 w-24 rounded-full" />
             <Skeleton className="h-6 w-16 rounded-full" />
          </div>
          <Skeleton className="h-8 w-3/4 rounded-lg" />
          <div className="space-y-2">
             <Skeleton className="h-4 w-full" />
             <Skeleton className="h-4 w-full" />
             <Skeleton className="h-4 w-2/3" />
          </div>
          <Skeleton className="h-10 w-full mt-auto rounded-xl" />
       </div>
    </div>
  );
}

export function DashboardStatSkeleton() {
  return (
    <div className="bg-white p-8 rounded-3xl border border-neutral-100 shadow-sm flex items-center justify-between">
       <div className="space-y-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-10 w-12" />
       </div>
       <Skeleton className="w-12 h-12 rounded-2xl" />
    </div>
  );
}
