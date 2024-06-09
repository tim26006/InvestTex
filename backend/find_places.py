import pandas as pd
import json

def find_places_features(place):
    # Чтение CSV файла
    df = pd.read_csv("Test.csv")

    # Поиск строки с заданной площадкой
    place_row = df[df['Название площадки'] == place]

    if not place_row.empty:
        # Замена NaN значений на пустые строки
        place_row = place_row.fillna('')

        # Преобразование строки в словарь
        dict_row = place_row.iloc[0].to_dict()

        # Конвертация словаря в JSON
        json_row = json.dumps(dict_row, ensure_ascii=False)

        return json_row

# Пример использования
response = find_places_features("Производственное помещение на территории завода 'Москабельмет'")
print(response)
