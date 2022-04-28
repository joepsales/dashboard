### STAGE 1 : BUILD ###
FROM node:latest AS build
WORKDIR /usr/local/app
COPY ./ /usr/local/app/
RUN npm install
RUN npm run build

### STAGE 2 : SERVE ###
FROM nginx:latest
COPY --from=build /usr/local/app/dist/dashboard /usr/share/nginx/html
EXPOSE 80
