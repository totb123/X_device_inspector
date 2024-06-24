FROM node:18.0.0-alpine
WORKDIR /app

COPY . .
RUN pwd
RUN npm install -g serve
RUN npm install
RUN npm run build:prod
CMD ["serve", "build"]


