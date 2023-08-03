FROM node:18.10.0

WORKDIR /usr/src/app

COPY package*.json ./

RUN yarn install

COPY . .

COPY .env .

CMD [ "npm", "run", "start:dev" ]