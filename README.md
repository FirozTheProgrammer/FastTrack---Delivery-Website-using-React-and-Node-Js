# 🚚 Fast Track - Courier Delivery Management System

A modern, full-stack courier delivery management system built with React and Node.js, designed specifically for Bangladesh's delivery industry. Features advanced analytics, bulk order processing, API integration, and real-time tracking.

![Fast Track Banner](https://img.shields.io/badge/Fast_Track-Courier_System-667eea?style=for-the-badge)
![React](https://img.shields.io/badge/React-19.2.0-61dafb?style=for-the-badge&logo=react)
![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=for-the-badge&logo=node.js)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

## 📋 Table of Contents

- [Features](#-features)
- [Screenshots](#-screenshots)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
- [API Documentation](#-api-documentation)
- [Project Structure](#-project-structure)
- [Configuration](#-configuration)
- [Contributing](#-contributing)
- [License](#-license)

## ✨ Features

### 🎯 Core Features
- **User Authentication** - Separate login for admins and clients with role-based access control
- **Parcel Tracking** - Real-time tracking with ID and phone verification
- **Order Management** - Create, update, and manage delivery requests
- **Dashboard** - Dedicated dashboards for admins and clients
- **Dark Mode** - Full dark mode support across the application

### 🚀 Advanced Features (New!)

#### 📦 Bulk Order Upload
- Upload hundreds of orders at once via CSV/Excel files
- Drag-and-drop interface with progress tracking
- Automatic validation and detailed error reporting
- Download sample template for easy formatting
- Supports both `.csv` and `.xlsx` formats

#### 📊 Dashboard Analytics
- **Visual Charts** - Interactive line, bar, and pie charts
- **Key Metrics** - Total orders, delivery rate, revenue tracking
- **Trend Analysis** - Daily order trends over customizable periods
- **Export Reports** - Download analytics data as CSV
- **Real-time Statistics** - Up-to-date business insights

#### 🔑 API Integration
- **RESTful API** - Complete API for third-party integrations
- **API Key Management** - Generate, revoke, and monitor API keys
- **Webhook Support** - Real-time notifications via webhooks
- **Usage Tracking** - Monitor API usage and last access times
- **Secure Authentication** - Token-based API authentication

#### 📍 Automated Tracking
- **Status History** - Complete timeline of order status changes
- **Visual Timeline** - Color-coded status progression
- **Email Notifications** - Automated emails on status updates
- **Webhook Triggers** - Notify external systems automatically

## 📸 Screenshots

### Admin Dashboard
![Admin Dashboard](https://via.placeholder.com/800x400/667eea/ffffff?text=Admin+Dashboard)
*Admin dashboard with quick access to all features*

### Bulk Upload Interface
![Bulk Upload](https://via.placeholder.com/800x400/10b981/ffffff?text=Bulk+Upload+Interface)
*Drag-and-drop file upload for multiple orders*

### Analytics Dashboard
![Analytics](https://via.placeholder.com/800x400/3b82f6/ffffff?text=Analytics+Dashboard)
*Comprehensive analytics with interactive charts*

### API Settings
![API Settings](https://via.placeholder.com/800x400/8b5cf6/ffffff?text=API+Settings)
*API key management and webhook configuration*

### Client Dashboard
![Client Dashboard](https://via.placeholder.com/800x400/f59e0b/ffffff?text=Client+Dashboard)
*Client view with order tracking*

## 🛠 Tech Stack

### Frontend
- **React 19.2.0** - Modern UI library
- **React Router DOM** - Client-side routing
- **Tailwind CSS 4.1.17** - Utility-first CSS framework
- **Recharts** - Data visualization library
- **Framer Motion** - Animation library
- **GSAP** - Advanced animations
- **Lucide React** - Beautiful icon library

### Backend
- **Node.js** - JavaScript runtime
- **Express 5.2.1** - Web application framework
- **Multer** - File upload handling
- **CSV Parser** - CSV file processing
- **XLSX** - Excel file processing
- **Nodemailer** - Email notifications
- **UUID** - Unique identifier generation

### Development Tools
- **Vite** - Fast build tool and dev server
- **ESLint** - Code linting
- **Concurrently** - Run multiple commands

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/fast-track.git
   cd fast-track
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment (optional)**
   
   For email notifications, update `server/notifications.js`:
   ```javascript
   const transporter = nodemailer.createTransport({
       service: 'gmail',
       auth: {
           user: 'your-email@gmail.com',
           pass: 'your-app-password'  // Use Gmail App Password
       }
   });
   ```

4. **Start the application**

   **Option 1: Run both frontend and backend together (Recommended)**
   ```bash
   npm run dev:full
   ```
   
   **Option 2: Run separately**
   ```bash
   # Terminal 1 - Backend
   npm run server
   
   # Terminal 2 - Frontend
   npm run dev
   ```

5. **Access the application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:3000

### Default Credentials

**Admin Account**
- Username: `admin`
- Password: `admin123`

**Test Client Account**
- Register a new account or check `server/users.json`

## 📚 API Documentation

### Authentication
All API endpoints (except auth) require an API key in the header:
```
X-API-Key: your_api_key_here
```

### Base URL
```
http://localhost:3000/api/v1
```

### Endpoints

#### Get All Parcels
```http
GET /api/v1/parcels
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "FT-1001",
      "sender": "ABC Store",
      "receiver": "John Doe",
      "type": "Express",
      "status": "In Transit",
      "date": "2025-12-22",
      "statusHistory": [...]
    }
  ]
}
```

#### Create Parcel
```http
POST /api/v1/parcels
Content-Type: application/json
```

**Request Body:**
```json
{
  "sender": "ABC Electronics",
  "receiver": "Jane Smith",
  "type": "Express",
  "senderPhone": "01712345678",
  "address": "123 Main St, Dhaka"
}
```

#### Get Single Parcel
```http
GET /api/v1/parcels/:id
```

#### Bulk Upload
```http
POST /api/parcels/bulk
Content-Type: multipart/form-data
```

**Form Data:**
- `file`: CSV or Excel file

#### Analytics Endpoints

**Overview Statistics**
```http
GET /api/analytics/overview
```

**Orders by Status**
```http
GET /api/analytics/orders-by-status
```

**Orders by Type**
```http
GET /api/analytics/orders-by-type
```

**Daily Trend**
```http
GET /api/analytics/daily-trend?days=7
```

**Export Report**
```http
GET /api/analytics/export
```

### API Key Management

**Generate API Key (Admin only)**
```http
POST /api/admin/api-keys
Content-Type: application/json

{
  "name": "Mobile App",
  "description": "API key for mobile application"
}
```

**Get All API Keys**
```http
GET /api/admin/api-keys
```

**Delete API Key**
```http
DELETE /api/admin/api-keys/:id
```

### Webhooks

**Register Webhook**
```http
POST /api/admin/webhooks
Content-Type: application/json

{
  "url": "https://your-app.com/webhook",
  "events": ["status_update"]
}
```

**Webhook Payload Example:**
```json
{
  "event": "status_update",
  "timestamp": "2025-12-22T10:00:00.000Z",
  "data": {
    "parcelId": "FT-1001",
    "newStatus": "Delivered",
    "parcel": { /* full parcel object */ }
  }
}
```

For complete API documentation, see [API_DOCS.md](./API_DOCS.md)

## 📁 Project Structure

```
fast-track/
├── public/                      # Static files
│   └── sample-bulk-upload.csv   # Sample bulk upload template
├── server/                      # Backend
│   ├── server.js               # Main server file
│   ├── analytics.js            # Analytics engine
│   ├── notifications.js        # Email notifications
│   ├── api-routes.js          # API key & webhook management
│   ├── data.json              # Parcel database
│   ├── users.json             # User accounts
│   └── uploads/               # File upload directory
├── src/                        # Frontend
│   ├── components/            # React components
│   │   ├── Header/           # Navigation header
│   │   ├── Footer/           # Footer component
│   │   ├── BulkUpload/       # Bulk upload component
│   │   ├── TrackingTimeline/ # Timeline visualization
│   │   └── ...
│   ├── pages/                 # Page components
│   │   ├── Home.jsx          # Landing page
│   │   ├── Login.jsx         # Login page
│   │   ├── AdminDashboard.jsx # Admin dashboard
│   │   ├── Analytics.jsx     # Analytics dashboard
│   │   ├── ApiSettings.jsx   # API management
│   │   └── ...
│   ├── context/              # React context
│   │   ├── AuthContext.jsx  # Authentication state
│   │   └── ThemeContext.jsx # Theme management
│   ├── App.jsx               # Main app component
│   └── main.jsx              # Entry point
├── package.json              # Dependencies
└── README.md                 # This file
```

## ⚙️ Configuration

### Email Notifications

To enable email notifications, configure Nodemailer in `server/notifications.js`:

1. Enable 2FA on your Gmail account
2. Generate an App Password: [Google Account Settings](https://myaccount.google.com/apppasswords)
3. Update credentials:
   ```javascript
   user: 'your-email@gmail.com',
   pass: 'your-16-digit-app-password'
   ```

### File Upload Limits

Adjust upload size limits in `server/server.js`:
```javascript
const upload = multer({ 
    limits: { fileSize: 5 * 1024 * 1024 } // 5MB
});
```

### Port Configuration

Change ports in respective files:
- Backend: `server/server.js` (default: 3000)
- Frontend: `vite.config.js` (default: 5173)

## 🎯 Usage Examples

### Bulk Upload CSV Format

```csv
ID,Sender,Receiver,Type,Status,SenderPhone,ReceiverPhone,Address,Notes
FT-2001,ABC Electronics,John Doe,Express,Pending Approval,01712345678,01798765432,"123 Main St, Dhaka",Handle with care
FT-2002,Fashion House,Sarah Khan,Regular,Pending Approval,01612345678,01898765432,"456 Park Ave, Chittagong",Clothing items
```

Download the template from the bulk upload page or use `public/sample-bulk-upload.csv`.

### Using the API

```javascript
// Example: Create a new parcel via API
const response = await fetch('http://localhost:3000/api/v1/parcels', {
  method: 'POST',
  headers: {
    'X-API-Key': 'your_api_key',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    sender: 'Tech Store',
    receiver: 'Alice Johnson',
    type: 'Express',
    senderPhone: '01712345678'
  })
});

const result = await response.json();
console.log(result);
```

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Development Guidelines

- Follow the existing code style
- Write meaningful commit messages
- Test your changes thoroughly
- Update documentation as needed

## 🐛 Known Issues & Roadmap

### Current Limitations
- File-based database (consider PostgreSQL/MongoDB for production)
- Email notifications require configuration
- No SMS notifications (can be added with Twilio)

### Planned Features
- [ ] Real-time notifications using WebSockets
- [ ] SMS notifications via Twilio
- [ ] Mobile application (React Native)
- [ ] Payment gateway integration
- [ ] Multi-language support
- [ ] Advanced reporting and forecasting

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Firoz Al Hasan**
- GitHub: [@FirozTheProgrammer](https://github.com/FirozTheProgrammer)
- Email: firozhasan1542@gmail.com

## 🙏 Acknowledgments

- React team for the amazing library
- Tailwind CSS for the utility-first CSS framework
- Recharts for beautiful data visualizations
- All contributors and users of this project

## 📞 Support

For support, email firozhasan1542@gmail.com or create an issue in the GitHub repository.

---

<div align="center">
  Made with ❤️ in Bangladesh
  
  ⭐ Star this repo if you find it helpful!
</div>
