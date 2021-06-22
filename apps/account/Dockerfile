FROM node:14-alpine As development

WORKDIR /usr/src/app

RUN chown -R node:node /usr/src/app

USER node

COPY package.json ./

COPY yarn.lock ./

COPY . .

RUN yarn install

RUN yarn build account


FROM node:14-alpine As production

WORKDIR /usr/src/app

RUN chown -R node:node /usr/src/app

USER node

COPY package.json ./

COPY yarn.lock ./

RUN yarn install --production

COPY --from=development /usr/src/app/dist/apps/account ./dist

CMD ["node", "dist/main"]