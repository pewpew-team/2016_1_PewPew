#!/bin/bash

echo "Deps install"
npm i

echo "Test running"
grunt test

echo "Creating a dist version"
grunt less
grunt fest
grunt compile

echo "Deploy to $1 started"

cd ./dist
rsync -a --exclude=".*" ./ pewpew@$1:/home/pewpew/pewpew_project/frontend
rsync -a --exclude=".*" ../public_html/img pewpew@$1:/home/pewpew/pewpew_project/frontend
