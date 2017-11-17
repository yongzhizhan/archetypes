#!/usr/bin/env bash

cd `dirname ../../../`

project=$(basename `pwd`)

echo $project

eval $(docker-machine env)
docker build --tag 123.56.168.19:5000/$project ./src/main