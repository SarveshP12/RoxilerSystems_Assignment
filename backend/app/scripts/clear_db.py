import sys
from sqlalchemy import text

try:
    from database import engine
except Exception as e:
    print(f"Failed to import database engine: {e}")
    sys.exit(1)


def clear_mysql():
    with engine.begin() as conn:
        # Disable FK checks, truncate tables, then re-enable
        conn.execute(text("SET FOREIGN_KEY_CHECKS=0"))
        conn.execute(text("TRUNCATE TABLE students"))
        conn.execute(text("TRUNCATE TABLE users"))
        conn.execute(text("SET FOREIGN_KEY_CHECKS=1"))
    print("MySQL: Truncated tables students, users and reset AUTO_INCREMENT.")


def clear_sqlite():
    with engine.begin() as conn:
        conn.execute(text("DELETE FROM students"))
        conn.execute(text("DELETE FROM users"))
        # Reset autoincrement sequence
        try:
            conn.execute(text("DELETE FROM sqlite_sequence WHERE name IN ('students','users')"))
        except Exception:
            pass
    print("SQLite: Deleted all rows from students and users; sequence reset where applicable.")


def main():
    dialect = engine.dialect.name
    print(f"Detected dialect: {dialect}")
    if dialect == "mysql":
        clear_mysql()
    elif dialect == "sqlite":
        clear_sqlite()
    else:
        # Fallback: attempt generic deletes
        with engine.begin() as conn:
            conn.execute(text("DELETE FROM students"))
            conn.execute(text("DELETE FROM users"))
        print(f"Generic: Deleted rows from students and users for dialect '{dialect}'.")


if __name__ == "__main__":
    main()
