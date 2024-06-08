from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import logging
from additional_questions import *
from AI import AI_ASSISTANT



logging.basicConfig(level=logging.INFO)
app = FastAPI()
assistant = AI_ASSISTANT()


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



class Message(BaseModel):
    text: str


@app.post("/api/messages")
def read_root(message:Message):
    print(message.text)
    response  = assistant.get_answer(str(message.text))
    return {"response": response}