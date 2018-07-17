## Notes on creating web app using a MERN Stack

### Starting from backend
Create and initialize the application folder
cd to application folder and initalize it using npm
``npm init``

#### Install dependency 
Most common ones ATM
``npm i express mongoose passwort passport-jwt jsonwebtoken body-parser bcryptjs validator``


#### Set dev dependency
Automatically checks code changes
``npm i -D nodemon``

### npm
Package manager and the package.json is there all the dependency and project idenification comes from
``npm run <key>``
the run command will run the entries for that key in the "script" section on the package.json, so the entries can be a command or even another .js

### Project file structure
* routes for different resources are sperated in their own folders
All it's doing is just return json files to the front-end
for example:
...api
......users.js will return the resources related to users.js, i.e authentication, permissions etc etc
......profiles.js location, name, experience etc etc