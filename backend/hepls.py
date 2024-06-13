import pickle
import re
from sklearn.neighbors import NearestNeighbors
from sklearn.feature_extraction.text import TfidfVectorizer
import pandas as pd
import json


def help(query:str):
    lgots = []
    with open('./lgots/knn_model.pkl', 'rb') as model_file:
        knn = pickle.load(model_file)
    with open('./lgots/tfidf_vectorizer.pkl', 'rb') as vectorizer_file:
        vectorizer = pickle.load(vectorizer_file)
    data = pd.read_csv("Льготы.csv")
    data['combined_text'] = data['Наименование меры поддержки'] + ' ' + data['Суть механизма']
    data['combined_text'] = data['combined_text'].apply(lambda x: re.sub('<[^<]+?>', '', x))
    data['combined_text'] = data['combined_text'].apply(lambda x: re.sub('[^a-zA-Zа-яА-Я\s]', '', x))
    data['combined_text'] = data['combined_text'].str.lower()
    query = re.sub('<[^<]+?>', '', query)
    query = re.sub('[^a-zA-Zа-яА-Я\s]', '', query)
    query = query.lower()
    query_vec = vectorizer.transform([query])
    distances, indices = knn.kneighbors(query_vec)
    results = data.iloc[indices[0]]
    results = results['Наименование меры поддержки'].tolist()

    for result in results:
        place_row = data[data['Наименование меры поддержки'] == result]
        if not place_row.empty:
            # Замена NaN значений на пустые строки
            place_row = place_row.fillna('')

            # Преобразование строки в словарь
            dict_row = place_row.iloc[0].to_dict()

            # Конвертация словаря в JSON и добавление в результат
            json_row = json.dumps(dict_row, ensure_ascii=False)
            lgots.append(json_row)
    return lgots
