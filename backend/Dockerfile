FROM node:20-alpine

WORKDIR /app

COPY package.json .

RUN npm install

ENV DATABASE_URL=postgres://avnadmin:AVNS_HwvX939fS7ZLQcMiQqH@mydb-haileiyesus29-7b18.e.aivencloud.com:18166/chatapp?sslmode=require

COPY prisma . 

RUN npx prisma generate

RUN npx prisma migrate dev --name init 

COPY . .

EXPOSE 5000

CMD ["npm", "run", "dev"]
