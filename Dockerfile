From node:20
WORKDIR /app
COPY package*.json ./
COPY tsconfig*.json ./
RUN npm install
COPY /src /app/src
COPY /public /app/public
RUN npm run build
EXPOSE 3000
CMD ["npm" "run" "start"]