#!/usr/bin/env bash

project=$(basename `pwd`)

echo "building project: $project"

eval $(docker-machine env)
rm -rf /tmp/build/
rm -rf ./build

mkdir /tmp/build/
cp -r ../$project /tmp/build/
cp -r /tmp/build/$project ./build

docker build --tag 123.56.168.19:5000/$project .

docker push 123.56.168.19:5000/$project