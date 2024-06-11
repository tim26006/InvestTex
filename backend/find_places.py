import pandas as pd
import json

def find_places_features(places: list):
    # Чтение CSV файла
    df = pd.read_csv("Test.csv")

    # Удаление лишних пробелов в начале и конце строк в столбце 'Название площадки'
    df['Название площадки'] = df['Название площадки'].str.strip()

    # Преобразование всех имен площадок в нижний регистр для сравнения
    df['Название площадки'] = df['Название площадки'].str.lower()

    # Массив для хранения результатов
    result = []

    for place in places:
        # Удаление лишних пробелов и приведение к нижнему регистру
        place = place.strip().lower()

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

    return result  # Выводит массив json

# Пример вызова функции
print(len(find_places_features(["Земельный участок 0,38 га", "Помещение 32 кв.м. в технопарке Физтехпарк", "Помещение 222 кв.м. в технопарке Элма"])))
