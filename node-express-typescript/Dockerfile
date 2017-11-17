FROM ubuntu:14.04.4

COPY sources.list /etc/apt/sources.list

RUN apt-get update
RUN apt-get -y install nginx
RUN apt-get -y install npm

RUN npm -g --registry=http://registry.npm.taobao.org i npm@5.3.0
RUN ln -sb /usr/local/bin/npm  /usr/bin/npm

WORKDIR /usr/share/nginx/html/server

RUN apt-get -y install wget
RUN wget https://npm.taobao.org/mirrors/node/v8.4.0/node-v8.4.0-linux-x64.tar.xz

RUN tar -xvf node-v8.4.0-linux-x64.tar.xz

RUN ln -sb /usr/share/nginx/html/server/node-v8.4.0-linux-x64/bin/node /usr/bin/node

COPY build /usr/share/nginx/html
RUN chmod +x ./run.sh

RUN rm -rf node_modules
RUN rm -rf node-v8.4.0-linux-x64.tar.xz

USER root
RUN npm --registry=http://registry.npm.taobao.org i --unsafe-perm
ENTRYPOINT "./run.sh"