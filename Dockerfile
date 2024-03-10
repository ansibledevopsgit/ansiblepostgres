FROM node:alpine

WORKDIR /app
 
ENV PATH /app/node_modules/.bin:$PATH

 
COPY package.json ./
COPY package-lock.json ./
 
RUN npm config set proxy http://fodev.org:8118
RUN npm config set https-proxy http://fodev.org:8118
RUN npm install
 
COPY . ./
EXPOSE 8000
 
CMD ["node", "main.js"]
