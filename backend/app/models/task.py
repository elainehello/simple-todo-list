import uuid
from sqlalchemy import  Column, String, Boolean, DateTime, ForeignKey
from sqlalchemy.sql import func
from sqlalchemy.orm  import relationship
from app.core.database import Base


class Task(Base):
    __tablename__ = "tasks"
    __table_args__ = {"schema": "public"}

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    title = Column(String, nullable=False)
    description = Column(String, default="")
    completed= Column(Boolean, default=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    deadline = Column(DateTime, nullable=True)

    user_id = Column(String, ForeignKey("public.users.id"), nullable=True)
    user = relationship("User", back_populates="tasks")
    
