# Issue Tracker

A full-stack web application for tracking and managing issues efficiently. Users can report issues, track their status, and administrators can manage and resolve them. Built with React for the frontend and Node.js/Express with MongoDB for the backend.

---

## Features

### User Features
- **Secure Authentication** - Register and login with password encryption
- **Create Issues** - Report issues with descriptions, categories, and media attachments
**Issue Dashboard** - View your reported issues and system statistics
**Issue Details** - View detailed information about each issue including status and updates
**User Profile** - Manage your account information
**Issue Filtering** - Filter issues by status, category, and priority

### Admin Features
**Issue Management** - View all issues across the system
**Status Updates** - Change issue status (Open, In Progress, Resolved, Closed)
**System Overview** - Monitor all issues and user activities
**Issue Deletion** - Remove resolved or invalid issues

### Technical Features
**Responsive Design** - Beautiful UI that works on all devices
**Modern UI/UX** - Gradient backgrounds, smooth animations, and intuitive navigation
**File Upload Support** - Attach images and videos to issues (up to 50MB)
**JWT Authentication** - Secure token-based authentication
**RESTful API** - Clean and scalable API architecture
**Real-time Statistics** - Dynamic issue counters and status tracking

---

## Tech Stack

### Frontend
- **Framework**: React 19.2.0
- **Routing**: React Router DOM 7.9.6
- **Styling**: Custom CSS with animations and gradients
- **HTTP Client**: Axios
- **Build Tool**: React Scripts 5.0.1
- **Testing**: React Testing Library

### Backend
- **Runtime**: Node.js
- **Framework**: Express 5.1.0
- **Database**: MongoDB with Mongoose 8.20.0
- **Authentication**: JSON Web Tokens (JWT)
- **Security**: bcryptjs for password hashing
- **File Handling**: Multer 2.0.2
- **Middleware**: CORS 2.8.5, Morgan logging
- **Development**: Nodemon for auto-restart

---

## Project Structure

```
issue_tracker/
├── backend/
│   ├── app.js                    # Main Express application
│   ├── package.json              # Backend dependencies
│   ├── controllers/
│   │   ├── issueController.js    # Issue business logic
│   │   └── userController.js     # User authentication logic
│   ├── middleware/
│   │   ├── authorizeRoles.js     # Role-based access control
│   │   ├── upload.js             # Multer configuration
│   │   └── verifyToken.js        # JWT verification
│   ├── models/
│   │   ├── issueModel.js         # Issue schema
│   │   └── userModel.js          # User schema
│   ├── routes/
│   │   ├── issueRouter.js        # Issue endpoints
│   │   └── userRouter.js         # User endpoints
│   ├── util/
│   │   └── databaseUtil.js       # Database connection
│   └── uploads/                  # Uploaded files storage
│
├── frontend/
│   ├── package.json              # Frontend dependencies
│   ├── public/
│   │   ├── index.html            # HTML entry point
│   │   └── manifest.json         # PWA manifest
│   ├── src/
│   │   ├── App.js                # Main App component
│   │   ├── App.css               # Global styles
│   │   ├── index.js              # React entry point
│   │   ├── components/           # React components
│   │   │   ├── Home.js           # Landing page
│   │   │   ├── Login.js          # Login page
│   │   │   ├── Register.js       # Registration page
│   │   │   ├── Dashboard.js      # Main dashboard
│   │   │   ├── CreateIssue.js    # Issue creation form
│   │   │   ├── IssueDetails.js   # Issue detail view
│   │   │   ├── IssueCard.js      # Issue card component
│   │   │   ├── Profile.js        # User profile
│   │   │   ├── Header.js         # Navigation header
│   │   │   ├── ProtectedRoute.js # Auth-protected routes
│   │   │   ├── [component].css   # Component styles
│   │   └── services/
│   │       └── api.js            # API service functions
│   └── [CSS files and documentation]
│
└── README.md                     # This file
```

---

## Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v14.0.0 or higher) - [Download](https://nodejs.org/)
- **npm** (comes with Node.js)
- **MongoDB** - [Download](https://www.mongodb.com/try/download/community) or use MongoDB Atlas (cloud)
- **Git** (optional) - [Download](https://git-scm.com/)

---

## Installation & Setup

### 1. Clone the Repository
```bash
git clone <repository-url>
cd issue_tracker
```

### 2. Backend Setup

Navigate to the backend directory:
```bash
cd backend
```

Install dependencies:
```bash
npm install
```

Create a `.env` file in the backend directory:
```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/issue_tracker
JWT_SECRET=your_secret_key_here
NODE_ENV=development
```

**Note**: Replace `mongodb://localhost:27017/issue_tracker` with your MongoDB connection string. For MongoDB Atlas, use: `mongodb+srv://<username>:<password>@<cluster>.mongodb.net/issue_tracker`

### 3. Frontend Setup

Navigate to the frontend directory:
```bash
cd ../frontend
```

Install dependencies:
```bash
npm install
```

Create a `.env` file in the frontend directory (if needed for API configuration):
```env
REACT_APP_API_URL=http://localhost:3000
```

---

## Running the Application

### Start MongoDB
Make sure MongoDB is running on your system.

**If using local MongoDB:**
```bash
mongod
```

### Start the Backend Server
In the `backend` directory, run:
```bash
npm start
```

You should see output like:
```
Server is running on port 3000
MongoDB connected!
```

### Start the Frontend Development Server
In a new terminal, navigate to the `frontend` directory and run:
```bash
npm start
```

The application will automatically open in your browser at `http://localhost:3001`

### Build for Production

**Backend**: The backend is ready to deploy as-is using Node.js

**Frontend**: Create an optimized production build:
```bash
cd frontend
npm run build
```

This generates a `build` folder with optimized production files.

---

## API Endpoints

### User Routes (`/api/users`)
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/register` | Register a new user | No |
| POST | `/login` | Login user and get JWT token | No |
| GET | `/profile` | Get current user profile | Yes |

### Issue Routes (`/api/issues`)
| Method | Endpoint | Description | Auth Required | Role Required |
|--------|----------|-------------|---------------|---------------|
| GET | `/` | Get all issues | Yes | Admin |
| POST | `/create` | Create a new issue | Yes | User |
| GET | `/my` | Get user's own issues | Yes | User |
| GET | `/:id` | Get issue details by ID | Yes | User |
| PUT | `/:id/status` | Update issue status | Yes | Admin |
| DELETE | `/:id` | Delete an issue | Yes | Admin |

### Authentication
All protected endpoints require a JWT token in the `Authorization` header:
```
Authorization: Bearer <your_jwt_token>
```

---

## User Roles & Permissions

### Resident/User
- Create issues to report problems
- View their own created issues
- View issue details
- Upload media with issues (images and videos)
- View dashboard with personal statistics

### Admin
- View all issues in the system
- Update issue status (Open → In Progress → Resolved → Closed)
- Delete issues
- View system-wide statistics
- Manage all user issues

---

## Database Schema

### User Model
```javascript
{
  _id: ObjectId,
  name: String,
  email: String (unique),
  password: String (hashed),
  role: String (enum: ['resident', 'admin']),
  createdAt: Date,
  updatedAt: Date
}
```

### Issue Model
```javascript
{
  _id: ObjectId,
  title: String,
  description: String,
  category: String,
  priority: String (enum: ['low', 'medium', 'high']),
  status: String (enum: ['open', 'in-progress', 'resolved', 'closed']),
  userId: ObjectId (reference to User),
  attachments: [String] (file paths),
  createdAt: Date,
  updatedAt: Date
}
```

---

## Testing the Application

### 1. User Registration
- Navigate to `http://localhost:3001/register`
- Create an account with a username and password
- You'll be automatically logged in and redirected to the dashboard

### 2. Create an Issue
- Click "Report New Issue" on the dashboard
- Fill in issue details (title, description, category, priority)
- Optionally upload an image or video
- Click "Submit" to create the issue

### 3. View Issues
- Dashboard displays all your created issues
- Click on any issue card to view detailed information
- Admin can see all system issues

### 4. Update Issue Status (Admin Only)
- Navigate to an issue detail page
- Use the status dropdown to change the status
- Changes are saved to the database immediately

---

## Security Features

- ✅ **Password Hashing** - User passwords are hashed using bcryptjs
- ✅ **JWT Authentication** - Secure token-based authentication
- ✅ **Role-Based Access Control** - Different permissions for different user roles
- ✅ **CORS Protection** - Cross-Origin Resource Sharing configured
- ✅ **Input Validation** - Data is validated before processing
- ✅ **File Upload Restrictions** - Only images and videos allowed, max 50MB
- ✅ **Token Expiration** - JWT tokens have expiration times

---

## Troubleshooting

### MongoDB Connection Error
**Problem**: `Error: connect ECONNREFUSED 127.0.0.1:27017`

**Solution**: 
- Ensure MongoDB is running on your system
- Check your MongoDB URI in the `.env` file
- For MongoDB Atlas, verify your username and password are correct

### CORS Error
**Problem**: `Access to XMLHttpRequest blocked by CORS policy`

**Solution**: 
- Ensure CORS is properly configured in `backend/app.js`
- Check that frontend URL is in the allowed origins

### Token Expired
**Problem**: `401 Unauthorized` after some time

**Solution**: 
- Log out and log in again to get a fresh token
- The token is stored in localStorage automatically

### Port Already in Use
**Problem**: `Error: listen EADDRINUSE :::3000`

**Solution**: 
- Change the port in `.env` file
- Or find and kill the process using that port

---

## Environment Variables

### Backend `.env`
```env
PORT=3000                                    # Server port
MONGODB_URI=mongodb://localhost:27017/issue_tracker  # Database URI
JWT_SECRET=your_secret_key_here             # JWT secret key
NODE_ENV=development                        # Environment type
```

### Frontend `.env` (Optional)
```env
REACT_APP_API_URL=http://localhost:3000    # Backend API URL
```

---

## Deployment

### Deploy Backend
1. Use platforms like Heroku, Railway, or Render
2. Set environment variables on the platform
3. Ensure MongoDB is accessible from your server

### Deploy Frontend
1. Build the frontend: `npm run build`
2. Deploy the `build` folder to services like:
   - Vercel
   - Netlify
   - AWS S3 + CloudFront
   - GitHub Pages

---

## Additional Documentation

- [Backend Integration Summary](./BACKEND_INTEGRATION_SUMMARY.md) - Details on API integration
- [CSS Update Summary](./frontend/CSS_UPDATE_SUMMARY.md) - Frontend styling details
- [Frontend Code Documentation](./frontend/FRONTEND_CODE_DOCUMENTATION.txt) - Component documentation

---

## Contributing

1. Fork the repository
2. Create a new branch for your feature (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## License

This project is licensed under the ISC License - see the package.json file for details.

---

## Author

Created as a comprehensive full-stack project demonstrating modern web development practices.

---

## Support

For issues, questions, or suggestions:
1. Check the [Troubleshooting](#-troubleshooting) section
2. Review existing documentation
3. Create an issue in the repository

---

## Future Enhancements

Potential features to add:
- Email notifications for issue updates
- Comments and discussion on issues
- Multiple file attachments
- Tags and labels for issues
- Analytics and reporting dashboard
- Real-time notifications using WebSocket
- Dark mode support
- Mobile app

---

**Happy issue tracking!**
