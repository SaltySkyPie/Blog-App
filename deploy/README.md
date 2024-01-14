## Description

There are two ways to deploy the application:
- using Docker
- using Docker Compose

### Docker

#### Installation

Preqrequisites:
- Docker
- Database (MySQL or MariaDB)

```bash
# build for frontend
$ docker build -t blog-app-frontend \
  --build-arg GRAPHQL_URL=http://your-graphql-url/graphql \
  --build-arg GRAPHQL_WS=ws://your-graphql-url/graphql \
  --build-arg REST_URL=http://your-rest-url/api \
  <path-to-frontend-directory>

# run frontend
$ docker run -p <port>:3000 blog-app-frontend

# build for backend
$ docker build -t blog-app-backend <path-to-backend-directory>

# run backend

$ docker run -p <port>:3001 \
  -e JWT_ACCESS_SECRET=your_access_secret \
  -e JWT_REFRESH_SECRET=your_refresh_secret \
  -e GRAPHQL_PLAYGROUND=true \
  -e TYPEORM_HOST=your_db_host \
  -e TYPEORM_PORT=your_db_port \
  -e TYPEORM_USERNAME=your_db_username \
  -e TYPEORM_PASSWORD=your_db_password \
  -e TYPEORM_DATABASE=your_db_name \
  nest
```

#### Usage

Open `http://localhost:<port>` in your browser.

### Docker Compose

#### Installation

Preqrequisites:
- Docker
- Docker Compose

```bash
# build and run
./start.sh

# stop
./stop.sh
```

Environment variables are stored in `.env` file. Use .env.example as a template.

If you wish to use external database, you can specify its connection parameters in `.env` file. Otherwise do comment specified variables in .env file.

### Usage

Open `http://localhost:<port>` in your browser.
