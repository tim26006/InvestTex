from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import logging
from additional_questions import *
from AI import *
from pydantic import BaseModel, EmailStr, Field
from  find_places import  find_places_features
from questions import  get_questions
from  prepare_query import prepare_data
import json


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
class Message(BaseModel):
    text: str


@app.post("/api/messages")
def read_root(message:Message):
    global start_message, questions_to_user, query
    global number_of_question
    global query_to_bot
    global user_answers
    if start_message:  # Здесь обрабатывается начальный запрос и формируются дополнительные вопросы
        query_to_bot = str(message)
        questions_to_user = get_questions(str(message))
        start_message = False
    if number_of_question < len(questions_to_user): # Задаем вопросы пока не кончатся
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
        start_message = False
        number_of_question = 0
        user_answers = []
        query_to_bot = []
        features = find_places_features(names)
        return {"response": "Нашел несколько площадок для Вас", "features":features, "otvet":True}


    # response = assistant.get_answer(str(message.text))
    # print(response)
    # features = find_places_features(response)
    # print (features)



class UserRegistration(BaseModel):
    fio: str
    email: str
    organization: str
    inn: str
    website: str
    industry: str
    country: str
    city: str
    position: str
    password: str

@app.post("/api/register")
async def register_user(user: UserRegistration):
    return {"message": "Пользователь успешно зарегистрирован"}


#uvicorn main:app - для запуска