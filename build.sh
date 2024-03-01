#!/bin/bash

original_dir=$(pwd)

cd ./back
npm install
cd "$original_dir"

cd ./front
npm install
cd "$original_dir"

docker-compose down

docker-compose up --build
