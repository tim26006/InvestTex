# Решение команды Decode 
Умный помощник по комплексному подбору инвестиционных площадок

## Содержание 
1. [Про проект](#About)
2. [Как запустить проект?](#Start)
3. [Backend](#Backend)
4. [Frontend](#Frontend)


## About
Данный репозиторий является решением команды Decode для **Лидеры Цифровой Трансформации 2024** - задача 05 **"Умный помощник по комплексному подбору инвестиционных площадок"**.

Модель ***RuGPT-3*** была обучена на данных:

- Информация о площадках 
- Информация о префрежимах
- Информация о мерах поддержки
- Данные МосСтата
- Инвестиционный портал города Москвы

Стек - ***Fast API + React*** - для динамического взаимодействия, без перегрузки страницы

Для хранения данных была использована ***Облачная система Cloud.ru*** и ***Яндекс.Диск***


## Start

`git clone https://github.com/tim26006/InvestTex.git`

`cd InvestTex`
### Для настройки frontend

`cd frontend`

`npm i` - для установки всех зависимостей

`npm run dev` - для запуска локально

`npm run build` - для сборки проекта

### Для настройки backend

`cd backend`

`python -m venv venv` - создание виртуальтного пространства

`venv\Scripts\activate.bat` - активирование Windows

`source venv/bin/activate` - активировать для Linux (MacOS)

`pip install -r requirements.txt` - установка всех зависимостей

Для работы необходимо папку fine_tuned_model закинуть в backend https://drive.google.com/drive/folders/1-RHs2EtgeanoSNlOj6ZZBN2zhUpsnsob

`uvicorn main:app` - запуск локально, можно добавить флак `-- reload` для динамического обновления

## Backend 
- Transformers
- OpenAI GPT2 
- RuGPT-3
- GigaChat
- Sqlalchemy
- PostgreSQL
- Облако Сloud.ru
- Яндекс Диск
## Frontend
- Talwind CSS
- Ant Design 5.0
- Axios
- React Modal
- React Icons
- ReCAPTCHA
- React Yandex Maps
- React-spinners


