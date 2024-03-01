#!/bin/bash

./migrate.sh
docker exec -it back npm run seed
