#!/bin/bash

source ./back/.env

if [ -z "$DB_DATABASE" ]; then
    echo "Database name is not set in .env file"
    exit 1
fi

sql_query="DROP DATABASE IF EXISTS $DB_DATABASE; CREATE DATABASE $DB_DATABASE;"


echo "$sql_query" | docker exec -i mysql mysql -u root -p"root"


docker exec -it back npm run migrate
