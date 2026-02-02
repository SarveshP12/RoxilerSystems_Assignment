'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizeStyles = {
  sm: 'w-4 h-4',
  md: 'w-8 h-8',
  lg: 'w-12 h-12',
};

export function Spinner({ size = 'md', className }: SpinnerProps) {
  return (
    <Loader2 className={cn('animate-spin text-blue-600', sizeStyles[size], className)} />
  );
}

interface LoadingStateProps {
  message?: string;
  className?: string;
}

export function LoadingState({ message = 'Loading...', className }: LoadingStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={cn('flex flex-col items-center justify-center py-12', className)}
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
      >
        <Spinner size="lg" />
      </motion.div>
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mt-4 text-gray-500 font-medium"
      >
        {message}
      </motion.p>
    </motion.div>
  );
}

// Skeleton loader components
interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className }: SkeletonProps) {
  return (
    <motion.div
      initial={{ opacity: 0.5 }}
      animate={{ opacity: [0.5, 1, 0.5] }}
      transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
      className={cn('bg-gray-200 rounded-lg', className)}
    />
  );
}

export function SkeletonCard() {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5 space-y-4">
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <Skeleton className="h-5 w-32" />
          <Skeleton className="h-4 w-48" />
        </div>
        <Skeleton className="h-8 w-20" />
      </div>
      <div className="flex gap-3 pt-3 border-t border-gray-100">
        <Skeleton className="h-6 w-20" />
        <Skeleton className="h-6 w-24" />
        <Skeleton className="h-6 w-16" />
      </div>
    </div>
  );
}

export function SkeletonTable() {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
      <div className="p-4 border-b border-gray-100">
        <Skeleton className="h-8 w-full" />
      </div>
      {[...Array(5)].map((_, i) => (
        <div key={i} className="p-4 border-b border-gray-100 flex gap-4">
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-6 w-48" />
          <Skeleton className="h-6 w-16" />
          <Skeleton className="h-6 w-24" />
          <Skeleton className="h-6 w-20" />
          <Skeleton className="h-6 w-16 ml-auto" />
        </div>
      ))}
    </div>
  );
}
