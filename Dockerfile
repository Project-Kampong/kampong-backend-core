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
WORKDIR /usr/src/app
COPY --chown=node:node --from=build /usr/src/app/node_modules /usr/src/app/node_modules
COPY --chown=node:node --from=build /usr/src/app/dist /usr/src/app/dist
RUN ["chown", "-R", "node:node", "/usr/src/app"]
USER node
CMD ["dumb-init", "node", "dist/main.js"]
