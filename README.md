# Tushikane - Humanitarian Community Service Platform

> **Msaada kwa Jamii** - Connecting communities through humanitarian service

A full-stack MERN application that enables volunteers and requesters to connect and provide/request help in their communities.

## 📁 Project Structure

```
Tushikane/
├── backend/                 # Express.js API Server
│   ├── config/             # Database configuration
│   ├── controllers/        # Route controllers
│   ├── middleware/         # Custom middleware
│   ├── models/            # MongoDB schemas
│   ├── routes/            # API routes
│   ├── utils/             # Utility functions
│   ├── server.js          # Main server file
│   ├── package.json       # Backend dependencies
│   └── README.md          # Backend documentation
│
└── frontend/              # React.js Frontend (Coming Soon)
    ├── public/
    ├── src/
    ├── package.json
    └── README.md
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create environment file
cp env.example .env

# Edit .env with your configuration
# MONGODB_URI=mongodb://localhost:27017/tushikane_db
# JWT_SECRET=your-super-secret-jwt-key

# Start development server
npm run dev
```

The backend API will be available at `http://localhost:5000`

### Frontend Setup (Coming Soon)

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start development server
npm start
```

The frontend will be available at `http://localhost:3000`

## 🔗 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/profile` - Update profile

### Help Requests
- `GET /api/help-requests` - Get all help requests
- `POST /api/help-requests` - Create help request
- `GET /api/help-requests/:id` - Get single request
- `PUT /api/help-requests/:id` - Update request
- `DELETE /api/help-requests/:id` - Delete request
- `POST /api/help-requests/:id/volunteer` - Volunteer for request

### Users
- `GET /api/users/volunteers` - Get volunteers
- `GET /api/users/:id` - Get user profile

## 🎯 Features

### Backend Features
- ✅ JWT Authentication & Authorization
- ✅ Role-based access control (Volunteer/Requester)
- ✅ Help request management with filtering
- ✅ Volunteer system with offer/accept workflow
- ✅ MongoDB with Mongoose ODM
- ✅ Input validation and error handling
- ✅ Rate limiting and security headers
- ✅ Comprehensive API documentation

### Frontend Features (Coming Soon)
- 🔄 User authentication and registration
- 🔄 Help request creation and management
- 🔄 Volunteer discovery and connection
- 🔄 Real-time notifications
- 🔄 Responsive design for mobile/desktop

## 🛠️ Technology Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT with bcrypt
- **Security**: Helmet, CORS, Rate Limiting
- **Validation**: Express-validator

### Frontend (Planned)
- **Framework**: React.js
- **State Management**: Redux Toolkit
- **UI Library**: Material-UI or Tailwind CSS
- **HTTP Client**: Axios
- **Routing**: React Router

## 🔐 User Roles

### Requester
- Create help requests
- Manage their requests
- Accept/decline volunteer offers
- Update profile information

### Volunteer
- Browse help requests
- Offer help to requests
- View volunteering history
- Update profile information

## 📊 Data Models

### User
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  role: 'volunteer' | 'requester',
  phone: String,
  location: String,
  bio: String,
  avatar: String,
  isVerified: Boolean
}
```

### Help Request
```javascript
{
  title: String,
  description: String,
  urgency: 'low' | 'medium' | 'high' | 'critical',
  location: String,
  category: String,
  requester: ObjectId,
  status: 'open' | 'in-progress' | 'completed' | 'cancelled',
  volunteers: [{
    volunteer: ObjectId,
    status: 'pending' | 'accepted' | 'declined'
  }]
}
```

## 🚀 Deployment

### Backend Deployment
- **Platform**: Heroku, DigitalOcean, AWS
- **Database**: MongoDB Atlas
- **Environment**: Set production variables

### Frontend Deployment
- **Platform**: Vercel, Netlify, GitHub Pages
- **Build**: Optimized production build
- **Environment**: Configure API endpoints

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- **Msaada kwa Jamii** - "Help for the Community"
- Built with modern web technologies
- Designed for humanitarian impact

---

**Tushikane** - Making a difference, one request at a time. 🌍❤️ 