'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Student } from '@/lib/api';
import { Badge, Button } from '@/components/ui';
import { Edit2, Trash2, ChevronUp, ChevronDown, ArrowUpDown } from 'lucide-react';

interface StudentTableProps {
  students: Student[];
  onEdit: (student: Student) => void;
  onDelete: (student: Student) => void;
  sortBy: string;
  sortOrder: 'asc' | 'desc';
  onSort: (field: string) => void;
}

const sortableColumns = [
  { key: 'name', label: 'Name' },
  { key: 'email', label: 'Email' },
  { key: 'age', label: 'Age' },
  { key: 'course', label: 'Course' },
  { key: 'city', label: 'City' },
];

const rowVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.03, duration: 0.3 },
  }),
  exit: { opacity: 0, x: 20, transition: { duration: 0.2 } },
};

export function StudentTable({
  students,
  onEdit,
  onDelete,
  sortBy,
  sortOrder,
  onSort,
}: StudentTableProps) {
  const SortIcon = ({ field }: { field: string }) => {
    if (sortBy !== field) {
      return <ArrowUpDown className="w-4 h-4 ml-1.5 text-gray-300 group-hover:text-gray-400" />;
    }
    return sortOrder === 'asc' ? (
      <motion.div
        initial={{ rotate: 180 }}
        animate={{ rotate: 0 }}
        transition={{ duration: 0.2 }}
      >
        <ChevronUp className="w-4 h-4 ml-1.5 text-blue-600" />
      </motion.div>
    ) : (
      <motion.div
        initial={{ rotate: -180 }}
        animate={{ rotate: 0 }}
        transition={{ duration: 0.2 }}
      >
        <ChevronDown className="w-4 h-4 ml-1.5 text-blue-600" />
      </motion.div>
    );
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-100">
          <thead>
            <tr className="bg-gradient-to-r from-gray-50 to-gray-100/50">
              {sortableColumns.map((column) => (
                <th
                  key={column.key}
                  className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider cursor-pointer group hover:bg-gray-100 transition-colors"
                  onClick={() => onSort(column.key)}
                >
                  <div className="flex items-center">
                    {column.label}
                    <SortIcon field={column.key} />
                  </div>
                </th>
              ))}
              <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            <AnimatePresence mode="popLayout">
              {students.map((student, index) => (
                <motion.tr
                  key={student.id}
                  custom={index}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={rowVariants}
                  layout
                  className="group hover:bg-blue-50/30 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-sm font-semibold shadow-sm"
                      >
                        {student.name.charAt(0).toUpperCase()}
                      </motion.div>
                      <span className="font-medium text-gray-900">{student.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-gray-600">{student.email}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-gray-600">{student.age}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Badge variant="primary">{student.course}</Badge>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Badge variant="info">{student.city}</Badge>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => onEdit(student)}
                        className="p-2 rounded-lg text-gray-400 hover:text-blue-600 hover:bg-blue-100 transition-colors"
                      >
                        <Edit2 className="w-4 h-4" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => onDelete(student)}
                        className="p-2 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-100 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </motion.button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
      </div>
    </div>
  );
}
