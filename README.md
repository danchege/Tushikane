# Tushikane - Humanitarian Community Service Platform

> **Msaada kwa Jamii** - Connecting communities through humanitarian service

A modern, full-stack web application that connects volunteers, donors, and community members to support humanitarian initiatives and community projects.

## 📱 Features

### 🏠 Home
- Landing page with key features
- Quick access to main sections
- Community highlights
- Latest updates and announcements

![Home](./screenshots/home/home.png)

### 🌐 About
- Organization history and mission
- Team information
- Success stories
- Impact statistics
- Community testimonials

![About](./screenshots/about/about.png)

### 📊 Project Pulse
- Real-time project statistics and analytics
- Category-based project filtering
- Status tracking for active projects
- Community impact metrics

![Project Pulse](./screenshots/projectpulse/projectpulse.png)

### 👥 Volunteers
- Volunteer registration and management
- Project volunteer matching
- Volunteer application tracking
- Success stories and testimonials

![Volunteers](./screenshots/volunteers/volunteers.png)

### 💰 Donors
- Project-based donation system
- Donation progress tracking
- Impact reporting
- Donation history management

![Donors](./screenshots/donors/donors.png)

### 📞 Chat Hub
- Real-time community chat
- Direct messaging between volunteers and coordinators
- Group chat for project discussions
- File sharing and emoji support

![Chat Hub](./screenshots/chathub/chathub.png)

### 📋 Admin Dashboard
- User management
- Project administration
- Message monitoring
- Statistics and analytics

![Admin Dashboard](./screenshots/admin/admin.png)

### 📧 Contact
- Community contact information
- Message submission system
- Office hours and location
- Success message feedback

![Contact](./screenshots/contact/contacts.png)

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
│   └── package.json       # Backend dependencies
│
└── frontend/              # React.js Frontend
    ├── public/
    ├── src/
    │   ├── components/     # Reusable React components
    │   ├── pages/          # Page components
    │   ├── styles/         # Global styles
    │   ├── services/       # API services
    │   └── assets/         # Images and media
    ├── package.json
    └── README.md
```

## 📸 Screenshots

```
Tushikane/
└── screenshots/
    ├── home/              # Homepage screenshots
    ├── projectpulse/      # Project Pulse screenshots
    ├── volunteers/        # Volunteers page screenshots
    ├── donors/           # Donors page screenshots
    ├── chathub/          # Chat Hub screenshots
    ├── admin/            # Admin Dashboard screenshots
    └── contact/          # Contact page screenshots
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (v6.0 or higher)
- npm or pnpm (recommended)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/tushikane.git
```

2. Install backend dependencies:
```bash
cd tushikane/backend
pnpm install
```

3. Install frontend dependencies:
```bash
cd ../frontend
pnpm install
```

4. Start the backend server:
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

The backend API will be available at `http://localhost:5001`

### Frontend Setup

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

The frontend will be available at `http://localhost:3002`

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

## 👤 Maker

**Daniel Chege Njenga** - Creator and Developer

## 🙏 Acknowledgments

- **Msaada kwa Jamii** - "Help for the Community"
- Built with modern web technologies
- Designed for humanitarian impact

---

**Tushikane** - Making a difference, one request at a time. 🌍❤️ 