FROM node:20-alpine AS client-build
WORKDIR /app/client
COPY client/package*.json ./
RUN npm install
COPY client ./
RUN npm run build

FROM node:20-alpine
WORKDIR /app
ENV NODE_ENV=production
COPY server/package*.json ./server/
RUN npm install --prefix server --omit=dev
COPY server ./server
COPY --from=client-build /app/client/dist ./client-dist
WORKDIR /app/server
EXPOSE 5001
CMD ["node", "src/server.js"]
