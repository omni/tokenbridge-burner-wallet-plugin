FROM node:12 as plugin-base

WORKDIR /plugin

COPY package.json .
COPY lerna.json .
COPY yarn.lock .
COPY tsconfig.json .
COPY my-plugin/package.json ./my-plugin/
COPY wallet/package.json ./wallet/
COPY test-wallet/package.json ./test-wallet/
RUN yarn install

COPY ./my-plugin ./my-plugin
RUN yarn build

FROM plugin-base as test-wallet
COPY ./test-wallet ./test-wallet
CMD ["yarn", "start-wallet"]


FROM plugin-base as wallet
COPY ./wallet ./wallet
CMD ["yarn", "start-wallet"]
