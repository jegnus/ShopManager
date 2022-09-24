
FROM node:18.8-alpine
WORKDIR /shop_manager
COPY package.json ./
#COPY jegnus-resturant-web-app/package-lock.json ./
RUN npm install
EXPOSE 3000
CMD ["npm", "start"]
