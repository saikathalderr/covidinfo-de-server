FROM node:20-alpine
WORKDIR /usr/app
COPY package*.json ./
COPY . .
EXPOSE 4000
RUN npm run build
CMD [ "node", "build/index.js" ]