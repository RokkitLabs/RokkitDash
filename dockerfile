FROM node:14

WORKDIR /app
COPY ./ /app

RUN apt update && apt update --fix-missing

#NGINX
RUN apt install -y nginx

#Node
RUN npm i
RUN npm i -g typescript
RUN tsc --build
ENTRYPOINT ["node", "."]