FROM node:20-alpine

WORKDIR /app

COPY package.json .

RUN npm install

ENV DATABASE_URL=postgres://postgres:@localhost:5432/chatapp

COPY prisma . 

RUN npx prisma generate

RUN npx prisma migrate dev --name init 

COPY . .

EXPOSE 5000

CMD ["npm", "run", "dev"]
