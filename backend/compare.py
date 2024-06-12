


from gigachat import GigaChat


def compare(text):
    giga = GigaChat(credentials="MDc2NzBhZjEtYTMzOS00ZjFlLTk0N2ItZjA0ZWE3ZTQ4YzE1OjY1OTY0MTY5LTJkNWEtNDE4ZC04NzQ4LTgyNWVlNjY5NmRiNQ==", verify_ssl_certs=False, model="GigaChat")
    response = giga.chat(f"{text} -> Cравни данные площадки.  Определи какая площадка из представленных выгоднее к покупке. Выведи ответ в форме: Площадка [название площадки] предпочтительнее, потому что...")
    response = response.choices[0].message.content
    return response


