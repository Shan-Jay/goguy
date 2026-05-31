# GoGuy Transport Service - Online Database Setup Guide

## 🎯 Overview
Your app now has a complete backend with MongoDB for online data storage. Data will be synced across all devices when hosted!

---

## 📋 Prerequisites
- Node.js (v14+) - [Download](https://nodejs.org/)
- MongoDB Atlas account (free) - [Sign up](https://www.mongodb.com/cloud/atlas)
- A hosting platform (Heroku, Railway, Vercel, Replit, or similar)

---

## 🚀 Local Development Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Set Up MongoDB Atlas (Free Database)

1. **Create MongoDB Account**
   - Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
   - Sign up (free tier available)
   - Create a new project

2. **Create a Database Cluster**
   - Click "Create" to create a new cluster (choose FREE tier)
   - Select your region (closest to you)
   - Click "Create Cluster" and wait 5-10 minutes

3. **Set Database Access**
   - Go to "Database Access" → "Add New Database User"
   - Username: `goguy_admin`
   - Password: Create a strong password (save it!)
   - Click "Add User"

4. **Set Network Access**
   - Go to "Network Access" → "Add IP Address"
   - Click "Allow Access from Anywhere" (for development)
   - Click "Confirm"

5. **Get Connection String**
   - Go to "Clusters" → Click "Connect"
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your password

### 3. Update .env File
Edit `.env` file and add your MongoDB connection string:
```
MONGODB_URI=mongodb+srv://goguy_admin:YOUR_PASSWORD@cluster.mongodb.net/goguy?retryWrites=true&w=majority
PORT=5000
API_URL=http://localhost:5000
```

### 4. Run Locally
```bash
npm start
```

Open browser: `http://localhost:5000`

---

## 🌐 Deployment Options

### Option 1: Deploy to Railway (Recommended - Easiest)

1. **Sign up at Railway.app**
   - Go to [Railway.app](https://railway.app)
   - Sign up with GitHub

2. **Create New Project**
   - Click "New Project"
   - Click "Deploy from GitHub repo"
   - Select your GoGuy repository

3. **Add MongoDB URI to Environment**
   - Go to "Variables"
   - Add: `MONGODB_URI` = Your MongoDB connection string
   - Add: `PORT` = 5000

4. **Deploy**
   - Railway auto-deploys on each Git push
   - Your app will be available at a URL like: `https://goguy-production.up.railway.app`

5. **Update API URL in index.html**
   - The code auto-detects if it's on localhost or production
   - Just deploy and it will work!

---

### Option 2: Deploy to Heroku

1. **Create Heroku Account**
   - Go to [Heroku.com](https://www.heroku.com)
   - Sign up and verify email

2. **Install Heroku CLI**
   - Download from [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli)
   - Login: `heroku login`

3. **Create Heroku App**
   ```bash
   heroku create goguy-transport
   ```

4. **Set Environment Variables**
   ```bash
   heroku config:set MONGODB_URI="your_mongodb_connection_string"
   ```

5. **Deploy**
   ```bash
   git push heroku main
   ```

6. **View Your App**
   ```bash
   heroku open
   ```

---

### Option 3: Deploy to Replit

1. **Create Replit Account**
   - Go to [Replit.com](https://replit.com)
   - Sign up

2. **Import Repository**
   - Click "Create" → "Import from GitHub"
   - Paste your repository URL

3. **Add Secrets**
   - Click "Secrets" (lock icon on left)
   - Add: `MONGODB_URI` = Your connection string
   - Add: `PORT` = 5000

4. **Run**
   - Click "Run" button
   - Your app will start and be accessible at Replit's provided URL

---

### Option 4: Deploy to Vercel

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Sign up at Vercel**
   - Go to [Vercel.com](https://vercel.com)
   - Import your GitHub repository

3. **Add Environment Variables**
   - In project settings, add:
   - `MONGODB_URI` = Your MongoDB connection string

4. **Deploy**
   - Vercel auto-deploys on each push

---

## 📝 API Endpoints

Your backend provides these API endpoints:

### Customers
- `GET /api/customers` - Get all customers
- `POST /api/customers` - Add customer
- `GET /api/customers/:id` - Get customer by ID
- `DELETE /api/customers/:id` - Delete customer

### Drivers
- `GET /api/drivers` - Get all drivers
- `POST /api/drivers` - Add driver
- `GET /api/drivers/:id` - Get driver by ID
- `DELETE /api/drivers/:id` - Delete driver

### Schedules
- `GET /api/schedules` - Get all schedules
- `POST /api/schedules` - Add schedule
- `DELETE /api/schedules/:id` - Delete schedule

### Stats
- `GET /api/stats/:date` - Get dashboard stats for a date

---

## 🔄 How It Works

1. **Frontend** (index.html) sends requests to backend
2. **Backend** (server.js) receives requests and stores data in MongoDB
3. **Database** (MongoDB Atlas) stores all data in the cloud
4. **Data Syncs** - All devices see the same data in real-time

---

## ⚠️ Important Notes

- **First Time Deploy**: Takes 1-5 minutes for service to start
- **Image Storage**: Photos are stored as base64 in database. For production, consider Cloud Storage
- **Security**: In production, restrict IP addresses and use environment variables for secrets
- **Scaling**: Free tier supports small-to-medium apps. Upgrade if needed.

---

## 🐛 Troubleshooting

### "Cannot connect to MongoDB"
- ✅ Check MongoDB connection string
- ✅ Verify Network Access is set to "Anywhere"
- ✅ Check username and password

### "API returns 404"
- ✅ Ensure backend is running
- ✅ Check API_URL in browser console
- ✅ Verify server port matches API_URL

### "Changes not saving"
- ✅ Check browser console for errors
- ✅ Ensure CORS is enabled in server.js
- ✅ Check network tab in DevTools

### "App is slow"
- ✅ Upgrade MongoDB tier
- ✅ Add database indexes
- ✅ Optimize image sizes before upload

---

## 📞 Support

For help:
1. Check console errors (F12 → Console)
2. Check server logs in hosting platform
3. Review MongoDB Atlas dashboard for errors

---

## 🎉 Next Steps

1. ✅ Set up MongoDB Atlas
2. ✅ Update .env with connection string
3. ✅ Run `npm install`
4. ✅ Test locally with `npm start`
5. ✅ Deploy to Railway/Heroku/Replit
6. ✅ Share your live link!

Enjoy your online GoGuy app! 🚗

