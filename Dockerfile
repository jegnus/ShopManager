
FROM node:18.8-alpine
WORKDIR /ShopManager
COPY package.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
