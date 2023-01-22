FROM node:lts

WORKDIR /app/nestjs

EXPOSE 4000
COPY . /app/nestjs

RUN yarn
RUN yarn run build

CMD ["npm", "run", "start:prod"]