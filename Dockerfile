FROM node:18.10.0

WORKDIR /usr/src/app

COPY package*.json ./

RUN yarn install

COPY . .

COPY .env .

RUN yarn build

EXPOSE 8080

CMD [ "yarn", "run", "start:prod" ]