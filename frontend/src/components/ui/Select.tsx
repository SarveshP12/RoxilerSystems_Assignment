'use client';

import React, { forwardRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { ChevronDown, AlertCircle } from 'lucide-react';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  helperText?: string;
  options: { value: string; label: string }[];
  placeholder?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, error, helperText, options, placeholder, ...props }, ref) => {
    const [isFocused, setIsFocused] = useState(false);

    return (
      <div className="w-full">
        {label && (
          <motion.label
            initial={false}
            animate={{
              color: error ? '#ef4444' : isFocused ? '#2563eb' : '#374151',
            }}
            className="block text-sm font-medium mb-2 transition-colors"
          >
            {label}
            {props.required && <span className="text-red-500 ml-1">*</span>}
          </motion.label>
        )}
        <div className="relative">
          <motion.div
            initial={false}
            animate={{
              boxShadow: error
                ? '0 0 0 3px rgba(239, 68, 68, 0.1)'
                : isFocused
                ? '0 0 0 3px rgba(59, 130, 246, 0.1)'
                : '0 0 0 0px transparent',
            }}
            className="rounded-xl"
          >
            <select
              ref={ref}
              onFocus={(e) => {
                setIsFocused(true);
                props.onFocus?.(e);
              }}
              onBlur={(e) => {
                setIsFocused(false);
                props.onBlur?.(e);
              }}
              className={cn(
                'w-full px-4 py-3 rounded-xl border bg-white text-gray-900',
                'appearance-none transition-all duration-200 cursor-pointer',
                'focus:outline-none focus:border-blue-500',
                'disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed',
                error ? 'border-red-300 focus:border-red-500' : 'border-gray-200 hover:border-gray-300',
                className
              )}
              {...props}
            >
              {placeholder && (
                <option value="" disabled>
                  {placeholder}
                </option>
              )}
              {options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </motion.div>
          <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-gray-400">
            <ChevronDown className="w-5 h-5" />
          </div>
        </div>
        <AnimatePresence mode="wait">
          {error && (
            <motion.p
              initial={{ opacity: 0, y: -10, height: 0 }}
              animate={{ opacity: 1, y: 0, height: 'auto' }}
              exit={{ opacity: 0, y: -10, height: 0 }}
              transition={{ duration: 0.2 }}
              className="text-sm text-red-500 mt-2 flex items-center gap-1"
            >
              <AlertCircle className="w-3.5 h-3.5" />
              {error}
            </motion.p>
          )}
          {helperText && !error && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-sm text-gray-500 mt-2"
            >
              {helperText}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    );
  }
);

Select.displayName = 'Select';
