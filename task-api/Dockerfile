FROM node:10

COPY . ./usr/src/app

WORKDIR /usr/src/app

RUN yarn install

RUN yarn build

EXPOSE 3001

CMD [ "yarn", "start" ]