# Quick Setup Guide

Get Fast Track running in under 5 minutes!

## Prerequisites

- Node.js v18 or higher
- npm or yarn

## Installation Steps

### 1. Clone & Install

```bash
# Clone the repository
git clone https://github.com/yourusername/fast-track.git
cd fast-track

# Install all dependencies
npm install
```

### 2. Start the Application

```bash
# Start both frontend and backend together
npm run dev:full
```

That's it! The application is now running:
- **Frontend**: http://localhost:5173
- **Backend**: http://localhost:3000

## First Login

### Admin Access
- Navigate to: http://localhost:5173/login
- Username: `admin`
- Password: `admin123`

### Create Client Account
1. Click "Sign up" on login page
2. Fill in registration form
3. Use a Gmail account (@gmail.com)
4. Login with your credentials

## Quick Tour

### As Admin

1. **Dashboard**: View and manage all orders
2. **Bulk Upload**: 
   - Click "📦 Bulk Upload"
   - Download template
   - Fill with orders
   - Upload file
3. **Analytics**:
   - Click "📊 Analytics"
   - View charts and statistics
4. **API Settings**:
   - Click "🔑 API Settings"
   - Generate API key
   - Configure webhooks

### As Client

1. **Dashboard**: View your orders
2. **New Request**: Create delivery request
3. **Track Order**: Track package status

## Optional Configuration

### Email Notifications

To enable email notifications:

1. Generate Gmail App Password:
   - Go to [Google Account](https://myaccount.google.com)
   - Security → 2-Step Verification → App passwords
   - Generate password for "Mail"

2. Update `server/notifications.js`:
   ```javascript
   user: 'your-email@gmail.com',
   pass: 'your-16-digit-app-password'
   ```

3. Restart server

### Environment Variables (Optional)

Create `.env` file in root:

```env
PORT=3000
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
```

Update `server/notifications.js` to use:
```javascript
user: process.env.EMAIL_USER,
pass: process.env.EMAIL_PASSWORD
```

## Testing Features

### Test Bulk Upload

1. Download template from bulk upload page
2. Use the sample file at `public/sample-bulk-upload.csv`
3. Upload and verify results

### Test API

```bash
# First, generate API key in API Settings page
# Then test with curl:

curl http://localhost:3000/api/v1/parcels \
  -H "X-API-Key: your_generated_key"
```

### Test Analytics

1. Create several orders with different statuses
2. Navigate to Analytics
3. View charts and statistics
4. Export report as CSV

## Troubleshooting

### Port Already in Use

**Frontend (5173):**
```bash
# Find and kill process
lsof -ti:5173 | xargs kill -9

# Or change port in vite.config.js
```

**Backend (3000):**
```bash
# Find and kill process
lsof -ti:3000 | xargs kill -9

# Or change PORT in server/server.js
```

### npm install Fails

```bash
# Clear cache and retry
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

### Server Won't Start

Check if all dependencies are installed:
```bash
npm install multer csv-parser xlsx uuid recharts
```

## Next Steps

- Read the [full README](README.md) for detailed information
- Check [API Documentation](API_DOCS.md) for API integration
- See [Contributing Guide](CONTRIBUTING.md) to contribute
- Review [Changelog](CHANGELOG.md) for version history

## Need Help?

- 📧 Email: firozhasan1542@gmail.com
- 🐛 Issues: [GitHub Issues](https://github.com/yourusername/fast-track/issues)
- 📖 Docs: [Full Documentation](README.md)

Happy tracking! 🚚
