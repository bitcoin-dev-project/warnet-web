FROM node:20-alpine AS builder
ENV NEXT_TELEMETRY_DISABLED=1
WORKDIR /app
COPY . .
RUN yarn install --frozen-lockfile && yarn build && yarn cache clean
EXPOSE 3000
CMD ["yarn", "dev"]
