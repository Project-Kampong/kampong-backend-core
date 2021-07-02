# --------------> The build image
FROM node:16-alpine AS build
WORKDIR /usr/src/app
COPY package*.json /usr/src/app/
RUN npm ci
COPY tsconfig*.json /usr/src/app/
COPY src /usr/src/app/src
RUN npm run build
 
# --------------> The production image
FROM node:16-alpine
RUN apk add dumb-init
ENV NODE_ENV production
USER node
WORKDIR /usr/src/app
COPY --chown=node:node --from=build /usr/src/app/node_modules /usr/src/app/node_modules
COPY --chown=node:node --from=build /usr/src/app/dist /usr/src/app/dist
CMD ["dumb-init", "node", "dist/main"]
