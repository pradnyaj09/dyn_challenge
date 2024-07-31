From node:18-alpine

WORKDIR /app

COPY package*.json ./
COPY tsconfig*.json ./

RUN npm install

COPY /src ./src
COPY /public ./public

ENV AWS_COGNITO_USER_POOL_ID=${USER_POOL_ID}
ENV AWS_COGNITO_CLIENT_ID=${CLIENT_ID}
ENV AWS_COGNITO_REGION=${REGION}

RUN npm run build

EXPOSE 3000
CMD ["npm","run","start"]