from pydantic import BaseModel, EmailStr, constr, Field
from uuid import UUID
from datetime import datetime

class UserBase(BaseModel):
    username: str
    email: EmailStr

class UserCreate(UserBase):
    password: constr = Field(min_length=6)

class UserUpdate(BaseModel):
    username: str | None = None
    email: EmailStr | None = None
    password: constr | None = Field(default=None, min_length=6)

class UserResponse(UserBase):
    id: UUID
    created_at: datetime

    class Config:
        from_attributes = True

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"

class TokenData(BaseModel):
    user_id: UUID | None = None
