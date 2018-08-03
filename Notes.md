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
- Props in components should be mapped using ``PropTypes from 'prop-types';``

### Router
Make sure it's installed in react dir and ``npm i react-router-dom``, starting version 4, its -dom
- Creates routes for componenets, ex: "/register", "/login" 
    - It can then be linked 'Link className="nav-link" to "/register"
- should try to use 'exact' for the componenets  <Route exact path="/" component= { Landing } />
    -  So it doesn't try to load all componenets?
- React does not have a built-in private route support like in Angular(RouteGuard) 

### Components and State
After linking a field to state in component, it needs to be bound. There ways of doing it.
- In constructor, onChange.bind(this)
- or in the state delcaration onChange.bind(this)
- states can be shown in React Chrome dev tool 


### Axios
HTTP Client to communicate with the back-end  
``npm i axios``
Useful for testing the api

### Bootstrap form validation and Classnames
Since bootstrap requires specific class names
React does not change class name base on errors/conditions by default

#### Classnames package for React
``npm i classnames`` will let React to do that  
Things like, if condition, then add thisClass to it;  
So ex:    
<code>
    className={classnames("form-control form-control-lg", {  
    'is-invalid': errors.name  
    })}  
</code>
Where by default is form-control, and if errors.name exist, then is-invalid is used  

if errors.name, class name will be set to bootstraps  
``{ errors.name && (<div className="invalid-feedback">{errors.name}</div>) }``  
However, bootstrap will automatically show and hide invalids  
``<div className="invalid-feedback">{errors.name}</div>`` will work just as well.


## Redux
``npm i redux react-redux redux-thunk``  
Redux can be used anywhere, it's just most commonly used because of the react-redux lib  
redux-thunk is middleware for dispatching ajax request to reducer  
``import { Provider } from 'react-redux'`` the Store, that holds the states and this provider will need to wrap everything
Componenet level states will only be accessible components, where data needs to passed from component to component  
Redux allows application level states, where data can be shared with other components  
- Redux Action, where component props are used to map redux actions
- The action is then stored in another function file and when the function is called, request is made
- Redux Reducer - the response from action can be sent to a reducer
- Reducer can put the states into a Store, then to another component
- Redux only has one Store, Flux can have many
- The lifecycle of the states managed by redux will need to be managed by user
    - Think what happens when the page refreshes

### Action type
Action must have a type, a 'type' is just an identifier for redux action  
ex: ``SET_CURRENT`` is just a string IDing what it does.

### Client-side decryption
Since the app is using jwt-token authentication, ``jwt-decode`` is used to decode in authentication action

