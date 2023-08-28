FROM node:18-alpine as angular

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY package*.json ./

RUN npm ci --legacy-peer-deps

COPY . ./

RUN npm run build

FROM nginx:stable-alpine

COPY --from=angular /app/dist/e-commerce /usr/share/nginx/html

COPY ./docker/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
