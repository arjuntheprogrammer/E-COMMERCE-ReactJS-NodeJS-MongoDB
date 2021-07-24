# E-COMMERCE ReactJS NodeJS MongoDB

---

## COMMANDS FRONTEND

- cd frontend
- npx create-react-app frontend
- npm install react-router-dom
- npm i axios
- npm install redux react-redux
- npm install redux-thunk
- npm install js-cookie

To start the frontend server:

- npm start

### TERMINOLOGIES

1. REDUCER:
   - Input is State and Action and Output is new Action
2. PROVIDER:
3. THUNK:
   - Middleware for redux.
   - Allows to run async operations in action in redux.

---

## COMMANDS BACKEND

- cd backend
- npm init -y
- npm install express
- npm install @babel/cli @babel/core @babel/node @babel/preset-env nodemon
- npm install dotenv
- npm install mongoose

To start the backend server:

- node server.js
  - This will give out error because of ES6 conversion.

### Install Babel Packages

1. npm install @babel/cli @babel/core @babel/node @babel/preset-env nodemon
2. setup .babelrc
3. npm start

### Install MONGODB

- brew tap mongodb/brew
- brew install mongodb-community
- brew services start mongodb-community

### KILL ALL NODE Services

- killall -9 node
- pkill -f node

### To access API results

Visit: <http://localhost:5000/api/products/>

### REFERENCE

1. React & Node Tutorial - Full ECommerce in 5 Hours [2020]
   : <https://www.youtube.com/watch?v=Fy9SdZLBTOo>
2. <https://github.com/basir/node-react-ecommerce>

---
