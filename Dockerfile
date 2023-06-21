FROM node:18-alpine
COPY . /clientapp
WORKDIR /clientapp

RUN npm ci
RUN npm run build

CMD npm start