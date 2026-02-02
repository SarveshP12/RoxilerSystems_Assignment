'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { Input, Button } from '@/components/ui';
import { authApi } from '@/lib/api';
import { useToast } from '@/contexts/ToastContext';
import { Mail, Lock, Eye, EyeOff, User, GraduationCap, Sparkles, CheckCircle } from 'lucide-react';

const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

type RegisterFormData = z.infer<typeof registerSchema>;

const formFeatures = [
  'Access to student management',
  'Real-time data updates',
  'Secure authentication',
];

export default function RegisterPage() {
  const router = useRouter();
  const toast = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, dirtyFields },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (data: RegisterFormData) => {
    setIsLoading(true);
    try {
      await authApi.register({
        name: data.name,
        email: data.email,
        password: data.password,
      });
      toast.success('Account Created!', 'You can now sign in with your credentials.');
      router.push('/login');
    } catch (error: any) {
      toast.error(
        'Registration Failed',
        error.response?.data?.detail || 'Something went wrong. Please try again.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 flex items-center justify-center px-4 py-12">
      {/* Background Decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.4, scale: 1 }}
          transition={{ duration: 1 }}
          className="absolute top-1/3 -right-20 w-96 h-96 bg-purple-200 rounded-full blur-3xl"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.4, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="absolute bottom-1/3 -left-20 w-96 h-96 bg-blue-200 rounded-full blur-3xl"
        />
      </div>

      <div className="w-full max-w-5xl relative flex items-center gap-12">
        {/* Left Side - Features */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="hidden lg:flex flex-col flex-1"
        >
          <motion.div
            whileHover={{ scale: 1.05, rotate: 5 }}
            className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-purple-700 text-white shadow-xl shadow-purple-500/30 mb-6"
          >
            <GraduationCap className="w-8 h-8" />
          </motion.div>
          
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Join Student Portal
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Create your account and start managing student records with ease.
          </p>

          <div className="space-y-4">
            {formFeatures.map((feature, index) => (
              <motion.div
                key={feature}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="flex items-center gap-3"
              >
                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                </div>
                <span className="text-gray-700">{feature}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Right Side - Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          {/* Mobile Logo */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center mb-8 lg:hidden"
          >
            <motion.div
              whileHover={{ scale: 1.05, rotate: 5 }}
              className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-purple-700 text-white shadow-xl shadow-purple-500/30 mb-4"
            >
              <GraduationCap className="w-8 h-8" />
            </motion.div>
            <h1 className="text-3xl font-bold text-gray-900">Create Account</h1>
            <p className="text-gray-500 mt-2">Sign up to get started</p>
          </motion.div>

          {/* Form Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl shadow-gray-200/50 border border-white/50"
          >
            <div className="hidden lg:block mb-6">
              <h1 className="text-2xl font-bold text-gray-900">Create Account</h1>
              <p className="text-gray-500 mt-1">Fill in your details below</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Input
                  label="Full Name"
                  placeholder="Enter your name"
                  leftIcon={<User className="w-4 h-4" />}
                  error={errors.name?.message}
                  success={!errors.name && dirtyFields.name}
                  {...register('name')}
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
              >
                <Input
                  type="email"
                  label="Email Address"
                  placeholder="Enter your email"
                  leftIcon={<Mail className="w-4 h-4" />}
                  error={errors.email?.message}
                  success={!errors.email && dirtyFields.email}
                  {...register('email')}
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
              >
                <Input
                  type={showPassword ? 'text' : 'password'}
                  label="Password"
                  placeholder="Create a password"
                  leftIcon={<Lock className="w-4 h-4" />}
                  rightIcon={
                    <motion.button
                      type="button"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setShowPassword(!showPassword)}
                      className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </motion.button>
                  }
                  error={errors.password?.message}
                  success={!errors.password && dirtyFields.password}
                  {...register('password')}
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 }}
              >
                <Input
                  type={showConfirmPassword ? 'text' : 'password'}
                  label="Confirm Password"
                  placeholder="Confirm your password"
                  leftIcon={<Lock className="w-4 h-4" />}
                  rightIcon={
                    <motion.button
                      type="button"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                    >
                      {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </motion.button>
                  }
                  error={errors.confirmPassword?.message}
                  success={!errors.confirmPassword && dirtyFields.confirmPassword}
                  {...register('confirmPassword')}
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="pt-2"
              >
                <Button
                  type="submit"
                  size="lg"
                  className="w-full"
                  isLoading={isLoading}
                  leftIcon={!isLoading ? <Sparkles className="w-4 h-4" /> : undefined}
                >
                  Create Account
                </Button>
              </motion.div>
            </form>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
              className="mt-6 text-center"
            >
              <p className="text-gray-500">
                Already have an account?{' '}
                <Link
                  href="/login"
                  className="text-purple-600 hover:text-purple-700 font-semibold transition-colors"
                >
                  Sign in
                </Link>
              </p>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
