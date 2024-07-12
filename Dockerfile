FROM node:20-alpine

WORKDIR /app

COPY package.json .

RUN npm install

COPY ui/package.json ./ui/package.json

RUN npm install --prefix ui

COPY prisma . 

RUN npx prisma generate

COPY . .

RUN npm run build --prefix ui

RUN npm run build

EXPOSE 5000

CMD ["npm", "start"]
