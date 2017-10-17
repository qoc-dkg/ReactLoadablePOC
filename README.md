# ReactLoadablePOC
code splitting/ view protection poc 

##Dependencies

`npm i -g nodemon`
^ for running node server 

##POC of code splitting to protect authenticated views 

This is a small poc to demonstrate protecting authenticated views using node passport authentication + dynamic imports on the frontend. 
The Dashboard component is considered a 'protected view'.  Without authentication the js code for it cannot be downloaded. 
