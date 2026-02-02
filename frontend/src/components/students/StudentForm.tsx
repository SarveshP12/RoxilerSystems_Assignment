'use client';

import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { Drawer } from '@/components/ui/Drawer';
import { Button, Input } from '@/components/ui';
import { Student, StudentData } from '@/lib/api';
import { User, Mail, Calendar, BookOpen, MapPin, Sparkles } from 'lucide-react';

const studentSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100, 'Name must be less than 100 characters'),
  email: z.string().email('Please enter a valid email address'),
  age: z.coerce.number().int().min(1, 'Age must be at least 1').max(150, 'Age must be less than 150'),
  course: z.string().min(2, 'Course must be at least 2 characters').max(100, 'Course must be less than 100 characters'),
  city: z.string().min(2, 'City must be at least 2 characters').max(100, 'City must be less than 100 characters'),
});

type StudentFormData = z.infer<typeof studentSchema>;

interface StudentFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: StudentData) => Promise<void>;
  initialData?: Student | null;
  isLoading?: boolean;
}

const inputVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.3 },
  }),
};

export function StudentForm({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  isLoading = false,
}: StudentFormProps) {
  const isEditMode = !!initialData;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, dirtyFields },
  } = useForm<StudentFormData>({
    resolver: zodResolver(studentSchema),
    defaultValues: initialData || {
      name: '',
      email: '',
      age: undefined,
      course: '',
      city: '',
    },
  });

  useEffect(() => {
    if (isOpen) {
      reset(
        initialData || {
          name: '',
          email: '',
          age: undefined,
          course: '',
          city: '',
        }
      );
    }
  }, [isOpen, initialData, reset]);

  const handleFormSubmit = async (data: StudentFormData) => {
    await onSubmit(data);
  };

  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      title={isEditMode ? 'Edit Student' : 'Add New Student'}
      description={isEditMode ? 'Update the student information below' : 'Fill in the details to create a new student record'}
      size="md"
    >
      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-5">
        <motion.div
          custom={0}
          initial="hidden"
          animate="visible"
          variants={inputVariants}
        >
          <Input
            label="Full Name"
            placeholder="Enter student's full name"
            leftIcon={<User className="w-4 h-4" />}
            error={errors.name?.message}
            success={!errors.name && dirtyFields.name}
            required
            {...register('name')}
          />
        </motion.div>

        <motion.div
          custom={1}
          initial="hidden"
          animate="visible"
          variants={inputVariants}
        >
          <Input
            type="email"
            label="Email Address"
            placeholder="Enter email address"
            leftIcon={<Mail className="w-4 h-4" />}
            error={errors.email?.message}
            success={!errors.email && dirtyFields.email}
            required
            {...register('email')}
          />
        </motion.div>

        <motion.div
          custom={2}
          initial="hidden"
          animate="visible"
          variants={inputVariants}
        >
          <Input
            type="number"
            label="Age"
            placeholder="Enter age"
            leftIcon={<Calendar className="w-4 h-4" />}
            error={errors.age?.message}
            success={!errors.age && dirtyFields.age}
            required
            {...register('age')}
          />
        </motion.div>

        <motion.div
          custom={3}
          initial="hidden"
          animate="visible"
          variants={inputVariants}
        >
          <Input
            label="Course"
            placeholder="Enter course name (e.g., Computer Science)"
            leftIcon={<BookOpen className="w-4 h-4" />}
            error={errors.course?.message}
            success={!errors.course && dirtyFields.course}
            required
            {...register('course')}
          />
        </motion.div>

        <motion.div
          custom={4}
          initial="hidden"
          animate="visible"
          variants={inputVariants}
        >
          <Input
            label="City"
            placeholder="Enter city"
            leftIcon={<MapPin className="w-4 h-4" />}
            error={errors.city?.message}
            success={!errors.city && dirtyFields.city}
            required
            {...register('city')}
          />
        </motion.div>

        <motion.div
          custom={5}
          initial="hidden"
          animate="visible"
          variants={inputVariants}
          className="flex justify-end gap-3 pt-6 border-t border-gray-100"
        >
          <Button type="button" variant="secondary" onClick={onClose} disabled={isLoading}>
            Cancel
          </Button>
          <Button
            type="submit"
            isLoading={isLoading}
            leftIcon={!isLoading ? <Sparkles className="w-4 h-4" /> : undefined}
          >
            {isEditMode ? 'Update Student' : 'Create Student'}
          </Button>
        </motion.div>
      </form>
    </Drawer>
  );
}
