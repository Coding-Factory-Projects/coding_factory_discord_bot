FROM node:latest

WORKDIR /src/bot

ENV NODE_ENV=development

COPY ./package.json ./

RUN npm install

COPY . .

# This line is here to fix a missing dependency in the discordjs REST package
RUN cd node_modules/@discordjs/rest && \
    npm i --save-dev @types/node-fetch

RUN npm run build

CMD [ "npm", "run", "dev" ]