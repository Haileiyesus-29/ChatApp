FROM node:20-alpine

WORKDIR /app

COPY package.json .

COPY client/package.json ./client/package.json

RUN npm install

RUN cd client && npm install

COPY prisma . 

RUN npx prisma generate

COPY . .

RUN cd client && npm run build

RUN npm run build

EXPOSE 5000

CMD ["npm", "start"]
