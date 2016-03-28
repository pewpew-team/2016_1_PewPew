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
rsync -a --exclude=".*" ./ pewpew@$1:/home/pewpew/frontend
rsync -a --exclude=".*" ../public_html/img pewpew@$1:/home/pewpew/frontend
rsync ../node_modules/almond/almond.js pewpew@$1:/home/pewpew/frontend/js/almond.js
