# -*- coding: utf-8 -*-

from gigachat import GigaChat
import  re
def get_questions(text: str):
    giga = GigaChat(credentials="NmQ1OTVhZTEtNmQ5Yy00ZmNlLWJkNWMtMTAxYmY4MTU3MWJmOjRiYTEyYzQ4LWNiY2UtNDdlZi1hODIyLWMyNDVhMzFiMGJiNg==", verify_ssl_certs=False, model="GigaChat-Pro")
    response = giga.chat(f"{text } -> Ты  занимаешься подбором инвестиционной площадки для пользователя. По этому запросу пользователя задай ему уточняющие вопросы, которые необходимы. К примеру: вопрос: Мне нужна площадка для производства мебели. Ответ:[В каком районе вы бы хотели площадку?,Какая стоимость обьекта Вас интересует?, Какую бы площадь обьекта вы хотели?, Важно ли вам наличие водоснабжения?, Важно ли вам наличие газоснабжения?] Составь не более 5 вопросов! Вопросы не должны быть сложными для пользователя и примерно соответсвовать представленным мною")
    response = response.choices[0].message.content
    questions = re.split(r'\n\d+\.\s*', response)
    questions = [q.strip() for q in questions if q.strip()]
    return questions [1: -1]

