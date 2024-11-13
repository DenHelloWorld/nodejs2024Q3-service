
FROM node:22


WORKDIR /app


COPY package*.json ./


RUN npm install


RUN npm install -g nodemon


COPY . .


RUN npm run build


EXPOSE 4000


CMD ["nodemon", "npm", "run", "start:docker"]
