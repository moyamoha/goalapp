FROM node:lts

WORKDIR /app/nestjs

EXPOSE 4000
COPY . /app/nestjs

RUN yarn
RUN yarn build

CMD ["yarn", "start:prod"]