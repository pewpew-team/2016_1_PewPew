#!/bin/bash

echo "Deps install"
npm i

echo "Test running"
grunt test

echo "Compiling fest templates"
grunt fest

echo "Deploy to $1 started"

rsync -a --exclude=".*" ./public_html root@$1:~/
