# Используем официальное Node.js изображение как базовое
FROM node:22

# Устанавливаем рабочую директорию в контейнере
WORKDIR /app

# Копируем package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем все файлы проекта в рабочую директорию контейнера
COPY . .

# Собираем приложение (если нужно)
RUN npm run build

# Указываем, какой порт должен быть открыт
EXPOSE 4000

# Запускаем приложение
CMD ["npm", "run", "start:prod"]
