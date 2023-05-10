FROM node:14-slim
LABEL MAINTAINER="rockwon"

RUN unlink /etc/localtime && ln -s /usr/share/zoneinfo/Asia/Seoul /etc/localtime
RUN apt-get update
RUN apt-get upgrade -y

WORKDIR /app
COPY . /app

ENV NODE_ENV $RENV 
ENV PATH /app/node_modules/.bin:$PATH
ENV NPM_CONFIG_LOGLEVEL warn

RUN npm install pm2 -g

ENTRYPOINT ["pm2-runtime"]
CMD ["start", "pm2.yml"]
