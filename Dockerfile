FROM node:16

WORKDIR /server

COPY package.json package-lock.json dist ./

RUN npm ci --only=production --ignore-scripts

expose 80

CMD [ "npm", "start" ]