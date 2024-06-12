from pydantic import BaseModel, EmailStr, Field
from db import *


class Message(BaseModel):
    text: str


class User(Base):
    __tablename__ = "investors"
    id = Column(Integer, primary_key=True, index=True)
    fio = Column(String, index=True)
    email = Column(String, unique=True, index=True)
    organization = Column(String)
    inn = Column(String)
    website = Column(String)
    industry = Column(String)
    country = Column(String)
    city = Column(String)
    position = Column(String)
    hashed_password = Column(String)

class UserRegistration(BaseModel):
    fio: str
    email: EmailStr
    organization: str
    inn: str
    website: str
    industry: str
    country: str
    city: str
    position: str
    password: str



class UserLogin(BaseModel):
    email: EmailStr
    password: str


class Token(BaseModel):
    access_token: str
    token_type: str
class TokenData(BaseModel):
    email: str | None = None

class CompareObjectRequest(BaseModel):
    object1: dict
    object2: dict
    object3: dict
