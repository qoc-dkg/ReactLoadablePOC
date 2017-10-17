#!/bin/bash
SCRIPTPATH="$( cd "$(dirname "$0")" ; pwd -P )"

cd "$SCRIPTPATH/../"
#frontend init and build
npm i
npm run dev
#backend init
cd "$SCRIPTPATH/../server"
npm i
node node_modules/nodemon/bin/nodemon.js server.js
