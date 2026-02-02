from sqlalchemy import create_engine, text
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from config import settings
from sqlalchemy.engine.url import make_url

# Ensure MySQL database exists, then configure engine based on database type
url = make_url(settings.DATABASE_URL)

if url.get_backend_name() == "mysql":
    db_name = url.database
    # Connect to built-in 'mysql' database to ensure CREATE DATABASE works
    server_url = url.set(database="mysql")
    try:
        server_engine = create_engine(server_url, pool_pre_ping=True)
        with server_engine.connect() as conn:
            conn.execute(text(f"CREATE DATABASE IF NOT EXISTS `{db_name}` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci"))
    finally:
        try:
            server_engine.dispose()
        except Exception:
            pass

    engine = create_engine(
        settings.DATABASE_URL,
        pool_pre_ping=True,
        pool_recycle=300
    )
elif url.get_backend_name() == "sqlite":
    engine = create_engine(
        settings.DATABASE_URL,
        connect_args={"check_same_thread": False}
    )
else:
    engine = create_engine(
        settings.DATABASE_URL,
        pool_pre_ping=True
    )

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()


def get_db():
    """Dependency to get database session"""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
