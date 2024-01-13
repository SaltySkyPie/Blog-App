# Use an official Node runtime as a parent image
FROM node:20-alpine as build

ARG GRAPHQL_URL=http://localhost:3001/graphql
ENV VITE_GRAPHQL_URL=$GRAPHQL_URL

ARG GRAPHQL_WS=ws://localhost:3001/graphql
ENV VITE_GRAPHQL_WS=$GRAPHQL_WS

ARG REST_URL=http://localhost:3001/api
ENV VITE_REST_URL=$REST_URL

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy the entire application code to the container
COPY . .

# Build the React app for production
RUN npm run build

# Use Nginx as the production server
FROM nginx:alpine

# Copy the built React app to Nginx's web server directory
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80 for the Nginx server
EXPOSE 80

# Start Nginx when the container runs
CMD ["nginx", "-g", "daemon off;"]

# docker build -t react-nginx-app \
#   --build-arg GRAPHQL_URL=http://your-graphql-url/graphql \
#   --build-arg GRAPHQL_WS=ws://your-graphql-url/graphql \
#   --build-arg REST_URL=http://your-rest-url/api \
#   .

# docker run -p 8080:80 -d react-nginx-app
