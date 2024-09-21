FROM node:20-alpine3.18 as builder
WORKDIR /app
COPY package*.json ./
RUN npm install
RUN npm install autoprefixer --save
COPY . .
RUN npm run db:generate
RUN npm run build
EXPOSE 3000
CMD [ "npm", "run", "start" ]
