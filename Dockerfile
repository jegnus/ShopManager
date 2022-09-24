
FROM node:18.8-alpine
WORKDIR /shop_manager
COPY package.json ./
#COPY jegnus-resturant-web-app/package-lock.json ./
RUN npm install
COPY jegnus-resturant-web-app .
EXPOSE 3000
CMD ["npm", "start"]
