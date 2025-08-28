# 🛒 E-commerce Marketplace

A modern, full-stack e-commerce application built with Next.js and Express, featuring a complete shopping experience with user authentication, product management, and order processing.

## 🚀 Features

- **User Authentication**: Secure registration and login with JWT
- **Product Catalog**: Browse products by categories with search functionality
- **Shopping Cart**: Persistent cart with real-time updates
- **Order Management**: Complete checkout process with order tracking
- **Admin Dashboard**: Product and inventory management
- **Responsive Design**: Mobile-first approach with modern UI

## 🛠 Tech Stack

### Frontend
- **Next.js 14** - React framework with SSR/SSG
- **Tailwind CSS** - Utility-first CSS framework
- **TypeScript** - Type-safe development

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **PostgreSQL** - Relational database
- **Sequelize** - Object-Relational Mapping
- **JWT** - Authentication tokens
- **bcrypt** - Password encryption

## 📁 Project Structure

```
marketplace/
├── frontend/          # Next.js application
│   ├── src/
│   │   ├── app/       # App Router pages
│   │   ├── components/ # Reusable components
│   │   └── styles/    # Global styles
│   └── public/        # Static assets
├── backend/           # Express.js API
│   ├── src/
│   │   ├── models/    # Database models
│   │   ├── controllers/ # Business logic
│   │   ├── routes/    # API endpoints
│   │   ├── middleware/ # Custom middleware
│   │   └── config/    # Configuration files
│   └── .env.example   # Environment variables template
└── README.md
```

## 🚦 Getting Started

### Prerequisites
- Node.js 18+ and npm
- PostgreSQL 12+
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/marketplace-1.git
   cd marketplace-1
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   cp .env.example .env
   # Configure your database credentials in .env
   npm run dev
   ```

3. **Frontend Setup**
   ```bash
   cd ../frontend
   npm install
   npm run dev
   ```

4. **Database Setup**
   ```bash
   # Create PostgreSQL database
   createdb marketplace
   # Tables will be created automatically when starting the backend
   ```

### Environment Variables

Create a `.env` file in the backend directory:

```env
# Server
PORT=3001

# Database
DB_NAME=marketplace
DB_USER=postgres
DB_PASSWORD=your_password
DB_HOST=localhost
DB_PORT=5432

# JWT
JWT_SECRET=your_jwt_secret_key
```

## 🌐 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (Admin)
- `PUT /api/products/:id` - Update product (Admin)

### Cart & Orders
- `GET /api/cart` - Get user cart
- `POST /api/cart` - Add item to cart
- `POST /api/orders` - Create new order

## 🚀 Deployment

### Backend (Railway/Heroku)
```bash
# Set environment variables in your platform
# Deploy backend first, note the URL
```

### Frontend (Vercel)
```bash
# Connect GitHub repository to Vercel
# Set NEXT_PUBLIC_API_URL environment variable
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Contact

Your Name - your.email@example.com

Project Link: [https://github.com/yourusername/marketplace-1](https://github.com/yourusername/marketplace-1)

---

**⭐ Don't forget to give the project a star if it helped you!**