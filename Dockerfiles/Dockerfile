#Stage 1 Build the app 
FROM node:latest AS build
WORKDIR /artefact
COPY ../package.json  ./
RUN npm install 
COPY . .
RUN npm run build

#Stage 2 Build the image
FROM nginx:latest
COPY --from=build /artefact/dist/artefact /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
#docker build -t artefact:latest .