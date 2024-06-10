import pandas as pd
import json

def find_places_features(places:list):
    # Чтение CSV файла
    df = pd.read_csv("Test.csv")

    # Массив для хранения результатов
    result = []

    for place in places:
        # Поиск строки с заданной площадкой
        place_row = df[df['Название площадки'] == place]

        if not place_row.empty:
            # Замена NaN значений на пустые строки
            place_row = place_row.fillna('')

            # Преобразование строки в словарь
            dict_row = place_row.iloc[0].to_dict()

            # Конвертация словаря в JSON и добавление в результат
            json_row = json.dumps(dict_row, ensure_ascii=False)
            result.append(json_row)

    return result ## Выводит массив json
