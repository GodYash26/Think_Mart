# 🛒 ThinkMart - Modern E-Commerce Platform

A full-stack e-commerce application built with React, NestJS, TypeScript, and MongoDB.

## 🌐 Live Demo

**Frontend:** [https://think-mart.vercel.app/](https://think-mart.vercel.app/)  
**Backend API:** [https://think-mart-backend.onrender.com/api](https://think-mart-backend.onrender.com/api)

---

## ✨ Features

### 👤 Customer Features
- Browse products with advanced filtering and search
- View product details with images and descriptions
- Add products to cart and manage cart items
- Place orders with delivery tracking status
- User authentication and profile management
- View order history
- Featured products and special offers
- Category-based product browsing

### 👨‍💼 Admin Features
- Comprehensive admin dashboard with analytics (static)
- Product management (Create, Read, Update, Delete)
- Category management (Create, Read, Update, Delete)
- Order management and tracking
- User management
- Media upload and management (ImageKit integration)
- Product status management (Featured, Popular, Offer)

---

## 🛠️ Tech Stack

### Frontend
- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **React Router** - Navigation
- **TanStack Query (React Query)** - Data fetching & caching
- **React Hook Form** - Form management
- **Zod** - Schema validation
- **Tailwind CSS** - Styling
- **Shadcn/ui** - UI components
- **Axios** - HTTP client
- **Recharts** - Data visualization

### Backend
- **NestJS** - Node.js framework
- **TypeScript** - Type safety
- **MongoDB** - Database
- **TypeORM** - ORM
- **JWT** - Authentication
- **Passport** - Auth middleware
- **ImageKit** - Image storage & CDN
- **Bcrypt** - Password hashing
- **Helmet** - Security headers
- **Swagger** - API documentation

---

## 🚀 Installation Guide

### Prerequisites
- **Node.js** (v18 or higher)
- **npm** 
- **MongoDB** (local or cloud instance like MongoDB Atlas)
- **ImageKit Account** (for image uploads)

---

### 📁 Project Structure
```
Next/
├── frontend/          # React + Vite frontend
└── backend/           # NestJS backend
```

---

## 🔧 Backend Setup

### 1. Navigate to Backend Directory
```bash
cd backend
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Variables Setup

Create a `.env` file in the `backend` directory:

```env
# Database
MONGO_URI=mongodb://localhost:27017/thinkmart
# Or use MongoDB Atlas:
# MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/thinkmart

# JWT Secret Key (use a strong random string)
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# Server Port (optional, defaults to 3000)
PORT=3000

# Admin Credentials (for seeding initial admin user)
ADMIN_EMAIL=admin@thinkmart.com
ADMIN_PASSWORD=Admin@123456

# ImageKit Configuration (required for image uploads)
<!-- IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
IMAGEKIT_URL_ENDPOINT=https://ik.imagekit.io/your_imagekit_id -->
```

### 4. Seed Admin User
```bash
npm run seed:admin
```

This creates an admin user with credentials from your `.env` file.

### 5. Start Backend Server

**Development Mode:**
```bash
npm run dev
```

**Production Mode:**
```bash
npm run build
npm run start:prod
```

The backend will run on `http://localhost:3000`

---

## 🎨 Frontend Setup

### 1. Navigate to Frontend Directory
```bash
cd frontend
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Variables Setup

Create a `.env` file in the `frontend` directory:

```env
# API Base URL
VITE_API_URL=http://localhost:3000/api

# For production (using hosted backend):
# VITE_API_URL=https://think-mart-backend.onrender.com/api
```

### 4. Start Frontend Development Server
```bash
npm run dev
```

The frontend will run on `http://localhost:5173`

### 5. Build for Production
```bash
npm run build
```

---

## 👥 User Roles & Access

### 🛡️ Admin Dashboard Access

**Login Credentials:**
- Email: The one you set in `ADMIN_EMAIL` (default: `admin@thinkmart.com`)
- Password: The one you set in `ADMIN_PASSWORD` (default: `Admin@123456`)

**Admin Capabilities:**
- Full access to admin dashboard at `/admin`
- Manage all products, categories, and orders
- View analytics and reports
- Upload and manage media
- Manage user accounts
- Configure site settings

### 🛍️ Customer Access

**Registration:**
- Customers can register through the signup page
- Secure password hashing

**Customer Capabilities:**
- Browse and search products
- Add products to cart
- Place and track orders
- View order history
- Update profile information
- No access to admin routes

---

## 🔐 Authentication Flow

1. **Registration:** Users register with email and password
2. **Login:** JWT token issued and stored in HTTP-only cookie
3. **Protected Routes:** Frontend uses JWT guard for authentication
4. **Role-Based Access:** Admin routes protected by role guard
5. **Session:** Tokens remain valid until logout or expiry

---

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/me` - Get current user

### Products
- `GET /api/products` - Get all products (with filters)
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (Admin)
- `PUT /api/products/:id` - Update product (Admin)
- `DELETE /api/products/:id` - Delete product (Admin)

### Categories
- `GET /api/categories` - Get all categories
- `GET /api/categories/:id` - Get single category
- `POST /api/categories` - Create category (Admin)
- `PUT /api/categories/:id` - Update category (Admin)
- `DELETE /api/categories/:id` - Delete category (Admin)

### Cart
- `GET /api/cart` - Get user's cart
- `POST /api/cart` - Add item to cart
- `PUT /api/cart/:id` - Update cart item
- `DELETE /api/cart/:id` - Remove from cart

### Orders
- `GET /api/orders` - Get user's orders
- `GET /api/orders/:id` - Get single order
- `POST /api/orders` - Create order
- `PUT /api/orders/:id` - Update order status (Admin)

### Media
- `POST /api/media/upload` - Upload image (Admin)

---

---

## 📦 Deployment

### Frontend (Vercel)
1. Push code to GitHub
2. Connect repository to Vercel
3. Set environment variable: `VITE_API_URL=https://your-backend-url.com/api`
4. Deploy

### Backend (Render/Railway/Heroku)
1. Set all environment variables in hosting platform
2. Ensure `MONGO_URI` points to production MongoDB
3. Set `JWT_SECRET` to a secure value
4. Configure ImageKit credentials
5. Deploy

---

## 🐛 Troubleshooting

### Backend Issues

**MongoDB Connection Error:**
- Verify `MONGO_URI` is correct
- Check MongoDB server is running
- Ensure network access (for MongoDB Atlas, whitelist IP)

**ImageKit Upload Fails:**
- Verify ImageKit credentials in `.env`
- Check ImageKit account is active

**Port Already in Use:**
- Change `PORT` in `.env`
- Or kill the process using the port

### Frontend Issues

**API Connection Failed:**
- Verify backend is running
- Check `VITE_API_URL` is correct
- Ensure CORS is configured in backend

**Build Errors:**
- Clear node_modules: `rm -rf node_modules && npm install`
- Clear cache: `npm run build -- --force`

---

---

## 👨‍💻 Development Commands

### Backend
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start:prod   # Run production build
npm run seed:admin   # Seed admin user
npm run lint         # Lint code
```

### Frontend
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Lint code
```

---

## 🤝 Support

For issues or questions, please contact the development team or open an issue in the repository.

---

**Happy Coding! 🚀**