# API Эндпоинты

## 1. GET `/`

### Описание

Простой эндпоинт, который возвращает строку "Hello World!". Используется для проверки работы сервера.

### Пример запроса

```bash
curl http://localhost:3000/
```

### Пример ответа
```json
"Hello world"
```

## 2. GET `/items`

### Описание

Эндпоинт для получения списка предметов из API Skinport с минимальными ценами. Поддерживает пагинацию с использованием параметров page и offset. Также используется кэширование для уменьшения числа запросов к API.

### Пример запроса

```bash
curl "http://localhost:3000/items?page=1&offset=10"
```

### Пример ответа
```json
[
  {
    "name": "AWP | Dragon Lore (Factory New)",
    "currency": "USD",
    "suggested_price": 1500,
    "min_price": 1400,
    "max_price": 1600,
    "non_tradable_price": 1450
  },
  {
    "name": "AK-47 | Fire Serpent (Minimal Wear)",
    "currency": "USD",
    "suggested_price": 700,
    "min_price": 650,
    "max_price": 750,
    "non_tradable_price": 670
  }
]
```

## 3. POST `/purchase`

### Описание

Эндпоинт для списания баланса пользователя. Пользователь может приобрести предмет на сайте, и его баланс будет уменьшен на указанную сумму.

### Пример запроса
```bash
curl "http://localhost:3000/purchase"
```
## body
```json
{
    userId: "number",
    amount: "number"
}
```

### Пример ответа
```json
{
  "success": true
}
```

### Возможные ошибки
```
404 Not Found - Пользователь не найден.
```
```
400 Bad Request - Недостаточно средств на балансе.
```
```
500 Internal Server Error - Ошибка сервера.
```
