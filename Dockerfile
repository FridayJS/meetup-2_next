FROM node:latest

COPY . /front/

WORKDIR /front/

RUN \
   yarn install && \
   npm run build

CMD cp -r /front/static/* /var/www/front/static/ && npm start