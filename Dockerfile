FROM guergeiro/pnpm:18-8 AS build
#FROM node:18-slim AS build
ENV NODE_ENV=production

RUN pnpm add pnpm

# set working directory
WORKDIR /usr/local/app

COPY package.json pnpm-lock.yaml nginx.conf /usr/local/app/
# install package.json (o sea las dependencies)
# RUN pnpm fetch --prod
RUN pnpm install --frozen-lockfile 

COPY ./dist /usr/local/app/dist

# Stage 1, for copying the compiled app from the previous step and making it ready for production with Nginx
FROM nginx:alpine
COPY --from=build /usr/local/app/dist/apps/keller-frontend /usr/share/nginx/html/
COPY --from=build /usr/local/app/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 8080

