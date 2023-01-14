FROM node:18-alpine
COPY . /clientapp
WORKDIR /clientapp
RUN yarn install
RUN yarn build

CMD yarn start