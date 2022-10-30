FROM node:16

RUN curl -f https://get.pnpm.io/v6.16.js | node - add --global pnpm

WORKDIR /server

COPY .npmrc package.json pnpm-lock.yaml ./

COPY dist ./
COPY prisma ./prisma

RUN pnpm install

EXPOSE 80
CMD [ "pnpm", "start" ]