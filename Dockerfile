FROM node:14-alpine

WORKDIR /var/www/html

RUN apk update \
    && apk add --no-cache vim py3-pip python3-dev bash openssh \
    && npm install --quiet node-gyp -g

COPY package.json yarn.lock /var/www/html
RUN yarn && yarn cache clean
RUN rm -rf node_modules/sharp
RUN npm install --arch=x64 --platform=linux --target=8.10.0 sharp

COPY . /var/www/html

RUN cp env-example .env && yarn build && yarn generate

EXPOSE 3000

EXPOSE 22

CMD yarn start