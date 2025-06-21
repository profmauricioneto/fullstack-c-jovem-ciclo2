FROM node:22-slim

RUN apt-get update && apt-get upgrade -y && apt-get clean

WORKDIR /workspace/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]
