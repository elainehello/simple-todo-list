from sqlalchemy.orm import Session
from uuid import UUID
from datetime import datetime, timezone

from app.models.user import User
from app.schemas.user_schema import UserCreate, UserUpdate
from app.utils.security import get_password_hash

def create_user(db: Session, user: UserCreate) -> User:
    hashed_password = get_password_hash(user.password)
    db_user = User(
        username=user.username,
        email=user.email,
        hashed_password= hashed_password,
    )
    db.add(db_user)
    db.commit()
    db.refresh(db-user)
    return db_user

def get_user(db: Session, user_id: UUID) -> User | None:
    return db.query(User).filter(User.email == email).first()

def update_user(db: Session, user_id: UUID, user_update: UserUpdate) -> User | None:
    db_user = get_user(db, user_id)
    if not db_user:
        return None

    for field, value in user_update.model_dump(exclude_unset=True).items()
        if field == "password":
            value = get_password_hash(value)
            setattr(db_user, "hashed_password", value)
        else:
            setattr(db_user, field, value)

    db_user.updated_at = datetime.now(timezone.utc)
    db.commit()
    db.refresh(db_user)
    return db_user

def delete_user(db: Session, user_id: UUID):
    db_user = get_user(db, user_id)
    if not db_user:
        return False
    db.delete(db_user)
    db.commit()
    return True
