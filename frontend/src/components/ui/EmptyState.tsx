'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { FileX, Users, Search, Plus } from 'lucide-react';
import { Button } from './Button';

interface EmptyStateProps {
  title: string;
  description?: string;
  icon?: 'empty' | 'search' | 'users' | 'add';
  action?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
}

const iconComponents = {
  empty: FileX,
  search: Search,
  users: Users,
  add: Plus,
};

export function EmptyState({
  title,
  description,
  icon = 'empty',
  action,
  className,
}: EmptyStateProps) {
  const IconComponent = iconComponents[icon];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={cn('flex flex-col items-center justify-center py-16 px-4', className)}
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20, delay: 0.1 }}
        className="w-20 h-20 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center mb-6"
      >
        <IconComponent className="w-10 h-10 text-gray-400" />
      </motion.div>
      <motion.h3
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-xl font-semibold text-gray-900 mb-2 text-center"
      >
        {title}
      </motion.h3>
      {description && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-gray-500 text-center max-w-sm mb-6"
        >
          {description}
        </motion.p>
      )}
      {action && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Button onClick={action.onClick} leftIcon={<Plus className="w-4 h-4" />}>
            {action.label}
          </Button>
        </motion.div>
      )}
    </motion.div>
  );
}
