from fastapi import APIRouter, HTTPException, Header
from sqlalchemy import text
from database import engine
from config import settings

router = APIRouter(prefix="/admin", tags=["Admin"]) 

@router.post("/clear-db")
def clear_db(x_admin_secret: str | None = Header(default=None)):
    """Clear all data from users and students tables.
    Requires header `X-Admin-Secret` to match SECRET_KEY to prevent accidental use.
    """
    if x_admin_secret != settings.SECRET_KEY:
        raise HTTPException(status_code=401, detail="Unauthorized: invalid admin secret")

    dialect = engine.dialect.name
    if dialect == "mysql":
        with engine.begin() as conn:
            conn.execute(text("SET FOREIGN_KEY_CHECKS=0"))
            conn.execute(text("TRUNCATE TABLE students"))
            conn.execute(text("TRUNCATE TABLE users"))
            conn.execute(text("SET FOREIGN_KEY_CHECKS=1"))
        return {"status": "ok", "dialect": dialect, "action": "truncate"}
    elif dialect == "sqlite":
        with engine.begin() as conn:
            conn.execute(text("DELETE FROM students"))
            conn.execute(text("DELETE FROM users"))
            try:
                conn.execute(text("DELETE FROM sqlite_sequence WHERE name IN ('students','users')"))
            except Exception:
                pass
        return {"status": "ok", "dialect": dialect, "action": "delete"}
    else:
        with engine.begin() as conn:
            conn.execute(text("DELETE FROM students"))
            conn.execute(text("DELETE FROM users"))
        return {"status": "ok", "dialect": dialect, "action": "generic-delete"}
