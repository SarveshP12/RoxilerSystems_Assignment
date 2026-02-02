'use client';

import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';

interface CardProps extends HTMLMotionProps<'div'> {
  hover?: boolean;
  children: React.ReactNode;
}

export function Card({ className, hover = true, children, ...props }: CardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={hover ? { y: -4, boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)' } : undefined}
      className={cn(
        'bg-white rounded-2xl shadow-sm border border-gray-100 transition-all duration-300',
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
}

interface CardHeaderProps {
  className?: string;
  children: React.ReactNode;
}

export function CardHeader({ className, children }: CardHeaderProps) {
  return (
    <div className={cn('px-6 py-5 border-b border-gray-100', className)}>
      {children}
    </div>
  );
}

interface CardBodyProps {
  className?: string;
  children: React.ReactNode;
}

export function CardBody({ className, children }: CardBodyProps) {
  return <div className={cn('px-6 py-5', className)}>{children}</div>;
}

interface CardFooterProps {
  className?: string;
  children: React.ReactNode;
}

export function CardFooter({ className, children }: CardFooterProps) {
  return (
    <div className={cn('px-6 py-4 border-t border-gray-100 bg-gray-50/50 rounded-b-2xl', className)}>
      {children}
    </div>
  );
}
