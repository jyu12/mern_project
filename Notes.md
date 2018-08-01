## Notes on creating web app using a MERN Stack

### Starting from backend
Create and initialize the application folder
cd to application folder and initalize it using npm
``npm init``

#### Install dependency
Most common ones at the momment are:  
``npm i express mongoose passport passport-jwt jsonwebtoken body-parser bcryptjs validator``


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
- api  
    - users.js will return the resources related to users.js, i.e authentication, permissions etc etc  
    - profiles.js location, name, experience etc etc  
- client
    - React app folder
- validation

### Types of requests
Common ones
* 200 - OK
* 400 - Validation error
* 404 - Resource not found

## The front-end
Each resources will have their components in react that have their own HTML and CSS.   
so experience is a componenet, dashbroad is component.  
Redux will maintain a global state.

### create-react-app
CLI for generating the boilerplate for a React application. So there is no need to create the webpack etc. etc.
``npm i -g create-react-app`` -g will install react globally  
Then create a 'client' for the react application
``create-react-app client`` 
### the react client app
node_modules dir, package.json are dependency for the react app  
It is completely independent from the backend  
"proxy": "http://localhost:5000" is addded to package.json for axios

#### concurrently
Tip: you can do things like ``"client-install": "cd client && npm install"``  
``npm i concurrently`` allows you to run a script with multiple commands  
lets you do things like ``"dev": "concurrently \"npm run server\" \"npm run client\""``  
Now, both react and backend is running in single command

#### Frontawesome and bootstrap
Using CDN to install which is just copy and pasting script into html header

#### React Redux developer tool
Chrome extension for working with React and Redux

## React
There are functional and class base components  
- functionally should be 'dumb' component that will not involve in life cycles, states, etc  
 - It should just display components like that, stuff that is just for displaying

### Router
Make sure it's installed in react dir and ``npm i react-router-dom``, starting version 4, its -dom
- Creates routes for componenets, ex: "/register", "/login" 
    - It can then be linked 'Link className="nav-link" to "/register"
- should try to use 'exact' for the componenets  <Route exact path="/" component= { Landing } />
    -  So it doesn't try to load all componenets?



