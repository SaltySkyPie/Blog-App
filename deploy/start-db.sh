#!/bin/bash

docker-compose --env-file .env \
-f docker-compose-with-db.yml up \
-d