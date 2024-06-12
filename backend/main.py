from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import logging
from additional_questions import *
from AI import *
from pydantic import BaseModel, EmailStr, Field
from  find_places import  find_places_features
from questions import  get_questions, define_them_question
from  prepare_query import prepare_data
from sqlalchemy import create_engine, Column, Integer, String
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, Session
from passlib.context import CryptContext
from jose import jwt
from jose.exceptions import JWTError
from datetime import datetime, timedelta
from fastapi import FastAPI, Depends, HTTPException
from auth import *
from fastapi.security import OAuth2PasswordBearer
from db import *
from models import *
import json



#uvicorn main:app

logging.basicConfig(level=logging.INFO)
app = FastAPI()




global start_message
global number_of_question
global query_to_bot

origins = [
    "http://127.0.0.1:5173",
    "http://localhost:5173",
    "http://localhost:5175",
    "http://localhost:5174",

]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

start_message = True
number_of_question = 0
query_to_bot = " "
user_answers = []

@app.post("/api/messages")
def read_root(message:Message):
    if not(define_them_question(message)):
        global start_message, questions_to_user, query
        global number_of_question
        global query_to_bot
        global user_answers
        if start_message:  # Здесь обрабатывается начальный запрос и формируются дополнительные вопросы
            query_to_bot = str(message)
            questions_to_user = get_questions(str(message))
            start_message = False
        if number_of_question< len(questions_to_user): # Задаем вопросы пока не кончатся
            question = questions_to_user[number_of_question]
            user_answers.append(message)
            number_of_question += 1
            if number_of_question == len(questions_to_user):
                return {"response": question,"last":"True", "features": "нема"}
            else:
                return {"response": question, "last": "False", "features": "нема"}
        elif number_of_question == len(questions_to_user):
            # Код, где подбирается площадка
            query = prepare_data (query_to_bot, questions_to_user, user_answers ) ## Сформировали запрос для нейронки
            names = place_names(query)  ## Отправили запрос нейронке и получили найденные обьекты
            start_message = True
            number_of_question = 0
            questions_to_user = []
            user_answers = []
            query_to_bot = []
            features = find_places_features(names)
            aye = features[0]
            suka = features[1]
            blyat = features[2]
            return {"response": "Нашел несколько площадок для Вас", "features":aye, "answer2":suka, "answer3":blyat, "otvet":True}
    else:
        return {"response": "Данный запрос про льготы и меры поддержки", 'lgots':1}

# Routes
@app.post("/api/register", response_model=dict)
async def register_user(user: UserRegistration, db: Session = Depends(get_db)):
    db_user = db.query(User).filter(User.email == user.email).first()
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")

    hashed_password = get_password_hash(user.password)
    new_user = User(
        fio=user.fio,
        email=user.email,
        organization=user.organization,
        inn=user.inn,
        website=user.website,
        industry=user.industry,
        country=user.country,
        city=user.city,
        position=user.position,
        hashed_password=hashed_password
    )
    db.add(new_user)
    try:
        db.commit()
        db.add(new_user)
        db.refresh(new_user)
        logger.info("User registered successfully: %s", user.email)
    except Exception as e:
        db.rollback()
        logger.error("Error committing the new user to the database: %s", e)
        raise HTTPException(status_code=500, detail="Internal server error")

    return {"message": f"Пользователь {user.fio} успешно зарегистрирован"}


@app.post("/api/login", response_model=Token)
async def login_user(user: UserLogin, db: Session = Depends(get_db)):
    db_user = authenticate_user(db, user.email, user.password)
    if not db_user:
        raise HTTPException(status_code=400, detail="Incorrect email or password")
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
    data={"sub": db_user.email}, expires_delta=access_token_expires)

    return {"access_token": access_token, "token_type": "bearer"}

