# 🛒 Capstone E-commerce Backend APIs

This repository contains the backend code for the Capstone E-commerce Project, built with Node.js and Express. The backend handles user authentication, product management, order processing, and payment integration using Razorpay. The backend is connected to a MongoDB database to manage dynamic data storage.

## 📋 Project Overview

The backend APIs provide the following functionalities:

- User authentication (Signup, Login, Password Reset)
- Product management (View products, Search products by category or name)
- Cart management (Add, update, and remove items from the cart)
- Order management (Create and view orders)
- Payment integration with Razorpay

## 🧑‍💻 Tech Stack

- **Runtime**: Node.js
- **Framework**: Express
- **Database**: MongoDB (using Mongoose for Object Data Modeling)
- **Authentication**: JSON Web Tokens (JWT)
- **Payment Gateway**: Razorpay
- **Environment Management**: dotenv

## 🚀 Installation

### Prerequisites

Ensure you have the following installed on your machine:

- Node.js (v14 or higher)
- MongoDB

### Steps to Run the Backend Server

1. Clone the repository:

    ```bash
    git clone https://github.com/sanketwakhare/capstone-ecommerce.git
    ```

2. Navigate to the backend directory:

    ```bash
    cd capstone-ecommerce/backend-apis
    ```

3. Install dependencies:

    ```bash
    npm install
    ```

4. Set up environment variables:
    Create a `.env` file in the root of the `backend-apis` directory and add the following variables:

    ```ini
    # Server settings
    HOST=localhost
    PORT=3000

    # Database settings
    DB_USER=xx
    DB_PASSWORD=xx
    DB_NAME=xx

    # JWT env configuration settings
    JWT_SECRET_KEY=xx

    # Brevo credentials configuration
    BREVO_USER=xx
    BREVO_PASSWORD=xx

    # Razorpay API settings
    RAZORPAY_PUBLIC_KEY=xx
    RAZORPAY_PRIVATE_KEY=xx
    RAZORPAY_WEBHOOK_SECRET=xx

    # Secret key for encryption
    CRYPTO_SECRET_KEY=xx
    CRYPTO_SECRET_IV=xx
    ```

5. Start the server:

    ```bash
    npm start
    ```

The backend server will start running on [http://localhost:3001](http://localhost:3001).

## 📂 Folder Structure

```bash
backend-apis
├── config
│   └── db.js         # Database connection setup
├── controllers
│   ├── authController.js   # Handles user authentication
│   ├── orderController.js  # Manages orders
│   └── productController.js  # Manages products
├── models
│   ├── User.js       # User schema
│   ├── Product.js    # Product schema
│   └── Order.js      # Order schema
├── routes
│   ├── authRoutes.js     # Authentication routes
│   ├── orderRoutes.js    # Order routes
│   └── productRoutes.js  # Product routes
├── utils
│   └── generateToken.js  # Helper function to generate JWT
├── .env.example
├── package.json
└── server.js
```

## 📌 Available APIs

### Users:

- **POST** `/api/users`: Create a user  
  **Example Request**:  
  ```json
  {
    "name": "John Doe",
    "email": "johndoe@example.com",
    "password": "password123"
  }

- **GET** `/api/users`: Get all users
- **GET** `/api/users/:id`: Get user data by id
- **PUT** `/api/users`: Update an existing user

    Example Request:
    ```json
    {
        "id": "607d1f77bcf86cd799439011",
        "name": "John Doe Updated",
        "email": "johnupdated@example.com"
    }
- **DELETE** `/api/users/:id`: Delete a user by id

### Products:

- **POST** `/api/products`: Create a product  
  
  Example Request:  
  ```json
  {
    "title": "Product Name",
    "description": "This is a product description",
    "price": 199.99,
    "category": "electronics"
  }

- **GET** `/api/products`: Get all product details
- **GET** `/api/products/:id`: Get product by id
- **PUT** `/api/products`: Update an existing product

    Example Request:
    ```json
    {
        "id": "607d1f77bcf86cd799439012",
        "title": "Updated Product",
        "price": 150
    }
- **DELETE** `/api/products/:id`: Delete a product by id
- **GET**` /api/products/search`: Search products
    
    Example URL: `/api/products/search?sort=price&order=desc&page=1&limit=2&select=title%20price%20description%20category&filter={%22category%22:%20%22electronics%22}`
    
### Auth:

- **POST** `/api/auth/signup`: Signup a user  
  
  Example Request  
  ```json
  {
    "name": "John Doe",
    "email": "johndoe@example.com",
    "password": "Password@123"
  }
- **POST** `/api/auth/login`: Login a user
  
  Example Request  
  ```json
  {
    "email": "johndoe@example.com",
    "password": "Password@123"
  }
- **GET** `/api/auth/logout`: Logout a user
- **GET** `/api/auth/verifyToken`: Verify token
- **PATCH** `/api/auth/forgotPassword`: Forgot password
  
  Example Request    
  ```json
  {
    "email": "johndoe@example.com",
  }
- **PATCH**` /api/auth/validateOtp/:userId`: Validate OTP

    Example Request
    ```json
    {
      "otp": 176388
    }
- **PATCH** `/api/auth/resetPassword/:userId`: Reset password

    Example Request
    ```json
    {
      "password": "Abcd@1234"
    }
- **DELETE** /api/auth/:id: Delete a product by id

### Orders:

- **POST** `/api/orders`: Create a new order

  Example Request
  ```json
  {
    "items": [
        {
        "productId": "607d1f77bcf86cd799439012",
        "quantity": 1,
        "price": 100
        }
    ],
    "totalAmount": 100,
    "currency": "INR"
  }
### Payments:

- **POST** `/api/payments`: Create a new transaction payment order
  
  Example Request:  
  ```json
  {
    "amount": "500",
    "currency": "INR"
  }
- **POST** `/api/payments/verify-payment-signature`: Verify Payment Signature
  
  Example Request:  
  ```json
  {
    "orderId": "order_Nh1zj6HHliP3MV",
    "paymentId": "pay_Nh8Vt4CX4v0YuO"
  }
- **POST** `/api/payments/capture-payment-transaction`: Capture Payment Transaction

  Example Request:  
  ```json
  {
    "orderId": "65e19a3453716807884b8cba",
    "txnOrderId": "order_Nh1zj6HHliP3MV",
    "txnPaymentId": "pay_Nh8Vt4CX4v0YuO",
    "txnPaymentStatus": "paid",
    "totalAmount": 500,
    "currency": "INR"
  }
## Reviews:
- **POST** `/api/reviews`: Create a new product review
  
  Example Request:  
  ```json
  {
    "title": "Great Product!",
    "comment": "I absolutely love this product. It exceeded my expectations.",
    "rating": 3.5,
    "productId": "65c8892e8d1e5f392e1e747b",
    "userId": "65e05690d2db22c2581a89a8"
  }
- **GET** `/api/reviews/average-rating/:productId`: Get average rating of a product


### 📦 Postman Collection
You can access the Postman collection for the Capstone E-commerce API [here](https://blue-equinox-850488.postman.co/workspace/My-Workspace~7b735dcb-8f73-49fe-8198-652d1c542f95/collection/16037040-b891bde3-19cc-4319-998d-112dc7ba8a40?action=share&creator=16037040).
