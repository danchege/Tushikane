# Tushikane - Humanitarian Community Service Platform

> **Msaada kwa Jamii** - Connecting communities through humanitarian service

A modern, full-stack web application that connects volunteers, donors, and community members to support humanitarian initiatives and community projects.

## 🚀 Live Demo

- **Frontend (Vercel):** http://tushikane.vercel.app/
- **Backend (Render):** https://tushikane-1.onrender.com/

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
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── db/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── Dockerfile
│   ├── package.json
│   ├── pnpm-lock.yaml
│   ├── seed.js
│   ├── server.js
│   ├── test-mongo.js
│   ├── testDatabase.js
│   ├── testMongo.js
│
├── frontend/
│   ├── public/
│   │   └── images/
│   │       └── logo/
│   │           └── tushikane_logo.png
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── styles/
│   │   ├── App.jsx
│   │   ├── App.js
│   │   ├── App.css
│   │   └── main.jsx
│   ├── jest.config.js
│   ├── babel.config.js
│   ├── setupTests.js
│   ├── vite.config.mjs
│   ├── Dockerfile
│   ├── index.html
│   ├── package.json
│   └── pnpm-lock.yaml
│
├── .github/
│   └── workflows/
│       ├── backend.yaml
│       └── frontend.yaml
├── screenshots/
│   ├── about/
│   ├── admin/
│   ├── contact/
│   ├── donors/
│   ├── home/
│   ├── projectpulse/
│   └── volunteers/
├── docker-compose.yml
├── package.json
├── package-lock.json
├── pnpm-lock.yaml
├── README.md
└── vercel.json
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

## 🖼️ Render Backend Logs Screenshot

Add a screenshot here showing successful backend logs from Render to prove the backend ran:

```
![Render Backend Logs](./screenshots/backend/render-logs.png)
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- pnpm (recommended for monorepo support)
- MongoDB (local instance or from a provider like MongoDB Atlas)

### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/danchege/Tushikane.git
    cd Tushikane
    ```

2.  **Install all dependencies:**
    Run this command from the root directory to install dependencies for both the frontend and backend.
    ```bash
    pnpm install
    ```

3.  **Configure Backend Environment:**
    - Navigate to the `backend` directory.
    - Create a `.env` file by copying the example: `cp .env.example .env` (if you have one) or create it manually.
    - Add your environment variables:
      ```env
      MONGODB_URI=your_mongodb_connection_string
      JWT_SECRET=your_super_secret_jwt_key
      PORT=5000
      ```

4.  **Start Both Frontend and Backend:**
    From the root directory, run:
    ```bash
    pnpm run dev
    ```
    - The backend API will be available at `http://localhost:5000`
    - The frontend will be available at `http://localhost:5173` (or as specified by Vite).

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

### Frontend Features
- 🔄 User authentication and registration
- 🔄 Help request creation and management
- 🔄 Volunteer discovery and connection
- 🔄 Real-time chat hub with Socket.IO
- 🔄 Responsive design for mobile/desktop
- 🔄 Project and donor tracking

## 🛠️ Technology Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT with `bcryptjs`
- **Real-time**: Socket.IO
- **Security**: Helmet, CORS, Rate Limiting
- **Validation**: express-validator

### Frontend
- **Framework**: React.js with Vite
- **State Management**: React Context / Hooks (can be extended with Redux)
- **UI & Animations**: Framer Motion, CSS
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

This project is configured for continuous deployment using GitHub Actions.

### Backend (Render)
- The backend is automatically deployed to **Render** from the `backend/` directory.
- The CI/CD pipeline in `.github/workflows/backend.yaml` handles testing, building a Docker image, and deploying.
- A live instance is running on Render, connected to a MongoDB Atlas database.

### Frontend (Vercel)
- The frontend is automatically deployed to **Vercel** from the `frontend/` directory.
- The CI/CD pipeline in `.github/workflows/frontend.yaml` handles testing, building, and deploying to Vercel.
- The production build is optimized by Vite.

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
