## Description

Database for local development


## Installation

Preqrequisites:
- Docker
- Docker Compose

```bash
# start database
./start.sh

# stop database
./stop.sh
```

One you start the database, you can connect to it using the following credentials:
- host: localhost
- username: root
- password: specified in .env file


phpMyAdmin will become available on http://localhost:8082 once you start the database.