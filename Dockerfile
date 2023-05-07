ARG IMAGE=node:16.13-alpine

# Base stage
FROM ${IMAGE} AS base
WORKDIR /app
COPY . .
RUN npm install

# Development stage
FROM base AS dev
ENV NODE_ENV=development
CMD ["npm", "run", "dev"]

# Build stage
FROM base AS build
RUN npm run build
RUN npm prune --production

# Production stage
FROM ${IMAGE} AS production
COPY --chown=node:node --from=build /app/dist /app/dist
COPY --chown=node:node --from=build /app/node_modules /app/node_modules

ENV NODE_ENV=production
ENTRYPOINT ["node", "./main.js"]
WORKDIR /app/dist
CMD [""]

USER node
