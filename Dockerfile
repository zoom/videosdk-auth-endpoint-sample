FROM node:latest AS build

WORKDIR /code

COPY package.json ./

RUN npm install

COPY . .

ENTRYPOINT [ "npm", "run", "start" ]
