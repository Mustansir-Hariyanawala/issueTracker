# 🏘️ Residential Society Issue Tracker

A comprehensive React.js web application for managing and tracking civic maintenance issues in residential societies.

## 📋 Features

### User Roles
- **Resident**: Report and track personal issues
- **Committee Member/Admin**: Manage all issues, assign tasks, view analytics
- **Technician/Maintenance Staff**: View and update assigned tasks

### Core Functionalities

#### 1. Issue Reporting
- Comprehensive issue reporting form
- Image/video upload support
- Geolocation tagging
- Priority levels (Low, Medium, High, Critical)
- Multiple categories:
  - Sanitation/Garbage
  - Water Supply/Leakage
  - Electricity/Street Lights
  - Elevator/Lift
  - Security
  - Noise Disturbance
  - Parking
  - General Maintenance
  - Other

#### 2. Status Dashboard
- Track issue status in real-time
- Status types:
  - New
  - Assigned
  - In Progress
  - Resolved
- Visual status indicators with color coding

#### 3. Admin Panel
- Assign tasks to maintenance staff
- Update issue status
- Monitor all issues in one place
- Delete/manage issues
- Performance tracking

#### 4. Analytics Dashboard
- Visual charts for category breakdown
- Priority distribution analysis
- Status tracking
- Monthly trend analysis
- Average resolution time
- Top issue categories
- Insights and recommendations
- Resolution rate calculation

#### 5. User Feedback & Rating
- 5-star rating system for resolved issues
- Comment system for issue discussions
- Real-time feedback mechanism

#### 6. Multilingual Support
- English
- Hindi (हिंदी)
- Marathi (मराठी)
- Simple UI for accessibility

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Navigate to the project directory:
```bash
cd issue_tracker
```

2. Dependencies are already installed. If needed, run:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open your browser and visit:
```
http://localhost:3000
```

## 🔐 Demo Login

The application uses a simple demo authentication system. You can log in with:

- **Email**: any@email.com
- **Password**: any password
- **Role**: Select from dropdown (Resident, Admin, or Technician)

## 📱 Application Structure

```
src/
├── components/
│   ├── Navbar.js           # Navigation bar component
│   └── Navbar.css
├── pages/
│   ├── Login.js            # Login page
│   ├── Dashboard.js        # Main dashboard
│   ├── ReportIssue.js      # Issue reporting form
│   ├── IssueList.js        # List of all issues
│   ├── IssueDetails.js     # Detailed issue view
│   ├── AdminPanel.js       # Admin management panel
│   └── Analytics.js        # Analytics and insights
├── context/
│   ├── AuthContext.js      # Authentication state management
│   └── LanguageContext.js  # Multi-language support
└── App.js                  # Main application component
```

## 💡 Usage Guide

### For Residents

1. **Login** with resident credentials
2. **Report an Issue**:
   - Click "Report Issue" from navbar or dashboard
   - Fill in the form with issue details
   - Upload photos/videos (optional)
   - Add geolocation (optional)
   - Submit the form
3. **Track Issues**:
   - View all your reported issues
   - Filter by status, category, or priority
   - Click on any issue to view details
4. **Provide Feedback**:
   - Rate resolved issues
   - Add comments to issues

### For Admin/Committee Members

1. **Login** with admin credentials
2. **View Dashboard**:
   - See overview of all issues
   - Quick statistics
3. **Manage Issues**:
   - Go to Admin Panel
   - Assign issues to technicians
   - Update issue status
   - Delete issues if needed
4. **View Analytics**:
   - Access comprehensive analytics dashboard
   - View charts and insights
   - Track performance metrics
   - Identify recurring problems

### For Technicians

1. **Login** with technician credentials
2. **View Assigned Issues**:
   - See issues assigned to you
   - Update status as you work
3. **Update Progress**:
   - Add comments to issues
   - Mark as completed when done

## 🎨 Features Implemented

✅ User authentication with role-based access  
✅ Issue reporting with image upload  
✅ Geolocation tagging  
✅ Real-time status tracking  
✅ Admin panel for task management  
✅ Analytics dashboard with visualizations  
✅ User rating and feedback system  
✅ Multilingual support (EN/HI/MR)  
✅ Responsive design for mobile and desktop  
✅ Filter and search functionality  
✅ Comment system for issue discussions  

## 🔧 Technology Stack

- **Frontend**: React.js
- **Routing**: React Router DOM
- **State Management**: React Context API
- **Styling**: Custom CSS
- **Data Storage**: LocalStorage (for demo purposes)
- **Icons**: Emoji-based icons

## 📊 Data Storage

Currently, the application uses browser LocalStorage for data persistence. This is suitable for:
- Development and testing
- Demo purposes
- Small-scale deployments

For production use, consider integrating with:
- Backend API (Node.js/Express, Python/Django, etc.)
- Database (MongoDB, PostgreSQL, MySQL)
- Cloud storage for images/videos
- Real-time notifications (Email/SMS)

## 🚀 Future Enhancements

- Real backend API integration
- Email/SMS notifications
- Push notifications
- Advanced analytics with charts library
- Export reports (PDF/Excel)
- Mobile app (React Native)
- Real-time updates (WebSocket)
- File compression for uploads
- Advanced search with filters
- Vendor performance tracking
- Cost analysis and budgeting
- Maintenance schedule management

## 📝 Notes

- This is a beginner-level React application
- Data is stored in browser LocalStorage
- Suitable for learning and demonstration
- Can be extended with backend integration
- Mobile-responsive design included
- Accessibility features for elderly users

---

**Happy Issue Tracking! 🏘️✨**

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
#
