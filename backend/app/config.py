from pydantic_settings import BaseSettings
from functools import lru_cache
from pathlib import Path


ENV_PATH = Path(__file__).resolve().parent.parent / ".env"

class Settings(BaseSettings):
    APP_NAME: str = "Student Management System"
    # SQLite (default fallback)
    DATABASE_URL: str = "sqlite:///./student_management.db"
    
    SECRET_KEY: str = "your-super-secret-key-change-in-production-min-32-chars"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24  # 24 hours

    class Config:
        # Load .env from the project root (backend/.env)
        env_file = str(ENV_PATH)


@lru_cache()
def get_settings():
    return Settings()


settings = get_settings()
