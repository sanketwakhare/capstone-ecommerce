### Scratchpad

### Topic:

1. design review model
2. provide review rating for a product
3. calculate average review ratings of a product

---

### .env file:

```
HOST = localhost
PORT = 3000
DB_USER = <username>
DB_PASSWORD = <password>
DB_NAME = <db-name>
JWT_SECRET_KEY = <jwt-secret-key>
BREVO_USER = <brevo-email-id>
BREVO_PASSWORD = <brevo-password>
RAZORPAY_PUBLIC_KEY = <razorpay-public-key>
RAZORPAY_PRIVATE_KEY = <razorpay-private-key>
RAZORPAY_WEBHOOK_SECRET = <razorpay-webhook-secret-key>
```

---

### REST API

#### Users:

- Create User

  **POST** - `/api/users` - create a user

- Get User(s)

  **GET** - `/api/users` - get all users

  **GET** - `/api/users/:id` - get user data by id

- Update User

  **PUT** - `/api/users` - update an existing user data

- Delete User

  **DELETE** - `/api/users/:id` - delete a user data by id

  ***

#### Products:

- Create Product

  **POST** - `/api/products` - create a product

- Get Product(s)

  **GET** - `/api/products` - get all products details

  **GET** - `/api/products/:id` - get product by id

- Update Product

  **PUT** - `/api/products` - update an existing product details

- Delete Product

  **DELETE** - `/api/products/:id` - delete a product by id

- Search Products

  **GET** - `/api/products/search` - search products

  - pagination
  - sorting
  - filtering

  e.g. `/api/products/search?sort=price&order=desc&page=1&limit=2&select=title%20price%20description%20category&filter={%22category%22:%20%22electronics%22}`

  ***

#### Auth:

- Signup

  **POST** - `/api/auth/signup` - signup a user

- Login

  **POST** - `/api/auth/login` - login a user

- Logout

  **GET** - `/api/auth/logout` - logout a user

- Verify Token

  **GET** - `/api/auth/verifyToken` - verify token

- Forgot password

  **PATCH** - `/api/auth/forgotPassword` - forgot password

- Reset password

  **PATCH** - `/api/auth/resetPassword/:userId` - reset password

  ***

#### Roles:

- Create a new role

  **POST** - `/api/roles` - Create a new role

- Assign role(s)

  **POST** - `/api/roles/assignRoles` - Assign role(s) to a user

  ```
  {
      "email": "sanketwakhare@gmail.com",
      "roles": ["admin", "seller", "user"]
  }
  ```

- View roles

  **GET** - `/api/roles/:email` - View roles for a user

  ***

#### Orders:

- Create a new order

  **POST** - `/api/orders` - Create a new order

  Request:

  ```
  {
    "items": [
        {
          "productId": "65c8892e8d1e5f392e1e747b",
          "quantity": 3,
          "price": 100
        },
        {
          "productId": "65c899d446e77119faafdb54",
          "quantity": 1,
          "price": 200
        }
    ],
    "totalAmount": 500,
    "currency": "INR"
  }
  ```

  Response:

  ```
  {
    "message": "Order created successfully",
    "orderId": "65e1a50b59ecc5400426b6f7"
  }
  ```

  ***

#### Payments:

- Create a new transaction payment order

  **POST** - `/api/payments` - Create a new order

  Request:

  ```
  {
    "amount": "500",
    "currency": "INR"
  }
  ```

  Response:

  ```
  {
    "message": "Payment order created successfully",
    "orderId": "order_Nh1zj6HHliP3MV",
    "amount": 500,
    "currency": "INR"
  }
  ```

- Verify Payment Signature

  **POST** - `/api/payments/verify-payment-signature` - Verify Payment Signature

  Request:

  ```
  Body:
  {
    "orderId": "order_Nh1zj6HHliP3MV",
    "paymentId": "pay_Nh8Vt4CX4v0YuO"
  }

  Header:
  x-razorpay-signature = 06ebc3d0d9e8c427a314f5dcdabcce4a22c1c092a92dafd21daf8668394fdb63
  ```

  Response:

  ```
  {
    "message": "Signature verified"
  }
  ```

- Capture Payment Transaction

  **POST** - `/api/payments/capture-payment-transaction` - Capture Payment Transaction

  Request:

  ```
  Body:
  {
    "orderId": "65e19a3453716807884b8cba",
    "txnOrderId": "order_Nh1zj6HHliP3MV",
    "txnPaymentId": "pay_Nh8Vt4CX4v0YuO",
    "txnPaymentStatus": "paid",
    "txnPaymentCompletedAt": "",
    "totalAmount": 500,
    "currency": "INR"
  }
  ```

  Response:

  ```
  {
    "message": "Payment transaction saved"
  }
  ```

  ***

#### Reviews:

- Create a new product review

  **POST** - `/api/reviews` - Create a new product review

  Request:

  ```
  {
    "title": "Great Product!",
    "comment": "I absolutely love this product. It exceeded my expectations.",
    "rating": 3.5,
    "productId": "65c8892e8d1e5f392e1e747b",
    "userId": "65e05690d2db22c2581a89a8"
  }
  ```

  Response:

  ```
  {
    "message": "Review created successfully",
    "data": {
        "id": "65e2cfc79a3d2bb095916a6c"
    }
  }
  ```

- Get average rating of a product

  **GET** - `/api/reviews/average-rating/:productId` - Get average rating of a product

  Request:

  ```
  /api/reviews/average-rating/65c8892e8d1e5f392e1e747b
  ```

  Response:

  ```
  {
    "averageRating": 4.25
  }
  ```

  ***

##### Postman Collection:

https://blue-equinox-850488.postman.co/workspace/My-Workspace~7b735dcb-8f73-49fe-8198-652d1c542f95/collection/16037040-b891bde3-19cc-4319-998d-112dc7ba8a40?action=share&creator=16037040
