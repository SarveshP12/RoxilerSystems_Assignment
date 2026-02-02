'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { X } from 'lucide-react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info';
  size?: 'sm' | 'md';
  removable?: boolean;
  onRemove?: () => void;
  className?: string;
}

const variantStyles = {
  default: 'bg-gray-100 text-gray-700 border-gray-200',
  primary: 'bg-blue-50 text-blue-700 border-blue-200',
  success: 'bg-green-50 text-green-700 border-green-200',
  warning: 'bg-yellow-50 text-yellow-700 border-yellow-200',
  danger: 'bg-red-50 text-red-700 border-red-200',
  info: 'bg-purple-50 text-purple-700 border-purple-200',
};

const sizeStyles = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-2.5 py-1 text-sm',
};

export function Badge({
  children,
  variant = 'default',
  size = 'sm',
  removable = false,
  onRemove,
  className,
}: BadgeProps) {
  return (
    <motion.span
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.8, opacity: 0 }}
      whileHover={{ scale: 1.05 }}
      transition={{ type: 'spring', stiffness: 500, damping: 25 }}
      className={cn(
        'inline-flex items-center gap-1 font-medium rounded-full border transition-colors',
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
    >
      {children}
      {removable && onRemove && (
        <button
          onClick={onRemove}
          className="ml-0.5 p-0.5 rounded-full hover:bg-black/10 transition-colors"
        >
          <X className="w-3 h-3" />
        </button>
      )}
    </motion.span>
  );
}

// Chip component (interactive badge)
interface ChipProps extends BadgeProps {
  selected?: boolean;
  onClick?: () => void;
}

export function Chip({
  children,
  variant = 'default',
  size = 'md',
  selected = false,
  onClick,
  className,
}: ChipProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 500, damping: 25 }}
      onClick={onClick}
      className={cn(
        'inline-flex items-center gap-1.5 font-medium rounded-full border transition-all cursor-pointer',
        selected
          ? 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-500/20'
          : variantStyles[variant],
        sizeStyles[size],
        'hover:shadow-md',
        className
      )}
    >
      {children}
    </motion.button>
  );
}
