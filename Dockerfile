FROM node:12

WORKDIR /plugin

COPY package.json .
COPY lerna.json .
COPY yarn.lock .
COPY tsconfig.json .
COPY my-plugin/package.json ./my-plugin/
COPY basic-wallet/package.json ./basic-wallet/
COPY local-wallet/package.json ./local-wallet/
RUN yarn install

COPY ./my-plugin ./my-plugin
RUN yarn build

COPY ./basic-wallet ./basic-wallet
COPY ./local-wallet ./local-wallet
