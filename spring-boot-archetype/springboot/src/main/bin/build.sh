#!/usr/bin/env bash

cd `dirname ../../../../`

project=$(basename `pwd`)

eval $(docker-machine env)
echo ${project}
docker build --build-arg archive=${project}-1.0-SNAPSHOT --tag 123.56.168.19:5000/$project .