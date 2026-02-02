from pydantic import BaseModel, EmailStr, Field, ConfigDict
from datetime import datetime
from typing import Optional, List


# ==================== User Schemas ====================

class UserBase(BaseModel):
    email: EmailStr
    name: str = Field(..., min_length=2, max_length=100)


class UserCreate(UserBase):
    password: str = Field(..., min_length=6, max_length=72, description="Password must be between 6-72 characters")


class UserResponse(UserBase):
    id: int
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)


class UserLogin(BaseModel):
    email: EmailStr
    password: str


# ==================== Token Schemas ====================

class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"


class TokenData(BaseModel):
    user_id: Optional[int] = None


# ==================== Student Schemas ====================

class StudentBase(BaseModel):
    name: str = Field(..., min_length=2, max_length=100)
    email: EmailStr
    age: int = Field(..., ge=1, le=150)
    course: str = Field(..., min_length=2, max_length=100)
    city: str = Field(..., min_length=2, max_length=100)


class StudentCreate(StudentBase):
    pass


class StudentUpdate(BaseModel):
    name: Optional[str] = Field(None, min_length=2, max_length=100)
    email: Optional[EmailStr] = None
    age: Optional[int] = Field(None, ge=1, le=150)
    course: Optional[str] = Field(None, min_length=2, max_length=100)
    city: Optional[str] = Field(None, min_length=2, max_length=100)


class StudentResponse(StudentBase):
    id: int
    created_by: int
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)


class StudentListResponse(BaseModel):
    students: List[StudentResponse]
    total: int
    page: int
    page_size: int
    total_pages: int


# ==================== Message Schemas ====================

class MessageResponse(BaseModel):
    message: str
    detail: Optional[str] = None
