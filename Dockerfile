FROM node:22-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY tsconfig.json ./
COPY prisma ./prisma
COPY src ./src

RUN npx prisma generate

ENV DATABASE_URL="file:/app/data/muddakir.db"

ENTRYPOINT ["npx", "ts-node", "src/index.ts"]