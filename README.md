# ReactLoadablePOC
code splitting/ view protection poc

## POC of code splitting to protect authenticated views

This is a small poc to demonstrate protecting authenticated views using node passport authentication + dynamic imports on the frontend.
The Dashboard component is considered a 'protected view'.  Without authentication the js code for it cannot be downloaded.

## To Test:

Run the server/server.js file with nodemon.  For convenience scripts/run.sh will initialize the front and backend
and start nodemon for you
`chmod +x scripts/run.sh; ./run.sh`

There is one hardcoded user with the credentials username: patient pwd: 1111 to test logging in
The protected js component is /build/dashboard.js
