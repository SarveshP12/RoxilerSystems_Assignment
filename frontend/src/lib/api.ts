import axios, { AxiosError } from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

// Types
export interface User {
  id: number;
  email: string;
  name: string;
  created_at: string;
}

export interface Student {
  id: number;
  name: string;
  email: string;
  age: number;
  course: string;
  city: string;
  created_by: number;
  created_at: string;
  updated_at: string;
}

export interface StudentListResponse {
  students: Student[];
  total: number;
  page: number;
  page_size: number;
  total_pages: number;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  name: string;
  password: string;
}

export interface StudentData {
  name: string;
  email: string;
  age: number;
  course: string;
  city: string;
}

export interface ApiError {
  detail: string;
}

// Auth API
export const authApi = {
  login: async (credentials: LoginCredentials) => {
    const response = await api.post<{ access_token: string; token_type: string }>('/auth/login', credentials);
    return response.data;
  },
  
  register: async (data: RegisterData) => {
    const response = await api.post<User>('/auth/register', data);
    return response.data;
  },
  
  getProfile: async () => {
    const response = await api.get<User>('/auth/me');
    return response.data;
  },
  
  verifyToken: async () => {
    const response = await api.get<{ valid: boolean; user_id: number; email: string; name: string }>('/auth/verify');
    return response.data;
  },
};

// Students API
export interface StudentQueryParams {
  page?: number;
  page_size?: number;
  search?: string;
  course?: string;
  city?: string;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export const studentsApi = {
  getAll: async (params?: StudentQueryParams) => {
    const response = await api.get<StudentListResponse>('/students', { params });
    return response.data;
  },
  
  getAllWithoutPagination: async () => {
    const response = await api.get<Student[]>('/students/all');
    return response.data;
  },
  
  getById: async (id: number) => {
    const response = await api.get<Student>(`/students/${id}`);
    return response.data;
  },
  
  create: async (data: StudentData) => {
    const response = await api.post<Student>('/students', data);
    return response.data;
  },
  
  update: async (id: number, data: Partial<StudentData>) => {
    const response = await api.put<Student>(`/students/${id}`, data);
    return response.data;
  },
  
  delete: async (id: number) => {
    const response = await api.delete<{ message: string; detail: string }>(`/students/${id}`);
    return response.data;
  },
  
  getCourses: async () => {
    const response = await api.get<string[]>('/students/courses');
    return response.data;
  },
  
  getCities: async () => {
    const response = await api.get<string[]>('/students/cities');
    return response.data;
  },
};

export default api;
