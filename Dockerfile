FROM node:22-alpine
WORKDIR /app

COPY package*.json ./

RUN npm install --omit=dev && npm cache clean --force && apk add --no-cache bash

COPY . .
ENTRYPOINT ["sh", "-c", "npm run start"]