FROM node:15.11.0-alpine3.10

#Install GIT
RUN apk update
RUN apk add git

#Sets working directory and copies over files
RUN mkdir -p /usr/msdev
WORKDIR /usr/msdev/

# COPY ./dev /usr/msdev

EXPOSE 8095

# ENTRYPOINT npx nodemon -L msdev
