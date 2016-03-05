#!/bin/bash

echo "Deps install"
npm i

echo "Test running"
grunt test

echo "Creating a dist version"
grunt compile

echo "Deploy to $1 started"

cd ./dist
scp ./js/build.min.js root@$1:~/frontend/js/build.min.js
scp ./css/main.min.css root@$1:~/frontend/css/main.min.css
scp ./index.html root@$1:~/frontend/index.html
scp -r ../public_html/img root@$1:~/frontend/img
