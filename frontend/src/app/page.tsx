'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { Button, Spinner } from '@/components/ui';
import { 
  GraduationCap, 
  Users, 
  BookOpen, 
  BarChart3, 
  Shield, 
  Zap,
  ArrowRight,
  UserPlus,
  Search,
  Edit3,
  Trash2,
  Download,
  Clock,
  CheckCircle,
  Star,
  Globe,
  ChevronRight,
  Moon,
  Sun
} from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

export default function HomePage() {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.replace('/dashboard');
    }
  }, [isAuthenticated, isLoading, router]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % 4);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900 transition-colors duration-500">
        <Spinner size="lg" />
      </div>
    );
  }

  if (isAuthenticated) return null; // Will redirect via useEffect

  const workflowSteps = [
    {
      icon: UserPlus,
      title: "Register & Login",
      description: "Create your account and access the secure portal",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: Search,
      title: "Manage Students",
      description: "Add, search, and organize student information efficiently",
      color: "from-green-500 to-green-600"
    },
    {
      icon: BarChart3,
      title: "Track Progress",
      description: "Monitor student data with real-time insights and analytics",
      color: "from-purple-500 to-purple-600"
    },
    {
      icon: Download,
      title: "Export & Report",
      description: "Generate reports and export data for institutional use",
      color: "from-orange-500 to-orange-600"
    }
  ];

  const features = [
    { icon: Shield, title: "Secure Authentication", desc: "JWT-based security with encrypted passwords" },
    { icon: Zap, title: "Real-time Updates", desc: "Instant data synchronization across all devices" },
    { icon: BookOpen, title: "Course Management", desc: "Organize students by courses and track progress" },
    { icon: Globe, title: "REST API + Docs", desc: "Complete Swagger documentation with interactive testing" }
  ];

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900 transition-colors duration-500">
      {/* Navigation */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="absolute top-0 w-full z-50 p-6"
      >
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-2"
          >
            <div className="w-10 h-10 bg-linear-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-800 dark:text-white transition-colors">EduManager</span>
          </motion.div>
          
          <div className="flex items-center space-x-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleTheme}
              className="p-2 rounded-xl bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              aria-label="Toggle theme"
            >
              <motion.div
                initial={false}
                animate={{ rotate: isDark ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {isDark ? (
                  <Sun className="w-5 h-5 text-yellow-500" />
                ) : (
                  <Moon className="w-5 h-5 text-gray-600" />
                )}
              </motion.div>
            </motion.button>
            <Link href="http://localhost:8000/api/v1/docs" target="_blank" rel="noopener noreferrer">
              <Button variant="ghost" size="sm" className="hidden sm:flex text-white hover:text-black dark:text-white dark:hover:text-black">
                API Docs
              </Button>
            </Link>
            <Link href="/login">
              <Button variant="ghost" size="sm" className="hidden sm:flex text-white hover:text-black dark:text-white dark:hover:text-black">
                Sign In
              </Button>
            </Link>
            <Link href="/register">
              <Button size="sm" className="shadow-lg hover:shadow-xl transition-shadow">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 pt-20">
        {/* Background Decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.1 }}
            transition={{ duration: 1.5 }}
            className="absolute top-1/4 -left-20 w-96 h-96 bg-blue-400 dark:bg-blue-600 rounded-full blur-3xl transition-colors duration-500"
          />
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.1 }}
            transition={{ duration: 1.5, delay: 0.3 }}
            className="absolute bottom-1/4 -right-20 w-96 h-96 bg-purple-400 dark:bg-purple-600 rounded-full blur-3xl transition-colors duration-500"
          />
        </div>

        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 dark:text-white leading-tight transition-colors">
                Student
                <br />
                <span className="bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Management
                </span>
                <br />
                Made Simple
              </h1>
            </motion.div>

            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-lg transition-colors"
            >
              Streamline your educational institution with our comprehensive student management system. 
              Track progress, manage data, and enhance productivity with modern tools.
            </motion.p>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link href="/register">
                <Button 
                  size="lg" 
                  className="w-full sm:w-auto shadow-xl hover:shadow-2xl transition-all duration-300"
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                >
                  Start Free Trial
                </Button>
              </Link>
              <Link href="/login">
                <Button 
                  variant="outline" 
                  size="lg"
                  className="w-full sm:w-auto text-white hover:text-black dark:text-white  hover:bg-gray-50 dark:hover:bg-white-700 transition-colors"
                >
                  Watch Demo
                </Button>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="flex items-center space-x-6 pt-8"
            >
              <div className="flex items-center space-x-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <span className="text-gray-600 dark:text-gray-300 transition-colors">Trusted by 1000+ institutions</span>
            </motion.div>
          </motion.div>

          {/* Right Column - Interactive Workflow Demo */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/50 dark:border-gray-700/50 transition-colors duration-300">
              <motion.h3
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="text-2xl font-bold text-center mb-8 text-gray-800 dark:text-white transition-colors"
              >
                How It Works
              </motion.h3>

              <div className="space-y-6">
                {workflowSteps.map((step, index) => {
                  const Icon = step.icon;
                  const isActive = currentStep === index;
                  
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1.2 + index * 0.1 }}
                      className={`relative flex items-center space-x-4 p-4 rounded-2xl transition-all duration-500 ${
                        isActive ? 'bg-linear-to-r from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30 scale-105 shadow-lg' : 'hover:bg-gray-50 dark:hover:bg-gray-700/50'
                      }`}
                    >
                      <motion.div
                        animate={{
                          scale: isActive ? 1.1 : 1,
                          rotate: isActive ? 5 : 0
                        }}
                        transition={{ duration: 0.3 }}
                        className={`w-12 h-12 rounded-xl bg-linear-to-r ${step.color} flex items-center justify-center shadow-lg`}
                      >
                        <Icon className="w-6 h-6 text-white" />
                      </motion.div>
                      
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-800 dark:text-white transition-colors">{step.title}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-300 transition-colors">{step.description}</p>
                      </div>

                      <AnimatePresence>
                        {isActive && (
                          <motion.div
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0, opacity: 0 }}
                            className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center"
                          >
                            <CheckCircle className="w-4 h-4 text-white" />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                })}
              </div>

              {/* Progress Indicator */}
              <div className="flex justify-center mt-8 space-x-2">
                {workflowSteps.map((_, index) => (
                  <motion.div
                    key={index}
                    animate={{
                      scale: currentStep === index ? 1.2 : 1,
                      backgroundColor: currentStep === index ? '#3b82f6' : (isDark ? '#374151' : '#e5e7eb')
                    }}
                    className="w-3 h-3 rounded-full transition-colors"
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 transition-colors">
              Powerful Features for Modern Education
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto transition-colors">
              Everything you need to manage students, track progress, and streamline your educational workflow.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileHover={{ y: -10, scale: 1.05 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-white/50 dark:border-gray-700/50 hover:shadow-2xl transition-all duration-300"
                >
                  <div className="w-12 h-12 bg-linear-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-800 dark:text-white mb-2 transition-colors">{feature.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm transition-colors">{feature.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* API Documentation Section */}
      <section className="py-20 px-4 bg-gray-50 dark:bg-gray-800/50 transition-colors">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 transition-colors">
              Interactive API Documentation
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto transition-colors">
              Explore our comprehensive REST API with live Swagger documentation. Test endpoints, view schemas, and understand our data models.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* API Preview */}
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl border border-gray-200 dark:border-gray-700 transition-colors">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-gray-500 dark:text-gray-400 ml-4">
                    localhost:8000/api/v1/docs
                  </span>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 p-2 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors cursor-pointer">
                    <div className="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 text-xs rounded font-mono">
                      POST
                    </div>
                    <span className="text-gray-800 dark:text-gray-200 font-mono text-sm">
                      /api/v1/auth/register
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-3 p-2 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors cursor-pointer">
                    <div className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 text-xs rounded font-mono">
                      GET
                    </div>
                    <span className="text-gray-800 dark:text-gray-200 font-mono text-sm">
                      /api/v1/students
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-3 p-2 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors cursor-pointer">
                    <div className="px-2 py-1 bg-orange-100 dark:bg-orange-900 text-orange-700 dark:text-orange-300 text-xs rounded font-mono">
                      PUT
                    </div>
                    <span className="text-gray-800 dark:text-gray-200 font-mono text-sm">
                      /api/v1/students/{'{id}'}
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-3 p-2 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors cursor-pointer">
                    <div className="px-2 py-1 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 text-xs rounded font-mono">
                      DELETE
                    </div>
                    <span className="text-gray-800 dark:text-gray-200 font-mono text-sm">
                      /api/v1/students/{'{id}'}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* API Features */}
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="space-y-4">
                <div className="flex items-start space-x-4 p-4 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 transition-colors">
                  <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                    <BookOpen className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 dark:text-white">Interactive Testing</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Test API endpoints directly from the browser with live data
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 p-4 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 transition-colors">
                  <div className="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
                    <Shield className="w-4 h-4 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 dark:text-white">Authentication Guide</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Complete JWT authentication flow with examples
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 p-4 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 transition-colors">
                  <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center">
                    <BarChart3 className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 dark:text-white">Schema Documentation</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Detailed data models and validation rules
                    </p>
                  </div>
                </div>
              </div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="pt-4"
              >
                <Link href="http://localhost:8000/api/v1/docs" target="_blank" rel="noopener noreferrer">
                  <Button 
                    size="lg" 
                    className="w-full shadow-xl hover:shadow-2xl transition-all duration-300"
                    rightIcon={<ArrowRight className="w-4 h-4" />}
                  >
                    Explore API Documentation
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="py-20 px-4"
      >
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl p-12 shadow-2xl border border-white/50 dark:border-gray-700/50 transition-colors duration-300">
            <motion.h2
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-6 transition-colors"
            >
              Ready to Transform Your Student Management?
            </motion.h2>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto transition-colors"
            >
              Join thousands of educational institutions already using EduManager to streamline their operations.
            </motion.p>
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link href="/register">
                <Button 
                  size="lg"
                  className="shadow-xl hover:shadow-2xl transition-all duration-300"
                  rightIcon={<ChevronRight className="w-4 h-4" />}
                >
                  Get Started Now
                </Button>
              </Link>
              <Link href="/login">
                <Button 
                  variant="outline" 
                  size="lg"
                  className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  Sign In
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-gray-200 dark:border-gray-700 transition-colors">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 mb-4 sm:mb-0">
            <div className="w-8 h-8 bg-linear-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <span className="font-semibold text-gray-800 dark:text-white transition-colors">EduManager</span>
          </div>
          <p className="text-gray-600 dark:text-gray-300 text-sm transition-colors">
            © 2026 EduManager. Made with ❤️ for modern education.
          </p>
        </div>
      </footer>
    </div>
  );
}
