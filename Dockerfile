FROM node:12

WORKDIR /plugin

COPY package.json .
COPY lerna.json .
COPY yarn.lock .
COPY tsconfig.json .
COPY my-plugin/package.json ./my-plugin/
COPY wallet/package.json ./wallet/
RUN yarn install

COPY ./my-plugin ./my-plugin
RUN yarn build

COPY ./wallet ./wallet
CMD ["yarn", "start-wallet"]
