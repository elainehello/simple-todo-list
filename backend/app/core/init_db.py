# app/core/init_db.py
from app.core.database import Base, engine
from app.models import task, user  # import all models

def init_db():
    """
    Initialize the database: create tables that don't exist yet.
    Safe to run multiple times in development without dropping data.
    """
    # Show which tables are mapped
    print("Mapped tables:", Base.metadata.tables.keys())

    # Create all tables that do not yet exist
    Base.metadata.create_all(bind=engine)
    
    print("Database tables ensured (created if not exist).")

if __name__ == "__main__":
    init_db()
