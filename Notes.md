## Notes on creating web app using a MERN Stack
Using MongoDb, Express, React, Redux and Node.js to create a web application. 
* Back-end API with MongoDB, Express and Node.js
* Front-end application using React
    - Redux for managing application states
* Authentication using JWT  

### Starting from back-end
Create and initialize the application folder
cd to application folder and initialize it using npm
``npm init``

#### Install dependency
Most common ones at the moment are:  
``npm i express mongoose passport passport-jwt jsonwebtoken body-parser bcryptjs validator``

### npm
#### Set dev dependency
Automatically checks code changes  
``npm i -D nodemon``

Package.json contains the dependency and application identifications  
``npm run <Key Name>``
will run the entries for that key in the "script" section on the package.json, so the entries can be a command or even another .js  

### Project file structure
* routes for different resources are seperated in their own folders
All it's doing is just return json files to the front-end
for example:  
- api  
    - routes and end-points
- client
    - React app folder
- validation
    - validation files

## The front-end
Each resources will have their own components in React.  
* A dashboard will be a component, login and register will their own component etc etc.  
* Redux will be used to maintain and share states between components.

### Frontawesome and BootStrap
Using CDN to install which is just copy and pasting script into html header

### create-react-app
* CLI for generating React boilerplate.  
``npm i -g create-react-app`` -g will install react globally 
* Then create a 'client' dir for the react application
then run ``create-react-app client`` 

* The React app, in a way, is independent from the back-end. Hence, create-react-app creates it's own package.json and it is hosted on a different port.  

#### concurrently
* npm tip: multiple commands can be ran in a single line like  ``"client-install": "cd client && npm install"``  

* ``npm i concurrently`` allows you to run a script with multiple commands  
    - Things like ``"dev": "concurrently \"npm run server\" \"npm run client\""``  
Now, both React and back-end can be ran in a single command

## React
There are functional and class base components  
- Functional components should be 'dumb' component that will not involve things like life cycles and states   
- Props in components should be mapped using ``PropTypes from 'prop-types';`` 

### React Redux developer tool
Browser extension for working with React and Redux
* Tree view, diff for states and actions

### Router
Make sure it's installed in React app dir ``npm i react-router-dom``. Starting version 4, its -dom
* Creates routes for components, ex: "/register", "/login" 
    - It can then be linked 'Link className="nav-link" to "/register"
* Should use 'exact' for the components <Route exact path="/" component= { Landing } />
    -  So it doesn't try to load all components 
* React does not have a built-in private route support like in Angular(RouteGuard) 

### Components and State
After linking a field to state in component, it needs to be bound. There two ways of doing it.
- In constructor, onChange.bind(this)
- or in the state declaration onChange.bind(this)

### Axios
``npm i axios``  
HTTP client to communicate with the back-end  

### Bootstrap form validation and Classnames
Since bootstrap requires specific class names
and React does not change class name base on errors/conditions by default. Classnames can be used for doing simple conditionals without using components.

### Classnames package
``npm i classnames`` will let React to do that  
ex:    
<code>
    className={classnames("form-control form-control-lg", {  
    'is-invalid': errors.name  
    })}  
</code>
Where by default is form-control, and if errors.name exist, then is-invalid is used  

if errors.name, class name will be set to bootstraps  
``{ errors.name && (<div className="invalid-feedback">{errors.name}</div>) }``  
However, bootstrap will automatically show and hide invalids  
``<div className="invalid-feedback">{errors.name}</div>``    Will work just as well.

### React-Moment
React component for displaying dates.
<code><Moment format="YYYY/MM/DD"/></code>

## Redux
``npm i redux react-redux redux-thunk``  
* Redux can be used anywhere, it's just most commonly used because of the react-redux lib  
* redux-thunk is middleware for dispatching ajax(dispatch(yourAjxCall())) request to redux reducers  
* Component level states will only be accessible to components. Redux allows application level states, where data can be shared with other components. It utilized "Actions" and "Reducer"
    - Redux Action, where props used in a component are "mapped" and "connected" to their "action"
    - So actions clearly signify a change in the component's states. ie. DELETE_POST
    - Reducer, then takes the state and the action from the Action and return the new state of the application 
* The action is then stored in another function file(Store) and when the function is called, a request is made
* Reducer can put the states into a Store, then to another component
    - Redux only has one Store, Flux can have many
* The life cycle of the states managed by redux will need to be managed by user
    - Think what happens when the page refreshes

### Action naming conventions
Action must have a type, a 'type' is just an identifier for redux action  
ex: ``SET_CURRENT`` is just a string IDing what it does.

### Life-cycle methods
Lifecyle methods are important in managing the state of the react application and how the UI is updated as user interact with the application. Commonly used ones used... at least in this application are componentWillReceiveProps, componentDidMount.
These methods has/will be deprecated starting React 16.3+ and was replaced with getDerivedStateFromProps.
See [article](https://medium.com/@baphemot/understanding-react-react-16-3-component-life-cycle-23129bc7a705)

### Client-side decryption
Since the app is using jwt-token authentication, ``jwt-decode`` is used to decode in the authentication action

## Deploying to Heroku
* Make sure to use enviroment vars for the keys.


