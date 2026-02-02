'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Input, Chip } from '@/components/ui';
import { Search, X, Filter, SlidersHorizontal } from 'lucide-react';

interface StudentFiltersProps {
  search: string;
  onSearchChange: (value: string) => void;
  course: string;
  onCourseChange: (value: string) => void;
  city: string;
  onCityChange: (value: string) => void;
  courses: string[];
  cities: string[];
  onClear: () => void;
}

export function StudentFilters({
  search,
  onSearchChange,
  course,
  onCourseChange,
  city,
  onCityChange,
  courses,
  cities,
  onClear,
}: StudentFiltersProps) {
  const [showFilters, setShowFilters] = useState(false);
  const hasFilters = search || course || city;

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm"
    >
      {/* Search Bar */}
      <div className="flex items-center gap-4">
        <div className="flex-1">
          <Input
            placeholder="Search by name, email, course or city..."
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            leftIcon={<Search className="w-4 h-4" />}
            rightIcon={
              search ? (
                <motion.button
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => onSearchChange('')}
                  className="p-1 rounded-full hover:bg-gray-100 cursor-pointer"
                >
                  <X className="w-3 h-3" />
                </motion.button>
              ) : undefined
            }
          />
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowFilters(!showFilters)}
          className={`flex items-center gap-2 px-4 py-3 rounded-xl border transition-all ${
            showFilters || course || city
              ? 'bg-blue-50 border-blue-200 text-blue-700'
              : 'border-gray-200 text-gray-600 hover:bg-gray-50'
          }`}
        >
          <SlidersHorizontal className="w-4 h-4" />
          <span className="font-medium">Filters</span>
          {(course || city) && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="w-5 h-5 rounded-full bg-blue-600 text-white text-xs flex items-center justify-center"
            >
              {(course ? 1 : 0) + (city ? 1 : 0)}
            </motion.span>
          )}
        </motion.button>
        {hasFilters && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClear}
            className="px-4 py-3 rounded-xl text-gray-500 hover:text-red-600 hover:bg-red-50 transition-colors font-medium"
          >
            Clear all
          </motion.button>
        )}
      </div>

      {/* Filter Chips */}
      <motion.div
        initial={false}
        animate={{
          height: showFilters ? 'auto' : 0,
          opacity: showFilters ? 1 : 0,
          marginTop: showFilters ? 20 : 0,
        }}
        transition={{ duration: 0.2 }}
        className="overflow-hidden"
      >
        <div className="space-y-4">
          {/* Course Filter */}
          {courses.length > 0 && (
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Filter by Course
              </label>
              <div className="flex flex-wrap gap-2">
                {courses.map((c) => (
                  <Chip
                    key={c}
                    variant="primary"
                    selected={course === c}
                    onClick={() => onCourseChange(course === c ? '' : c)}
                  >
                    {c}
                  </Chip>
                ))}
              </div>
            </div>
          )}

          {/* City Filter */}
          {cities.length > 0 && (
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Filter by City
              </label>
              <div className="flex flex-wrap gap-2">
                {cities.map((c) => (
                  <Chip
                    key={c}
                    variant="info"
                    selected={city === c}
                    onClick={() => onCityChange(city === c ? '' : c)}
                  >
                    {c}
                  </Chip>
                ))}
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
