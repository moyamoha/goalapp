FROM node:lts

WORKDIR /app/nestjs

EXPOSE 4000
COPY . /app/nestjs

RUN npm run install
RUN npm run build

CMD ["npm", "run", "start:prod"]