# -*- coding: utf-8 -*-

from gigachat import GigaChat
import  re
def get_questions(text: str):
    giga = GigaChat(credentials="NmQ1OTVhZTEtNmQ5Yy00ZmNlLWJkNWMtMTAxYmY4MTU3MWJmOjEyNjE2ZjdjLTUwMmItNDAyYS04MjhmLTc1NjE0OGRlMzA3Zg==", verify_ssl_certs=False)
    response = giga.chat(f"{text } -> Ты  занимаешься подбором инвестиционной площадки для пользователя. По этому запросу пользователя задай ему 6 уточняющих  вопросов, которые необходимы. К примеру: вопрос: Мне нужна площадка для производства мебели. Ответ:[В каком районе вы бы хотели площадку?,Какая стоимость обьекта Вас интересует?, Какую бы площадь обьекта вы хотели?, Важно ли вам наличие водоснабжения?, Важно ли вам наличие газоснабжения?] Составь 5 уточняющих вопросов! Вопросы не должны быть сложными для пользователя и примерно соответсвовать представленным мною! Если не указан регион, обязательно спроси про него!")
    response = response.choices[0].message.content
    questions = re.split(r'\n\d+\.\s*', response)
    questions = [q.strip() for q in questions if q.strip()]
    return questions [1: -1]

def define_them_question(text:str):
    giga = GigaChat(
        credentials="NmQ1OTVhZTEtNmQ5Yy00ZmNlLWJkNWMtMTAxYmY4MTU3MWJmOjEyNjE2ZjdjLTUwMmItNDAyYS04MjhmLTc1NjE0OGRlMzA3Zg==",
        verify_ssl_certs=False, model="GigaChat")
    response = giga.chat(
        f"{text} -> Тебе необходимо определить, является ли заданный запрос вопросом или просьбой узнать про льготы, меры поддержки или же подать заявку. В случае если да, то выводи в ответе [1], иначе [0]")
    response = response.choices[0].message.content
    if response == "[1]":
        return True
    if response == "[0]":
        return  False
    print(response)


