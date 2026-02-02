from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.orm import Session
from sqlalchemy import or_
from typing import Optional, List
from database import get_db
from models import User, Student
from schemas import (
    StudentCreate,
    StudentUpdate,
    StudentResponse,
    StudentListResponse,
    MessageResponse
)
from auth import get_current_user
import math

router = APIRouter(prefix="/students", tags=["Students"])


@router.post("", response_model=StudentResponse, status_code=status.HTTP_201_CREATED)
async def create_student(
    student_data: StudentCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """
    Create a new student record.
    
    - **name**: Student's full name (2-100 characters)
    - **email**: Valid email address (unique)
    - **age**: Student's age (1-150)
    - **course**: Course name (2-100 characters)
    - **city**: City name (2-100 characters)
    """
    # Check if email already exists
    existing_student = db.query(Student).filter(Student.email == student_data.email).first()
    if existing_student:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="A student with this email already exists"
        )
    
    # Create new student
    new_student = Student(
        name=student_data.name,
        email=student_data.email,
        age=student_data.age,
        course=student_data.course,
        city=student_data.city,
        created_by=current_user.id
    )
    
    db.add(new_student)
    db.commit()
    db.refresh(new_student)
    
    return new_student


@router.get("", response_model=StudentListResponse)
async def get_students(
    page: int = Query(1, ge=1, description="Page number"),
    page_size: int = Query(10, ge=1, le=100, description="Items per page"),
    search: Optional[str] = Query(None, description="Search in name, email, course, or city"),
    course: Optional[str] = Query(None, description="Filter by course"),
    city: Optional[str] = Query(None, description="Filter by city"),
    sort_by: Optional[str] = Query("created_at", description="Sort field"),
    sort_order: Optional[str] = Query("desc", description="Sort order (asc/desc)"),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """
    Get a paginated list of students with optional filtering and search.
    
    - **page**: Page number (default: 1)
    - **page_size**: Number of items per page (default: 10, max: 100)
    - **search**: Search term to filter by name, email, course, or city
    - **course**: Filter by exact course name
    - **city**: Filter by exact city name
    - **sort_by**: Field to sort by (name, email, age, course, city, created_at)
    - **sort_order**: Sort direction (asc or desc)
    """
    # Base query - only students created by current user
    query = db.query(Student).filter(Student.created_by == current_user.id)
    
    # Apply search filter
    if search:
        search_term = f"%{search}%"
        query = query.filter(
            or_(
                Student.name.ilike(search_term),
                Student.email.ilike(search_term),
                Student.course.ilike(search_term),
                Student.city.ilike(search_term)
            )
        )
    
    # Apply course filter
    if course:
        query = query.filter(Student.course.ilike(f"%{course}%"))
    
    # Apply city filter
    if city:
        query = query.filter(Student.city.ilike(f"%{city}%"))
    
    # Get total count
    total = query.count()
    
    # Apply sorting
    valid_sort_fields = ["name", "email", "age", "course", "city", "created_at", "updated_at"]
    if sort_by not in valid_sort_fields:
        sort_by = "created_at"
    
    sort_column = getattr(Student, sort_by)
    if sort_order.lower() == "asc":
        query = query.order_by(sort_column.asc())
    else:
        query = query.order_by(sort_column.desc())
    
    # Apply pagination
    offset = (page - 1) * page_size
    students = query.offset(offset).limit(page_size).all()
    
    total_pages = math.ceil(total / page_size) if total > 0 else 1
    
    return StudentListResponse(
        students=students,
        total=total,
        page=page,
        page_size=page_size,
        total_pages=total_pages
    )


@router.get("/all", response_model=List[StudentResponse])
async def get_all_students(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """
    Get all students without pagination.
    
    Useful for exports or dropdowns.
    """
    students = db.query(Student).filter(
        Student.created_by == current_user.id
    ).order_by(Student.created_at.desc()).all()
    
    return students


@router.get("/courses", response_model=List[str])
async def get_unique_courses(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Get all unique course names for filtering."""
    courses = db.query(Student.course).filter(
        Student.created_by == current_user.id
    ).distinct().all()
    return [course[0] for course in courses]


@router.get("/cities", response_model=List[str])
async def get_unique_cities(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Get all unique city names for filtering."""
    cities = db.query(Student.city).filter(
        Student.created_by == current_user.id
    ).distinct().all()
    return [city[0] for city in cities]


@router.get("/{student_id}", response_model=StudentResponse)
async def get_student(
    student_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Get a specific student by ID."""
    student = db.query(Student).filter(
        Student.id == student_id,
        Student.created_by == current_user.id
    ).first()
    
    if not student:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Student not found"
        )
    
    return student


@router.put("/{student_id}", response_model=StudentResponse)
async def update_student(
    student_id: int,
    student_data: StudentUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """
    Update a student record.
    
    Only provide the fields you want to update.
    """
    student = db.query(Student).filter(
        Student.id == student_id,
        Student.created_by == current_user.id
    ).first()
    
    if not student:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Student not found"
        )
    
    # Check if email is being updated and if it's already taken
    if student_data.email and student_data.email != student.email:
        existing_student = db.query(Student).filter(
            Student.email == student_data.email,
            Student.id != student_id
        ).first()
        if existing_student:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="A student with this email already exists"
            )
    
    # Update only provided fields
    update_data = student_data.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(student, field, value)
    
    db.commit()
    db.refresh(student)
    
    return student


@router.delete("/{student_id}", response_model=MessageResponse)
async def delete_student(
    student_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Delete a student record."""
    student = db.query(Student).filter(
        Student.id == student_id,
        Student.created_by == current_user.id
    ).first()
    
    if not student:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Student not found"
        )
    
    student_name = student.name
    db.delete(student)
    db.commit()
    
    return MessageResponse(
        message="Student deleted successfully",
        detail=f"Student '{student_name}' has been removed"
    )
