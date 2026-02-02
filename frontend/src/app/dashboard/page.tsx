'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { DashboardLayout, ProtectedRoute } from '@/components/layout';
import { Card, Button, Spinner, Badge } from '@/components/ui';
import { studentsApi, Student } from '@/lib/api';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { 
  Users, 
  BookOpen, 
  MapPin, 
  TrendingUp, 
  ArrowRight,
  Plus,
  Clock
} from 'lucide-react';

const statVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.4 },
  }),
};

export default function DashboardPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [stats, setStats] = useState({
    totalStudents: 0,
    totalCourses: 0,
    totalCities: 0,
  });
  const [recentStudents, setRecentStudents] = useState<Student[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [studentsRes, courses, cities] = await Promise.all([
          studentsApi.getAll({ page: 1, page_size: 5, sort_by: 'id', sort_order: 'desc' }),
          studentsApi.getCourses(),
          studentsApi.getCities(),
        ]);

        setStats({
          totalStudents: studentsRes.total,
          totalCourses: courses.length,
          totalCities: cities.length,
        });
        setRecentStudents(studentsRes.students);
      } catch (error) {
        console.error('Failed to fetch dashboard data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const statCards = [
    {
      title: 'Total Students',
      value: stats.totalStudents,
      icon: Users,
      color: 'blue',
      gradient: 'from-blue-400 to-blue-600',
    },
    {
      title: 'Total Courses',
      value: stats.totalCourses,
      icon: BookOpen,
      color: 'green',
      gradient: 'from-green-400 to-green-600',
    },
    {
      title: 'Total Cities',
      value: stats.totalCities,
      icon: MapPin,
      color: 'purple',
      gradient: 'from-purple-400 to-purple-600',
    },
  ];

  return (
    <ProtectedRoute>
      <DashboardLayout>
        <div className="space-y-8">
          {/* Welcome Section */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
          >
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                Welcome back, {user?.name?.split(' ')[0] || 'User'}! 👋
              </h1>
              <p className="text-gray-500 mt-1">Here&apos;s what&apos;s happening with your students today.</p>
            </div>
            <Button 
              onClick={() => router.push('/students')}
              leftIcon={<Plus className="w-4 h-4" />}
            >
              Add Student
            </Button>
          </motion.div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {isLoading ? (
              <>
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-32 bg-white rounded-2xl animate-pulse" />
                ))}
              </>
            ) : (
              statCards.map((stat, index) => (
                <motion.div
                  key={stat.title}
                  custom={index}
                  initial="hidden"
                  animate="visible"
                  variants={statVariants}
                >
                  <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer group">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                        <motion.p
                          initial={{ scale: 0.5 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.2 + index * 0.1, type: 'spring' }}
                          className="text-3xl font-bold text-gray-900 mt-1"
                        >
                          {stat.value}
                        </motion.p>
                      </div>
                      <motion.div
                        whileHover={{ scale: 1.1, rotate: 10 }}
                        className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center text-white shadow-lg`}
                      >
                        <stat.icon className="w-7 h-7" />
                      </motion.div>
                    </div>
                    <div className="mt-4 flex items-center text-sm">
                      <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                      <span className="text-green-600 font-medium">Active</span>
                    </div>
                  </Card>
                </motion.div>
              ))
            )}
          </div>

          {/* Recent Students */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="overflow-hidden">
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
                      <Clock className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h2 className="text-lg font-semibold text-gray-900">Recent Students</h2>
                      <p className="text-sm text-gray-500">Latest additions to your database</p>
                    </div>
                  </div>
                  <Button 
                    variant="secondary" 
                    size="sm" 
                    onClick={() => router.push('/students')}
                    rightIcon={<ArrowRight className="w-4 h-4" />}
                  >
                    View All
                  </Button>
                </div>
              </div>

              {isLoading ? (
                <div className="p-8 flex justify-center">
                  <Spinner size="lg" />
                </div>
              ) : recentStudents.length === 0 ? (
                <div className="p-8 text-center">
                  <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
                    <Users className="w-8 h-8 text-gray-400" />
                  </div>
                  <p className="text-gray-500">No students yet</p>
                  <Button 
                    variant="secondary" 
                    className="mt-4"
                    onClick={() => router.push('/students')}
                  >
                    Add Your First Student
                  </Button>
                </div>
              ) : (
                <div className="divide-y divide-gray-50">
                  {recentStudents.map((student, index) => (
                    <motion.div
                      key={student.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + index * 0.05 }}
                      className="p-4 hover:bg-gray-50/50 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <motion.div
                          whileHover={{ scale: 1.1 }}
                          className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-semibold shadow-sm"
                        >
                          {student.name.charAt(0).toUpperCase()}
                        </motion.div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-gray-900 truncate">{student.name}</p>
                          <p className="text-sm text-gray-500 truncate">{student.email}</p>
                        </div>
                        <div className="hidden sm:flex items-center gap-2">
                          <Badge variant="primary">{student.course}</Badge>
                          <Badge variant="info">{student.city}</Badge>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </Card>
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            <Card 
              className="p-6 cursor-pointer group hover:border-blue-200"
              onClick={() => router.push('/students')}
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                    Manage Students
                  </h3>
                  <p className="text-sm text-gray-500">View, add, edit or delete students</p>
                </div>
                <ArrowRight className="w-5 h-5 text-gray-400 ml-auto group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
              </div>
            </Card>
            
            <Card 
              className="p-6 cursor-pointer group hover:border-purple-200"
              onClick={() => router.push('/students')}
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center group-hover:bg-purple-200 transition-colors">
                  <BookOpen className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 group-hover:text-purple-600 transition-colors">
                    Browse Courses
                  </h3>
                  <p className="text-sm text-gray-500">Filter students by their courses</p>
                </div>
                <ArrowRight className="w-5 h-5 text-gray-400 ml-auto group-hover:text-purple-600 group-hover:translate-x-1 transition-all" />
              </div>
            </Card>
          </motion.div>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}
