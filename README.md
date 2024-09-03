# Fastify Skinport Server

## Описание

Это простой веб-сервер, реализованный на Fastify с использованием PostgreSQL. Сервер предоставляет два эндпоинта:

1. `/items` - Возвращает список предметов с минимальными ценами (tradable и non-tradable) с API Skinport.
2. `/purchase` - Позволяет списать баланс пользователя.

## Запуск проекта

### 1. Клонирование репозитория

```bash
git clone <your-repository-url>
cd fastify-skinport-server
npm install
echo src/.env
```


### 2. Заполнение .env
``` json
DATABASE_URL=your_postgresql_connection_string
PORT=3000
HOST=127.0.0.1
```

### 3. Запуск сервера
```bash
npm run build
npm start
```
