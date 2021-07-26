FROM node:16.5

WORKDIR /usr/app

EXPOSE 3000

COPY package*.json .
RUN npm install --only=production

COPY . .
CMD ["npm", "start"]
