#!/bin/bash

echo "Deps install"
npm i

echo "Test running"
grunt test

echo "Creating a dist version"
grunt fest
grunt compile

echo "Deploy to $1 started"

cd ./dist
rsync -a --exclude=".*" ./ root@$1:~/frontend
rsync -a --exclude=".*" ../public_html/img root@$1:~/frontend