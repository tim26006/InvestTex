import  yadisk
from docxtpl import DocxTemplate
from docx2pdf import convert
from datetime import datetime
import datetime
from hepls import  help
import re
import html
TOKEN = "y0_AgAAAAA2y2aGAAvdEQAAAAEGD5tEAAA2o5amE-FDO4gMfGqQQfwgFWD6LQ"


def clean_document_text(text):
    cleaned_text = html.unescape(text)  # Decode HTML entities
    cleaned_text = cleaned_text.replace('<br />', '\n')  # Replace <br /> with newline
    cleaned_text = re.sub(r'^\d+\.\s', '', cleaned_text, flags=re.MULTILINE)  # Remove numbered list formatting
    return cleaned_text.strip()

    return cleaned_text.strip()


y = yadisk.YaDisk(token=TOKEN)

def report_data(data:list):
    lgots = {}
    data_dict = {}
    for x, item in enumerate(data, start=1):
        data_dict[f"title{x}"] = item["Название площадки"]
        lgots[f"title{x}"] = item["Название площадки"]

        data_dict[f"adress{x}"] = item["Адрес объекта"]
        data_dict[f"area{x}"] = item["Свободная площадь здания, сооружения, помещения, кв. м"]
        data_dict[f"price{x}"] = item["Стоимость объекта, руб. (покупки или месячной аренды)"]
        data_dict[f"type{x}"] = item["Форма сделки"]
        data_dict[f"voda{x}"] = item["Водоснабжение Наличие (Да/Нет)"]
        data_dict[f"gas{x}"] = item["Газоснабжение Наличие (Да/Нет)"]
        data_dict[f"otvod{x}"] = item["Водоотведение Наличие (Да/Нет)"]
    new_time = datetime.datetime.now()
    data_dict["date"] =  new_time
    result = ", ".join(lgots.values())
    make_lgots = help(result)
    for x, item in enumerate(make_lgots, start=1):
        data_dict[f"titles{x}"] = item.get("Наименование меры поддержки", "")
        data_dict[f"mex{x}"] = item.get("Суть механизма", "")
        data_dict[f"form{x}"] = item.get("Ссылка на форму подачи заявки", "")
        data_dict[f"doc{x}"] = item.get("Уровень поддержки", "")
        data_dict[f"treb{x}"] = str( item.get("Процедура подачи заявки", "").replace('<br />', '\n').replace("</p>", ' ').replace("<p>",' '))

    doc = DocxTemplate("files/template.docx")
    doc.render(data_dict)
    doc.save("files/report.docx")

    convert("files/report.docx", "files/report.pdf")

    # Загружаем файл
    filename = "files/report.pdf"
    file_path = str(new_time)+"report.pdf" # Путь относительно текущей директории
    upload_result = y.upload(filename, file_path)
    download_link = y.get_download_link(file_path)

    return str(download_link)











