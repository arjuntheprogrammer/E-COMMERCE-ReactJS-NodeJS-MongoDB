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
- npm install react-paypal-button-v2

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
- npm install jsonwebtoken
- npm install body-parser
- npm install --save express-async-handler
- npm install bcrypt

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
3. <https://www.youtube.com/watch?v=TRCDsB9i3bI>

---

### SCREENSHOTS

1. Sign-In page
   ![image](https://user-images.githubusercontent.com/15984084/127471137-b5b44667-12ef-4bee-a06b-a3c4be079080.png)

2. Register PAGE
   ![image](https://user-images.githubusercontent.com/15984084/127471205-25c7cb0c-a442-4a6e-9de6-60bc0cbc50f6.png)

3. Update Product Page
   ![image](https://user-images.githubusercontent.com/15984084/127471345-8a229661-2cbc-468b-8d17-069b710e6a73.png)

   3.1. Update Product Page
   ![image](https://user-images.githubusercontent.com/15984084/127471446-2a0e4adb-90c3-418f-8cfd-3793cbaece6d.png)

   3.2 Update Product Page
   ![image](https://user-images.githubusercontent.com/15984084/127471470-935d32de-05b6-4468-8a86-ec4e8830cde5.png)

4. Create Product Page
   ![image](https://user-images.githubusercontent.com/15984084/127471541-007c7ad3-101c-419c-b294-ea7c9b1e3cc1.png)

5. Home Page
   ![image](https://user-images.githubusercontent.com/15984084/127471932-a8054545-451d-45f5-80cf-c200ec1d95e6.png)

6. Product Details Page
   ![image](https://user-images.githubusercontent.com/15984084/127471977-b5236fc8-2fdc-4262-b4be-c9832e0907bc.png)

7. Add to Cart Page
   ![image](https://user-images.githubusercontent.com/15984084/127472007-9ebf3fef-a233-4f8d-8fbc-403d90db5f36.png)

   7.1 Second Item: Add to Cart
   ![image](https://user-images.githubusercontent.com/15984084/127472067-67b58a47-934d-406d-bec0-100c35c1743f.png)

8. Proceed to Checkout

   8.1 Shipping Address
   ![image](https://user-images.githubusercontent.com/15984084/127472210-b76710aa-ab33-4c6e-8e00-614877b91331.png)

   8.2 Payment Option
   ![image](https://user-images.githubusercontent.com/15984084/127472232-3a536a86-f0e8-4054-9d0e-d81a7c1748dd.png)

   8.3 Place Order
   ![image](https://user-images.githubusercontent.com/15984084/127472284-1753e771-ed8c-49ab-896f-03af2dd682a0.png)

9. Mongo DB Products
   ![image](https://user-images.githubusercontent.com/15984084/127472380-712cceee-e051-47fe-b604-5b51b8396743.png)

---
