###################
# BUILD FOR LOCAL DEVELOPMENT
###################

FROM node:18-alpine As development

# Create app directory
WORKDIR /app

# Copy application dependency manifests to the container image.
# A wildcard is used to ensure copying both package.json AND package-lock.json (when available).
# Copying this first prevents re-running npm install on every code change.
COPY --chown=node:node package*.json ./

# Install app dependencies using the `npm ci` command instead of `npm install`
RUN npm ci

# Bundle app source
COPY --chown=node:node . .

# Use the node user from the image (instead of the root user)
USER node

###################
# BUILD FOR PRODUCTION
###################

FROM node:18-alpine As build

WORKDIR /app

COPY --chown=node:node package*.json ./

# In order to run `npm run build` we need access to the Nest CLI which is a dev dependency. In the previous development stage we ran `npm ci` which installed all dependencies, so we can copy over the node_modules directory from the development image
COPY --chown=node:node --from=development /app/node_modules ./node_modules

COPY --chown=node:node . .

# Run the build command which creates the production bundle
RUN npm run build

# Set NODE_ENV environment variable
ENV NODE_ENV production

# Running `npm ci` removes the existing node_modules directory and passing in --only=production ensures that only the production dependencies are installed. This ensures that the node_modules directory is as optimized as possible
RUN npm ci --only=production && npm cache clean --force

USER node

###################
# PRODUCTION
###################

FROM node:18-alpine As production

WORKDIR /app

ARG JWT_ACCESS_SECRET
ENV JWT_ACCESS_SECRET=$JWT_ACCESS_SECRET

ARG JWT_REFRESH_SECRET
ENV JWT_REFRESH_SECRET=$JWT_REFRESH_SECRET

ARG GRAPHQL_PLAYGROUND=false
ENV GRAPHQL_PLAYGROUND=$GRAPHQL_PLAYGROUND

ENV TYPEORM_TYPE=mysql
ENV TYPEORM_CONNECTION=mysql

ARG TYPEORM_HOST
ENV TYPEORM_HOST=$TYPEORM_HOST

ARG TYPEORM_PORT
ENV TYPEORM_PORT=$TYPEORM_PORT

ARG TYPEORM_USERNAME
ENV TYPEORM_USERNAME=$TYPEORM_USERNAME

ARG TYPEORM_PASSWORD
ENV TYPEORM_PASSWORD=$TYPEORM_PASSWORD

ARG TYPEORM_DATABASE
ENV TYPEORM_DATABASE=$TYPEORM_DATABASE

ENV TYPEORM_ENTITIES=dist/**/*.entity.js
ENV TYPEORM_MIGRATIONS_TABLE_NAME=migration
ENV TYPEORM_MIGRATIONS=dist/migrations/*.js
ENV TYPEORM_MIGRATIONS_RUN=true
ENV TYPEORM_MIGRATIONS_DIR=migrations

# Copy the bundled code from the build stage to the production image
COPY --chown=node:node --from=build /app/node_modules ./node_modules
COPY --chown=node:node --from=build /app/dist ./dist

EXPOSE 3001

# Start the server using the production build
CMD [ "node", "dist/src/main.js" ]

# docker build -t nest .  

# docker run -p 80:3001 \
#   -e JWT_ACCESS_SECRET=your_access_secret \
#   -e JWT_REFRESH_SECRET=your_refresh_secret \
#   -e GRAPHQL_PLAYGROUND=true \
#   -e TYPEORM_HOST=your_db_host \
#   -e TYPEORM_PORT=your_db_port \
#   -e TYPEORM_USERNAME=your_db_username \
#   -e TYPEORM_PASSWORD=your_db_password \
#   -e TYPEORM_DATABASE=your_db_name \
#   nest

#  docker run -p 80:3001 --env-file .env nest  
