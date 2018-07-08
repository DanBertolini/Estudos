FROM node
MAINTAINER Daniel Bertolini
COPY . var/www
WORKDIR /var/www
RUN npm i
ENTRYPOINT npm start
EXPOSE 3000