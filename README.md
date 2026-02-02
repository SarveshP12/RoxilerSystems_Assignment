# Student Management System

A full-stack web application for managing student records with secure authentication, built with **Next.js** (React) for the frontend and **FastAPI** (Python) for the backend.

## 🌟 Features

### Authentication
- User registration with email and password
- Secure login with JWT tokens
- Protected routes and automatic token refresh
- Password hashing with bcrypt

### Student Management
- **Create**: Add new student records with validation
- **Read**: View students in grid or table view
- **Update**: Edit existing student information
- **Delete**: Remove students with confirmation dialog

### Advanced Features
- **Search**: Full-text search across name, email, course, and city
- **Filtering**: Filter by course and city
- **Sorting**: Sort by any column (name, email, age, course, city, date)
- **Pagination**: Paginated results for large datasets
- **Responsive Design**: Works on desktop, tablet, and mobile devices

## 🏗️ Tech Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **React Hook Form** - Form handling with validation
- **Zod** - Schema validation
- **Axios** - HTTP client
- **Lucide React** - Icons
- **React Hot Toast** - Toast notifications

### Backend
- **FastAPI** - Modern Python web framework
- **SQLAlchemy** - SQL toolkit and ORM
- **SQLite** - Lightweight database
- **JWT** - JSON Web Tokens for authentication
- **Passlib** - Password hashing
- **Pydantic** - Data validation

## 📁 Project Structure

```
student-management-system/
├── backend/
│   ├── app/
│   │   ├── __init__.py
│   │   ├── main.py           # FastAPI application entry
│   │   ├── config.py         # Configuration settings
│   │   ├── database.py       # Database connection
│   │   ├── models.py         # SQLAlchemy models
│   │   ├── schemas.py        # Pydantic schemas
│   │   ├── auth.py           # Authentication utilities
│   │   └── routers/
│   │       ├── auth.py       # Auth endpoints
│   │       └── students.py   # Student CRUD endpoints
│   ├── requirements.txt
│   └── .env.example
│
└── frontend/
    ├── src/
    │   ├── app/              # Next.js App Router pages
    │   │   ├── layout.tsx
    │   │   ├── page.tsx
    │   │   ├── login/
    │   │   ├── register/
    │   │   ├── dashboard/
    │   │   └── students/
    │   ├── components/
    │   │   ├── ui/           # Reusable UI components
    │   │   ├── layout/       # Layout components
    │   │   └── students/     # Student-specific components
    │   ├── contexts/         # React contexts
    │   ├── lib/              # Utilities and API client
    │   └── styles/           # Global styles
    ├── package.json
    └── tailwind.config.js
```

## 🚀 Getting Started

### Prerequisites
- **Node.js** 18+ and npm
- **Python** 3.9+
- **pip** (Python package manager)

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Create a virtual environment:
   ```bash
   python -m venv venv
   
   # Windows
   venv\Scripts\activate
   
   # Mac/Linux
   source venv/bin/activate
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Create `.env` file (optional - defaults are provided):
   ```bash
   cp .env.example .env
   ```

5. Run the development server:
   ```bash
   uvicorn app.main:app --reload --port 8000
   ```

The API will be available at `http://localhost:8000`
- API Documentation: `http://localhost:8000/api/v1/docs`
- ReDoc: `http://localhost:8000/api/v1/redoc`

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

The application will be available at `http://localhost:3000`

## 📡 API Endpoints

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/v1/auth/register` | Register new user |
| POST | `/api/v1/auth/login` | Login and get JWT token |
| GET | `/api/v1/auth/me` | Get current user profile |
| GET | `/api/v1/auth/verify` | Verify JWT token |

### Students
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/students` | Get paginated students list |
| GET | `/api/v1/students/all` | Get all students |
| GET | `/api/v1/students/{id}` | Get student by ID |
| POST | `/api/v1/students` | Create new student |
| PUT | `/api/v1/students/{id}` | Update student |
| DELETE | `/api/v1/students/{id}` | Delete student |
| GET | `/api/v1/students/courses` | Get unique courses |
| GET | `/api/v1/students/cities` | Get unique cities |

### Query Parameters for GET /students
- `page` - Page number (default: 1)
- `page_size` - Items per page (default: 10, max: 100)
- `search` - Search in name, email, course, city
- `course` - Filter by course
- `city` - Filter by city
- `sort_by` - Sort field (name, email, age, course, city, created_at)
- `sort_order` - Sort direction (asc/desc)

## 🔐 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: Bcrypt algorithm with salt
- **Protected Routes**: Frontend route guards
- **API Security**: Bearer token validation
- **CORS**: Configured for local development
- **Input Validation**: Both client and server-side

## 🎨 UI/UX Features

- **Responsive Design**: Mobile-first approach
- **Loading States**: Skeleton and spinner indicators
- **Empty States**: Helpful messages when no data
- **Error Handling**: Toast notifications for errors
- **Success Feedback**: Confirmation for all actions
- **Form Validation**: Real-time validation feedback
- **Accessible**: ARIA labels and keyboard navigation

## 📱 Screenshots

### Login Page
Clean and modern login interface with form validation.

### Dashboard
Overview of statistics and recent students.

### Students List
Grid and table views with filtering and search.

### Student Form
Modal form with real-time validation.

## 🛠️ Development

### Running Tests
```bash
# Backend
cd backend
pytest

# Frontend
cd frontend
npm test
```

### Building for Production
```bash
# Backend - no build step needed

# Frontend
cd frontend
npm run build
npm start
```

## 📄 License

This project is created for educational/assessment purposes.

## 👤 Author

Created as part of the PrimeTrade.ai Assignment.
