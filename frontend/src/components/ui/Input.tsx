'use client';

import React, { forwardRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { AlertCircle, CheckCircle } from 'lucide-react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  success?: boolean;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, success, helperText, leftIcon, rightIcon, ...props }, ref) => {
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
          {leftIcon && (
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
              {leftIcon}
            </div>
          )}
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
            <input
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
                'placeholder-gray-400 transition-all duration-200',
                'focus:outline-none focus:border-blue-500',
                'disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed',
                leftIcon && 'pl-11',
                (rightIcon || error || success) && 'pr-11',
                error
                  ? 'border-red-300 focus:border-red-500'
                  : success
                  ? 'border-green-300 focus:border-green-500'
                  : 'border-gray-200 hover:border-gray-300',
                className
              )}
              {...props}
            />
          </motion.div>
          {(rightIcon || error || success) && (
            <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none">
              {error ? (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 25 }}
                >
                  <AlertCircle className="w-5 h-5 text-red-500" />
                </motion.div>
              ) : success ? (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 25 }}
                >
                  <CheckCircle className="w-5 h-5 text-green-500" />
                </motion.div>
              ) : (
                <span className="text-gray-400">{rightIcon}</span>
              )}
            </div>
          )}
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

Input.displayName = 'Input';
