'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DashboardLayout, ProtectedRoute } from '@/components/layout';
import { 
  Button, 
  Pagination, 
  EmptyState, 
  ConfirmDialog, 
  LoadingState,
  SkeletonCard
} from '@/components/ui';
import { StudentForm, StudentCard, StudentTable, StudentFilters } from '@/components/students';
import { studentsApi, Student, StudentData } from '@/lib/api';
import { useToast } from '@/contexts/ToastContext';
import { debounce } from '@/lib/utils';
import { Plus, LayoutGrid, List, Users } from 'lucide-react';

type ViewMode = 'grid' | 'table';

export default function StudentsPage() {
  const toast = useToast();
  
  // State
  const [students, setStudents] = useState<Student[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const perPage = 9;
  
  // Filters
  const [search, setSearch] = useState('');
  const [courseFilter, setCourseFilter] = useState('');
  const [cityFilter, setCityFilter] = useState('');
  const [courses, setCourses] = useState<string[]>([]);
  const [cities, setCities] = useState<string[]>([]);
  
  // Sorting
  const [sortBy, setSortBy] = useState('id');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  
  // Form/Modal state
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Delete dialog
  const [deleteDialog, setDeleteDialog] = useState<{ isOpen: boolean; student: Student | null }>({
    isOpen: false,
    student: null,
  });
  const [isDeleting, setIsDeleting] = useState(false);

  // Fetch students
  const fetchStudents = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await studentsApi.getAll({
        page: currentPage,
        page_size: perPage,
        search: search || undefined,
        course: courseFilter || undefined,
        city: cityFilter || undefined,
        sort_by: sortBy,
        sort_order: sortOrder,
      });
      
      setStudents(response.students);
      setTotalPages(response.total_pages);
      setTotalItems(response.total);
    } catch (error) {
      toast.error('Error', 'Failed to fetch students. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [currentPage, search, courseFilter, cityFilter, sortBy, sortOrder, toast]);

  // Fetch filter options
  const fetchFilterOptions = useCallback(async () => {
    try {
      const [coursesRes, citiesRes] = await Promise.all([
        studentsApi.getCourses(),
        studentsApi.getCities(),
      ]);
      setCourses(coursesRes);
      setCities(citiesRes);
    } catch (error) {
      console.error('Failed to fetch filter options:', error);
    }
  }, []);

  useEffect(() => {
    fetchStudents();
  }, [fetchStudents]);

  useEffect(() => {
    fetchFilterOptions();
  }, [fetchFilterOptions]);

  // Debounced search
  const debouncedSearch = useCallback(
    debounce((value: string) => {
      setSearch(value);
      setCurrentPage(1);
    }, 300),
    []
  );

  const handleSearchChange = (value: string) => {
    debouncedSearch(value);
  };

  const handleCourseChange = (value: string) => {
    setCourseFilter(value);
    setCurrentPage(1);
  };

  const handleCityChange = (value: string) => {
    setCityFilter(value);
    setCurrentPage(1);
  };

  const handleClearFilters = () => {
    setSearch('');
    setCourseFilter('');
    setCityFilter('');
    setCurrentPage(1);
  };

  const handleSort = (field: string) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  // CRUD operations
  const handleCreate = () => {
    setSelectedStudent(null);
    setIsFormOpen(true);
  };

  const handleEdit = (student: Student) => {
    setSelectedStudent(student);
    setIsFormOpen(true);
  };

  const handleDelete = (student: Student) => {
    setDeleteDialog({ isOpen: true, student });
  };

  const handleFormSubmit = async (data: StudentData) => {
    setIsSubmitting(true);
    try {
      if (selectedStudent) {
        await studentsApi.update(selectedStudent.id, data);
        toast.success('Student Updated', 'The student record has been updated successfully.');
      } else {
        await studentsApi.create(data);
        toast.success('Student Created', 'A new student has been added successfully.');
      }
      setIsFormOpen(false);
      fetchStudents();
      fetchFilterOptions();
    } catch (error: any) {
      toast.error(
        selectedStudent ? 'Update Failed' : 'Creation Failed',
        error.response?.data?.detail || 'Something went wrong. Please try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleConfirmDelete = async () => {
    if (!deleteDialog.student) return;
    
    setIsDeleting(true);
    try {
      await studentsApi.delete(deleteDialog.student.id);
      toast.success('Student Deleted', 'The student record has been removed successfully.');
      setDeleteDialog({ isOpen: false, student: null });
      fetchStudents();
      fetchFilterOptions();
    } catch (error: any) {
      toast.error('Delete Failed', error.response?.data?.detail || 'Failed to delete student.');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <ProtectedRoute>
      <DashboardLayout>
        <div className="space-y-6">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
          >
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Students</h1>
              <p className="text-gray-500 mt-1">
                Manage your student records ({totalItems} total)
              </p>
            </div>
            <div className="flex items-center gap-3">
              {/* View Toggle */}
              <div className="flex items-center bg-gray-100 rounded-xl p-1">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === 'grid' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500'
                  }`}
                >
                  <LayoutGrid className="w-5 h-5" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setViewMode('table')}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === 'table' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500'
                  }`}
                >
                  <List className="w-5 h-5" />
                </motion.button>
              </div>
              
              <Button onClick={handleCreate} leftIcon={<Plus className="w-4 h-4" />}>
                Add Student
              </Button>
            </div>
          </motion.div>

          {/* Filters */}
          <StudentFilters
            search={search}
            onSearchChange={handleSearchChange}
            course={courseFilter}
            onCourseChange={handleCourseChange}
            city={cityFilter}
            onCityChange={handleCityChange}
            courses={courses}
            cities={cities}
            onClear={handleClearFilters}
          />

          {/* Content */}
          {isLoading ? (
            viewMode === 'grid' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <SkeletonCard key={i} />
                ))}
              </div>
            ) : (
              <LoadingState message="Loading students..." />
            )
          ) : students.length === 0 ? (
            <EmptyState
              icon="users"
              title={search || courseFilter || cityFilter ? 'No students found' : 'No students yet'}
              description={
                search || courseFilter || cityFilter
                  ? 'Try adjusting your filters to find what you\'re looking for.'
                  : 'Get started by adding your first student to the database.'
              }
              action={
                search || courseFilter || cityFilter ? {
                  label: 'Clear Filters',
                  onClick: handleClearFilters,
                } : {
                  label: 'Add Your First Student',
                  onClick: handleCreate,
                }
              }
            />
          ) : viewMode === 'grid' ? (
            <motion.div
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              <AnimatePresence mode="popLayout">
                {students.map((student, index) => (
                  <StudentCard
                    key={student.id}
                    student={student}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    index={index}
                  />
                ))}
              </AnimatePresence>
            </motion.div>
          ) : (
            <StudentTable
              students={students}
              onEdit={handleEdit}
              onDelete={handleDelete}
              sortBy={sortBy}
              sortOrder={sortOrder}
              onSort={handleSort}
            />
          )}

          {/* Pagination */}
          {!isLoading && students.length > 0 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          )}

          {/* Student Form Drawer */}
          <StudentForm
            isOpen={isFormOpen}
            onClose={() => setIsFormOpen(false)}
            onSubmit={handleFormSubmit}
            initialData={selectedStudent}
            isLoading={isSubmitting}
          />

          {/* Delete Confirmation Dialog */}
          <ConfirmDialog
            isOpen={deleteDialog.isOpen}
            onClose={() => setDeleteDialog({ isOpen: false, student: null })}
            onConfirm={handleConfirmDelete}
            title="Delete Student"
            description={`Are you sure you want to delete "${deleteDialog.student?.name}"? This action cannot be undone and all associated data will be permanently removed.`}
            confirmLabel="Delete"
            variant="danger"
            isLoading={isDeleting}
          />
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}
