<h1>Web-Technologies, Back-End</h1>
Assignment 4

Adilet Kabiyev, SE-2433

<h2>About assignment</h2>
This assignment is a continuation of assignment 3, adding new features and refining project architecture. It followed MVC Pattern structure, refactoring backend into routes, controllers, middleware and models. The assignment also focuses on Role-Based Access Control with JWT and bcrypt for password hashing

<h2>MVC Pattern</h2>

models/ : schemas for storing data in MongoDB

routes/ : API endpoints for each object

controllers/ : logic for database operations

middleware/ : authentification and error logging


<h2>Role Based Access Control</h2>
User registration form as a separate page. After successful login/signup forward to main dashboard.
Hashing passwords using bcrypt
Handling user sessions using JSON Web Tokens


## Tech Stack

**Backend:** Node.js, Express.js, MongoDB, Mongoose, CORS, JWT, bcrypt, dotenv

**Frontend:** HTML, CSS, JavaScript

##  Project Structure

```
Backend_Assignment3/
├── frontend/
│   ├── index.html
│   ├── auth.html
│   ├── auth-utils.js
│   ├── style.css
│   └── script.js
├── routes/
│   ├── authRouter.js
│   ├── bookRouter.js
│   ├── userRouter.js
│   └── publisherRoutes.js
├── models/
│   ├── book.js
│   ├── user.js
│   └── publisher.js
├── middleware/
│   ├── auth.js
│   └── errorLogger.js
├── controllers/
│   ├── authController.js
│   ├── bookController.js
│   ├── userController.js
│   └── publisherController.js
├── .env
├── package.json
└── server.js
```

## Setup

1. **Install dependencies**
```bash
npm install express mongoose dotenv cors nodemon jsonwebtoken bcrypt
```

2. **Create .env file**
```
MONGODB_URI=[YOUR LOCALHOST HERE]
JWT_SECRET=[YOUR JWT SECRET CODE/PHRASE HERE]
JWT_EXPIRES_IN=[SET WHEN THE JWT TOKEN SHOULD EXPIRE]
```

3. **Start MongoDB and run server**
```bash
npm start
```
