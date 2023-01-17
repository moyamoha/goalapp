FROM node:lts

WORKDIR /app/nestjs

EXPOSE 4000
COPY . /app/nestjs

RUN npm install
RUN npm run build

USER 1000

CMD ["npm", "run", "start:prod"]