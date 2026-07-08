FROM node:20 AS build

ARG VITE_BACKEND_URL=http://localhost:3001/api/v1

WORKDIR /build

COPY package.json package-lock.json ./

RUN npm install

COPY . .

RUN VITE_BACKEND_URL=$VITE_BACKEND_URL npm run build

FROM node:20 AS final

WORKDIR /app

COPY --from=build /build/dist ./dist
COPY --from=build /build/server.js ./server.js
COPY --from=build /build/index.html ./index.html
COPY --from=build /build/package.json ./package.json
COPY --from=build /build/package-lock.json ./package-lock.json

RUN npm install --only=production

EXPOSE 3000

ENV NODE_ENV=production
ENV PORT=3000

CMD ["node", "server.js"]

