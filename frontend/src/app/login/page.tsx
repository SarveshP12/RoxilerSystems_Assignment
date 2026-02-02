'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { Input, Button } from '@/components/ui';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/contexts/ToastContext';
import { authApi } from '@/lib/api';
import { Mail, Lock, Eye, EyeOff, GraduationCap, Sparkles } from 'lucide-react';

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const toast = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, dirtyFields },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    try {
      const response = await authApi.login({ email: data.email, password: data.password });
      await login(response.access_token);
      toast.success('Welcome back!', 'You have successfully logged in.');
      router.push('/dashboard');
    } catch (error: any) {
      toast.error('Login Failed', error.response?.data?.detail || 'Invalid email or password. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center px-4">
      {/* Background Decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.4, scale: 1 }}
          transition={{ duration: 1 }}
          className="absolute top-1/4 -left-20 w-96 h-96 bg-blue-200 rounded-full blur-3xl"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.4, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="absolute bottom-1/4 -right-20 w-96 h-96 bg-purple-200 rounded-full blur-3xl"
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md relative"
      >
        {/* Logo and Title */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-8"
        >
          <motion.div
            whileHover={{ scale: 1.05, rotate: 5 }}
            className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-linear-to-br from-blue-500 to-blue-700 text-white shadow-xl shadow-blue-500/30 mb-4"
          >
            <GraduationCap className="w-8 h-8" />
          </motion.div>
          <h1 className="text-3xl font-bold text-gray-900">Welcome Back</h1>
          <p className="text-gray-500 mt-2">Sign in to continue to Student Portal</p>
        </motion.div>

        {/* Form Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl shadow-gray-200/50 border border-white/50"
        >
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
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
              transition={{ delay: 0.5 }}
            >
              <Input
                type={showPassword ? 'text' : 'password'}
                label="Password"
                placeholder="Enter your password"
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
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="pt-2"
            >
              <Button
                type="submit"
                size="lg"
                className="w-full"
                isLoading={isLoading}
                leftIcon={!isLoading ? <Sparkles className="w-4 h-4" /> : undefined}
              >
                Sign In
              </Button>
            </motion.div>
          </form>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="mt-6 text-center"
          >
            <p className="text-gray-500">
              Don&apos;t have an account?{' '}
              <Link
                href="/register"
                className="text-blue-600 hover:text-blue-700 font-semibold transition-colors"
              >
                Create one
              </Link>
            </p>
          </motion.div>
        </motion.div>

        {/* Demo Credentials */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-6 p-4 bg-blue-50/80 backdrop-blur rounded-2xl border border-blue-100"
        >
          <p className="text-sm text-blue-700 text-center">
            <span className="font-semibold">Demo:</span> Register a new account to get started
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
