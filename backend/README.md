# Backend - Student Management System API

FastAPI-based REST API for the Student Management System.

## Features

- JWT Authentication
- User Registration/Login
- Student CRUD Operations
- Pagination, Search, Filtering, Sorting
- SQLite Database
- API Documentation (Swagger/ReDoc)

## Quick Start

```bash
# Create virtual environment
python -m venv venv

# Activate (Windows)
venv\Scripts\activate

# Activate (Mac/Linux)
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Run server
uvicorn app.main:app --reload --port 8000
```

## API Documentation

- Swagger UI: http://localhost:8000/api/v1/docs
- ReDoc: http://localhost:8000/api/v1/redoc

## Environment Variables

Create a `.env` file:

```env
DATABASE_URL=sqlite:///./student_management.db
SECRET_KEY=your-super-secret-key-change-in-production-min-32-chars
ACCESS_TOKEN_EXPIRE_MINUTES=1440
```

## API Endpoints

### Auth
- `POST /api/v1/auth/register` - Register
- `POST /api/v1/auth/login` - Login
- `GET /api/v1/auth/me` - Get profile
- `GET /api/v1/auth/verify` - Verify token

### Students
- `GET /api/v1/students` - List (paginated)
- `POST /api/v1/students` - Create
- `GET /api/v1/students/{id}` - Get one
- `PUT /api/v1/students/{id}` - Update
- `DELETE /api/v1/students/{id}` - Delete
