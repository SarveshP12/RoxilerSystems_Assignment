'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Student } from '@/lib/api';
import { cn } from '@/lib/utils';
import { Button, Badge } from '@/components/ui';
import { Edit2, Trash2, Mail, MapPin, BookOpen, Calendar, MoreVertical } from 'lucide-react';

interface StudentCardProps {
  student: Student;
  onEdit: (student: Student) => void;
  onDelete: (student: Student) => void;
  index?: number;
  className?: string;
}

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: i * 0.05,
      duration: 0.4,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  }),
};

export function StudentCard({ student, onEdit, onDelete, index = 0, className }: StudentCardProps) {
  return (
    <motion.div
      custom={index}
      initial="hidden"
      animate="visible"
      variants={cardVariants}
      whileHover={{ y: -8, transition: { duration: 0.2 } }}
      className={cn(
        'group bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-xl hover:shadow-gray-200/50 transition-all duration-300',
        className
      )}
    >
      {/* Header with Avatar and Actions */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-4">
          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-xl font-bold shadow-lg shadow-blue-500/30"
          >
            {student.name.charAt(0).toUpperCase()}
          </motion.div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
              {student.name}
            </h3>
            <div className="flex items-center text-sm text-gray-500 mt-0.5">
              <Mail className="w-3.5 h-3.5 mr-1.5" />
              <span className="truncate max-w-[180px]">{student.email}</span>
            </div>
          </div>
        </div>
        
        {/* Action buttons - visible on hover */}
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => onEdit(student)}
            className="p-2 rounded-lg text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
          >
            <Edit2 className="w-4 h-4" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => onDelete(student)}
            className="p-2 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </motion.button>
        </div>
      </div>

      {/* Info Grid */}
      <div className="grid grid-cols-3 gap-3 pt-4 border-t border-gray-100">
        <div className="flex flex-col items-center p-3 rounded-xl bg-gray-50 group-hover:bg-blue-50/50 transition-colors">
          <Calendar className="w-4 h-4 text-gray-400 mb-1.5" />
          <span className="text-sm font-semibold text-gray-700">{student.age}</span>
          <span className="text-xs text-gray-500">years</span>
        </div>
        <div className="flex flex-col items-center p-3 rounded-xl bg-gray-50 group-hover:bg-green-50/50 transition-colors">
          <BookOpen className="w-4 h-4 text-gray-400 mb-1.5" />
          <span className="text-sm font-semibold text-gray-700 truncate max-w-full">{student.course}</span>
          <span className="text-xs text-gray-500">course</span>
        </div>
        <div className="flex flex-col items-center p-3 rounded-xl bg-gray-50 group-hover:bg-purple-50/50 transition-colors">
          <MapPin className="w-4 h-4 text-gray-400 mb-1.5" />
          <span className="text-sm font-semibold text-gray-700 truncate max-w-full">{student.city}</span>
          <span className="text-xs text-gray-500">city</span>
        </div>
      </div>
    </motion.div>
  );
}

// Compact card variant for list views
interface StudentListItemProps extends StudentCardProps {}

export function StudentListItem({ student, onEdit, onDelete, index = 0 }: StudentListItemProps) {
  return (
    <motion.div
      custom={index}
      initial="hidden"
      animate="visible"
      variants={cardVariants}
      className="group flex items-center justify-between p-4 bg-white rounded-xl border border-gray-100 hover:border-blue-200 hover:shadow-md transition-all"
    >
      <div className="flex items-center gap-4">
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-semibold"
        >
          {student.name.charAt(0).toUpperCase()}
        </motion.div>
        <div>
          <h4 className="font-medium text-gray-900">{student.name}</h4>
          <p className="text-sm text-gray-500">{student.email}</p>
        </div>
      </div>
      
      <div className="flex items-center gap-6">
        <Badge variant="primary">{student.course}</Badge>
        <Badge variant="info">{student.city}</Badge>
        <span className="text-sm text-gray-500">{student.age} yrs</span>
        
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button variant="ghost" size="sm" onClick={() => onEdit(student)} className="p-2">
            <Edit2 className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm" onClick={() => onDelete(student)} className="p-2 text-red-500 hover:text-red-600 hover:bg-red-50">
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
