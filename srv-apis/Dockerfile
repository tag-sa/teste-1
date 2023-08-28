FROM node:alpine

LABEL maintainer "Robosn Monteiro"

WORKDIR /usr/src/app/

COPY package*.json ./

RUN npm install

COPY . .

