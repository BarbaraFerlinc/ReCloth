FROM node:16.20-alpine
WORKDIR /app
COPY . .
ENV ./env
RUN npm ci
RUN npm run build
EXPOSE 3000
CMD ["npx", "serve", "build"]