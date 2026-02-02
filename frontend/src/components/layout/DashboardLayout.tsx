'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';
import {
  GraduationCap,
  LayoutDashboard,
  Users,
  LogOut,
  Menu,
  X,
  User,
  ChevronRight,
} from 'lucide-react';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Students', href: '/students', icon: Users },
];

const sidebarVariants = {
  open: { x: 0 },
  closed: { x: '-100%' },
};

const linkVariants = {
  initial: { opacity: 0, x: -20 },
  animate: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.1 },
  }),
};

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30">
      {/* Desktop Sidebar */}
      <motion.div
        initial={{ x: -280 }}
        animate={{ x: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-72 lg:flex-col"
      >
        <div className="flex flex-col flex-grow bg-white/80 backdrop-blur-xl border-r border-gray-200/50 shadow-xl shadow-gray-200/20">
          {/* Logo */}
          <div className="flex items-center h-20 px-6 border-b border-gray-200/50">
            <motion.div
              initial={{ rotate: -180, scale: 0 }}
              animate={{ rotate: 0, scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, damping: 15 }}
              className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center shadow-lg shadow-blue-500/30"
            >
              <GraduationCap className="w-6 h-6 text-white" />
            </motion.div>
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="ml-3 text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent"
            >
              StudentMS
            </motion.span>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2">
            {navigation.map((item, index) => {
              const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
              return (
                <motion.div
                  key={item.name}
                  custom={index}
                  initial="initial"
                  animate="animate"
                  variants={linkVariants}
                >
                  <Link
                    href={item.href}
                    className={cn(
                      'group flex items-center px-4 py-3.5 rounded-xl text-sm font-medium transition-all duration-300',
                      isActive
                        ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/30'
                        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                    )}
                  >
                    <item.icon
                      className={cn(
                        'w-5 h-5 mr-3 transition-transform group-hover:scale-110',
                        isActive ? 'text-white' : 'text-gray-400 group-hover:text-gray-600'
                      )}
                    />
                    {item.name}
                    {isActive && (
                      <motion.div
                        layoutId="activeIndicator"
                        className="ml-auto"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </motion.div>
                    )}
                  </Link>
                </motion.div>
              );
            })}
          </nav>

          {/* User section */}
          <div className="border-t border-gray-200/50 p-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex items-center p-3 rounded-xl bg-gradient-to-r from-gray-50 to-gray-100/50"
            >
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center shadow-md shadow-blue-500/20">
                <User className="w-5 h-5 text-white" />
              </div>
              <div className="ml-3 flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-900 truncate">{user?.name}</p>
                <p className="text-xs text-gray-500 truncate">{user?.email}</p>
              </div>
            </motion.div>
            <motion.button
              whileHover={{ scale: 1.02, x: 4 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleLogout}
              className="mt-3 flex items-center w-full px-4 py-3 text-sm text-gray-600 rounded-xl hover:bg-red-50 hover:text-red-600 transition-all"
            >
              <LogOut className="w-4 h-4 mr-3" />
              Sign out
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Mobile header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-40 flex items-center justify-between h-16 px-4 bg-white/80 backdrop-blur-xl border-b border-gray-200/50">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center">
            <GraduationCap className="w-5 h-5 text-white" />
          </div>
          <span className="ml-2 text-lg font-bold text-gray-900">StudentMS</span>
        </div>
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 rounded-xl text-gray-600 hover:bg-gray-100"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </motion.button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="lg:hidden fixed inset-0 z-30 bg-black/50 backdrop-blur-sm"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div
              initial="closed"
              animate="open"
              exit="closed"
              variants={sidebarVariants}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="lg:hidden fixed top-16 left-0 bottom-0 z-40 w-72 bg-white border-r border-gray-200 shadow-xl"
            >
              <nav className="px-4 py-4 space-y-2">
                {navigation.map((item) => {
                  const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={cn(
                        'flex items-center px-4 py-3 rounded-xl text-sm font-medium transition-all',
                        isActive
                          ? 'bg-blue-600 text-white'
                          : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                      )}
                    >
                      <item.icon className={cn('w-5 h-5 mr-3', isActive ? 'text-white' : 'text-gray-400')} />
                      {item.name}
                    </Link>
                  );
                })}
              </nav>
              <div className="absolute bottom-0 left-0 right-0 border-t border-gray-200 p-4">
                <div className="flex items-center mb-3 p-3 rounded-xl bg-gray-50">
                  <div className="w-10 h-10 rounded-xl bg-blue-500 flex items-center justify-center">
                    <User className="w-5 h-5 text-white" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                    <p className="text-xs text-gray-500">{user?.email}</p>
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center w-full px-4 py-3 text-sm text-red-600 rounded-xl hover:bg-red-50 transition-colors"
                >
                  <LogOut className="w-4 h-4 mr-3" />
                  Sign out
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main content */}
      <div className="lg:pl-72">
        <main className="min-h-screen pt-16 lg:pt-0">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="px-4 py-6 sm:px-6 lg:px-8"
          >
            {children}
          </motion.div>
        </main>
      </div>
    </div>
  );
}
