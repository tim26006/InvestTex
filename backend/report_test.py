import  yadisk
from docxtpl import DocxTemplate
from docx2pdf import convert
from datetime import datetime
import datetime
TOKEN = "y0_AgAAAAA2y2aGAAvdEQAAAAEGD5tEAAA2o5amE-FDO4gMfGqQQfwgFWD6LQ"


y = yadisk.YaDisk(token=TOKEN)

def report_data(data:list):
    data_dict = {}
    for x, item in enumerate(data, start=1):
        data_dict[f"title{x}"] = item["Название площадки"]
        data_dict[f"adress{x}"] = item["Адрес объекта"]
        data_dict[f"area{x}"] = item["Свободная площадь здания, сооружения, помещения, кв. м"]
        data_dict[f"price{x}"] = item["Стоимость объекта, руб. (покупки или месячной аренды)"]
        data_dict[f"type{x}"] = item["Форма сделки"]
        data_dict[f"voda{x}"] = item["Водоснабжение Наличие (Да/Нет)"]
        data_dict[f"gas{x}"] = item["Газоснабжение Наличие (Да/Нет)"]
        data_dict[f"otvod{x}"] = item["Водоотведение Наличие (Да/Нет)"]
    new_time = datetime.datetime.now()
    data_dict["date"] =  new_time


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











