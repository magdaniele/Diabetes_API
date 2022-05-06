FROM node

RUN mkdir -p /home/node/app/node_modules

WORKDIR /home/node/app

COPY package*.json ./

RUN npm install

EXPOSE 8080

CMD [ "node", "index.js" ]
