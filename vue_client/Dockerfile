FROM node:latest

WORKDIR /vue_client

COPY package*.json ./

RUN npm install

COPY . /vue_client

EXPOSE 8080

CMD [ "node", "main.js" ]