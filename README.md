# Awesome-Serve

Welcome to **Awesome-Serve**, the backend server for the Awesome-Store e-commerce platform. This server provides comprehensive API endpoints for both the admin portal and the store application, enabling efficient management and smooth user interactions.

## Features

### Admin Portal
- **Product Management**: Create, Read, Update, and Delete (CRUD) products.
- **Brand Management**: Manage product brands with CRUD operations.
- **Category Management**: Add, edit, and delete categories.
- **Image Uploads**: Upload and manage product images with `multer`.
- **User Management**: View and manage user lists.
- **Order Management**: CRUD operations for orders.
- **Dashboard Visualization**: Display analytics and charts for insights.
- **Review Management**: Delete inappropriate or flagged product reviews.

### Store Application
- **User Profile**: Update profile information.
- **Authentication**:
  - Forgot password and reset password functionality.
  - Login with Google OAuth.
- **Product Exploration**:
  - Filter products by various attributes (price, rating, etc.).
  - Search for products by keywords.
  - View products by brand and category.
- **Payments**:
  - Secure payments integration with Stripe.
- **Product Interaction**:
  - Leave reviews or comments on products.
  - Add products to the wishlist.
- **Order Tracking**: Track the status of orders.
- **Dynamic Features**: Responsive APIs to handle additional store functionalities as needed.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/abhaseeb200/awesome-serve.git
   cd awesome-serve
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up the `.env` file:
   Create a `.env` file in the root directory and add the following:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   STRIPE_SECRET_KEY=your_stripe_secret_key
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   ```

4. Run the server:
   ```bash
   npm start
   ```
   Or, if you are using `nodemon` for development:
   ```bash
   npm run dev
   ```

## Folder Structure

```
awesome-serve/
├── controllers/
├── models/
├── routes/
├── middlewares/
├── utils/
├── config/
├── public/uploads/
├── .env
├── package.json
├── server.js
```

### Key Directories
- `controllers/`: Contains business logic for handling requests.
- `models/`: Database models using Mongoose.
- `routes/`: Defines API endpoints for admin and store functionalities.
- `middlewares/`: Custom middleware (e.g., authentication).
- `utils/`: Utility functions (e.g., email services).
- `config/`: Configuration files (e.g., database connection).
- `public/uploads/`: Stores uploaded product images.

## API Endpoints

### Admin APIs
- **Products**: `/api/admin/products`
- **Brands**: `/api/admin/brands`
- **Categories**: `/api/admin/categories`
- **Orders**: `/api/admin/orders`
- **Dashboard**: `/api/admin/dashboard`

### Store APIs
- **User Authentication**: `/api/auth`
- **Products**: `/api/products`
- **Orders**: `/api/orders`
- **Payments**: `/api/payments`

## Contributing
Contributions are welcome! Please follow these steps:
1. Fork the repository.
2. Create a new branch: `git checkout -b feature-name`.
3. Commit your changes: `git commit -m 'Add some feature'`.
4. Push to the branch: `git push origin feature-name`.
5. Open a pull request.

## License
This project is licensed under the [MIT License](LICENSE).

## Contact
For questions or support, please email [support@awesome-store.com](mailto:support@awesome-store.com).
